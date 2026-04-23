---
title: Framework RICE de Priorização
date: 2026-04-20
tags:
  - resource
  - area/pm
  - product-management
  - prioritization
  - framework
aliases:
  - RICE
  - RICE Score
  - Priorização RICE
---

# Framework RICE de Priorização

> [!info] Origem
> Aprendido na [[article-of-the-day-2026-04-20]] (20/04/2026). Framework criado pelo time de produto do Intercom para tomar decisões de priorização mais objetivas e menos sujeitas a vieses organizacionais.

---

## O que é o RICE?

O RICE é um framework de pontuação para priorizar iniciativas de produto. O nome é um acrônimo de quatro variáveis:

- **R**each — Alcance
- **I**mpact — Impacto
- **C**onfidence — Confiança
- **E**ffort — Esforço

A fórmula:

```
RICE Score = (Reach × Impact × Confidence) ÷ Effort
```

Quanto maior o score, maior a prioridade. O objetivo não é produzir um número definitivo — é tornar o raciocínio explícito e comparável entre iniciativas.

---

## As quatro variáveis

### Reach (Alcance)
Quantos usuários ou clientes serão impactados em um período definido (tipicamente um trimestre)?

- Use dados reais sempre que possível: número de restaurantes ativos, usuários que usam determinado módulo, etc.
- Evite estimar "potencial" — estime o que você consegue atingir com a iniciativa como desenhada.

**Exemplo Repediu:** "Essa feature impacta os 1.200 restaurantes que já ativaram campanhas de WhatsApp."

---

### Impact (Impacto)
Qual o impacto esperado sobre o objetivo que você está perseguindo?

O Intercom usa uma escala qualitativa padronizada:

| Valor | Nível |
|---|---|
| 3 | Impacto massivo |
| 2 | Alto |
| 1 | Médio |
| 0,5 | Baixo |
| 0,25 | Mínimo |

> [!warning] Armadilha comum
> Superestimar impacto é o erro mais frequente. Se você não tem dados ou pesquisa que sustente "impacto massivo", comece com 1 (médio) e ajuste conforme aprende.

---

### Confidence (Confiança)
Qual é o seu nível de certeza sobre as estimativas de Reach e Impact?

| % | Significado |
|---|---|
| 100% | Muito confiante — dados fortes, pesquisa validada |
| 80% | Confiança alta — evidências razoáveis |
| 50% | Confiança média — hipótese plausível |
| 20% | Palpite — pouca ou nenhuma evidência |

Esse fator é o **antídoto ao entusiasmo**: força você a admitir quando uma ideia parece ótima mas ainda não tem evidência. É a principal diferença do RICE em relação ao ICE (que não separa Reach de Impact).

---

### Effort (Esforço)
Quantas *person-months* ou *person-weeks* são necessários para entregar a iniciativa? Inclua todos os perfis: produto, design, backend, frontend, QA.

> [!tip] Dica prática
> É o único fator que **divide** em vez de multiplicar — quanto maior o esforço, menor o score. Isso automaticamente favorece quick wins com impacto equivalente a projetos longos.

---

## Exemplo prático — contexto Repediu

| Iniciativa | Reach | Impact | Confidence | Effort (meses) | Score |
|---|---|---|---|---|---|
| Campanha automática de aniversário | 4.000 | 2 | 80% | 1,5 | **4.267** |
| Integração com novo PDV (nicho) | 300 | 3 | 50% | 4 | **112** |
| Melhoria no relatório de campanhas | 7.000 | 1 | 100% | 1 | **7.000** |

**Surpresa:** a melhoria no relatório — que parece entediante e "não estratégica" — tem o maior score porque alcança toda a base com esforço mínimo e alta confiança. Isso revela iniciativas subestimadas.

---

## Por que usar RICE?

Priorização ad hoc sofre de vieses sistêmicos que o RICE ajuda a combater:

- **HiPPO** (Highest Paid Person's Opinion) — a opinião do CEO não é um dado
- **Viés de novidade** — a última ideia sempre parece a melhor
- **Viés de ancoragem** — a primeira solução proposta domina a discussão
- **Solution bias** — times chegam à reunião com a solução pronta, buscando validação

O RICE não elimina esses vieses — mas **torna o raciocínio explícito e debatível**. Com scores documentados, você consegue dizer "escolhemos B em vez de A por esses motivos" em vez de "foi uma decisão da liderança".

---

## RICE vs. outros frameworks

| Framework | Variáveis | Melhor para |
|---|---|---|
| **RICE** | Reach, Impact, Confidence, Effort | Times com base de usuários grande e métricas de alcance disponíveis |
| **ICE** | Impact, Confidence, Ease | Priorização rápida, sem dados granulares de usuários |
| **WSJF** | Value, Time Criticality, Risk Reduction, Job Size | Times SAFe, projetos com dependências de tempo |
| **MoSCoW** | Must/Should/Could/Won't | Refinamento de escopo dentro de um projeto específico |

---

## Limitações importantes

> [!warning] Use como ponto de partida, não como árbitro final
> - É difícil comparar iniciativas de naturezas muito diferentes (UX vs. nova integração)
> - Números criam falsa sensação de objetividade — as premissas importam mais que o score
> - O Reach favorece features de base ampla vs. features estratégicas de nicho
> - Não captura valor estratégico de longo prazo (ex: uma integração com ARR alto mas alcance pequeno)

Quando o score RICE contradiz a intuição estratégica, **não ignore** — documente o trade-off explicitamente e escale a decisão para liderança com clareza.

---

## Como usar na prática

1. Liste as iniciativas candidatas em uma tabela
2. Estime cada variável para todas as iniciativas *antes* de calcular qualquer score (evita ancoramento)
3. Documente as premissas de cada estimativa
4. Calcule os scores e ordene
5. Revise os outliers — scores muito altos ou muito baixos em relação à intuição merecem debate
6. Decida conscientemente onde divergir do ranking e documente o motivo

---

## Referências e leituras complementares

- 📖 [RICE: Simple prioritization for product managers — Intercom Blog](https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers/) — artigo original
- 📖 [RICE and ICE Prioritization — Kaizenko](https://www.kaizenko.com/scoring-frameworks-ice-rice-and-weighted-scoring-for-product-prioritization/) — comparação entre frameworks
- 📖 [RICE Scoring Model — ProductPlan Glossary](https://www.productplan.com/glossary/rice-scoring-model/) — referência rápida

---

## Conexões no vault

- [[Métricas de Produto para PMs]] — contexto sobre outcomes vs. outputs e scorecard de produto
- [[Histórias de usuário]] — como escrever as iniciativas que entram no RICE
- [[guia-roadmap-jira-timeline]] — onde o RICE se encaixa no processo de roadmap
- [[article-of-the-day-2026-04-20]] — daily onde o RICE foi estudado pela primeira vez, com desafio prático
