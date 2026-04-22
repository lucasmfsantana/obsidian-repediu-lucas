---
title: Mixpanel — Implementação na Repediu
date: 2026-04-13
tags:
  - resource
  - area/repediu
  - area/pm
  - analytics
  - mixpanel
---

# Mixpanel — Implementação na Repediu

Documentação de referência para a implementação do Mixpanel como ferramenta de product analytics na Repediu, substituindo o Amplitude. Issue de referência: [RPD-1964](https://repediu-platform.atlassian.net/browse/RPD-1964) (assignee: Deivid Santana). Após concluir, seguir com [RPD-1812](https://repediu-platform.atlassian.net/browse/RPD-1812) para remoção do Amplitude e desativação dos fluxos n8n.

## Contexto

A Repediu está migrando do **Amplitude** para o **Mixpanel** como ferramenta de product analytics. A migração envolve:
1. Implementar o Mixpanel via SDK JS (RPD-1964)
2. Remover o Amplitude do código e desativar os fluxos n8n (RPD-1812)

Documentação oficial de referência: https://docs.mixpanel.com/docs/quickstart

---

## O que implementar

### Super Properties
Usar `register()` para enviar propriedades globais em todos os eventos automaticamente:
- `company_id`
- `company_name`
- `company_created_at`

Referência: https://docs.mixpanel.com/docs/tracking-methods/sdks/javascript#setting-super-properties

### Identificação de usuários
Identificar o usuário para medir ações futuras. Além de nome e e-mail, é necessário passar também o `user.role` — que identifica se é parceiro ou usuário final.

Referência: https://docs.mixpanel.com/docs/quickstart/identify-users

### Sign Up
Rastrear o evento de cadastro para medir novos usuários por dia, semana e mês.

### Auto Capture
Ativar o autocapture para mapear todos os eventos de forma genérica. Além disso, definir eventos principais para rastreamento individual.

Referência: https://docs.mixpanel.com/docs/tracking-methods/autocapture

---

## Eventos individuais prioritários

### Criação de campanha
Rastrear quem acessa a tela de campanhas e efetivamente cria uma campanha, passando o **canal** como propriedade.
- Verificar se será necessário criar um fluxo por canal
- Medir criação de **rascunhos** também

> [!tip]
> Com super properties + identify + sign up + criação de campanha já temos o suficiente para as primeiras análises.

---

## Considerações importantes

### Multi-tenant
A Repediu tem arquitetura multi-tenant: um usuário pode acessar mais de uma empresa. O Mixpanel tem implementação específica para isso usando **group key** e **group ID**:
- https://docs.mixpanel.com/docs/data-structure/group-analytics/group-analytics-implementation#tracking-events-for-a-group
- https://docs.mixpanel.com/docs/tracking-methods/sdks/javascript#group-analytics

### user.role
Ao identificar o usuário, incluir o campo `user.role` para distinguir parceiros de usuários finais — isso é essencial para segmentar análises no futuro.

---

## Credenciais

> [!warning]
> Não compartilhar publicamente. Mover para cofre de senhas se necessário.

- **Project token:** `56644070a051965d793d5c6997e47e15`
- **API secret:** `5779c67ee78a6ff72581f188b35233f3`
- **Usuário adicionado:** deivid@repediu.com.br
- **Acesso:** https://mixpanel.com/

---

## Status da implementação (abril/2026)

- **RPD-1964** — Implementar Mixpanel — *Selected for Development* (Deivid Santana)
- **RPD-1812** — Remover Amplitude / desativar n8n — *Selected for Development* (dependente da RPD-1964)
- Spec técnico gerado com Claude e anexado na issue (`mixpanel-implementation-spec.md`)
