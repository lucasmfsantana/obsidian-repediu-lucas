---
title: Canal de E-mail Repediu
date: 2026-03-23
tags:
  - resource
  - area/repediu
  - email
  - entregabilidade
aliases:
  - Email Repediu
  - Unsubscribe
  - RFC 8058
---

# Canal de E-mail Repediu

> [!info] Documento de referência
> Consolida tudo o que sabemos sobre a infraestrutura de e-mail da Repediu, incluindo o fluxo de unsubscribe desenhado em [[2026-03-16]]. Consultar para qualquer issue futura envolvendo envio, entregabilidade ou descadastro.

---

## Stack de envio

| Componente | Tecnologia |
|---|---|
| Provedor de envio | AWS SES V2 |
| Domínios | Próprios por cliente (ex: `vip.labraciera.com.br`) |
| Configuração | Tela no painel Repediu para o restaurante configurar domínio |
| Editor de templates | Unlayer (embedado no produto) |
| Autenticação | DKIM + SPF configurados por domínio |

---

## Unsubscribe — por que é crítico

Sem mecanismo de descadastro, o destinatário só tem uma saída: **clicar em "Marcar como spam"**. Isso destrói a reputação do domínio.

> [!warning] Situação antes da implementação
> O domínio `vip.labraciera.com.br` já estava em ==0,07% de reclamação== — a apenas 0,01pp do limiar de atenção (0,08%) e próximo do limite crítico de 0,10%.

### Diretrizes do Google para bulk senders (+5k/dia)

- Taxa de spam deve ficar **abaixo de 0,10%** e nunca atingir 0,30%
- One-click unsubscribe é **obrigatório desde fevereiro de 2024**
- Descadastro deve ser processado em **até 2 dias** (Gmail exige imediato)

---

## RFC 8058 — One-Click Unsubscribe

A RFC define o padrão que Gmail/Outlook usam para exibir o botão nativo "Cancelar inscrição". Pontos essenciais:

### Headers obrigatórios

O botão nativo só aparece se o e-mail tiver **os dois headers**:

```
List-Unsubscribe: <https://api.repediu.com/unsubscribe/one-click?token={jwt}>
List-Unsubscribe-Post: List-Unsubscribe=One-Click
```

### Regras técnicas

- Os headers **precisam estar cobertos pela assinatura DKIM** — sem isso o Gmail ignora
- O endpoint one-click **não pode retornar redirect** (proibido pela RFC)
- Deve aceitar dois Content-Types: `application/x-www-form-urlencoded` e `multipart/form-data`
- O POST deve ser **completamente stateless** — sem cookies, sem sessão. Toda informação vai no token da URL

---

## Fluxo técnico de descadastro

Dois caminhos distintos que convergem para o mesmo processamento:

### Caminho A — Botão nativo Gmail/Outlook

```
POST /unsubscribe/one-click?token={jwt}
→ Stateless, sem redirect, resposta 200 direto
```

### Caminho B — Link no rodapé (Unlayer)

```
GET /unsubscribe?token={jwt}
→ Landing page de confirmação
→ POST /unsubscribe/confirm
```

### Convergência

Ambos os caminhos executam:
1. Inserção na tabela `email_suppressions` (com isolamento multi-tenant por `restaurant_id`)
2. Adição à SES Suppression List do domínio
3. Webhook SNS para capturar complaints automáticos do SES

---

## APIs e modelo de dados

### Endpoints novos

| Endpoint | Método | Descrição |
|---|---|---|
| `/unsubscribe/one-click` | POST | RFC 8058 — botão nativo dos provedores |
| `/unsubscribe` | GET | Landing page de confirmação (link no rodapé) |
| `/unsubscribe/confirm` | POST | Confirmação do descadastro via landing page |

### Tabela `email_suppressions`

- Isolamento multi-tenant por `restaurant_id`
- Registro de `contact_id`, `campaign_id`, `source` (one-click / link / complaint)
- Timestamp de criação
- JWT opaco por contato + campanha, com **assinatura rotacionável**

---

## Fórmula da taxa de descadastro

$$
\text{Taxa} = \frac{\text{Descadastros}}{\text{E-mails Entregues}} \times 100
$$

> [!tip] Denominador correto
> O denominador é **entregues**, não enviados — porque só quem recebeu pode descadastrar.

---

## Protótipos criados

Três telas foram prototipadas durante a sessão de [[2026-03-16]]:

### 1. Tela de Domínios de Envio

- 5º card de métrica adicionado: **Descadastro** na grid existente
- Badge "Novo", threshold < 0,10%
- Painel informativo no sidebar explicando RFC 8058

### 2. Email Builder (Unlayer)

- Bloco especial "Descadastro" na aba Conteúdo, com destaque visual separado dos blocos básicos
- Marcador `[descadastro-email]` na aba Marcadores, em seção própria "Conformidade & Entregabilidade"
- Painel de Propriedades mostrando preview da substituição em tempo de envio e aviso sobre injeção automática dos headers RFC 8058
- Aba Auditoria com checklist de entregabilidade incluindo alertas reais do domínio

### 3. Tela de Performance da Campanha (redesign completo)

- 7º KPI card: Descadastros em roxo, com taxa e tooltip de fórmula
- Aba "Descadastros" completa com 4 KPIs (total, taxa, por one-click, por link)
- Breakdown por origem com barras de progresso
- Tabela de contatos descadastrados com e-mail mascarado (LGPD), segmento RFV, data/hora e chip de origem
- Coluna de descadastros na tabela de detalhes diários
- Alerta quando taxa supera a meta

---

## Links relacionados

- [[Meu Papel como PM]] — contexto do meu trabalho
- [[WhatsApp API oficial]] — outro canal de comunicação da Repediu
- [AWS SES V2 Docs](https://docs.aws.amazon.com/ses/latest/dg/Welcome.html)
- [RFC 8058](https://datatracker.ietf.org/doc/html/rfc8058)
- [Google Bulk Sender Guidelines](https://support.google.com/mail/answer/81126)

---

## Modelo de cobrança (atualizado em 2026-03-23)

A partir de **01/04/2026**, o canal de e-mail passa a ser cobrado:
- **R$ 0,005 por e-mail enviado** (antes era gratuito)
- Valor debitado automaticamente do saldo de créditos do cliente (mesmo modelo de SMS e WhatsApp)
- Exemplo prático: campanha para 1.000 contatos = R$ 5,00
- Comunicado criado para in-app (Intercom) e e-mail direto aos clientes
