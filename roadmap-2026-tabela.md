---
title: Roadmap 2026 — Tabela de Trabalho
date: 2026-04-17
tags:
  - project
  - area/pm
  - area/repediu
  - status/active
---

# Roadmap 2026 — Tabela de Trabalho

Tabela para organizar e validar cada iniciativa antes de subir pro Jira Timeline.

> [!info] Como usar
> Preencha as colunas vazias (Épico Jira, Start, End, Responsável, Dependências, Notas). Quando estiver validado, usamos pra criar/atualizar os épicos no Jira.

---

## Plataforma & Fundação 🏗️

| # | Iniciativa | Épico Jira | Start | End | Responsável | Dependências | Notas |
|---|---|---|---|---|---|---|---|
| P1 | Hardening Auth/Autorização (9 módulos) | **RPD-1967** | Mar 26 | Jun 26 | Valdeci | — | AGORA · 2 done, 2 in progress, 5 selected |
| P2 | Desativar N8N exposto / Migração endpoints → API | **RPD-1823** | Mar 26 | Abr 26 | Raul | — | AGORA · inclui migração + desativação |
| P3 | Migração RabbitMQ (credenciais por vhost) | **RPD-1845** | Mar 26 | Abr 26 | Luiz (TL) | — | AGORA |
| P4 | Performance e migração telas p/ Athena (~20 telas) | **RPD-1885** | Ongoing | Ongoing | Gabriel + Flex | — | Nekt/Athena + cache + loader |
| P5 | Divisão estratégica (Analytics/Mkt/CRM) | **RPD-1968** | | | | P4 | Épico vazio, aguardando direção |

## Dados & Inteligência 🧠

| # | Iniciativa | Épico Jira | Start | End | Responsável | Dependências | Notas |
|---|---|---|---|---|---|---|---|
| D1 | ML — Planejamento inteligente de envio WhatsApp | **RPD-1695** | Mar 26 | Abr 26 | Lucas Lemes | — | AGORA · In Progress |
| D2 | Tracker Repediu & Segmentação Comportamental | **RPD-1971** | Mar 26 | Abr 26 | Vagner | — | AGORA · RPD-1860 como child · In Progress |
| D3 | IA — Campanhas Automáticas & Auto-segmentação | **RPD-1972** | | | | D2 | 5 children: RPD-1227, 1228, 1142, 1755, 1753 |
| D4 | IA de Cardápio — Fotos, SEO & Engenharia de Menu | **RPD-1973** | | | | D2 | 2 children: RPD-1694, RPD-1113 |

## Campanhas & Conteúdo 📣

| # | Iniciativa | Épico Jira | Start | End | Responsável | Dependências | Notas |
|---|---|---|---|---|---|---|---|
| C1 | Reconstrução Tela de Criação: Canal WhatsApp Oficial | **RPD-2018** | Mar 26 | | Paulo V + Renato | — | AGORA · children: RPD-1780 (done), RPD-1221 (code review) · SMS via RPD-2025 |
| C2 | Canal E-mail: Infra, UX e Tela de Criação | **RPD-2019** | Mar 26 | Abr 26 | Wudson | — | AGORA · children: RPD-2027 (criação), RPD-2029 (descadastro) |
| C3 | Push In-App | **RPD-2020** | | | | — | Épico criado |
| C4 | Canal RCS: Melhorias e Tela de Criação | **RPD-2021** | | | | — | Épico criado · child: RPD-2026 (tela criação) |
| C5 | Vouchers com LP própria | **RPD-1984** | | | | — | Épico existente · LP com personalização de cores/botões |
| C6 | WhatsApp Oficial: Melhorias, Templates Meta e Qualidade | **RPD-2022** | Ongoing | Ongoing | Renato | — | Canal core · children: RPD-2012, 1920, 1868, 1671, 1676 |
| C7 | Torpedo de Voz | **RPD-2023** | | | | — | Épico criado · child: RPD-2028 (tela criação) |
| C8 | Reconstrução módulo de Jornadas | **RPD-2024** | | | | — | Épico prioritário · children: RPD-1226, 1230, 1487 |

## Mídia Paga & Growth 🚀

| # | Iniciativa | Épico Jira | Start | End | Responsável | Dependências | Notas |
|---|---|---|---|---|---|---|---|
| M1 | Integração Meta Ads — Criação de Campanhas pela Repediu | **RPD-2030** | | | | — | Hub de marketing · Fernando quer construir |
| M2 | Cardápio Digital como Catálogo na Meta | **RPD-2031** | | | | M1 | children: RPD-132, RPD-131, RPD-130 |
| M3 | Publicação de LPs e Vouchers como Tráfego Pago na Meta | **RPD-2032** | | | | C5, M1 | Depende RPD-1984 |
| M4 | Analytics de Mídia Paga — Dashboard de Resultados Meta e Instagram | **RPD-2033** | | | | M1 | children: RPD-1562, RPD-1542, RPD-1485, RPD-1650 |
| M5 | Integração Google — Search Console e Google Meu Negócio | **RPD-2034** | | | | — | Tráfego orgânico + presença local |

## Jornadas & CRM 🔄

| # | Iniciativa | Épico Jira | Start | End | Responsável | Dependências | Notas |
|---|---|---|---|---|---|---|---|
| J1 | Nekt — Migração analytics p/ Athena (~20 telas) | ~~RPD-1325~~ (deletado, coberto por P4/RPD-1885) | Ongoing | Ongoing | Gabriel + Flex | — | AGORA · AWS Athena |
| J2 | Novas telas e relatórios | — | Ongoing | Ongoing | Deivid/Gabriel | — | Contínuo |
| J3 | Integrações parceiros | — | Ongoing | Ongoing | Anderson + Danilo | — | Contínuo |

---

> [!tip] Mudanças em relação ao roadmap anterior (atualizado 16/04/2026)
> - **C1**: virou épico próprio **RPD-2018** englobando WhatsApp Oficial. SMS também passa pela reconstrução (RPD-2025 child de C1).
> - **C2**: virou épico **RPD-2019** com tela de criação de e-mail e story de descadastro na tela de desempenho.
> - **C3 Push In-App**: épico **RPD-2020** criado.
> - **C4 RCS**: épico **RPD-2021** criado com story de tela de criação.
> - **C5**: redefinido como Vouchers com LP própria (sem pagebuilder), usa épico existente **RPD-1984**.
> - **C6**: renomeado para "WhatsApp Oficial: Melhorias, Templates Meta e Qualidade" — épico **RPD-2022** com issues do Renato linkadas.
> - **C7 Torpedo de Voz**: épico **RPD-2023** criado com story de tela de criação.
> - **C8 Reconstrução de Jornadas**: épico prioritário **RPD-2024** criado com 3 children linkados (RPD-1226, 1230, 1487).
> - **Page Builder + QR Code (C5 anterior)**: substituído pelo conceito de Vouchers com LP própria.
> - **Mídia Paga & Growth (atualizado 17/04/2026)**: pilar expandido de 3 para 5 épicos. M1 (RPD-2030) e M4 (RPD-2033) são a base da visão de hub de marketing — criação de campanhas e analytics. M2 (RPD-2031) cobre catálogo de cardápio na Meta com 3 issues existentes linkadas. M3 (RPD-2032) cobre publicação de LPs/vouchers como tráfego pago. M5 (RPD-2034) cobre integração com Google Search Console e Google Meu Negócio.
