---
title: "Article of the Day — 2026-04-22"
date: 2026-04-22
tags:
  - daily
  - article-of-the-day
  - product-management
---

# 📖 Article of the Day — 22 de abril de 2026

---

## 🗞️ Conteúdo do Dia

**"How Product is Changing in 2026"**
*Ant Murphy — Medium / The PBL Newsletter*
🔗 https://antmurphy.medium.com/how-product-is-changing-in-2026-78a08f150aca

O artigo de Ant Murphy é um dos mais citados do início de 2026 no mundo de produto. Diferente de posts de tendências baseados em opiniões, ele parte de dados reais — pesquisas, relatórios setoriais e surveys com PMs — para entender o que está de fato mudando na prática da gestão de produto.

O primeiro grande achado é sobre habilidades: **59% dos PMs acreditam que estratégia e business acumen serão as habilidades mais importantes nos próximos 2–3 anos**. A hipótese de Murphy é que, à medida que a IA absorve as tarefas operacionais e administrativas do PM (escrita de user stories, síntese de research, documentação), o diferencial humano passa a ser a capacidade de tomar decisões estratégicas — conectar oportunidades de negócio, entender o mercado e definir onde apostar.

O segundo ponto forte é sobre influência e comunicação. Com times cada vez mais cross-funcionais e com gestão mais top-down (CEOs e C-level tomando decisões de produto diretamente), o PM precisa dominar a arte de influenciar sem autoridade formal. O papel de "dono do roadmap" está evoluindo para "arquiteto de impacto" — alguém que alinha expectativas, negocia prioridades e traduz contexto de negócio para engenharia e design.

Por fim, Murphy alerta para um dado preocupante do CPO Survey da Productboard: **85% dos líderes estão investindo em ferramentas de IA, mas apenas 2% estão priorizando o desenvolvimento de talentos**. O risco é ter um time com muito tooling e pouca capacidade de pensar estrategicamente sobre o que construir.

> [!tip] 💡 Aplicação para a Repediu
> À medida que a IA automatiza partes do seu trabalho de PM (geração de specs, análise de feedback, user stories), o diferencial passa a ser sua capacidade de conectar as decisões de produto à estratégia da Repediu — os 5 pilares do roadmap 2026/27, a proposta de valor para os 7.000+ restaurantes e os trade-offs de crescimento vs. eficiência operacional. Vale refletir: nas suas reuniões de priorização, você está exercendo mais papel de executor ou de arquiteto estratégico?

---

## 📚 Tópico de Estudo do Dia

### Análise de Coorte (Cohort Analysis) — A Ferramenta Essencial para Entender Retenção

**O que é?**

Análise de coorte é uma técnica de analytics comportamental que agrupa usuários com uma característica ou experiência em comum dentro de um período de tempo definido e, em seguida, rastreia o comportamento desse grupo ao longo do tempo.

A palavra "coorte" vem do latim e significa "grupo". No contexto de produto, um coorte é tipicamente um grupo de usuários que:
- Se cadastraram no mesmo período (ex: semana de 14/04)
- Fizeram sua primeira ação no produto no mesmo mês
- Foram adquiridos pelo mesmo canal
- Realizaram uma ação específica (ex: ativaram uma feature)

**Por que toda PM deveria dominar isso?**

Agregações simples mentem. Se você olha para "taxa de retenção média do produto = 40%", esse número esconde realidades muito diferentes. Talvez usuários que chegaram via WhatsApp tenham 60% de retenção, enquanto os que chegaram por email estejam em 15%. Ou talvez um cohort de março tenha performance muito pior por causa de um bug que passou despercebido.

A análise de coorte revela **quando** e **por que** usuários abandonam — ou ficam. Isso torna a ferramenta central para qualquer PM trabalhando em retenção, ativação ou entendimento do ciclo de vida do cliente.

**Como funciona na prática?**

A lógica básica é: você cria uma tabela onde cada linha é um coorte (ex: usuários que chegaram em janeiro) e cada coluna é um período após o evento de referência (Dia 1, Semana 1, Mês 1, Mês 3...). Cada célula mostra a porcentagem do coorte que voltou naquele período.

*Fórmula simples:*
```
Retenção do Período N = (Usuários ativos no período N ÷ Tamanho total do coorte) × 100
```

Exemplo: 500 restaurantes ativaram a Repediu em janeiro. Em março (Mês 2), 200 ainda estavam ativos → retenção de Mês 2 = 40%.

**Tipos de coorte mais úteis para PMs:**

1. **Coorte de aquisição (temporal)**: agrupa por data de cadastro. Ótimo para ver se melhorias de produto estão aumentando retenção ao longo do tempo.
2. **Coorte comportamental**: agrupa por ação realizada (ex: "criou pelo menos 1 campanha de WhatsApp no primeiro mês"). Ótimo para identificar o "momento mágico" — a ação que prediz retenção de longo prazo.
3. **Coorte por canal**: agrupa por origem de aquisição. Revela qualidade do usuário por canal.

**O que é uma "curva de retenção saudável"?**

Uma curva de retenção é um gráfico que mostra como a porcentagem de usuários ativos cai ao longo do tempo. Toda curva começa em 100% no Dia 0 e cai. O que diferencia produtos saudáveis é quando a curva **estabiliza** — ou seja, para de cair e forma um patamar. Esse patamar indica que você tem um núcleo de usuários que encontrou valor real no produto. Se a curva nunca estabiliza (vai a 0%), você tem um problema de product-market fit.

**Armadilhas comuns:**
- Confundir usuários ativos (qualquer login) com usuários engajados (ação de valor)
- Não segmentar por plano, persona ou canal
- Olhar retenção sem cruzar com receita (um coorte pode reter bem mas ter LTV baixo)

> [!note] 📌 Conexão com ferramentas que você já usa
> O Mixpanel (que já está implementado na Repediu — ver [[Mixpanel - Implementação na Repediu]]) tem uma funcionalidade nativa de Retention Analysis que gera exatamente essas curvas. Vale explorar o relatório de "Retention" no Mixpanel usando como evento de referência a primeira campanha enviada pelo restaurante.

**Referências para aprofundamento:**
- 📄 [Amplitude: What is Cohort Retention Analysis](https://amplitude.com/explore/analytics/cohort-retention-analysis)
- 📄 [Appcues: A beginner's guide to cohort analysis](https://www.appcues.com/blog/cohort-analysis)
- 📄 [Improvado: The Ultimate Guide to Cohort Analysis](https://improvado.io/blog/cohort-analysis)

---

## 📰 Notícia do Dia

### 1. WhatsApp Business: mudanças de plataforma em abril de 2026

🔗 https://sanuker.com/whatsapp-api-2026_updates-pacing-limits-usernames/
*Fonte: Sanuker / MEF Mobile Ecosystem Forum*

A Meta está fazendo movimentos significativos na plataforma WhatsApp Business em 2026. Três mudanças de destaque: (1) **Portfolio Pacing** — grandes campanhas agora são enviadas em lotes, com monitoramento de feedback antes de liberar o próximo batch, o que reduz bloqueios por má reputação; (2) remoção dos limites de mensagens diárias para contas verificadas a partir do Q2 2026 — limite imediato de 100K mensagens/dia após verificação; e (3) **usernames no WhatsApp**, previsto para meados de 2026, que muda como negócios são identificados na plataforma.

> [!warning] ⚠️ Por que isso importa para a Repediu
> O Portfolio Pacing é diretamente relevante para as campanhas de WhatsApp que a Repediu dispara em nome dos restaurantes. O algoritmo vai segurar mensagens se o feedback (bloqueios, denúncias) for alto — o que exige atenção à qualidade das listas e frequência de envio. Vale checar com o time de tech como o pipeline de envio se adapta a isso.

### 2. TripleTen lança programa de PM com foco em IA

🔗 https://news.pm-global.co.uk/2026/04/tripleten-launches-ai-product-management-programme-to-address-growing-skills-gap/
*Fonte: PMG News, abril de 2026*

A TripleTen lançou em abril um programa formal de Product Management com foco em IA, direcionado a profissionais que precisam liderar produtos que incorporam inteligência artificial — da definição de requisitos à avaliação de modelos. A próxima turma começa em 21 de maio de 2026.

> [!note] Por que isso importa
> O surgimento de programas específicos para "AI PM" confirma que a habilidade de trabalhar com modelos de ML, avaliar outputs de IA e definir guardrails está se tornando um diferencial esperado — não mais opcional — para PMs em produtos que usam scoring, recomendação ou automação.

---

## 🎯 Desafio do Dia

### Aplicando Análise de Coorte na Prática

**Cenário:**

Você é PM de uma plataforma B2B SaaS de CRM para restaurantes (sim, pode pensar na Repediu 😄). Seu produto tem uma funcionalidade de campanhas por WhatsApp — os restaurantes criam e disparam mensagens para seus clientes.

Os dados do último trimestre mostram:
- Taxa de retenção geral (mês 3 após cadastro): **38%**
- Churn mensal médio: **8%**
- O time de growth está questionando se vale a pena investir em novos canais de aquisição

Você decide fazer uma análise de coorte antes de responder. Ao segmentar os dados, você encontra o seguinte:

| Coorte | Retenção Mês 1 | Retenção Mês 3 | Retenção Mês 6 |
|--------|---------------|---------------|---------------|
| Ativaram campanha no Mês 1 | 85% | 72% | 65% |
| Não ativaram campanha no Mês 1 | 60% | 28% | 9% |
| Vieram via parceiro PDV | 78% | 55% | 48% |
| Vieram via trial direto | 55% | 22% | 8% |

**Perguntas:**

1. O que esses dados revelam sobre o "momento mágico" do produto? Qual hipótese você formularia?
2. Dado esse cenário, o que você recomendaria ao time de growth sobre investimento em novos canais de aquisição?
3. Qual seria o próximo experimento de produto que você proporia, baseado nessa análise?

> [!example]- 💡 Gabarito (clique para revelar)
> 
> **1. Momento mágico:**
> Os dados sugerem fortemente que **criar e disparar pelo menos uma campanha de WhatsApp no primeiro mês** é o "momento mágico" — o evento que prediz retenção de longo prazo. Usuários que ativaram campanhas no Mês 1 têm retenção de 65% no Mês 6, contra apenas 9% dos que não ativaram. A hipótese é: o restaurante só percebe o valor real do produto quando vê engajamento dos seus próprios clientes via WhatsApp. Antes disso, é só teoria.
> 
> **2. Recomendação para growth:**
> Antes de investir em novos canais, o foco deveria ser em **ativação, não aquisição**. O canal "trial direto" tem retenção de apenas 8% no Mês 6 — isso indica que muitos usuários chegam, não ativam a feature principal e saem. Aquisição sem ativação é capital queimado. A recomendação seria: (a) criar um fluxo de onboarding que leve o restaurante a disparar sua primeira campanha em até 7 dias; (b) só escalar aquisição quando a taxa de ativação atingir uma meta definida (ex: 60% dos cadastros disparam campanha no Mês 1).
> 
> **3. Próximo experimento:**
> Um teste A/B no onboarding: grupo de controle (fluxo atual) vs. grupo de teste com um "quick win" guiado — um template de campanha pré-preenchido para o restaurante disparar com 1 clique nos primeiros 3 dias. Métrica primária: taxa de ativação de campanha no Mês 1. Métrica secundária: retenção no Mês 3. Hipótese: reduzir o atrito para criar a primeira campanha aumentará o número de usuários que atingem o momento mágico, melhorando a retenção global.

