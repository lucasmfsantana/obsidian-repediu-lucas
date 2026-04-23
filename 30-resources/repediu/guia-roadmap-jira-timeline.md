---
title: "Guia: Roadmap de Produto com Jira Timeline"
date: 2026-04-07
tags:
  - resource
  - area/pm
  - area/repediu
---

# Guia: Roadmap de Produto com Jira Timeline

Guia completo para entender como líderes de produto organizam roadmaps e como traduzir isso para o Jira Timeline.

---

## Parte 1 — Conceitos Fundamentais de Roadmap

### O que é um roadmap de produto?

Roadmap é uma ferramenta de comunicação estratégica. Não é uma lista de features, não é um cronograma de projeto, e não é um compromisso de entrega com datas fixas. É um documento vivo que responde: **"por que estamos construindo isso e em que ordem?"**

O erro mais comum de PMs menos experientes é tratar o roadmap como um Gantt de engenharia. O roadmap é para alinhar stakeholders sobre direção; o backlog é para alinhar engenharia sobre execução.

### Três tipos de roadmap que todo PM precisa conhecer

#### 1. Roadmap baseado em Temas (Theme-Based)

Organiza o trabalho por **problemas a resolver** ou **objetivos estratégicos**, não por features específicas. Cada tema é um pilar amplo (ex: "Melhorar experiência de canais") que contém épicos por baixo.

**Quando usar:** comunicação com C-level, board, investidores. É o formato mais estratégico.

**Vantagem:** flexibilidade. Se uma solução não funcionar, o tema continua válido e o time pode pivotar.

**Desvantagem:** stakeholders técnicos podem achar vago demais.

> [!tip] Nosso roadmap da Repediu já usa esse modelo
> Os 5 pilares (Plataforma & Fundação, Dados & Inteligência, Campanhas & Conteúdo, Mídia Paga & Growth, Jornadas & CRM) são temas. Dentro de cada tema temos épicos com iniciativas específicas. Isso está correto.

#### 2. Roadmap baseado em Features (Feature-Based)

Lista funcionalidades específicas com datas de início e fim. É o mais detalhado e o mais "perigoso" — porque cria expectativa de entrega que pode não se cumprir.

**Quando usar:** planejamento de engenharia, sprint planning, comunicação com o time de dev. É o que o Jira Timeline mostra naturalmente.

**Vantagem:** clareza total sobre o que será construído.

**Desvantagem:** rigidez. Se algo muda, todo o roadmap precisa ser refeito.

#### 3. Now / Next / Later

Organiza o trabalho em três horizontes de tempo sem datas específicas:

- **Now:** o que estamos construindo agora (comprometido)
- **Next:** o que vem depois (planejado, mas pode mudar)
- **Later:** o que queremos fazer eventualmente (ideias, sem compromisso)

**Quando usar:** times ágeis que querem evitar datas fixas. Muito usado em Kanban.

**Vantagem:** honesto sobre incerteza. O "Later" é um horizonte, não uma promessa.

**Desvantagem:** stakeholders que precisam de datas ficam frustrados.

### Qual usar? Use os três juntos.

A prática recomendada é ter **camadas de roadmap**:

| Camada | Audiência | Formato | Detalhe |
|---|---|---|---|
| Estratégico | C-level, investidores | Temas + Now/Next/Later | Pilares e direção |
| Tático | PMs, Tech Leads | Temas → Épicos com trimestres | Épicos agrupados por pilar |
| Operacional | Devs, design | Features no Jira Timeline | Issues com datas no board |

A camada que você vai montar no Jira Timeline é a **operacional** — a mais granular, derivada das duas acima.

---

## Parte 2 — Como o Jira Timeline funciona

### Hierarquia de issues

O Jira Timeline exibe **dois níveis** de hierarquia:

```
Epic (barra principal no timeline)
├── Story
├── Task
├── Bug
└── (subtasks NÃO aparecem no timeline)
```

Ou seja: **Épicos são cidadãos de primeira classe no Timeline.** Tudo que você quer visualizar como uma barra no Gantt precisa ser um Épico.

> [!warning] Importante
> Subtasks não aparecem no Timeline. Se você tem work items importantes que são subtasks, promova-os a tasks.

### Campos de data

O Timeline usa dois campos para posicionar as barras:

- **Start date** — quando o trabalho começa (campo customizado, precisa estar habilitado)
- **Due date** — quando o trabalho termina

Se o épico não tem datas definidas, o Jira pode **inferir automaticamente** a partir das datas dos child issues (stories/tasks dentro do épico). Isso é chamado de "roll-up".

> [!info] Duas abordagens para datas
> **Top-down:** você define start/due date no Épico e o time trabalha dentro da janela.
> **Bottom-up:** você define datas nas stories e o Épico herda automaticamente.
> Para roadmap, use top-down nos épicos e deixe o time gerenciar datas das stories.

### Releases / Versions

Releases são **marcos verticais** no Timeline que indicam pontos de entrega. Na imagem que você me mostrou, aparecem como "2026-03..." e "2026-04-01".

Para usar releases:

1. Vá em **Project Settings → Releases** (ou Versions)
2. Crie uma release com nome e data
3. Associe épicos/issues à release
4. A release aparece como linha vertical no Timeline

**Dica:** use releases para marcar marcos do roadmap, não necessariamente deploys. Ex: "Lançamento Canal E-mail", "GA Tracker", "Campanha 2.0 Pronta".

### Filtros e Views

O Timeline suporta filtros por:

- **Epic** — mostrar apenas épicos específicos
- **Label** — filtrar por tag (ex: `pilar:plataforma`, `pilar:dados`)
- **Type** — filtrar por tipo de issue
- **Status category** — To Do, In Progress, Done
- **Assignee** — filtrar por dev/squad
- **Version/Release** — filtrar por release

> [!tip] Dica de ouro
> Use **labels** para representar os pilares do roadmap (ex: `pilar:plataforma`, `pilar:campanhas`). Assim você pode filtrar o Timeline por pilar e mostrar diferentes visões para diferentes stakeholders.

### Child Issue Planning (Kanban)

Para times Kanban (como o nosso), o planejamento de child issues no Timeline precisa ser habilitado manualmente:

1. Vá no Timeline
2. Clique em **View settings** (ícone de engrenagem)
3. Habilite **Child issue planning**

Isso permite ver stories e tasks dentro dos épicos como barrinhas menores.

---

## Parte 3 — Como líderes de produto organizam o roadmap

### O fluxo Strategy → Discovery → Delivery

```
Visão/Estratégia → Temas → Épicos → Stories → Sprint/Board
      ↑                                           |
      └── Feedback/Métricas ←──────────────────────┘
```

Bons PMs não começam pelo backlog. Começam pela estratégia e descem:

1. **Visão** — onde queremos estar em 12-18 meses
2. **Temas** — quais problemas precisamos resolver pra chegar lá
3. **Épicos** — quais iniciativas endereçam esses temas
4. **Stories** — como quebramos cada épico em trabalho executável

Observação da leitura:  Preciso avaliar e listar tudo que o Fernando quer criar e somar com a visão dele de querer afastar a concorrência, mudar a visão de que Repediu é só CRM e subir frentes de Analytics e Marketing, assim terei a visão. Para criar os temas eu posso seguir o que o Fernando criou de temas. A minha maior dúvida é em relação a épicos e Stories, hoje não quebramos um epico em muitas stories, as vezes tenho épico com apenas uma story dentro. 

### Princípios de um bom roadmap

**1. Outcomes sobre outputs**
Não é "Construir landing pages". É "Permitir que restaurantes capturem leads por mídias pagas". A feature é um meio, não um fim.

**2. Time horizons decrescentes em detalhe**
- Q atual: épicos detalhados, stories escritas, devs alocados
- Q+1: épicos definidos, stories em rascunho, sem alocação fixa
- Q+2 em diante: temas e épicos conceituais, sem stories ainda

**3. Dependências explícitas**
Se "Segmentação por eventos" depende de "Tracker", isso precisa estar visível. No Jira, use **issue links** (tipo "is blocked by") para mapear dependências.

**4. Capacidade é realidade, não desejo**
O roadmap precisa respeitar a capacidade do time. Não adianta colocar 20 épicos no Q2 se você tem 4 devs. O Fernando lá no início criou um roadmap de desejo; nós enriquecemos com capacidade real. Essa é a diferença entre um roadmap de PM junior e um de PM senior.

**5. Comunicação em camadas**
Stakeholder diferente = view diferente do mesmo roadmap:
- Fernando (CTO): Timeline completo com todos os épicos e devs
- Diretoria: Pilares + marcos trimestrais
- Time de dev: Board do sprint derivado dos épicos

### Anti-patterns comuns

- **"Roadmap de promessas"** — colocar datas exatas para features que ainda não foram investigadas
- **"Roadmap de shopping list"** — 50 itens sem priorização, tudo é importante
- **"Roadmap estático"** — criar uma vez e nunca atualizar
- **"Roadmap sem trade-offs"** — não explicitar o que NÃO vai ser feito
- **"Roadmap sem capacidade"** — ignorar quantas pessoas existem pra entregar

---

## Parte 4 — Como traduzir nosso roadmap pro Jira Timeline

### Estrutura recomendada para a Repediu

```
Labels (pilares):
├── pilar:plataforma
├── pilar:dados
├── pilar:campanhas
├── pilar:midia-paga
└── pilar:jornadas

Épicos (cada iniciativa do roadmap vira um Épico):
├── [pilar:plataforma] Hardening Auth/Autorização
├── [pilar:plataforma] Migração N8N → API
├── [pilar:dados] Tracker Repediu          ← já existe como RPD-1860
├── [pilar:dados] Segmentação por Eventos
├── [pilar:campanhas] Reconstrução Criação de Campanha
├── [pilar:campanhas] Canal E-mail
├── [pilar:campanhas] Push In-App
│   ...etc

Releases (marcos):
├── 2026-Q2 Foundation     → segurança + infra pronta
├── 2026-Q2 Campaigns 2.0  → nova tela de campanha + e-mail
├── 2026-Q3 Channels       → RCS + QR Code + templates
├── 2026-Q4 AI             → IA campanhas + segmentação
├── 2027-Q1 Paid Media     → anúncios + LPs mídias pagas
```

### Passo a passo para montar no Jira

1. **Criar os Labels** — adicionar os 5 labels de pilar no projeto RPD
2. **Promover iniciativas a Épicos** — cada item do roadmap que ainda não é épico precisa virar um (alguns já existem, como RPD-1860 Tracker)
3. **Definir start/due dates nos Épicos** — usar as datas do nosso roadmap comprimido
4. **Associar labels de pilar** — cada épico recebe o label do pilar correspondente
5. **Criar Releases** — marcos trimestrais que agrupam entregas
6. **Configurar o Timeline** — habilitar child issue planning, filtrar por label
7. **Mapear dependências** — usar issue links "is blocked by" entre épicos dependentes

### O que já existe vs o que precisa ser criado

| Iniciativa | Épico no Jira? | Ação |
|---|---|---|
| Tracker Repediu | RPD-1860 (Feature) | Promover a Epic ou usar como está |
| Hardening Auth | Não (tasks soltas) | Criar Epic e linkar tasks existentes |
| Migração N8N → API | RPD-1845 (Epic) | Já existe, ajustar datas |
| Migração RabbitMQ | RPD-1845 (mesmo epic?) | Verificar se precisa epic separado |
| Reconstrução Campanha | RPD-1780 (Story) | Promover a Epic |
| Canal E-mail | RPD-1324 (Epic) | Já existe, ajustar datas |
| Push In-App | Não | Criar Epic |
| Segmentação por Eventos | Não | Criar Epic |
| IA Campanhas | Não | Criar Epic |
| Reconstrução Jornadas | Não | Criar Epic |
| Nekt/Athena (~20 telas) | RPD-1325 (Epic) | Já existe, ajustar scope |
| QR Code | Não | Criar Epic |
| Landing Pages | Não | Criar Epic |
| Templates Prontos | Não | Criar Epic |
| Torpedo de Voz | RPD-1323 (Epic) | Já existe |
| Mídia Paga (anúncios) | Não | Criar Epic |
| Divisão estratégica | Não | Criar Epic |

---

## Parte 5 — Referências para aprofundar

### Leitura essencial

- [Plan Ahead: Master Timelines in Jira (Atlassian)](https://www.atlassian.com/software/jira/guides/basic-roadmaps/overview) — guia oficial e definitivo do Timeline
- [Master Planning with Jira Advanced Roadmaps (Atlassian)](https://www.atlassian.com/software/jira/guides/advanced-roadmaps/overview) — se você tiver Premium, esse é o próximo nível
- [Schedule parent work items on your timeline (Atlassian Support)](https://support.atlassian.com/jira-software-cloud/docs/add-issues-to-epics-on-the-roadmap/) — como funcionam datas e roll-up
- [Enable child issue planning for Kanban (Atlassian Support)](https://support.atlassian.com/jira-software-cloud/docs/enable-child-issue-planning-for-kanban-teams-on-the-roadmap/) — essencial para times Kanban como o nosso
- [Timeline limits in Jira (Atlassian Support)](https://support.atlassian.com/jira-software-cloud/docs/set-up-the-roadmap/) — limites e configurações

### Conceitos de roadmap

- [What is a Theme-Based Roadmap? (ProductPlan)](https://www.productplan.com/learn/theme-based-roadmap/) — entender roadmap por temas
- [Feature-less Roadmap (Amplitude)](https://amplitude.com/blog/feature-less-roadmap) — por que não listar features
- [Theme-Based Roadmaps Everyone Can Understand (ProdPad)](https://www.prodpad.com/blog/how-to-build-a-product-roadmap-everyone-understands/) — como comunicar com stakeholders

### Jira Timeline vs alternativas

- [Jira Roadmaps vs Timelines (Medium)](https://medium.com/@darcydeclute/jira-roadmaps-vs-timelines-whats-the-difference-b93c8ca6d756) — diferença entre os dois módulos
- [Jira Advanced Roadmaps vs Timeline (Visor)](https://www.visor.us/blog/jira-timeline-advanced-roadmaps/) — comparativo completo
- [How to Create and Manage a Product Roadmap in Jira (Community)](https://community.atlassian.com/forums/App-Central-articles/How-to-Create-and-Manage-a-Product-Roadmap-in-Jira/ba-p/2598278) — passo a passo da comunidade

### Vídeos recomendados para buscar

- "Jira Timeline tutorial 2025/2026" no YouTube
- "Product roadmap masterclass" — Lenny's Podcast
- "How to build a roadmap" — Shreyas Doshi (Twitter/X threads)
