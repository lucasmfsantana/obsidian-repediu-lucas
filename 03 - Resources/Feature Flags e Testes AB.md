---
title: Feature Flags e Testes A/B
date: 2026-04-17
tags:
  - resource
  - area/pm
  - area/repediu
  - produto/analytics
  - produto/experimentacao
status: active
---

# Feature Flags e Testes A/B

Notas de estudo iniciadas em 17/04/2026. Tópicos explorados a partir dos recursos do Mixpanel e de referências da literatura de produto e engenharia. Complementa o trabalho em andamento em [[Mixpanel e Monitoramento de Produto]] e [[score-catboost-feature-store]].

---

## TL;DR — A diferença mais importante

> [!tip] Resumo executivo
> **Feature flags** controlam *releases* — são chaves liga/desliga para funcionalidades no código.
> **Testes A/B** medem *resultados* — são experimentos para decidir qual variante performa melhor.
> Os dois conceitos se complementam: flags entregam as variantes, testes medem o impacto.

---

## Parte 1 — Feature Flags

### O que são

Feature flags (também chamados de *feature toggles* ou *feature switches*) são uma técnica de engenharia que permite **ativar ou desativar funcionalidades sem fazer novo deploy de código**. A feature existe no código, mas fica "apagada" até que alguém ligue o interruptor — via dashboard, arquivo de configuração ou serviço remoto.

A ideia central é **separar o deploy do release**: você pode subir o código para produção hoje e lançar a feature para os usuários semana que vem, quando estiver pronta.

### Os 4 tipos principais

Segundo a taxonomia clássica de [Martin Fowler](https://martinfowler.com/articles/feature-toggles.html), existem quatro categorias:

#### 1. Release Flags (Flags de Lançamento)
- **Para que serve**: esconder funcionalidades inacabadas em produção
- **Duração**: curta (dias a semanas) — devem ser removidas após o lançamento
- **Exemplo na Repediu**: subir o novo módulo de score CatBoost sem ativá-lo para ninguém até a Feature Store estar pronta

#### 2. Experiment Flags (Flags de Experimento)
- **Para que serve**: rodar testes A/B — cada variante recebe um valor diferente da flag
- **Duração**: média (2–8 semanas) — removidas depois que o vencedor é escolhido
- **Exemplo na Repediu**: 20 restaurantes recebem a priorização por score; os demais continuam com o envio sequencial padrão

#### 3. Ops Flags (Flags Operacionais)
- **Para que serve**: controle de runtime em situações de incidente — o famoso *kill switch*
- **Duração**: longa — ficam no sistema como mecanismo de segurança
- **Exemplo**: desabilitar um módulo pesado de processamento se o banco de dados estiver sobrecarregado

#### 4. Permission Flags (Flags de Permissão)
- **Para que serve**: liberar funcionalidades para grupos específicos de usuários (beta users, planos premium, regiões geográficas)
- **Duração**: longa — representam regras de negócio permanentes
- **Exemplo na Repediu**: um módulo de relatório avançado disponível apenas para planos Enterprise

### Canary Deployment — a aplicação mais comum

O *canary deployment* é a estratégia de rollout progressivo habilitada por flags. Em vez de lançar para 100% dos usuários de uma vez, você aumenta a exposição gradualmente:

```
1% → 5% → 20% → 50% → 100%
```

Em cada etapa, você monitora métricas de erro, latência e comportamento. Se algo der errado, basta desligar a flag — sem rollback de código.

> [!warning] Armadilha mais comum: flags velhas
> Flags que não são removidas após cumprirem seu papel viram **dívida técnica**. Elas poluem o código, dificultam o debug e podem causar comportamentos inesperados. Boas práticas:
> - Defina um *owner* e uma *data de expiração* para cada flag no momento da criação
> - Faça revisões periódicas do inventário de flags ativas
> - Documente ops flags em runbooks para o time de plantão saber o que toglar em incidentes

### Server-side vs. Client-side

- **Server-side flags**: a decisão de qual variante mostrar acontece no servidor. Mais seguro — o usuário não tem acesso à lógica da flag.
- **Client-side flags**: a decisão acontece no cliente (browser/app). Mais rápido, mas expõe a existência das variantes — ruim para funcionalidades sensíveis ou inacabadas.

---

## Parte 2 — Testes A/B

### O que são

Teste A/B (também chamado de *split test*) é um método científico de comparar duas ou mais versões de uma experiência para determinar qual produz melhor resultado em uma métrica de interesse. É a aplicação do método experimental clássico ao produto digital.

- **Controle (A)**: a versão atual — o baseline
- **Tratamento (B)**: a variante com a mudança sendo testada
- **Randomização**: usuários são distribuídos aleatoriamente entre os grupos para garantir validade estatística

### Fundamentos estatísticos que todo PM precisa entender

#### p-valor e Significância Estatística
O **p-valor** mede a probabilidade de observar os resultados obtidos se a hipótese nula (de que não há diferença real entre A e B) for verdadeira.

- Convenção: **p < 0,05** = significância de 95% — o resultado provavelmente não é ruído
- Isso significa: existe menos de 5% de chance de observar esse resultado por puro acaso

> [!important] O p-valor não diz o que você pensa
> p < 0,05 não significa que B é melhor com 95% de certeza. Significa que **se não houvesse diferença real**, veríamos esses dados em menos de 5% dos casos. É sutil, mas importante.

#### Tamanho de Amostra (Sample Size)
Um dos erros mais comuns: encerrar o teste cedo demais ou com poucos usuários.

O tamanho de amostra necessário depende de três fatores:
1. **Taxa de conversão base**: qual é o % atual da métrica?
2. **Efeito mínimo detectável (MDE)**: qual melhoria mínima vale a pena detectar? (ex: quero detectar melhorias de ≥ 5%)
3. **Nível de confiança desejado**: normalmente 95%

Use uma calculadora de sample size antes de iniciar qualquer teste. Começar sem esse cálculo é o caminho mais rápido para conclusões erradas.

#### O Problema do Peeking (Espiar o Teste)
**Este é o erro mais comum e mais perigoso em times de produto.**

O *peeking problem* acontece quando você olha para os resultados do teste antes de atingir o tamanho de amostra planejado e toma decisões com base nesses dados parciais.

Por que é perigoso?

- Cada vez que você "espia" o teste e aplica o threshold de p < 0,05, você aumenta a taxa de falso positivo
- Se você checa o teste 10 vezes, o que você chama de 1% de significância na verdade tem uma taxa de erro de ~5%
- Equipes que param o teste assim que veem p < 0,05 encontram resultados "significativos" **30% das vezes** mesmo quando não há diferença real — 6x a taxa esperada de falso positivo

> [!danger] Regra de ouro
> Defina o tamanho da amostra antes de começar. Não olhe para os resultados com intenção de decidir antes de atingi-lo. Se precisar "espiar", use métodos de **Sequential Testing** que ajustam o threshold para múltiplas análises intermediárias.

### Processo de um bom teste A/B

```
0. A decisão está em aberto? 
1. Definir hipótese clara
   "Acreditamos que [mudança] vai [aumentar/diminuir] [métrica] porque [razão]"

2. Calcular sample size necessário antes de começar

3. Definir duração mínima (geralmente ao menos 1–2 semanas para capturar variação semanal)

4. Implementar o teste com randomização garantida

5. Aguardar atingir o sample size — não interromper antes

6. Analisar resultados com teste estatístico apropriado

7. Decidir: rollout, rollback ou novo teste

8. Documentar aprendizado independente do resultado
```

### Armadilhas comuns

- **Multiple comparisons**: testar muitas variantes ao mesmo tempo infla a taxa de falso positivo — use correção de Bonferroni ou ajuste o threshold
- **Novelty effect**: usuários às vezes interagem mais com qualquer coisa nova — aguardar mais tempo filtra esse efeito
- **SRM (Sample Ratio Mismatch)**: se a divisão A/B não ficou como planejada (ex: 50/50 virou 60/40), o teste foi comprometido — investigar antes de concluir
- **Métricas de vaidade**: medir cliques em vez de conversões reais — sempre ligar a métrica do teste ao resultado de negócio

---

## Parte 3 — Feature Flags e A/B no Mixpanel

### A proposta do Mixpanel (Experimentation 2.0)

Em 2025, o Mixpanel lançou o **Experimentation 2.0** com Feature Flagging nativo, unificando três camadas antes separadas:

```
Analytics (eventos, coortes, métricas) 
    + Feature Flags (controle de rollout) 
    + Experiments (medição de impacto)
= Tudo no mesmo lugar
```

A vantagem é que os experimentos usam os mesmos eventos, coortes e métricas que você já rastreia no Mixpanel — sem exportar dados ou sincronizar sistemas.

> [!note] Disponibilidade
> Experimentation 2.0 e Feature Flagging estão disponíveis nos planos **Enterprise** do Mixpanel.

### Como funcionam as Feature Flags no Mixpanel

Conceitos-chave:

- **Variants**: rótulos de experiência (ex: `control`, `variant_a`, `variant_b`)
- **Variant Splits**: distribuição de tráfego entre variantes (ex: 90%/10%)
- **Sticky Variants**: o mesmo usuário sempre recebe a mesma variante — evita experiências inconsistentes
- **Targeting por Cohort**: você pode segmentar quem recebe a flag. Em vez de "todos os usuários", define uma audiência comportamental (ex: "restaurantes que enviaram campanha nos últimos 30 dias")

### Como funcionam os Experiments no Mixpanel

O fluxo dentro da plataforma:

1. Criar ou selecionar um experimento
2. Definir grupos de controle e variante
3. Selecionar a **métrica primária** (ex: `conversion_registered`) e métricas secundárias
4. Definir o período de análise
5. O relatório de Experiment mostra o impacto de cada variante com rigor estatístico
6. Decidir qual variante fazer rollout via a própria flag

A grande sacada: **flags entregam as variantes, experiments medem o impacto**. São ferramentas complementares dentro do mesmo ecossistema.

---

## Parte 4 — Feature Flags vs. Testes A/B: quando usar cada um

| Dimensão | Feature Flag | Teste A/B |
|---|---|---|
| **Objetivo primário** | Controlar release | Medir resultado |
| **Quem usa mais** | Engenharia | Produto e Marketing |
| **Pergunta respondida** | "Essa feature está pronta para ir para X% dos usuários?" | "Qual variante performa melhor em Y métrica?" |
| **Horizonte** | Operacional (segurança de deploy) | Científico (aprendizado de produto) |
| **Resultado esperado** | Rollout seguro | Decisão baseada em dados |
| **Duração típica** | Horas a semanas | 1–8 semanas |

**Quando usar só Feature Flag:**
- Rollout progressivo sem comparação entre variantes
- Kill switch para funcionalidade em produção
- Liberar feature para um segmento específico (beta, plano premium)

**Quando usar só Teste A/B:**
- Comparar duas versões de uma UI
- Medir impacto de mudança de copy, preço ou fluxo
- Validar hipótese de produto com dados

**Quando usar os dois juntos (o caso mais comum em produto):**
- A flag controla quem recebe qual variante
- O experimento mede qual variante ganha
- Após decidir, a flag faz o rollout do vencedor para 100%

---

> [!information] Observação pessoal 
> Na Repediu, muitas vezes a decisão já vem tomada pelo CEO, só temos que aplicar ela. É muito raro a validação de hipóteses. Então, feature flag vai ser o mais útil, pois um teste precisa de uma hipótese que está verdadeiramente em aberto para ser validada, e isso muitas vezes não acontece. 
>
## Aplicação na Repediu

> [!example] Projeto CatBoost — um exemplo real
> O projeto de priorização por score de propensão usa exatamente essa combinação:
> - **Feature Flag**: ativa o modelo CatBoost apenas para os 20 restaurantes da amostra
> - **Teste A/B**: compara a semana antes vs. depois da ativação, usando `conversões / 100 mensagens enviadas` como métrica
> - **Validação futura via Mixpanel**: quando o RPD-1964 for implementado, o evento `conversion_registered` vai alimentar o dashboard do experimento diretamente
>
> Ver detalhes em [[score-catboost-feature-store]]
> 
> Obs: Essa seria a regra. Mas no dia a dia, o que vai acontecer é:
> - Nós vamos ficar olhando o experimento todo dia (peeking problem)
>  - Se em duas semanas não atingir o efeito, ou se atingir, já vamos querer parar ou rolloutar a base toda.

Outras oportunidades de aplicação na Repediu:

- **Novo onboarding flow**: flag libera para novos restaurantes, experiment mede tempo até primeira campanha
- **Variantes de template de mensagem**: A/B em copy de campanha, métrica = taxa de conversão
- **Novo módulo de segmentação**: flag para beta users, experiment mede engagement (campanhas criadas por restaurante/mês)

---

## Ferramentas do mercado (além do Mixpanel)

Para referência, as ferramentas mais usadas:

| Ferramenta | Foco principal |
|---|---|
| **Mixpanel Experiments** | Analytics + flags + experiments integrados |
| **LaunchDarkly** | Feature flags enterprise, muito robusto |
| **Statsig** | Flags + experimentos, foco em engenharia |
| **Flagsmith** | Open-source, boa integração com analytics |
| **Optimizely** | A/B testing focado em marketing/UX |
| **GrowthBook** | Open-source, foco em produto |

---

## Referências e Leituras

### Feature Flags
- 📖 [Feature Toggles — Martin Fowler](https://martinfowler.com/articles/feature-toggles.html) — a referência canônica, leitura obrigatória
- 📖 [Feature Flags 101 — LaunchDarkly](https://launchdarkly.com/blog/what-are-feature-flags/) — visão prática e acessível
- 📖 [The 12 Commandments Of Feature Flags — Octopus Deploy](https://octopus.com/devops/feature-flags/feature-flag-best-practices/) — boas práticas detalhadas
- 📖 [Feature Flagging, A/B Testing & Canary Releases Explained — Chaordic](https://chaordic.io/blog/feature-flagging-a-b-testing-canary-releases-explained/) — os três conceitos juntos

### Testes A/B e Estatística
- 📖 [How Not To Run an A/B Test — Evan Miller](https://www.evanmiller.org/how-not-to-run-an-ab-test.html) — artigo clássico sobre o peeking problem
- https://www.evanmiller.org/ab-testing/sample-size.html - Calculadora do Evan Miller para sample size
- https://www.calculator.net/sample-size-calculator.html - Outra calculadora (mais fácil) de sample size
- 📖 [A/B Testing: Avoiding the Peeking Problem — GoPractice](https://gopractice.io/data/peeking-problem/) — explicação acessível para PMs
- 📖 [A/B Tests Guide for Product Managers — GoPractice](https://gopractice.io/product/ab-tests-guide-for-product-managers/) — guia completo
- 📖 [Statistical Significance in A/B Testing — Statsig](https://www.statsig.com/perspectives/statistical-significance-ab-testing) — fundamentos estatísticos

### Mixpanel
- 📖 [Introducing Experimentation 2.0 + Feature Flagging — Mixpanel Blog](https://mixpanel.com/blog/mixpanel-experimentation-feature-flags/) — anúncio oficial e visão do produto
- 📖 [Feature Flags Docs — Mixpanel](https://docs.mixpanel.com/docs/featureflags) — documentação técnica
- 📖 [Experiments Docs — Mixpanel](https://docs.mixpanel.com/docs/experiments) — documentação técnica
- 📖 [Why Feature Flags and Product Analytics Are Better Together — Mixpanel](https://mixpanel.com/blog/feature-flags-and-product-analytics-working-together/)

---

## Conexões no Vault

- [[Mixpanel e Monitoramento de Produto]] — contexto geral de analytics na Repediu
- [[score-catboost-feature-store]] — projeto ativo que usa feature flag + teste A/B
- [[Métricas de Produto para PMs]] — scorecard de KPIs que as métricas dos experimentos devem alimentar
- [[Framework - Quando e Como Fazer um Teste AB]] - Um framework para tomada de decisão se vale ou não fazer um teste A/B
