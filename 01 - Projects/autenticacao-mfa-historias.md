---
title: MFA Repediu — User Stories por Fase
date: 2026-04-22
tags:
  - project
  - area/repediu
  - security
  - authentication
  - status/active
aliases:
  - Histórias MFA
---

# MFA Repediu — User Stories por Fase

Histórias de usuário para a melhoria do sistema de autenticação em 3 fases. Referência de contexto: [[autenticacao-repediu]].

---

## Fase 1 — WhatsApp como método principal + segundo método obrigatório

### Story 1.1 — Verificação de número via WhatsApp

**Título:** Verificar número de celular via WhatsApp

```
Como dono de restaurante,
Quero verificar meu número de celular via WhatsApp ao acessar a plataforma,
Para que minha conta tenha um método de autenticação confiável e que eu realmente receba as notificações de segurança.
```

**Contexto:** Atualmente a verificação é feita via SMS, que tem taxa de entrega inferior no Brasil. O WhatsApp é o canal de maior adoção no perfil de usuário da Repediu.

```gherkin
Scenario: Verificação bem-sucedida via WhatsApp
  Given o usuário está logado e ainda não verificou o número via WhatsApp
  When o sistema exibe o modal de verificação com o número cadastrado
  And o usuário clica em "Enviar código"
  And insere o código de 6 dígitos recebido no WhatsApp
  Then o número é marcado como verificado
  And o método WhatsApp aparece como ativo na seção "Meus métodos de autenticação"
  And o modal é fechado com mensagem de sucesso "Número verificado com sucesso"

Scenario: Código expirado
  Given o usuário recebeu um código de verificação via WhatsApp
  When tenta inserir o código após 10 minutos da geração
  Then o sistema exibe a mensagem "Código expirado. Solicite um novo código."
  And um botão "Reenviar código" é exibido

Scenario: Número não recebe mensagem no WhatsApp
  Given o usuário tenta verificar um número que não tem WhatsApp ativo
  When o código não é recebido após 2 minutos
  Then o usuário vê a opção "Não recebi — verificar por SMS"
  And pode escolher receber o mesmo código via SMS como alternativa
```

**INVEST:** ✅ Independente | ✅ Negociável | ✅ Valiosa | ✅ Estimável | ✅ Small | ✅ Testável

---

### Story 1.2 — Aviso para usuário com único método ativo

**Título:** Alertar usuário com apenas um método de 2FA ativo

```
Como dono de restaurante,
Quero ser alertado quando tenho apenas um método de autenticação ativo,
Para que eu entenda que posso ficar bloqueado se perder acesso a esse método.
```

**Contexto:** Usuários com apenas um método são o principal perfil dos 30 tickets/mês. O aviso deve ser visível mas não bloqueante — o bloqueio vem na Story 1.3.

```gherkin
Scenario: Exibição do aviso após login com um único método
  Given o usuário faz login com sucesso
  And possui apenas 1 método de 2FA ativo
  When a tela principal é carregada
  Then um banner amarelo é exibido no topo lendo:
    "Você tem apenas 1 forma de autenticação ativa. Adicione um segundo método para não perder acesso à conta."
  And o banner contém um botão "Adicionar método"
  And o banner pode ser dispensado, mas reaparece no próximo login

Scenario: Aviso não exibido para usuário com dois ou mais métodos
  Given o usuário possui 2 ou mais métodos de 2FA ativos
  When faz login com sucesso
  Then o banner de aviso não é exibido

Scenario: Usuário clica em "Adicionar método" a partir do banner
  Given o banner de aviso está visível
  When o usuário clica em "Adicionar método"
  Then é redirecionado para a tela de configuração de métodos de autenticação
  And os métodos disponíveis não ativos são exibidos como cards selecionáveis
```

**INVEST:** ✅ Independente | ✅ Negociável | ✅ Valiosa | ✅ Estimável | ✅ Small | ✅ Testável

---

### Story 1.3 — Forçar configuração de segundo método no login

**Título:** Obrigar configuração de segundo método de 2FA no ciclo de 7 dias

```
Como produto,
Quero forçar usuários com apenas 1 método ativo a configurar um segundo método no próximo login após o período de aviso,
Para garantir que toda a base tenha redundância de autenticação.
```

**Contexto:** O controle de sessão de 7 dias garante que todos os usuários passem por esse fluxo naturalmente. Após um ciclo de aviso (Story 1.2), o próximo login bloqueia até o segundo método ser configurado.

```gherkin
Scenario: Bloqueio e configuração forçada no login
  Given o usuário possui apenas 1 método de 2FA ativo
  And já foi exibido o aviso (Story 1.2) no login anterior
  When o usuário faz login com senha + 2FA
  Then antes de acessar a plataforma, uma tela intermediária é exibida:
    "Para continuar, adicione um segundo método de autenticação. Isso garante que você não perca acesso à conta."
  And dois ou mais métodos disponíveis são listados como cards
  And não há botão de fechar ou pular essa tela

Scenario: Usuário completa a configuração do segundo método
  Given a tela de configuração forçada está exibida
  When o usuário seleciona e conclui a configuração de um segundo método
  Then é redirecionado para a plataforma normalmente
  And a tela de escolha de método no login passa a exibir os dois métodos ativos (ver Fase 2)

Scenario: Usuário tenta acessar rota direta sem completar o fluxo
  Given a tela de segundo método forçado está pendente
  When o usuário tenta acessar qualquer rota da plataforma diretamente
  Then é redirecionado de volta para a tela de configuração obrigatória
```

**INVEST:** ✅ Independente | ✅ Negociável | ✅ Valiosa | ✅ Estimável | ✅ Small | ✅ Testável

---

## Fase 2 — Tela de escolha de método no login

### Story 2.1 — Seleção de método de 2FA no login

**Título:** Exibir tela de escolha do método de autenticação ao fazer login

```
Como dono de restaurante,
Quero ver quais métodos de autenticação tenho disponíveis e escolher qual usar no momento do login,
Para que eu nunca trave por não lembrar qual método configurei.
```

**Contexto:** Resolve diretamente a Hipótese A (memória). O usuário não precisa lembrar o que configurou — o sistema mostra. Pré-requisito: usuário com 2+ métodos (ativados na Fase 1).

```gherkin
Scenario: Exibição dos métodos disponíveis após senha correta
  Given o usuário inseriu a senha corretamente
  And possui 2 métodos de 2FA ativos (ex: WhatsApp e TOTP)
  When o sistema avança para a etapa de 2FA
  Then uma tela é exibida com o título "Como você quer confirmar sua identidade?"
  And cada método ativo aparece como um card com ícone, nome e descrição breve
  And apenas métodos ativos do usuário são exibidos — nenhum método inativo aparece

Scenario: Usuário com apenas um método (fluxo legado / transição)
  Given o usuário possui apenas 1 método de 2FA ativo
  When o sistema avança para a etapa de 2FA
  Then o sistema envia o código diretamente pelo único método disponível
  And não exibe a tela de escolha (sem escolha a fazer)
  And exibe o banner de aviso de método único (Story 1.2)

Scenario: Usuário escolhe um método e conclui autenticação
  Given a tela de escolha está exibida com dois cards
  When o usuário clica no card do método desejado
  Then o sistema inicia o fluxo de verificação do método escolhido
  And após verificação bem-sucedida, redireciona para a plataforma

Scenario: Usuário muda de ideia e quer usar outro método
  Given o fluxo de verificação de um método foi iniciado
  When o usuário clica em "Usar outro método"
  Then retorna para a tela de escolha de método
  And pode selecionar um método diferente
```

**INVEST:** ✅ Independente | ✅ Negociável | ✅ Valiosa | ✅ Estimável | ✅ Small | ✅ Testável

---

## Fase 3 — Recuperação self-service

### Story 3.1 — Recuperação de acesso via e-mail + dado de negócio

**Título:** Recuperar acesso à conta sem depender do suporte

```
Como dono de restaurante que perdeu acesso a todos os métodos de 2FA,
Quero conseguir reconfigurar minha autenticação de forma autônoma,
Para não precisar contatar o suporte e não ficar bloqueado da plataforma.
```

**Contexto:** Hoje 100% dos casos de perda total de acesso chegam ao suporte, que desabilita o 2FA sem verificação. Essa história elimina a necessidade de intervenção humana nesses casos, preservando a segurança.

```gherkin
Scenario: Usuário inicia recuperação de acesso
  Given o usuário está na tela de 2FA
  And não consegue acessar nenhum dos métodos configurados
  When clica em "Não tenho acesso aos meus métodos"
  Then é exibida uma tela de recuperação com dois campos:
    - "CNPJ ou CPF cadastrado na conta"
    - "E-mail da conta"
  And uma mensagem explicando que um link será enviado para o e-mail após validação

Scenario: Dados validados — envio de link de recuperação
  Given o usuário preencheu o CNPJ/CPF e o e-mail corretamente
  When clica em "Enviar link de recuperação"
  And os dados conferem com o cadastro no banco
  Then um token de uso único com TTL de 20 minutos é gerado no backend
  And um e-mail é enviado com o link de reconfiguração
  And a tela exibe: "Link enviado para seu e-mail. Válido por 20 minutos."

Scenario: Dados inválidos
  Given o usuário preencheu o CNPJ/CPF ou e-mail incorretamente
  When clica em "Enviar link de recuperação"
  Then o sistema exibe: "Não encontramos uma conta com esses dados. Verifique e tente novamente."
  And não envia nenhum e-mail (evita enumeração de contas)

Scenario: Usuário acessa o link de recuperação dentro do prazo
  Given o usuário recebeu o e-mail com o link de recuperação
  When acessa o link dentro de 20 minutos
  Then uma sessão temporária é criada, válida apenas para reconfiguração de métodos
  And o usuário é direcionado para a tela de configuração de métodos
  And após configurar pelo menos 1 método, a sessão normal é liberada

Scenario: Link expirado
  Given o usuário tenta acessar o link após 20 minutos
  Then a tela exibe: "Este link expirou. Volte à plataforma e solicite um novo."
  And o token é invalidado no backend
```

**INVEST:** ✅ Independente | ✅ Negociável | ✅ Valiosa | ✅ Estimável | ⚠️ Médio (pode ser dividido em backend + frontend) | ✅ Testável

> [!warning] Dependência técnica
> Verificar se CNPJ/CPF está validado na base antes de implementar. Sem esse dado, o segundo fator de verificação da recuperação não funciona. Ver questão em aberto em [[autenticacao-repediu]].

---

## Ordem sugerida de implementação

```
Fase 1:
  1.1 Verificação WhatsApp          — Est: M  (depende de integração WhatsApp Business API)
  1.2 Aviso de método único         — Est: S  (frontend puro, sem dependência)
  1.3 Forçar segundo método         — Est: M  (lógica de controle de sessão + frontend)

Fase 2:
  2.1 Tela de escolha no login      — Est: M  (depende de 1.3 estar completo)

Fase 3:
  3.1 Recuperação self-service      — Est: L  (backend token + e-mail + sessão temporária)
```

> [!tip] Por onde começar
> **1.2 → 1.3 → 2.1** podem ser desenvolvidas em sequência rápida pois dependem menos de integrações externas. **1.1** (WhatsApp) provavelmente exige alinhamento com o time de integrações e deve ser paralela. **3.1** fica para depois que o volume de tickets cair com as fases anteriores — assim você valida o que o fluxo de recuperação precisa cobrir com base nos casos reais restantes.
