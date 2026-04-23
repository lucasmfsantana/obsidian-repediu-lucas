---
title: Métricas de Produto para PMs
date: 2026-03-16
tags:
  - resource
  - area/pm
  - metrics
  - scorecard
aliases:
  - Product Metrics
  - KPIs de Produto
  - Scorecard PM
---

# Métricas de Produto para PMs

> [!info] Contexto
> Pesquisa feita para preparar o scorecard de Produto da Repediu, após o [[2026-03-16 War Room 2-6|War Room (2/6)]] onde Fernando pediu 3-4 indicadores-chave por líder com histórico de 6 meses. Este documento serve como referência permanente.

---

## Pessoas referência e o que ensinam

### Marty Cagan (SVPG)
Autor de *Inspired* e *Transformed*. A mensagem central: **meça outcomes, não outputs**. Equipes de produto empoderadas recebem problemas para resolver (não features para construir) e são cobradas por resultados. O "Product Scorecard" dele propõe que o PM seja dono de métricas de impacto do produto no negócio, não de velocidade de entrega.

> "Unsuccessful product teams are feature factories, with little regard for whether the features actually solve the underlying business problems. Progress for them is measured by output and not outcome."

### Melissa Perri
Autora de *Escaping the Build Trap*. O "build trap" é quando a empresa mede sucesso por features entregues em vez de valor gerado. Para escapar: investir em estratégia de produto clara, processo de discovery baseado em hipóteses, e organização orientada a outcomes. Exemplo prático: na meal kit delivery service, descobriram que o drop-off acontecia no campo de endereço — corrigir isso teve mais impacto que qualquer feature nova.

### Teresa Torres
Autora de *Continuous Discovery Habits*. Criou a **Opportunity Solution Tree** que separa claramente:
- **Business outcomes** → métricas financeiras (receita, churn, market share)
- **Product outcomes** → comportamento do usuário no produto ou sentimento
- **Traction metrics** → adoção de uma feature específica

A recomendação dela: o PM deve focar em **product outcomes**, porque são diretamente influenciáveis pelo time. Business outcomes são consequência.

### Roman Pichler
Criou o **Balanced Product Scorecard** com 5 dimensões: financeiro, cliente, produto, processo e pessoas. A ideia é que nenhuma dimensão sozinha conta a história completa. Equilibrar evita o risco de otimizar receita enquanto a satisfação do cliente despenca.

### Lenny Rachitsky
Ex-PM do Airbnb, escreve a newsletter de produto mais lida do mundo (700K+ assinantes). Defende que as métricas certas dependem do modelo de negócio (subscription, freemium, marketplace, ad-based, DTC). Para SaaS B2B com modelo subscription: **activation rate, retention, NRR e feature adoption** são as mais importantes.

### Google UX Research Team
Criou o **HEART Framework**: Happiness, Engagement, Adoption, Retention, Task Success. Para cada dimensão, você define Goals → Signals → Metrics. É especialmente útil para medir qualidade de UX de forma estruturada.

---

## Frameworks de métricas

### 1. North Star Metric (NSM)

Uma **única métrica** que captura o valor central que o produto entrega ao cliente. Não é receita — é o comportamento que, quando acontece, indica que o cliente está recebendo valor.

**Exemplos por tipo de empresa:**

| Empresa       | NSM                  | Por quê                           |
| ------------- | -------------------- | --------------------------------- |
| Airbnb        | Nights Booked        | Captura valor para hóspede + host |
| Slack         | Daily Messages Sent  | Indica engajamento real da equipe |
| Spotify       | Time Spent Listening | Mede entretenimento entregue      |
| HubSpot       | Weekly Active Teams  | Captura adoção multi-usuário      |
| Food Delivery | Happy Deliveries     | Entregas sem problema = retenção  |

A NSM é alimentada por **input metrics** que o time pode influenciar diretamente (ex: para "Nights Booked", inputs são busca, conversão de booking, qualidade da listagem).

### 2. HEART Framework (Google)

| Dimensão | O que mede | Exemplo de métrica |
|---|---|---|
| **H**appiness | Satisfação subjetiva | NPS, CSAT, survey |
| **E**ngagement | Profundidade de uso | Sessões/semana, features usadas/sessão |
| **A**doption | Novos usuários/features | % de base usando feature nova em 30 dias |
| **R**etention | Retorno ao produto | Retenção D7, D30, cohort retention |
| **T**ask Success | Eficiência nas tarefas | Taxa de conclusão, tempo para completar |

### 3. AARRR (Pirate Metrics)

Funil de ciclo de vida: **Acquisition → Activation → Retention → Revenue → Referral**. Útil para identificar onde o funil quebra.

### 4. Opportunity Solution Tree (Teresa Torres)

Estrutura em árvore:
```
Outcome desejado (product outcome)
├── Oportunidade 1 (necessidade do cliente)
│   ├── Solução A → Teste de hipótese
│   └── Solução B → Teste de hipótese
└── Oportunidade 2
    └── Solução C → Teste de hipótese
```

O PM define o **product outcome** no topo e deixa o time explorar oportunidades e soluções.

### 5. Balanced Product Scorecard (Roman Pichler)

5 dimensões equilibradas:

| Dimensão   | Foco                    | Exemplo de KPI                 |
| ---------- | ----------------------- | ------------------------------ |
| Financeiro | Receita e custo         | MRR, CAC, LTV                  |
| Cliente    | Satisfação e lealdade   | NPS, churn rate, CSAT          |
| Produto    | Qualidade e usabilidade | Feature adoption, task success |
| Processo   | Eficiência operacional  | Lead time, cycle time          |
| Pessoas    | Saúde do time           | Satisfação do time, turnover   |

---

## Benchmarks B2B SaaS (2025-2026)

> [!tip] Referência para calibrar metas

| Métrica                                                | Mediana | Top 10% |
| ------------------------------------------------------ | ------- | ------- |
| Activation rate                                        | 33%     | 65%+    |
| Core feature adoption                                  | 25%     | —       |
| Free trial → paid conversion                           | 25%     | 39%+    |
| Net Revenue Retention (NRR)                            | 106%    | 120%+   |
| Gross Revenue Retention (GRR)                          | 90%     | 95%+    |
| First-year retention uplift com onboarding estruturado | —       | +25%    |

---

## Scorecard definitivo de Produto — métricas para o Fernando

> [!success] Decisão final (2026-03-17)
> Após divergir com HEART e North Star, convergi nas 3 métricas que vou apresentar e acompanhar com o Fernando. Essas ficam fixas no scorecard.

| # | Métrica | Dimensão HEART | O que revela | Medível hoje? |
|---|---|---|---|---|
| 1 | **DAU/MAU ratio** (stickiness) | Engagement | Se o produto é indispensável no dia a dia do restaurante. Benchmark SaaS B2B: 13–24%. | ✅ Amplitude já tem |
| 2 | **Retention Rate** (return on) | Retention | Se os restaurantes continuam voltando mês a mês. Curva de retenção por cohort (D7, D30, D90). | ✅ Amplitude já tem |
| 3 | **Clientes ativos com campanhas ativas em 2+ canais** | Adoption | Se estamos conseguindo expandir o uso multi-canal. Dado que 83% da base ainda usa só 1 canal, o upside é enorme. | ✅ Dados disponíveis |

> [!warning] Por que essas 3 e não outras
> - **DAU/MAU** é a métrica mais simples de explicar para a diretoria e mostra engajamento real.
> - **Retention Rate** conecta diretamente com MRR — restaurante que não volta, cancela.
> - **Multi-canal** é a alavanca estratégica da Repediu: dados mostram que quem usa 2+ canais converte mais.

---

## O princípio que une tudo

> [!warning] Output ≠ Outcome
> Número de features entregues, issues fechadas e story points completados **não são métricas de produto**. São métricas de processo. O PM deve medir o **impacto** do que foi entregue, não a entrega em si.

A pergunta-chave: **"Se essa métrica mover amanhã, o time saberia por que e o que fazer?"** Se a resposta é não, a métrica está adicionando ruído, não insight.

---

## Leitura recomendada

> [!example] Para ler com calma — ordenado por prioridade

### Essenciais (ler primeiro)

1. [Amplitude — North Star Playbook](https://amplitude.com/books/north-star/about-north-star-framework) — Guia completo do framework North Star. Ensina a encontrar a NSM, definir input metrics e alinhar o time. Grátis, ~30 min de leitura.
2. [Lenny Rachitsky — Choosing Your North Star Metric](https://www.lennysnewsletter.com/p/what-is-a-north-star-metric) — Post clássico com exemplos por modelo de negócio (subscription, marketplace, freemium). Direto ao ponto.
3. [Teresa Torres — Opportunity Solution Trees](https://www.producttalk.org/opportunity-solution-trees/) — Como separar outcomes de outputs e estruturar discovery. Muda a forma de pensar priorização.

### Frameworks e scorecards

4. [Roman Pichler — Balanced Product Scorecard](https://www.romanpichler.com/blog/balanced-product-scorecard-template/) — Template das 5 dimensões. Bom para não ficar preso só em métricas financeiras.
5. [SVPG — The Product Scorecard (Marty Cagan)](https://www.svpg.com/the-product-scorecard/) — Visão do Cagan sobre como medir desempenho de times de produto empoderados.
6. [Google HEART Framework](https://research.google/pubs/measuring-the-user-experience-on-a-large-scale-user-centered-metrics-for-web-applications/) — Paper original do Google sobre Happiness, Engagement, Adoption, Retention, Task Success.

### Benchmarks e dados

7. [Userpilot — SaaS Product Metrics Benchmark 2025](https://userpilot.com/saas-product-metrics/) — Relatório com benchmarks reais de activation, adoption, retention para B2B SaaS. Útil para calibrar metas.
8. [ProductLed — PLG Benchmarks](https://productled.com/blog/product-led-growth-benchmarks) — Dados de product-led growth com segmentação por tipo de empresa.
9. [Userlens — Retention Benchmarks for B2B SaaS 2025](https://userlens.io/blog/retention-benchmarks-for-b2b-saas-in-2025) — Foco em retenção, NRR e GRR.

### Artigos complementares

10. [Atlassian — Product Management KPIs](https://www.atlassian.com/agile/product-management/product-management-kpis) — Visão geral de 16 KPIs com explicação prática.
11. [Airtable — 25 Key Product Management Metrics](https://www.airtable.com/articles/product-management-metrics) — Lista ampla para divergir e depois convergir.
12. [Plane — Product Metrics That Matter in 2026](https://plane.so/blog/product-metrics-that-matter-in-2026) — Perspectiva atualizada com foco em métricas mapeadas à jornada do usuário.

### Livros (para aprofundar quando tiver tempo)

- **Inspired** — Marty Cagan. A bíblia de product management. Capítulos sobre discovery e métricas são os mais relevantes.
- **Escaping the Build Trap** — Melissa Perri. Sobre como parar de medir features e começar a medir valor.
- **Continuous Discovery Habits** — Teresa Torres. Framework prático para discovery semanal.

---

## Links internos do vault

- [[Meu Papel como PM]] — contexto do meu trabalho
- [[Minha rotina como PM]] — rotina diária
- [[Histórias de usuário]] — como escrevo specs
