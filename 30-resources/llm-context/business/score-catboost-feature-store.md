---
title: Priorização de Audiência de Campanhas por Score de Propensão (CatBoost)
tags:
  - llm-context
  - business
updated: 2026-04-08
---

# Priorização de Audiência de Campanhas por Score de Propensão (CatBoost)

## O que é e por que existe

Quando um restaurante dispara uma campanha pela Repediu, hoje a plataforma envia mensagens para toda a base de clientes de forma sequencial, sem distinguir quem tem mais ou menos chance de comprar. Isso desperdiça volume de mensagens (que tem custo na API Oficial da Meta) e reduz a assertividade das campanhas.

Para resolver isso, a Repediu está desenvolvendo um **sistema de score de propensão de compra** para cada cliente final dos restaurantes. O modelo atribui uma nota de 0 a 1 indicando a probabilidade de aquele cliente converter — e essa nota é usada para **priorizar quem recebe a mensagem primeiro**, mandando para quem tem mais chance de comprar antes de quem tem menos. O resultado esperado é mais conversões com o mesmo volume de envio.

Responsável técnico: **Lucas Lemes** (lemes@repediu.com.br)

## Como funciona

### Modelo
- Algoritmo: **CatBoost** (gradient boosting otimizado para variáveis categóricas)
- Features de entrada: total de mensagens enviadas/recebidas, dados de RFV (Recência, Frequência, Valor), "customer status", probabilidade de o cliente estar ativo ("vivo")
- Output: score de 0 a 1 representando a probabilidade de conversão

### Feature Store
- Tecnologia: **Next** (banco de dados fast-access do ecossistema da Repediu)
- Estratégia de atualização: **parcial** — score recalculado apenas para clientes que tiveram uma compra nas últimas 24h, evitando processar a base completa diariamente (o que levaria horas)
- Atualização via comando `UPDATE` nas linhas específicas, sem reescrever toda a tabela

### Integração com envio de mensagens
- O score gera um valor de prioridade na fila de envio
- Fatores adicionais considerados na priorização: customer status + probabilidade de estar ativo
- Feature Flag: apenas os clientes selecionados para o teste receberão a priorização pelo novo modelo

## Decisões de produto tomadas (08/04/2026)

- **Filtro de mensagens**: remover status "error" da contagem de atividade — considerar apenas "sent", "received" e "read"
- **Amostra do teste**: 20 clientes de alta atividade (Maricota Pizzaria precisa ser verificada antes da inclusão — problema de integração de vendas)
- **MLOps**: integração com MLFlow para controle e versionamento do modelo será feita **após** a Feature Store estar pronta

## Teste AB

| Item | Detalhe |
|---|---|
| Métrica | Proporção de conversão por mensagem (conversões / 100 enviadas) |
| Comparação | Semana antes vs. semana depois da ativação da Feature Flag |
| Amostra | 20 clientes de alta atividade selecionados manualmente |
| Ativação | Via Feature Flag em produção, apenas para os clientes da amostra |

## Cronograma

| Marco | Data estimada |
|---|---|
| Feature Store pronta | 17/04/2026 (sexta) |
| Ativação da Feature Flag | A definir após Feature Store |
| Análise do teste AB | ~1 semana após ativação |

## Conexões com outros projetos

- **Limite semanal de envio com balanço inteligente** (Fernando + Lemes): também usa lógica de priorização por probabilidade de compra — os dois projetos se complementam
- **Fila de aprovação via RabbitMQ**: a Feature Store precisa respeitar os rate limits já controlados pela fila
- **Mixpanel (RPD-1964)**: instrumentar eventos de conversão será essencial para validar o teste AB com dados limpos — ver [[Mixpanel e Monitoramento de Produto]]
