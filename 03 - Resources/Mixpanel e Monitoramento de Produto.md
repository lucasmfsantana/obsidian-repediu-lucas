---
title: Mixpanel e Monitoramento de Produto
date: 2026-04-08
tags:
  - resource
  - area/pm
  - area/repediu
  - produto/analytics
---

# Mixpanel e Monitoramento de Produto

Documento de estudos iniciado em 08/04/2026 a partir do curso [Product Analytics Academy](https://www.productanalytics.academy/courses/take/product-success-metrics/lessons/50598874-product-success-metrics-a-complete-guide). Referência contínua — atualizar conforme o aprofundamento avança.

---

## Framework de Métricas: as 6 Etapas

O método da Product Analytics Academy divide o ciclo de vida do usuário em 6 etapas:

1. **Exposure** — quando o cliente conhece o produto (aquisição, awareness)
2. **Onboarding Completion** — quando o cliente finaliza o onboarding
3. **Activation** — quando o cliente realiza a principal ação que o produto se propõe (o "aha moment")
4. **Engagement** — ações realizadas na plataforma / quantidade de usuários ativos
5. **Retention** — clientes que continuam usando ao longo do tempo
6. **Focus** — métricas específicas do core value do produto

---

## Aplicação para a Repediu

A Repediu é um **SaaS B2B** com onboarding acompanhado pelo CS (não é PLG). Isso muda o foco:

- **Exposure e Onboarding**: menos relevantes como métricas de produto — o funil de aquisição é responsabilidade de Vendas/CS, não do produto.
- **Ponto de partida para o produto**: medir a partir da **Ativação**.

### O que é Ativação para a Repediu?

> A primeira campanha criada e enviada pelo restaurante, ou o primeiro cliente convertido via plataforma.

**Métrica possível antes da ativação:** tempo entre criação da conta e o primeiro envio de mensagem (ou primeira conversão). Isso mede eficiência do onboarding.

### Métricas candidatas por etapa

| Etapa | Métrica candidata |
|---|---|
| Activation | Tempo até primeiro envio; % de contas que enviam na 1ª semana |
| Engagement | Campanhas ativas / restaurante / mês; DAU/MAU |
| Retention | % de restaurantes que continuam enviando mensagens após 30/60/90 dias |
| Focus | Conversões geradas via plataforma; receita atribuível |

> [!important] Scorecard atual do Lucas
> O scorecard de KPIs de produto já acompanha: DAU/MAU, Retention Rate e Multi-canal. Ver [[Métricas de Produto para PMs]] para contexto.

---

## Sobre o Mixpanel como Ferramenta

O Mixpanel é uma ferramenta de **product analytics** focada em rastrear comportamento do usuário dentro do produto (eventos, funis, retenção, coortes).

### Diferença de outras ferramentas

- **Google Analytics**: foco em tráfego web e aquisição
- **Mixpanel**: foco em eventos dentro do produto — "o que o usuário faz depois de logar"
- **Amplitude**: similar ao Mixpanel, mais usado em PLG

### Conceitos-chave

**Events**: ações que o usuário realiza (ex: `campaign_created`, `message_sent`, `conversion_registered`). São a unidade básica de rastreamento.

**Properties**: atributos do evento ou do usuário (ex: `restaurant_id`, `plan_type`, `channel_used`). Permitem segmentar análises.

**Funnels**: sequência de eventos que representam um fluxo (ex: Login → Dashboard → Criar Campanha → Enviar). Mede onde os usuários desistem.

**Retention charts**: quantos usuários voltam a realizar uma ação X dias após a primeira vez.

**Cohorts**: grupos de usuários agrupados por comportamento ou data (ex: "todos que ativaram em março/2026").

---

## Implementação na Repediu (RPD-1964)

Issue criada em 08/04/2026, atribuída ao Deivid Santana. Status: **Selected for Development**.

### Eventos prioritários a instrumentar (sugestão inicial)

- `session_started` — login bem-sucedido
- `campaign_created` — criação de campanha
- `campaign_sent` — envio de campanha
- `conversion_registered` — venda atribuída via plataforma
- `integration_connected` — integração ativada
- `segment_created` — criação de segmento de clientes

### Boas práticas

- Usar **naming convention consistente**: `objeto_ação` (ex: `campaign_created`, não `createCampaign`)
- Sempre incluir `restaurant_id` e `plan_type` como propriedades do usuário
- Evitar rastrear eventos de baixo valor que poluem o painel

---

## Links e Referências

- 🎬 [Playlist Product Analytics Academy (YouTube)](https://www.youtube.com/watch?v=gnTpblnTeHw&list=PLmtZpkc1VS1d3aQvs4HU8PcDPhM7PoHTj&index=2)
- 📚 [Product Success Metrics - Complete Guide](https://www.productanalytics.academy/courses/take/product-success-metrics/lessons/50598874-product-success-metrics-a-complete-guide)
- 📄 [[Métricas de Produto para PMs]] — scorecard atual com KPIs da Repediu
- 🎟️ [[RPD-1964]] — issue de implementação do Mixpanel
