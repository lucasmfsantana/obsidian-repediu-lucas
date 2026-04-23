---
title: Minha rotina como PM
date: 2026-03-15
tags:
  - meta
  - rotina
  - automação
aliases:
  - Rotina PM
  - Como trabalho
status: em-construção
---

# Minha rotina como PM

> [!info] Documento vivo
> Esse arquivo mapeia como funciona meu dia a dia na Repediu. Atualizo aos poucos conforme descubro novas tarefas, padrões e oportunidades de automação.

---

## Manhã (a partir das 8h)

### 1. E-mail

- Verifico a caixa de entrada filtrando e-mails de `@repediu.com.br`
- A maioria é irrelevante (propagandas, newsletters)
- Leio notícias e newsletters assinadas

> [!tip] Oportunidade de automação
> Filtro automático para destacar apenas o que vem de `@repediu.com.br`. O resto pode virar um digest semanal.

### 2. Slack

Principal canal de comunicação interna. Dois fluxos:

**Suporte** → Reportam bugs e problemas do Repediu. Avalio se é um problema real ou ruído, verifico se já existe item no Jira e, caso não exista, solicito que o suporte abra a issue.

**Devs** → Pedem orientação sobre features em andamento, tiram dúvidas e trazem decisões para validar.

> [!tip] Oportunidade de automação
> Resumo matinal de mensagens por categoria (suporte vs. dev), com highlights de menções diretas e itens urgentes.

### 3. WhatsApp Business

- Grupos com parceiros tecnológicos que integram com o Repediu
- Dúvidas técnicas de integração → resolvidas por mim ou Elton (Head de Tecnologia)
- Questões comerciais → resolvidas por Luciana (Head de Parcerias)

### 4. Acompanhamento de Devs no Jira

- Verifico o que cada dev está trabalhando
- Identifico itens que estão demorando mais do que o esperado
- Mando mensagem no Slack para oferecer ajuda e checar impedimentos

> [!tip] Oportunidade de automação
> Digest diário por dev com: tarefa atual, próxima tarefa, itens bloqueados, atrasados e tempo em status. **Em andamento.**

### 5. Refinamento de Backlog

- Leio as issues abertas
- Classifico, priorizo e descrevo melhor os itens
- Crio protótipos quando necessário (ver [[Fluxo de prototipagem]])

---

## Tarde

Segue o mesmo ritmo da manhã — suporte contínuo aos devs e resposta às demandas do time de suporte. Não há uma rotina estruturada diferente do período matutino.

---

## Stack de ferramentas

| Ferramenta | Uso |
|---|---|
| E-mail | Comunicações internas `@repediu.com.br` |
| Slack | Devs, suporte, time interno |
| WhatsApp Business | Parceiros tecnológicos |
| Jira | Kanban board (RPD) e quadro GRC |
| Obsidian | Second brain, notas e contexto |
| Claude / Cowork | Automação, escrita, prototipagem |

---

## Oportunidades de automação

| # | Automação | Status | Notas |
|---|---|---|---|
| 1 | Jira → Claude: digest diário por dev | 🟡 Em andamento | Tarefa atual, próxima, bloqueios, atrasos |
| 2 | Slack triage: resumo matinal por categoria | 🔴 Planejado | Suporte vs. dev, menções diretas |
| 3 | E-mail filter: destacar `@repediu.com.br` | 🔴 Planejado | Regra simples no cliente de e-mail |
| 4 | Dashboard de produtividade do time | 🔴 Planejado | React + design system Repediu, depende da conexão Jira |

---

## Agenda semanal fixa

### Terça — Alinhamento com CEO ([[Fernando]])

- **Participantes:** Lucas, Fernando
- **Objetivo:** Alinhar visão de produto com execução
- **Pauta recorrente:**
  - Visão de produto e direção (Fernando)
  - Status dos devs que Fernando ainda gerencia diretamente
  - Status dos devs sob gestão do Lucas (backlog, entregas)
  - Qualidade das entregas
- **Template:** [[Template - Alinhamento CEO]]
- **Notas salvas em:** `02 - Areas/Reuniões/`

### Sexta — GRC Semanal

- **Participantes:** Lucas, Elton (Head Tech), Caique, Lucas Palacios, Luis
- **Objetivo:** Acompanhamento de governança, segurança, compliance e processos
- **Dinâmica:** Cada participante reporta o avanço da semana nos épicos do quadro GRC (projeto GRC no Jira)
- **Meu papel como PM:**
  - Poucas issues próprias no GRC
  - Toda issue GRC que exige código → direciono para um dev e gerencio a execução
- **Template:** [[Template - GRC Semanal]]
- **Notas salvas em:** `02 - Areas/Reuniões/`

---

## O que ainda falta mapear

- [ ] Como faço release notes (interna e externa)
- [ ] Fluxo de decisões de produto — quem participa, como documento
- [ ] Interação com CS/Suporte além do Slack
- [ ] Como priorizo o backlog (critérios, frameworks)
