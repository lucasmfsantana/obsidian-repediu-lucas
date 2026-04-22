---
title: "Framework: Quando e Como Fazer um Teste A/B"
date: 2026-04-18
tags:
  - resource
  - area/pm
  - area/repediu
  - produto/analytics
  - produto/experimentacao
status: active
---

# Framework: Quando e Como Fazer um Teste A/B

Guia prático para decidir se um teste A/B vale a pena e como executá-lo corretamente. Complementa [[Feature Flags e Testes AB]] e o contexto de analytics em [[Mixpanel e Monitoramento de Produto]].

---

## Parte 1 — Devo fazer um teste A/B?

Antes de qualquer configuração técnica, três perguntas precisam ser respondidas. Se qualquer uma tiver resposta negativa, o teste provavelmente não é o caminho certo.

### Pergunta 1: Existe uma hipótese clara?

Teste A/B não é uma ferramenta de exploração de dados — é uma ferramenta de **confirmação ou refutação de hipótese**. A exploração vem antes, como etapa de diagnóstico. O teste vem depois, quando já existe uma direção clara a validar.

Uma hipótese bem formada segue o formato:

> "Acreditamos que **[mudança específica]** vai **[aumentar / diminuir]** **[métrica concreta]** porque **[raciocínio]**."

Sem conseguir completar essa frase, o teste não tem objeto definido — e qualquer resultado será difícil de interpretar.

> [!example] Exemplos
> ✅ "Acreditamos que exibir o número de itens no carrinho no botão de checkout vai aumentar a taxa de conclusão de compra porque reduz a incerteza do usuário antes de avançar."
> ❌ "Vamos testar a nova tela de checkout para ver o que acontece."

### Pergunta 2: O volume de dados é suficiente?

Essa é a pergunta mais frequentemente ignorada — e a que mais invalida experimentos. Um teste encerrado antes de atingir o tamanho de amostra necessário não produz conclusões confiáveis, independentemente do p-valor observado.

O cálculo de viabilidade segue três passos:

**Passo 1 — Medir a taxa de conversão atual**

A taxa base é o ponto de partida do cálculo. Ela deve ser medida como:

```
Taxa base = nº de vezes que o evento ocorreu
            ÷ nº de usuários que tiveram oportunidade de realizá-lo
```

O denominador correto é **o conjunto de usuários que chegaram ao ponto onde o evento poderia acontecer** — não a base total de usuários ativos. Se o teste mede o clique em um botão de uma tela específica, o denominador é quem abriu aquela tela, não quem acessou o produto no período.

Usar um denominador mais amplo do que o necessário dilui a taxa base artificialmente, infla o sample size calculado e pode levar à conclusão equivocada de que o teste é inviável.

> [!tip] Usuários ativos vs. usuários relevantes
> Para o cálculo de sample size, a population correta é composta por usuários ativos **que têm chance real de realizar o evento medido** no período do teste. Usuários inativos ou fora do escopo do experimento não devem entrar no denominador.

**Passo 2 — Definir o MDE (Mínimo Efeito Detectável)**

O MDE é a menor melhoria relativa que justificaria implementar a mudança. A pergunta a responder é: "Abaixo de que ganho eu não faria essa mudança de qualquer forma?"

Calibrar o teste para detectar efeitos menores do que o MDE real exige amostras maiores e prazos mais longos sem nenhum benefício prático.

**Passo 3 — Calcular o sample size**

Com a taxa base e o MDE definidos, calcular o tamanho de amostra necessário usando uma calculadora estatística — como a [Evan Miller Sample Size Calculator](https://www.evanmiller.org/ab-testing/sample-size.html) — com nível de confiança de 95%.

Se o resultado exigir mais usuários do que a base relevante disponível dentro do prazo, **o teste não é viável**. Nesse caso, a alternativa é um rollout progressivo com feature flag e monitoramento de guardrails.

### Pergunta 3: A decisão ainda está em aberto?

Um teste A/B só faz sentido quando o resultado tem poder real de mudar a decisão. Se a mudança já foi decidida por razões estratégicas, contratuais ou regulatórias, o esforço de experimentação não se justifica — o correto é monitorar o impacto após o lançamento.

---

## Parte 2 — Checklist pré-teste

Antes de ativar a feature flag e começar a coletar dados:

- [ ] Hipótese escrita no formato completo
- [ ] Taxa de conversão base medida sobre a população relevante
- [ ] MDE definido
- [ ] Sample size calculado e viável dentro do prazo disponível
- [ ] Duração mínima definida (ao menos 1–2 ciclos completos de uso)
- [ ] Métrica primária definida — apenas uma, usada para tomar a decisão final
- [ ] Métricas de guardrail definidas — aquelas que, se caírem, encerram o teste imediatamente
- [ ] Randomização garantida — o mesmo usuário sempre recebe a mesma variante
- [ ] Data de encerramento fixada antes do início

> [!danger] Regra inegociável
> O teste não deve ser encerrado antes de atingir o sample size planejado. Observar p < 0,05 no meio do experimento não é sinal para parar — é o peeking problem em ação. Cada "espiada" com intenção de decidir aumenta a taxa real de falso positivo. Veja os detalhes em [[Feature Flags e Testes AB#O Problema do Peeking]].

---

## Parte 3 — Executando o teste

### Configuração no Mixpanel

1. Criar a feature flag com os splits definidos (ex: 50% controle / 50% variante)
2. Confirmar que o SDK está expondo a propriedade de variante nos eventos do usuário
3. Criar relatórios no Mixpanel filtrando pela propriedade da flag para comparar os grupos
4. Monitorar as métricas de guardrail diariamente — sem avaliar a métrica primária antes do prazo

### O que monitorar durante o teste

| Tipo | Ferramenta | O que observar |
|---|---|---|
| Saúde técnica | Backend / Sentry | Taxa de erro, latência |
| Comportamento do usuário | Mixpanel | Guardrails — eventos que não devem cair |
| Integridade do experimento | Mixpanel | SRM — a divisão real está como planejada? |

> [!tip] SRM — Sample Ratio Mismatch
> Antes de analisar qualquer resultado, verificar se a divisão real entre grupos ficou como planejada. Uma divisão planejada de 50/50 que resulta em 60/40 indica um problema na randomização e invalida o experimento. Esse diagnóstico deve ser feito antes de qualquer análise de métricas.

---

## Parte 4 — Analisando os resultados

Ao atingir o sample size planejado, a análise segue esta sequência:

1. **Verificar o SRM** — a divisão real está dentro do esperado?
2. **Avaliar a métrica primária** — a variante superou o controle com p < 0,05?
3. **Verificar os guardrails** — alguma métrica secundária piorou?
4. **Avaliar o tamanho do efeito** — o ganho é relevante para o negócio, além de estatisticamente significante?

### Decisões possíveis

| Cenário | Decisão |
|---|---|
| Variante vence, sem efeito colateral | Rollout para 100% via feature flag |
| Controle vence ou resultado empatado | Manter versão atual, desligar a flag |
| Resultado inconclusivo (sample insuficiente) | Estender o teste ou encerrar sem conclusão |
| Guardrail caiu | Encerrar o teste imediatamente e investigar |

---

## Parte 5 — Quando não aplicar teste A/B

| Situação | Motivo | Alternativa |
|---|---|---|
| Correção de bug | Não há variante para comparar | Deploy direto com monitoramento |
| Mudança que afeta segmento muito pequeno | Amostra insuficiente para validade estatística | Feature flag com guardrail |
| Decisão já tomada por outras razões | Resultado não vai mudar a decisão | Monitorar após o lançamento |
| Urgência de horas ou dias | Tempo insuficiente para atingir o sample size | Rollout progressivo com monitoramento |
| Mudança de infraestrutura ou performance | O usuário não percebe diretamente | Métricas técnicas, não experimento comportamental |

---

## Resumo — O fluxo completo

```
1. HIPÓTESE
   └─ É possível completar "acreditamos que X vai mudar Y porque Z"?
       ├─ Não → explorar os dados antes de definir o teste
       └─ Sim → avançar

2. VOLUME
   └─ Medir taxa base: evento / usuários que tiveram a oportunidade
       └─ Calcular sample size com MDE e 95% de confiança
           ├─ Sample inviável no prazo → usar flag com guardrail, sem A/B
           └─ Sample viável → avançar

3. DECISÃO AINDA ABERTA?
   ├─ Não → não testar
   └─ Sim → completar o checklist pré-teste e executar

4. EXECUÇÃO
   └─ Flag → coleta → monitorar guardrails → não avaliar métrica primária antes do prazo

5. ANÁLISE
   └─ SRM → métrica primária → guardrails → tamanho do efeito → decidir
```

---

## Conexões no Vault

- [[Feature Flags e Testes AB]] — fundamentos teóricos e estatísticos
- [[Mixpanel e Monitoramento de Produto]] — contexto de analytics na Repediu
- [[score-catboost-feature-store]] — projeto ativo que aplica esse framework
- [[Métricas de Produto para PMs]] — métricas que os testes devem alimentar
