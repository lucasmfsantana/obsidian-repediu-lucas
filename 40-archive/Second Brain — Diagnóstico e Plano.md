---
title: "Second Brain — Diagnóstico e Plano"
date: 2026-03-14
tags:
  - meta
  - organização
  - second-brain
aliases:
  - Plano de organização do vault
---

# Second Brain — Diagnóstico e Plano

Análise do vault atual e plano prático para transformá-lo em um Second Brain funcional usando o método **PARA** (Projects, Areas, Resources, Archive) adaptado ao Obsidian.

---

## 1. Diagnóstico do vault atual

### O que está bom

- **Daily notes** já são um hábito (10 notas em março) — isso é a base de qualquer Second Brain
- Uso de **wikilinks** para conectar notas ([[integrações]], [[WhatsApp API oficial]], etc.)
- Nota **[[Product Manager]]** funciona como um índice embrionário (MOC — Map of Content)
- **Frontmatter com tags e datas** nas dailies — consistente e buscável
- Plugins úteis já instalados (calendar, omnisearch)

### O que precisa melhorar

- **Tudo na raiz**: 18 arquivos soltos, sem pastas. Conforme o vault cresce, fica innavegável
- **Notas vazias**: `integrações.md` e `2026-03-13.md` estão em branco — geram ruído
- **Formatação inconsistente**: algumas dailies têm frontmatter completo, outras não têm nada (ex: `2026-03-11.md` e `2026-03-12.md`)
- **Tags subutilizadas**: só existe `#daily`. Não há tags por tema, status ou área
- **Sem templates**: cada daily note é criada do zero, por isso a inconsistência
- **Links externos sem contexto**: links para Jira e Notion aparecem soltos, sem explicação do que contêm
- **Pasta "Untitled" vazia** — lixo digital
- **Uma única MOC** ([[Product Manager]]) — e é só uma lista de links

---

## 2. Estrutura de pastas proposta (PARA)

```
📁 00 - Inbox
   (notas rápidas, rascunhos, capturas antes de processar)

📁 01 - Projects
   📁 Kanban e Roadmap
   📁 Release Notes
   📁 WhatsApp API oficial
   📁 Integrações
   (cada projeto ativo com início/fim claro)

📁 02 - Areas
   📁 Product Management
   📁 Repediu (empresa)
   📁 Certificações
   (responsabilidades contínuas, sem prazo)

📁 03 - Resources
   📁 Scrum e Agile
   📁 Prototipagem
   📁 User Stories
   📁 WhatsApp Business
   (referências e conhecimento para consulta)

📁 04 - Archive
   (projetos finalizados, notas que não são mais relevantes)

📁 Daily
   (daily notes — separadas para não poluir as outras pastas)

📁 Templates
   (templates de daily, projeto, reunião, etc.)

📁 Attachments
   (imagens e arquivos — ex: Pasted image...)
```

> [!tip] Regra simples
> Ao criar uma nota, pergunte: **isso é algo que estou fazendo agora (Project), uma responsabilidade contínua (Area), algo que quero aprender/consultar (Resource), ou algo que já encerrei (Archive)?**

---

## 3. Templates a criar

### Template — Daily Note

```markdown
---
date: {{date}}
tags:
  - daily
---

# {{date}}

## Foco do dia
-

## Registro
-

## Pendências
- [ ]

## Reflexões / Aprendizados

```

### Template — Nota de Projeto

```markdown
---
title:
date: {{date}}
tags:
  - project
status: active
area:
---

# {{title}}

## Objetivo


## Contexto


## Próximos passos
- [ ]

## Notas e decisões


## Links relacionados

```

### Template — Nota de Reunião

```markdown
---
date: {{date}}
tags:
  - meeting
participants:
related-project:
---

# Reunião — {{title}}

## Pauta


## Decisões


## Action items
- [ ]

```

> [!info] Como configurar
> Vá em **Settings → Core Plugins → Templates** e defina a pasta como `Templates`. Depois, use `Ctrl/Cmd + T` para inserir um template ao criar uma nota.

---

## 4. Sistema de tags recomendado

Usar **tags hierárquicas** para buscas rápidas:

| Tag | Uso |
|-----|-----|
| `#daily` | Daily notes |
| `#meeting` | Notas de reunião |
| `#project` | Nota raiz de projeto |
| `#project/whatsapp` | Projeto específico |
| `#project/integracoes` | Projeto específico |
| `#area/pm` | Área de Product Management |
| `#area/repediu` | Área da empresa |
| `#resource` | Material de referência |
| `#bug` | Registro de bugs |
| `#decision` | Decisões importantes |
| `#person/fernando` | Menções a pessoas-chave |
| `#status/active` | Em andamento |
| `#status/done` | Finalizado |

---

## 5. MOCs (Maps of Content) a criar

MOCs são notas-índice que organizam o vault por tema. Expanda a [[Product Manager]] e crie novas:

- **[[Product Manager]]** — já existe, mas enriquecer com contexto e sub-seções
- **[[MOC — Repediu]]** — tudo sobre a empresa: arquitetura, time, processos, decisões
- **[[MOC — WhatsApp Business]]** — consolidar tudo sobre API oficial, templates, BMs
- **[[MOC — Integrações]]** — lista de integradores, status, problemas conhecidos

---

## 6. Plugins recomendados

Plugins que já estão instalados: ✅ Calendar, ✅ Omnisearch, ✅ Recent Files

Plugins a considerar:

- **Templater** — templates com lógica (datas automáticas, prompts ao criar nota)
- **Dataview** — consultas dinâmicas tipo banco de dados (ex: "mostrar todas as tarefas pendentes das dailies")
- **Tasks** — gerenciamento de tarefas com datas, prioridades e queries entre notas
- **Periodic Notes** — weekly/monthly reviews além das dailies
- **QuickAdd** — captura rápida de ideias para o Inbox

---

## 7. Hábitos do Second Brain

> [!important] Os 3 hábitos que fazem o sistema funcionar

**Captura diária** — tudo que é relevante vai para o vault, nem que seja uma frase na daily. Se não capturar, perde.

**Processamento semanal** — uma vez por semana (sexta ou segunda), percorra o Inbox e as dailies da semana. Mova notas para a pasta certa, adicione links e tags, esvazie o Inbox.

**Review mensal** — uma vez por mês, revise os projetos: o que finalizou vai para Archive, o que está parado precisa de uma decisão (retomar ou arquivar).

---

## 8. Ações imediatas (por prioridade)

- [ ] Criar as pastas `Daily`, `Templates`, `Attachments`, `00 - Inbox`
- [ ] Criar os templates (daily, projeto, reunião) na pasta Templates
- [ ] Mover as daily notes para `Daily/`
- [ ] Mover `Pasted image...` para `Attachments/`
- [ ] Deletar pasta `Untitled` vazia
- [ ] Preencher ou deletar `integrações.md` (está vazia)
- [ ] Adicionar frontmatter nas notas que estão sem (2026-03-11, 2026-03-12)
- [ ] Criar `00 - Inbox` e começar a jogar rascunhos lá
- [ ] Instalar Templater e configurar a pasta de templates
- [ ] Agendar review semanal recorrente (sexta, 15 min)
