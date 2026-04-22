---
title: Autenticação e MFA — Repediu
date: 2026-04-22
tags:
  - area/repediu
  - area/pm
  - security
  - authentication
  - status/active
aliases:
  - MFA Repediu
  - 2FA Repediu
---

# Autenticação e MFA — Repediu

Documento de conhecimento sobre a estratégia de autenticação da Repediu: histórico de decisões, problemas identificados, fluxo planejado e métricas de acompanhamento.

> [!info] Contexto
> Após um ataque em 2026, a Repediu aumentou o nível de segurança forçando 2FA para toda a base. Isso gerou uma dívida de experiência que se manifesta como tickets de suporte e brechas operacionais.

---

## Histórico de decisões

### Linha do tempo

| Período | Evento |
|---|---|
| Fim de fev / início de mar 2026 | Lançamento de verificação obrigatória de e-mail e número de celular via SMS |
| ~1 semana depois | Deslogamento de todos os usuários + controle de sessão ativado |
| Logo após | Limite de sessão: 7 dias com "lembrar de mim", 24h sem |
| Sequência | Autenticação via SMS liberada |
| Depois | Autenticação via TOTP (app de autenticação) |
| Depois | Versão que força ativação de pelo menos 1 tipo de 2FA após 7 dias |

### Estado atual

- **100% da base** tem pelo menos um método de 2FA ativo (forçado)
- Métodos disponíveis: SMS, TOTP (app de autenticação)
- Stack técnica: React (front), .NET C# (back), Firebase (gestão de usuários, SMS e TOTP)
- Controle de sessão ativo: 7 dias (lembrar-me) / 24h (sem lembrar-me)

---

## Problemas identificados

### Volume de suporte
~30 tickets por mês relacionados a autenticação, distribuídos entre:
- Usuário não recebe e-mail de verificação
- Usuário não recebe SMS
- Usuário não lembra onde configurou o app de autenticação

### Causa raiz
O 2FA foi imposto sem onboarding adequado. Os usuários — donos de restaurante, perfil leigo — ativaram porque foram obrigados, não por entender o valor. Resultado: não formaram modelo mental de "tenho isso configurado na minha conta."

> [!warning] Brecha operacional crítica
> O suporte está **desabilitando o 2FA** mediante solicitação do cliente, sem protocolo de verificação de identidade. Isso transforma o suporte em um vetor de ataque. Um invasor que saiba disso pode ligar e pedir a remoção do 2FA.
> Chegou a ser sugerido internamente remover o 2FA automaticamente no fluxo de redefinição de senha — o que abriria uma brecha ainda maior.

### Hipóteses confirmadas
- **Hipótese A (Memória):** o usuário não lembra que tem 2FA configurado nem qual método usou → confirmada
- **Hipótese B (Recuperação):** o usuário perde acesso ao canal de verificação (troca de celular, desinstala app) → confirmada como secundária

---

## Estratégia de solução

### Princípio orientador
> Resolver o onboarding de segurança, não apenas adicionar métodos. O usuário precisa entender o que tem ativo e ter saída autônoma quando travar.

### Fluxo planejado — 3 fases

#### Fase 1 — WhatsApp como método principal + segundo método obrigatório
- Forçar verificação de número de WhatsApp (maior taxa de entrega no Brasil vs. SMS)
- Exibir aviso persistente para usuários com apenas 1 método ativo
- No próximo login (dentro do ciclo de 7 dias), forçar configuração de um segundo método
- Alavanca operacional: controle de sessão de 7 dias permite rollout gradual sem feature flag complexa

> [!tip] Vantagem do WhatsApp
> WhatsApp tem taxa de entrega e abertura muito superiores ao SMS no contexto brasileiro, e os donos de restaurante já o usam no dia a dia. É o canal com menor fricção para esse perfil de usuário.

#### Fase 2 — Tela de escolha no login
- Ao preencher a senha, exibir cards com os métodos que o usuário tem configurados
- Só aparecem métodos ativos — sem opções fantasma
- Resolve o problema de memória (Hipótese A): o usuário vê o que tem, escolhe o que prefere naquele momento
- Pré-requisito: usuário precisa ter 2+ métodos (ativado pela Fase 1)

#### Fase 3 — Recuperação self-service
Para quando o usuário perde acesso a todos os métodos configurados:

**Fluxo proposto:**
1. Usuário informa dado de negócio (CNPJ ou CPF do titular — já presentes no cadastro)
2. Sistema valida o dado contra o banco
3. Token de uso único com TTL curto (15–30 min) gerado no backend .NET e enviado por e-mail
4. Usuário clica no link → sessão temporária apenas para reconfigurar métodos
5. Firebase atualizado via Admin SDK

> [!note] Por que não usar Firebase nativo para isso?
> O Firebase não possui fluxo nativo de recuperação de 2FA via e-mail. A solução é gerar o token no backend .NET e usar o Admin SDK para atualizar os métodos após validação.

**Último recurso (quando e-mail também está perdido):**
Intervenção humana com protocolo rígido: verificação por ligação com perguntas de segurança + validação de documento. Não deve ser padrão — apenas casos extremos.

---

## Métricas de acompanhamento

| Métrica | Estado atual | Meta |
|---|---|---|
| Tickets de autenticação/mês | ~30 | 0 (eliminar tickets que chegam ao dev) |
| Usuários com 2+ métodos ativos | Desconhecido | Acompanhar após Fase 1 |
| Taxa de conclusão do fluxo de segundo método | — | Medir após Fase 1 |
| Tickets resolvidos sem suporte humano (self-service) | 0% | Medir após Fase 3 |

> [!todo] Ação pendente
> Verificar percentual da base com e-mail válido/verificado antes de apostar no e-mail como âncora de recuperação (Fase 3).

---

## Questões em aberto

- [ ] Qual % da base tem e-mail válido e verificado?
- [ ] Qual % da base já tem CNPJ/CPF validado no cadastro?
- [ ] O módulo TOTP do Firebase (pouco documentado) suporta reset via Admin SDK sem reautenticação?
- [ ] Qual protocolo o suporte vai adotar para os casos extremos de intervenção humana?
- [ ] Como tratar usuários que trocaram de número e não atualizaram no cadastro antes de ativar WhatsApp como método?

---

## Referências

- [[stack-tecnico]] — Stack atual: React, .NET C#, Firebase
- [[meu-papel-como-pm]] — Contexto de como trabalho
- [[repediu-overview]] — Contexto geral da Repediu e base de clientes
