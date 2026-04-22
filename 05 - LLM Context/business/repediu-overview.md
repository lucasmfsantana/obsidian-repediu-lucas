---
title: Repediu — Visão Geral
tags:
  - llm-context
  - business
updated: 2026-03-20
---

# Repediu — Visão Geral

## O que é
CRM de Food Marketing para restaurantes no Brasil. Ajuda restaurantes a criar campanhas de marketing via WhatsApp, SMS e RCS para engajar e reter clientes.

## Números
- 7.000+ restaurantes ativos
- Foco no mercado brasileiro
- Integrações com PDVs, ERPs e apps de delivery

## Stack de comunicação
- WhatsApp Business API (API oficial da Meta)
- SMS
- RCS

## Modelo de negócio
SaaS B2B — restaurantes são os clientes. Parceiros tecnológicos (integradores de PDV/ERP/delivery) também são parte do ecossistema.

## Time relevante para o PM
- **Lucas** — Product Manager
- **Fernando** — Founder e CEO (o produto nasceu dele; lidera visão de produto, features estratégicas e gerencia alguns devs diretamente)
- **Elton** — Head de Tecnologia (dúvidas técnicas, arquitetura)
- **Caique** — Engenheiro Sênior / Tech Lead (primeiro dev do projeto, conhece o sistema como um todo, foco em infra e segurança)
- **Luis** — Tech Lead (especialista em integrações, núcleo do projeto)
- **Lucas Palacios** — Tech Lead (foco em qualidade de código, principal responsável por code review)
- **Luciana** — Head de Parcerias (questões comerciais com integradores)
- **Time de Suporte** — reporta bugs e problemas via Slack
- **Time de Devs** — execução de features, consultas técnicas via Slack

> [!note] Tech Leads
> Caique, Luis e Palacios atuam como 3 tech leads. No dia a dia: code review, decisões técnicas e refinamento técnico de issues junto ao PM.

## Contexto de segurança
- Multi-tenant: dados de restaurantes são isolados por tenant
- LGPD: dados de clientes dos restaurantes precisam de tratamento adequado
- Integrações com terceiros exigem cuidado com tokens e credenciais
- Histórico recente de incidente de segurança — atenção redobrada
