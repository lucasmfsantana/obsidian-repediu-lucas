---
title: Meu Papel como PM
tags:
  - llm-context
  - business
updated: 2026-03-20
---

# Meu Papel como PM na Repediu

## Divisão de responsabilidades com o Fernando

O Fernando Nogarini é **founder e CEO** da Repediu — o produto nasceu da cabeça dele, então ele naturalmente lidera a frente de **novas funcionalidades estratégicas** com contexto histórico e visão de longo prazo que ninguém mais tem. Eu atuo mais como **PO operacional** — organizo o backlog, garanto que o trabalho está sendo feito e cuido de tudo que não é feature crítica nova.

### Escopo do Fernando (estratégico)
- Novas telas críticas (ex: telas do Paulo Valini em In Progress)
- Evolução do WhatsApp oficial como canal (issues do Renato)
- Machine learning e lógicas inteligentes para envio de mensagens (issues do Lemes)
- Tracking comportamental / Tracker Repediu (Vagner) — [[Tracker Repediu]]
- Decisões de produto de alto impacto
- Me inclui em calls de acompanhamento quando relevante

### Meu escopo (operacional + tático)
- **Bugs**: triagem, priorização e acompanhamento de correções
- **Melhorias em áreas menos críticas**: ajustes em telas existentes, UX fixes, melhorias pontuais
- **Integrações**: novas integrações com PDVs/ERPs/delivery e melhorias em integrações existentes (Cloudfy, PDV-Legal, GoCheff, etc.)
- **Governança e segurança**: alocar issues vindas de governança (GRC), compliance LGPD, migrações técnicas (ex: RPD-1820 endpoints N8N → API para o Raul)
- **Backlog management**: limpeza, organização, declined de issues obsoletas, refinamento
- **Release notes**: publicação semanal no #anuncio-produto
- **Suporte ao CS**: triagem de bugs reportados, workarounds, escalonamento para devs
- **Métricas de produto**: scorecard com 3 KPIs (DAU/MAU, retention rate, multi-canal) — ver [[Métricas de Produto para PMs]]

## Contexto atual (março/2026)

A Repediu está em fase de **migração da API de WhatsApp não-oficial (Evolution/Baileys) para a API oficial da Meta**. Isso causa instabilidade temporária em campanhas. Dois projetos em andamento para estabilizar:

1. **Fila de aprovação via RabbitMQ** — Campanhas irão para uma fila antes de serem enviadas para aprovação da Meta, respeitando rate limits por hora
2. **Limite semanal de envio com balanço inteligente** — Fernando e Lemes estão redesenhando para distribuir mensagens priorizando quem tem mais chance de comprar (substituindo o limite diário fixo da API não-oficial)

Previsão: 2-3 meses para todas essas funcionalidades estarem em produção e os problemas de campanha diminuírem significativamente.

## Responsabilidades detalhadas
- Gerenciar o backlog no Jira (priorização, refinamento, descrição de issues)
- Acompanhar o progresso dos devs diariamente
- Triar bugs reportados pelo suporte (real vs. ruído)
- Criar protótipos para features novas (no meu escopo)
- Escrever user stories com critérios de aceitação claros
- Ser ponto de decisão para dúvidas técnicas sobre features

## Ferramentas
- **Jira** — Kanban board e backlog (projeto RPD, sem sprints)
- **Slack** — comunicação com devs e suporte
- **WhatsApp Business** — parceiros tecnológicos
- **Obsidian** — notas, second brain, contexto
- **Claude / Cowork** — automação, prototipagem, escrita

## Projetos no Jira
- **RPD** — Repediu Kanban Board (backlog e dia a dia de produto)
- **GRC** — Governança, Risco e Compliance (épicos de segurança, compliance e processos)

## Fluxo Kanban no Jira (Repediu Kanban Board)
O time não usa Scrum/sprints. O fluxo é Kanban contínuo com as seguintes colunas:
1. **Backlog** — itens priorizados aguardando desenvolvimento
2. **Selected for Development** — próximos a serem puxados pelo dev
3. **In Progress** — em desenvolvimento ativo
4. **Code Review** — aguardando revisão de código
5. **Parking** — bloqueado ou pausado temporariamente
6. **Done** — concluído
7. **Declined** — recusado/descartado

Tipos de issue: Epic, Story, Task, Bug, Feature, Sub-task.
Transições são livres (qualquer status pode ir para qualquer outro).

## Como trabalho
- Manhã: e-mail → Slack (suporte + devs) → WhatsApp → Jira → refinamento
- Tarde: suporte contínuo aos devs e demandas do suporte
- Ver detalhes completos em [[Minha rotina como PM]]

## Estilo de escrita para user stories
- Formato: "Como [persona], quero [ação] para [benefício]"
- Critérios de aceitação com cenários "dado/quando/então"
- Sempre incluir contexto, objetivo e screenshots quando relevante
- Segurança mencionada quando envolve dados sensíveis
- Ver referência completa em [[Histórias de usuário]]
