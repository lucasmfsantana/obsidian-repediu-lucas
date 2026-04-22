---
title: "Quiz: Feature Flags e Testes A/B"
date: 2026-04-18
tags:
  - resource
  - area/pm
  - produto/analytics
  - produto/experimentacao
status: active
---

# Quiz: Feature Flags e Testes A/B

Teste de conhecimento baseado nos artigos [[Feature Flags e Testes AB]] e [[Framework - Quando e Como Fazer um Teste AB]]. Responda sem consultar os materiais — depois confira o gabarito no final.

---

## Questões Fáceis

**1.** Qual é a principal diferença entre uma feature flag e um teste A/B?

- A) Feature flags são usadas apenas por times de engenharia; testes A/B são exclusivos de marketing
- B) Feature flags controlam o release de funcionalidades; testes A/B medem o impacto de variantes
- C) Feature flags são permanentes; testes A/B têm duração máxima de 8 semanas
- D) Não há diferença prática — os dois termos descrevem o mesmo mecanismo

---

**2.** O que significa "separar o deploy do release" no contexto de feature flags?

- A) Fazer dois deploys separados: um para staging e outro para produção
- B) Subir o código para produção sem ativá-lo para os usuários, liberando-o depois via flag
- C) Permitir que o time de design revise a feature antes do time de engenharia fazer o deploy
- D) Criar duas branches de código independentes para cada variante

---

**3.** Qual tipo de feature flag é descrito como "kill switch" — usado para desativar uma funcionalidade em produção em caso de incidente?

- A) Release Flag
- B) Experiment Flag
- C) Permission Flag
- D) Ops Flag

---

**4.** Em um teste A/B, o grupo de controle representa:

- A) Os usuários que recebem a versão experimental com a mudança aplicada
- B) Os usuários excluídos do experimento por serem inativos
- C) A versão atual do produto — o baseline contra o qual a variante é comparada
- D) O grupo com maior volume de usuários, independente da versão que recebe

---

## Questões Médias

**5.** Um PM quer medir a taxa de clique em um botão de "Finalizar Pedido" para usar como taxa base no cálculo de sample size. Qual denominador é o correto?

- A) Total de usuários cadastrados na plataforma
- B) Total de usuários ativos nos últimos 30 dias
- C) Total de usuários que abriram a tela onde o botão aparece
- D) Total de sessões registradas no período

---

**6.** Qual das situações abaixo representa um cenário em que **não** vale a pena aplicar um teste A/B?

- A) Comparar dois textos diferentes no botão de call-to-action de uma landing page com alto tráfego
- B) Validar se uma mudança no fluxo de onboarding aumenta a taxa de ativação
- C) Verificar o impacto de uma correção de bug obrigatória que já foi aprovada para deploy
- D) Medir qual variante de um e-mail de reativação gera mais retorno de usuários inativos

---

**7.** O que é o MDE (Mínimo Efeito Detectável) e por que ele importa no planejamento de um teste A/B?

- A) É o p-valor mínimo aceitável para encerrar o teste — quanto menor, mais confiável o resultado
- B) É a menor melhoria relativa que justificaria implementar a mudança; define diretamente o tamanho de amostra necessário
- C) É o número mínimo de dias que o teste deve rodar para capturar variação semanal
- D) É a diferença máxima tolerada entre a divisão planejada e a divisão real dos grupos

---

**8.** Uma feature flag do tipo Permission Flag se diferencia das demais principalmente por:

- A) Ter duração curta e ser removida logo após o lançamento
- B) Ser usada exclusivamente durante incidentes de produção
- C) Representar uma regra de negócio permanente — liberar acesso por segmento, plano ou região
- D) Ser implementada sempre no client-side para maior velocidade de resposta

---

## Questões Difíceis

**9.** Um experimento foi planejado com divisão 50/50 entre controle e variante. Ao analisar os dados após o período definido, o PM percebe que a divisão real ficou 63/37. Qual é a conclusão correta?

- A) O resultado ainda é válido — pequenas variações na divisão são esperadas e não afetam a análise
- B) O experimento foi comprometido por Sample Ratio Mismatch e os resultados não devem ser usados para tomar decisão sem investigar a causa
- C) O grupo majoritário (63%) deve ser usado como novo controle, e o menor como variante, ajustando a análise estatística
- D) O teste deve ser reiniciado imediatamente com os mesmos parâmetros, sem necessidade de investigação

---

**10.** Um PM observa que o teste A/B atingiu p < 0,05 após 4 dias, antes de completar o sample size planejado. Ele encerra o teste e anuncia o resultado como positivo. Qual é o problema dessa decisão?

- A) Nenhum — p < 0,05 é o critério estatístico padrão e garante que o resultado é válido independente do momento
- B) O teste deveria ter rodado por pelo menos 8 semanas para ser válido, independente do p-valor
- C) Ao encerrar antes do sample size planejado, o PM está sujeito ao peeking problem — a taxa real de falso positivo pode ser muito maior do que 5%, tornando o resultado não confiável
- D) O problema é que p < 0,05 significa que há 5% de chance de a variante ser melhor, não 95%

---

## Bônus — Resposta Escrita

> [!question] Questão Dissertativa
> Um time de produto quer testar uma mudança significativa no fluxo de criação de campanhas. A base de usuários ativos relevantes é pequena — cerca de 200 usuários por mês. O cálculo de sample size indica que seriam necessários 800 usuários por grupo para detectar o efeito esperado com 95% de confiança.
>
> Descreva como você abordaria essa situação. O que você faria no lugar do teste A/B? Quais métricas monitoraria? Quando, se algum dia, o teste A/B passaria a ser viável?

---

## Gabarito

> [!note]- Clique para revelar (tente responder antes)
>
> **1. B** — Feature flags controlam release; testes A/B medem impacto. Os dois se complementam.
>
> **2. B** — O código vai para produção, mas permanece inativo. A flag controla quando e para quem ele é ativado.
>
> **3. D** — Ops Flags são os kill switches do sistema — ficam no código indefinidamente como mecanismo de segurança operacional.
>
> **4. C** — O controle é sempre o baseline atual. A variante é a versão com a mudança. A comparação entre os dois é o que mede o impacto.
>
> **5. C** — O denominador correto é quem teve a oportunidade de realizar o evento. Usar a base total dilui a taxa artificialmente e distorce o cálculo de sample size.
>
> **6. C** — Correções de bug obrigatórias já aprovadas não têm variante a comparar e a decisão já está tomada. Não há objeto para o teste.
>
> **7. B** — O MDE define o menor ganho que justificaria a mudança. Quanto menor o MDE, maior a amostra necessária. Calibrar abaixo do efeito real que importa para o negócio é um desperdício de tempo e usuários.
>
> **8. C** — Permission Flags são regras de negócio permanentes — acesso por plano, região ou perfil. Diferem das Release Flags (temporárias) e das Ops Flags (para incidentes).
>
> **9. B** — Sample Ratio Mismatch (SRM) indica falha na randomização. Os grupos não são comparáveis como planejado. Antes de qualquer conclusão, é necessário investigar a causa — erro de implementação, filtro incorreto, bug no SDK.
>
> **10. C** — É o peeking problem clássico. Cada análise intermediária com intenção de decidir infla a taxa de falso positivo. Encerrar ao ver p < 0,05 antes do sample size pode levar a conclusões erradas com frequência muito maior do que os 5% esperados — em alguns cenários, até 6x mais.
