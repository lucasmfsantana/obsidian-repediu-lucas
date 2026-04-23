---
title: Roadmap 2026 — Tabela de Trabalho
date: 2026-04-07
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
| C1 | Reconstrução: criação de campanha | RPD-1780 (Story) | Mar 26 | Abr 26 | Paulo V + Renato | — | AGORA · ~60d |
| C2 | Canal E-mail (infra + UX) | RPD-1324 (Epic) | Mar 26 | Abr 26 | Wudson | — | AGORA |
| C3 | Push In-App | — | | | | — | |
| C4 | Canal RCS (melhorias) | — | | | | — | |
| C5 | Page Builder + QR Code | — | | | | — | Novo · Fernando quer construir |
| C6 | Templates prontos (Campanhas + Jornadas) | — | | | | — | |
| C7 | Torpedo de Voz | RPD-1323 (Epic) | | | | — | |
| C8 | Reconstrução módulo de Jornadas | — | | | | — | |

## Mídia Paga & Growth 🚀

| # | Iniciativa | Épico Jira | Start | End | Responsável | Dependências | Notas |
|---|---|---|---|---|---|---|---|
| M1 | Subir campanha na Meta pela Repediu | — | | | | — | Novo · Fernando quer construir |
| M2 | Anunciar cardápio digital nas mídias pagas | — | | | | M1 | |
| M3 | Anunciar LPs nas mídias pagas | — | | | | C5, M1 | Depende Page Builder |

## Jornadas & CRM 🔄

| # | Iniciativa | Épico Jira | Start | End | Responsável | Dependências | Notas |
|---|---|---|---|---|---|---|---|
| J1 | Nekt — Migração analytics p/ Athena (~20 telas) | ~~RPD-1325~~ (deletado, coberto por P4/RPD-1885) | Ongoing | Ongoing | Gabriel + Flex | — | AGORA · AWS Athena |
| J2 | Novas telas e relatórios | — | Ongoing | Ongoing | Deivid/Gabriel | — | Contínuo |
| J3 | Integrações parceiros | — | Ongoing | Ongoing | Anderson + Danilo | — | Contínuo |

---

> [!tip] Mudanças em relação ao roadmap anterior
> - **Page Builder + QR Code (C5)**: substituiu "Landing Pages" e "Rastreamento offline QR Code" que eram itens separados. Fernando quer como uma coisa só.
> - **Subir campanha na Meta pela Repediu (M1)**: substituiu "Construção de anúncios dentro da Repediu". Nome mais preciso.
> - **Reconstrução Jornadas**: movida para Campanhas & Conteúdo (C8) por ser mais ligada à experiência de campanha.
> - Colunas Start/End/Responsável vazias nos itens futuros para você preencher.
