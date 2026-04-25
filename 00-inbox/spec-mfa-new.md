# Spec de Implementação — Novo Fluxo 2FA Repediu

> Documento de handoff para Claude Code. Contém contexto, requisitos
> funcionais, estrutura de componentes, estados, copy pt-BR, tokens
> visuais, animações e critérios de aceitação.
> **Stack alvo:** React + MUI + Mulish, pt-BR, identidade visual Repediu.
> **Referência visual:** `Repediu 2FA Flow.html` (protótipo aprovado).

---

## 1. Contexto e problema

Hoje o login Repediu:
1. Usuário entra em `/login`, autentica com e-mail/senha.
2. É redirecionado para `/mfa`, onde escolhe entre SMS e TOTP.
3. Telas de SMS e TOTP eram visualmente idênticas → usuários confundiam.
4. SMS falha com frequência (operadoras) e usuário ficava sem saída.

**Solução aprovada:**
- Todo usuário terá **2 métodos MFA ativos obrigatórios** (SMS + TOTP).
- Tela de seleção mostra os 2 cards lado a lado — clique direto navega.
- Cada tela de verificação tem identidade visual distinta (cores,
  ilustração, copy) para reduzir confusão.
- Magic link por e-mail existe como **último recurso discreto** em
  todas as 3 telas (seleção, SMS, TOTP). Não é CTA, é escape.

---

## 2. Rotas e fluxo

```
/login  ──► POST /auth/login
             │
             ├─ 200 + mfa_required=true + mfa_session_token
             │   └─► /mfa/select              (Tela 1)
             │
             ├─ 200 + mfa_required=false     (fluxo antigo, fora do escopo)
             └─ 401                            (erro de credencial)

/mfa/select   ──► clique em card
                   ├─► /mfa/sms              (Tela 2)
                   └─► /mfa/totp             (Tela 3)

/mfa/select, /mfa/sms, /mfa/totp ──► link "Receba um link por e-mail"
                                       └─► /mfa/magic-link  (Tela 4)

Tela 2/3 + código válido ──► POST /auth/mfa/verify ──► /dashboard
Tela 4 + "Enviar link"    ──► POST /auth/magic-link ──► tela "link enviado"
```

Toda tela de MFA exige `mfa_session_token` válido (expira em 10 min).
Sem token → redireciona para `/login`.

---

## 3. Tokens visuais (obrigatórios)

```scss
// Cores
$red-primary:   #E72A4B;   // Brand primary, CTAs, TOTP accent
$red-hover:     #D42544;
$red-dark:      #C91F3E;
$teal:          #26C6DA;   // Section labels, SMS accent
$text:          #1A1A1A;
$text-secondary:#5A5A5A;
$text-muted:    #8A8A8A;
$border:        #E4E4E7;
$border-strong: #D4D4D8;
$bg-panel:      #F4F4F5;   // Right side (content)
$bg-card:       #FFFFFF;
$success:       #2E7D32;
$error:         #D32F2F;
$warn:          #B26A00;

// Radii
$radius-card:   0.35rem;   // Cards (método, fallback)
$radius-btn:    4px;       // Botões, inputs, banners
$radius-pill:   999px;

// Tipografia
font-family: 'Mulish', sans-serif;
// Pesos usados: 400, 500, 600, 700, 800

// Botões (MUI override)
.MuiButton-root {
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  text-transform: none;
}
.MuiButton-containedPrimary {
  background: $red-primary;
  &:hover { background: $red-hover; }
  &:disabled { background: #E9CBD1; color: #fff; }
}
```

### Layout split
Todas as telas MFA usam o mesmo layout do login:
- `grid-template-columns: 1fr 1fr` (ou `0.9fr 1.1fr` quando contém
  ilustração + conteúdo denso).
- **Esquerda (`.brand-panel`)**: fundo `$red-primary`, logo Repediu
  centralizado, duas palavras em marca d'água (`rgba(255,255,255,0.18)`,
  72px, weight 700): "relacionamento" e "recorrência".
- **Direita (`.content-panel`)**: fundo `$bg-panel`, conteúdo
  centralizado vertical e horizontalmente, `max-width: 440px`
  (`640px` no magic link).

---

## 4. Componentes compartilhados

### 4.1 `<BrandPanel />`
Painel esquerdo reutilizável. Props: nenhuma.

### 4.2 `<OtpInput value={string} onChange={fn} error={bool} autoFocus={bool} />`
6 campos de dígito único, Mulish 20px bold, `width: 44px; height: 52px`,
border 1.5px. Comportamento:
- Digitar avança para o próximo; Backspace em vazio volta.
- Setas ←/→ navegam; Paste de 6 dígitos preenche tudo.
- `onChange` só dispara com a string compactada (sem espaços).
- `error=true` aplica borda `$error` + fundo rosado.
- Foco: borda `$red-primary` + shadow `0 0 0 3px rgba(231,42,75,0.12)`.

### 4.3 `<SectionLabel>` (teal uppercase)
```css
color: #26C6DA; font-size: 11px; font-weight: 700;
letter-spacing: 0.12em; text-transform: uppercase; text-align: center;
```

### 4.4 `<Title>` — h1, 22px, weight 700, center.
### 4.5 `<Subtitle>` — p, 13px, `$text-secondary`, center, line-height 1.55.

### 4.6 `<MagicLinkFooter onClick={fn} />`
Renderizado em Tela 1, 2 e 3. Sempre visível, nunca em destaque:
```jsx
<div style={{
  textAlign: 'center',
  marginTop: 22,
  paddingTop: 16,
  borderTop: '1px solid #E4E4E7',
  fontSize: 11.5,
  color: '#8A8A8A',
}}>
  Sem acesso aos seus métodos?{' '}
  <a onClick={onClick} style={{
    color: '#5A5A5A', fontWeight: 500,
    textDecoration: 'underline',
    textDecorationColor: '#D4D4D8',
    textUnderlineOffset: 2,
    cursor: 'pointer',
  }}>Receba um link por e-mail</a>
</div>
```

### 4.7 `<SwitchMethodLink method="sms"|"totp" onClick={fn} disabled={bool} />`
Link em negrito com ícone, centralizado abaixo do botão Verificar:
```css
color: #E72A4B; font-weight: 700; font-size: 13px;
display: inline-flex; align-items: center; gap: 6px;
padding: 10px 4px;
```
Hover: underline. Disabled: opacity 0.5, sem underline.
- Em tela SMS: `<IconAuth /> Usar app autenticador`
- Em tela TOTP: `<IconSms /> Usar código por SMS`

---

## 5. Tela 1 — Seleção de método (`/mfa/select`)

### Layout (topo → base)
1. `<SectionLabel>Verificação em 2 etapas</SectionLabel>`
2. `<Title>Como você quer confirmar sua identidade?</Title>`
3. `<Subtitle>Escolha um método para concluir o acesso. Você poderá alternar para o outro método se algo der errado.</Subtitle>`
4. **Grid de 2 cards**, `grid-template-columns: 1fr 1fr; gap: 14px`.
5. Botão ghost "Voltar ao login" → `/login`.
6. `<MagicLinkFooter />` → `/mfa/magic-link`.

### Card de método
Cada card é um `<button>` clicável inteiro (não há botão "Continuar").

```css
.method-card {
  background: #fff;
  border: 1.5px solid #E4E4E7;
  border-radius: 0.35rem;
  padding: 24px 20px 20px;
  cursor: pointer;
  display: flex; flex-direction: column;
  text-align: left;
  position: relative;
  transition: all 160ms ease;
}
.method-card:hover {
  border-color: #E72A4B;
  transform: translateY(-2px);
  box-shadow: 0 4px 14px rgba(0,0,0,0.06);
}
.method-card::after {
  content: '→';
  position: absolute; top: 18px; right: 18px;
  color: #8A8A8A; font-size: 16px;
  opacity: 0;
  transition: opacity 140ms, transform 140ms;
}
.method-card:hover::after {
  opacity: 1; transform: translateX(2px); color: #E72A4B;
}
```

**Conteúdo do card (apenas 3 elementos, nesta ordem):**
1. Ícone em wrapper 44×44 com radius 10px e fundo tonal:
   - SMS: bg `rgba(38,198,218,0.12)`, ícone `#0E8A9C` (chat bubble com 3 pontos)
   - TOTP: bg `rgba(231,42,75,0.1)`, ícone `#E72A4B` (celular com relógio)
2. Título, 14px weight 700.
3. Descrição, 12px `$text-secondary`, line-height 1.5.

**Copy:**

| Card | Título | Descrição |
|---|---|---|
| SMS | `Código por SMS` | `Receba um código de 6 dígitos no celular terminado em ••• 8842.` |
| TOTP | `App autenticador` | `Abra o Google Authenticator ou equivalente e use o código gerado para a Repediu.` |

O sufixo "••• 8842" vem de `user.phone_last4`. Se não cadastrado,
tratar como erro de estado (usuário não deveria estar aqui) e redirecionar
para onboarding de MFA.

### Comportamento
- `onClick` no card SMS → `navigate('/mfa/sms')` (passando
  `mfa_session_token` via state/context).
- `onClick` no card TOTP → `navigate('/mfa/totp')`.
- **Não existe estado "selecionado" nem botão Continuar.**

### Acessibilidade
- Cada card é `<button type="button">` com `aria-label` completo
  (ex: "Verificar por SMS no celular terminado em 8842").
- Foco visível: borda `$red-primary` + shadow.
- Tab order: SMS → TOTP → Voltar ao login → magic link.

---

## 6. Tela 2 — Verificação SMS (`/mfa/sms`)

### Layout
1. **Ilustração hero** (ver §8.1), `max-width: 260px`, centralizada,
   `margin-bottom: 20px`.
2. `<Title>Verificação por SMS</Title>`
3. `<Subtitle>Enviamos um código de 6 dígitos para o celular terminado em <b>••• 8842</b>. Insira-o abaixo para continuar.</Subtitle>`
4. Banner de erro (se houver) — ver §9.
5. `<OtpInput />`, autofocus.
6. Link "Reenviar código" centralizado, 12px, vermelho quando ativo.
   - Inicia em `Reenviar código em 50s` (countdown 1/s).
   - Após 0: vira `Reenviar código` clicável.
   - Clicou: `Enviando...` (700ms) → reinicia countdown em 60s.
7. **Botão `<Button variant="contained" color="primary">`**, fullWidth,
   sempre renderizado; comportamento de disabled controlado por estado
   `verifyStatus`:

   | verifyStatus | Label | Disabled |
   |---|---|---|
   | `idle` | `Verificar` | **sim** |
   | `verifying` | spinner + `Verificando...` | sim |
   | `success` | check + `Código confirmado` | sim |
   | `error` | `Verificar` | **sim** |

   > Nota: o botão **nunca** é clicável. A verificação é automática (ver §7).
   > Ele existe como feedback visual + preservação do fluxo mental do usuário.

8. `<SwitchMethodLink method="sms" />` abaixo do botão.
9. Contador de tentativas se `attempts > 0`: `Tentativa N de 3`, 11px `$text-muted` centralizado.
10. `<MagicLinkFooter />`.

---

## 7. Tela 3 — Verificação TOTP (`/mfa/totp`)

Idêntica à §6, exceto:

1. **Ilustração hero TOTP** (ver §8.2).
2. Título: `Código do app autenticador`.
3. Subtítulo: `Abra o app autenticador vinculado à Repediu e digite o código exibido para esta conta.`
4. **Sem link "Reenviar código"** (TOTP não reenvia).
5. Em vez do reenvio, mostrar linha-helper 11.5px centralizada com
   anel SVG de 30s animado:
   ```
   [anel 16×16 rotacionando]  O código do app muda a cada 30s
   ```
   Anel = `<circle>` com `strokeDashoffset` animado em `setInterval` 1s,
   cor `$red-primary`, ciclo 30s.
6. Banner de erro copy: `Código incorreto ou expirado. Verifique no app e tente novamente.`
7. `<SwitchMethodLink method="totp" />` com copy `Usar código por SMS`.

---

## 8. Auto-verify (behavior compartilhado SMS + TOTP)

```js
useEffect(() => {
  if (code.length !== 6) return;
  if (status === 'verifying' || status === 'success') return;

  setStatus('verifying');
  setError(null);

  verifyMfa({ method, code, mfaSessionToken })
    .then((res) => {
      setStatus('success');
      setTimeout(() => navigate(res.redirect || '/dashboard'), 500);
    })
    .catch((err) => {
      setStatus('error');
      setError(err.message || 'Código inválido. Verifique e tente novamente.');
      setAttempts((a) => a + 1);
      setCode('');
      setTimeout(() => setStatus('idle'), 100);
    });
}, [code]);
```

**Regras:**
- 3 tentativas erradas na mesma tela → desabilita input por 30s e
  mostra banner sugerindo magic link (texto no footer já atende; não
  abrir modal).
- Se usuário trocar de método (`SwitchMethodLink`), zerar `attempts` e
  `status` do método anterior ao entrar no novo.

---

## 9. Banner de erro (compartilhado)

```jsx
<div style={{
  background: 'rgba(211,47,47,0.07)',
  color: '#8A1F1F',
  border: '1px solid rgba(211,47,47,0.2)',
  borderRadius: 4,
  padding: '10px 14px',
  fontSize: 12,
  lineHeight: 1.5,
  marginBottom: 18,
  display: 'flex',
  gap: 10,
  alignItems: 'flex-start',
}}>
  <IconAlert size={16} />
  <div>{errorMessage}</div>
</div>
```

Variantes: `info` (teal), `error` (vermelho). Usar `info` somente para
dicas (ex: "Não está recebendo o SMS?").

---

## 10. Ilustrações hero (SVGs inline)

Todos os SVGs vão em `src/illustrations/*.tsx`, exportados como
componentes. viewBox `0 0 260 160`. Apenas animações CSS — sem Lottie,
sem libs.

### 10.1 `<SmsHeroIllo />`
Celular vibrando com ondas teal + balão SMS descendo do topo:
- Dois círculos teal (`#26C6DA`) com `animation: signalWave 1.8s infinite`
  (scale 0.6 → 1.6, opacity 0.7 → 0), um com `animation-delay: 0.6s`.
- Corpo do celular (retângulos 56×108 e 50×102 radius 8/5), com
  `animation: phoneVibrate 1.4s ease-in-out infinite` (micro-translates
  e rotações de ±1deg).
- Balão teal 120×56 radius 12 chegando de cima-direita, com
  `animation: smsBubbleIn 700ms ease-out forwards` (translateY 10 → 0,
  scale 0.85 → 1).
- Dentro do balão: chip "SMS" branco translúcido + 3 pontos brancos
  pulsando sequencialmente (`smsDotsPulse 1.2s`, delays 0/0.2/0.4s) +
  ícone cadeado.

### 10.2 `<TotpHeroIllo />`
Mockup de app autenticador mostrando código de 6 dígitos preenchendo:
- Card branco 180×116 radius 10 com stroke `$border`.
- Barra de título preta 180×26 radius 10 com dot vermelho + texto "AUTH APP".
- Linha de conta: label teal/cinza "REPEDIU", e-mail secundário.
- **6 células de dígito** (18×26 cada, gap 4, radius 3, stroke `$border`),
  com texto 13px bold `$text`. Cada célula tem:
  - `animation: totpDigitIn 500ms ease-out both`, `animation-delay: i * 0.12s`.
  - Background pulsa com `totpHighlight 4s infinite`.
- Anel de countdown 30px à direita (`<circle r=15>`), com
  `totpRingSweep 6s linear infinite` (stroke-dashoffset 0 → -94.2) e
  texto "30s" no centro.
- Caption inferior: `CÓDIGO GERADO AUTOMATICAMENTE` 8px `$text-muted`.

### 10.3 Keyframes (globais)
```css
@keyframes signalWave     { 0% {transform:scale(0.6);opacity:.7} 100% {transform:scale(1.6);opacity:0} }
@keyframes phoneVibrate   { 0%,100%{transform:translate(0,0) rotate(0)} 20%{transform:translate(-1.2px,0) rotate(-1deg)} 40%{transform:translate(1.2px,0) rotate(1deg)} 60%{transform:translate(-.8px,0) rotate(-.5deg)} 80%{transform:translate(.8px,0) rotate(.5deg)} }
@keyframes smsBubbleIn    { 0%{transform:translateY(10px) scale(.85);opacity:0} 60%{transform:translateY(-2px) scale(1.02);opacity:1} 100%{transform:translateY(0) scale(1);opacity:1} }
@keyframes smsDotsPulse   { 0%,100%{opacity:.4} 50%{opacity:1} }
@keyframes totpDigitIn    { 0%{opacity:0;transform:translateY(6px)} 100%{opacity:1;transform:translateY(0)} }
@keyframes totpRingSweep  { from{stroke-dashoffset:0} to{stroke-dashoffset:-94.2} }
@keyframes totpHighlight  { 0%,90%,100%{fill:#FAFAFA} 30%,60%{fill:rgba(231,42,75,.08)} }
@keyframes spin           { to { transform: rotate(360deg) } }
```

Respeitar `@media (prefers-reduced-motion: reduce)` → desabilitar todas
as animações acima (manter elementos estáticos, sem remover).

---

## 11. Tela 4 — Magic link fallback (`/mfa/magic-link`)

### Layout
1. `<SectionLabel>Acesso de emergência</SectionLabel>`
2. `<Title>Link de acesso por e-mail</Title>`
3. `<Subtitle>Não foi possível verificar seu SMS nem seu app autenticador. Enviaremos um link seguro para o e-mail cadastrado, válido por <b>10 minutos</b>.</Subtitle>`
4. **Card de fallback** com ícone de e-mail (bg `rgba(255,167,38,0.15)`,
   cor `$warn`), e-mail mascarado (`m•••@repediu.com.br`) do usuário,
   descrição e botão primário `Enviar link de acesso`.
5. Botão ghost `← Tentar outro método` → volta para `/mfa/select`.

### Após envio bem-sucedido
Trocar o card por versão verde (`rgba(46,125,50,0.06)`) com ícone check,
título `Link enviado` e copy:
`Confira seu e-mail. O link expira em 10 minutos e só pode ser usado uma vez.`

Após 1200ms redirecionar para tela "verifique seu e-mail" (fora deste
escopo) ou apenas permanecer.

### API
`POST /auth/magic-link` com `mfa_session_token` → 202 `{ ok: true }`.
Rate limit: 1 req / 60s / usuário.

---

## 12. Estrutura de arquivos sugerida

```
src/
  pages/mfa/
    MfaSelect.tsx          // Tela 1
    MfaSmsVerify.tsx       // Tela 2
    MfaTotpVerify.tsx      // Tela 3
    MfaMagicLink.tsx       // Tela 4
  components/mfa/
    BrandPanel.tsx
    OtpInput.tsx
    MagicLinkFooter.tsx
    SwitchMethodLink.tsx
    MethodCard.tsx
    StatusButton.tsx       // Botão disabled com estado verify
  illustrations/
    SmsHeroIllo.tsx
    TotpHeroIllo.tsx
  hooks/
    useMfaVerify.ts        // auto-verify + attempts + status
    useCountdown.ts        // reenvio SMS
  api/
    mfa.ts                 // verifyMfa, resendSms, sendMagicLink
  styles/
    mfa.module.scss        // keyframes + tokens locais
```

---

## 13. Critérios de aceitação (QA)

- [ ] Clique em card SMS navega direto para `/mfa/sms`, sem passo "Continuar".
- [ ] Clique em card TOTP idem.
- [ ] Cards mostram somente ícone, título e descrição — sem badge, sem linha inferior.
- [ ] Hover em card mostra seta → e borda vermelha.
- [ ] Ilustração SMS anima (vibração + ondas + balão + pontos) em loop.
- [ ] Ilustração TOTP anima (dígitos aparecendo + anel girando) em loop.
- [ ] Digitar 6 dígitos dispara auto-verify sem clique; botão `Verificar`
      nunca é clicável.
- [ ] Botão troca de label: `Verificar` → `Verificando...` (spinner) →
      `Código confirmado` (check).
- [ ] Código errado: código limpa, banner de erro aparece, contador
      `Tentativa N de 3` incrementa.
- [ ] Link "Usar app autenticador" / "Usar código por SMS" em negrito
      vermelho, ícone à esquerda, abaixo do botão Verificar.
- [ ] Rodapé "Receba um link por e-mail" presente e discreto nas 3 telas.
- [ ] Tela TOTP não mostra "Reenviar código" — mostra anel 30s.
- [ ] `prefers-reduced-motion: reduce` desabilita todas as animações.
- [ ] Todas as strings em pt-BR.
- [ ] Mulish aplicada em todo o fluxo, pesos 400–800.
- [ ] Tokens de cor e radius conferem com §3.
- [ ] `mfa_session_token` ausente → redireciona para `/login`.

---

## 14. Fora de escopo (não implementar)

- Onboarding de cadastro do TOTP (QR code) e do SMS.
- Tela pós-magic-link ("verifique seu e-mail").
- Gestão de métodos nas configurações da conta.
- Recuperação de senha.