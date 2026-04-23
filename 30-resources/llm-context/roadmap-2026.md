---
title: Roadmap de Produto Repediu 2026/27
date: 2026-03-28
tags:
  - area/repediu
  - area/pm
  - resource
  - status/active
aliases:
  - Roadmap 2026
  - Roadmap Repediu
---

# Roadmap de Produto Repediu 2026/27

Visão macro do roadmap construída em sessão com Lucas (PM) em 28/03/2026, enriquecendo a versão inicial criada por Fernando (CTO/Tech Lead).

> [!info] Fonte
> Versão original do Fernando: conversa compartilhada no Claude. Enriquecida com dados do Jira (projeto RPD) e contexto de capacidade real do time.

## Pilares Estratégicos

O roadmap está organizado em **5 pilares**, cada um com iniciativas sequenciadas por dependência técnica e capacidade do time.

### 1. Plataforma & Fundação 🏗️

Sustenta tudo: segurança pós-invasão, migração de infra, performance e reestruturação da plataforma.

| Iniciativa | Responsável | Período | Status |
|---|---|---|---|
| Hardening Auth/Autorização (9 módulos) | Valdeci | Mar–Jun 26 | AGORA |
| Migração endpoints N8N → API (~12 endpoints) | Raul | Mar–Abr 26 (~5 sem) | AGORA |
| Migração RabbitMQ (credenciais por vhost) | Luiz (TL) | Mar–Abr 26 | AGORA |
| Desativar N8N exposto como API | Luiz/Raul | Mai 26 | — |
| LGPD & Conformidade | Valdeci + flex | Ongoing | Contínuo |
| Performance velocidade telas | Flex | Abr 26 → | Contínuo |
| Divisão estratégica (Analytics/Mkt/CRM) | Paulo V + Flex | Jun–Ago 26 | — |

> [!warning] Contexto de segurança
> Esses itens foram priorizados após uma invasão recente. Hardening de auth, migração N8N e RabbitMQ são resposta direta a esse incidente.

### 2. Dados & Inteligência 🧠

Progressão lógica: coletar dados → usar dados → criar com dados → otimizar com dados.

| Iniciativa | Responsável | Período | Status |
|---|---|---|---|
| ML — Escolha inteligente do consumidor | Squad Fernando | Mar–Abr 26 (~60d) | AGORA |
| Tracker Repediu | Vagner | Mar–Abr 26 (~60d) | AGORA |
| Segmentação por eventos | Squad Fernando | Mai–Jun 26 | Depende Tracker |
| IA — Campanhas automáticas + auto-segmentação | Squad Fernando | Ago–Out 26 | — |
| IA — Melhoria de cardápio (Fotos/SEO) | Squad Fernando | Nov 26–Jan 27 | — |
| IA — Engenharia de cardápio (Matriz BCG) | Squad Fernando | Nov 26–Jan 27 | — |

### 3. Campanhas & Conteúdo 📣

Reconstrução da experiência de criação de campanha + expansão de canais.

| Iniciativa | Responsável | Período | Status |
|---|---|---|---|
| Reconstrução: criação de campanha | Paulo V (front) + Renato (back) | Mar–Abr 26 (~60d) | AGORA |
| Canal E-mail (infra + UX) | Wudson | Mar–Abr 26 | AGORA |
| Push In-App | Vagner → Flex | Abr–Jun 26 | — |
| Canal RCS (melhorias) | Flex | Mai–Jun 26 | — |
| Rastreamento offline (QR Code) | Flex | Jul–Ago 26 | — |
| Templates prontos (Campanhas + Jornadas) | Squad Fernando | Jul–Ago 26 | — |
| Landing Pages | Flex (front) | Ago–Out 26 | — |
| Torpedo de Voz | Flex | Set–Out 26 | — |

### 4. Mídia Paga & Growth 🚀

Depende de LPs prontas, maturidade de canais e integração com mídias pagas.

| Iniciativa | Responsável | Período | Status |
|---|---|---|---|
| Construção de anúncios dentro da Repediu | Squad Fernando + Flex | Out–Dez 26 | — |
| Anunciar cardápio digital mídias pagas | Squad Fernando | Nov 26–Jan 27 | — |
| Anunciar LPs nas mídias pagas | Flex | Nov 26–Jan 27 | — |

### 5. Jornadas & CRM 🔄

Reconstrução das jornadas e evolução de relatórios/analytics.

| Iniciativa | Responsável | Período | Status |
|---|---|---|---|
| Nekt — Migração analytics p/ AWS Athena (~20 telas) | Gabriel + Flex | Ongoing (Mar 26 →) | AGORA |
| Reconstrução módulo de Jornadas | Squad Fernando + Flex | Set–Nov 26 | — |
| Novas telas e relatórios | Deivid/Gabriel | Ongoing | Contínuo |
| Integrações parceiros | Anderson + Danilo | Ongoing | Contínuo |

## Capacidade do Time

### Squad Fernando — Features novas (4 devs)

- **Vagner** → Tracker → Push In-App
- **Renato** → WhatsApp API Oficial (RPD-1828)
- **Lucas Lemes** → WhatsApp API planejamento envio
- **Paulo Valini** → Tela criação campanhas (RPD-1780, parking aguardando PR)

### Segurança & Infra

- **Valdeci** → Auth hardening dedicado (9 módulos na fila)
- **Luiz (TL)** → RabbitMQ migration
- **Caíque (TL)** → Checklist segurança + Meta BLC

### Integrações (2 devs dedicados)

- **Anderson** → Novas integrações, velocidade muito alta (~7 PRs/semana)
- **Danilo** → Telemetria + refatorações de integrações existentes

### Força Flexível (4 devs + 1 chegando)

> [!important] Regra de ouro
> Issues ≤ 2 semanas apenas. Bugs do board do Lucas têm prioridade entre entregas do roadmap.

- **Wudson** → Email → depois bugs/melhorias pontuais (fullstack)
- **Deivid** → Telas + pausa campanhas → bugs/melhorias (fullstack)
- **Gabriel** → Nekt/Athena (~20 telas analytics, ongoing o ano todo) + front → bugs/melhorias (forte em front)
- **Raul** → Migração N8N até Abr → depois front tasks (forte em front)
- **Novo dev** → Chega mid-Abr, fullstack pleno, produtivo a partir de Mai/26

### Tech Leads (código pontual)

- **Caíque**, **Luiz**, **Lucas Palácios** — senioridade alta, atuam em issues críticas e code review

## Premissas e Riscos

- Paulo Valini RPD-1780 em Parking → volta após PR da melhoria atual, estimativa final Mai/26
- Raul na migração N8N é um épico com ~12 endpoints → conclusão estimada Jun/26, depois fica disponível para front
- Novo dev (mid-Abr): ~2 semanas de onboarding, produtivo a partir de Mai/26
- Segmentação por eventos e IA dependem do Tracker — sequência obrigatória
- Mídia Paga depende de LPs e maturidade de canais — posicionado deliberadamente no final
- Pós-invasão: hardening de auth é prioridade paralela contínua até Q3
- Itens secundários (etiquetas, predição de gênero, clientes identificados, doc automática de integrações, campanhas sugeridas, melhorias mobile, novas propriedades segmentação) ficam como complementares e entram via força flexível quando houver janela

## Itens Secundários (não mapeados no Gantt)

Identificados no Jira mas não prioritários para o roadmap macro:

- Etiquetas (RPD-1326)
- Melhorias mobile/UX (RPD-1826)
- Campanhas sugeridas multi-canal (RPD-1755, RPD-1753)
- Novas propriedades segmentação: qtd mensagens, valor última compra, canal último pedido (RPD-1839, 1746, 1745)
- Predição de gênero — bug (RPD-1877)
- Clientes identificados (RPD-1783)
- Documentação automática integrações via Mapper (RPD-1874)
- Permissões e exportação de relatórios (RPD-1863)

## Visualização

Gantt visual disponível em: [[roadmap-2026-gantt]]
