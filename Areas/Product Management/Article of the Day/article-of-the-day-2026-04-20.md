---
title: "Article of the Day — 2026-04-20"
date: 2026-04-20
tags:
  - daily
  - article-of-the-day
  - product-management
---

# Article of the Day — 2026-04-20

---

## 🗞️ Conteúdo do Dia

### Quatro Lições do Relatório "State of Product 2026" da Atlassian

**Fonte:** Mind the Product  
**URL:** [https://www.mindtheproduct.com/inside-atlassians-state-of-product-2026-key-takeaways/](https://www.mindtheproduct.com/inside-atlassians-state-of-product-2026-key-takeaways/)  
**Relatório completo:** [https://www.atlassian.com/software/jira/product-discovery/resources/state-of-product-2026](https://www.atlassian.com/software/jira/product-discovery/resources/state-of-product-2026)

O relatório State of Product 2026 da Atlassian ouviu mais de 1.000 times de produto ao redor do mundo e pintou um retrato bastante revelador da profissão. O achado central é uma contradição: ao mesmo tempo em que 85% dos PMs dizem ter mais influência estratégica do que nunca, 84% temem que os produtos que estão construindo não vão ter sucesso no mercado. Visibilidade e responsabilidade cresceram — mas confiança e impacto mensurável ainda não acompanharam.

Um segundo ponto crítico é a dinâmica com engenharia: 80% dos times ainda não envolvem engenheiros durante a fase de ideação, definição de problema ou criação de roadmap. A colaboração começa só depois que as decisões foram tomadas, o que gera retrabalho, problemas de viabilidade descobertos tarde e oportunidades perdidas de simplificação técnica. O relatório é enfático: envolver engenharia cedo não é opcional — é o que separa times de produto funcionais de times que apenas gerenciam backlog.

Outro dado preocupante: apenas 31% das organizações priorizam experimentação rápida e aprendizado iterativo. A maioria das decisões de produto ainda é baseada em opiniões de liderança ou preferências internas, e não em dados, pesquisa com clientes ou hipóteses testadas. Isso contradiz diretamente os princípios de continuous discovery que a indústria prega há anos.

Por fim, o relatório levanta o problema da dívida técnica: metade dos times não tem tempo suficiente para planejamento estratégico nem para análise de dados. A pressão por entrega contínua está consumindo o espaço que deveria ser dedicado a pensar em sustentabilidade de longo prazo.

> [!tip] 💡 Aplicação para a Repediu
> O dado sobre envolvimento tardio de engenharia ressoa diretamente com nosso contexto. Se iniciativas como o Tracker ou integrações com PDVs chegam ao time de dev já com soluções definidas, perdemos o momento mais valioso de descoberta conjunta. Vale criar um ritual — mesmo que curto — de "problem framing" antes de qualquer especificação, trazendo Vagner e Fernando para o espaço de problema antes de entrar no espaço de solução.

---

## 📚 Tópico de Estudo do Dia

### [[Framework RICE de Priorização|Framework RICE]]: Como Priorizar Features com Base em Dados

**Por que estudar isso agora?** O vault tem guias sobre métricas, testes A/B, roadmap e histórias de usuário — mas ainda não tem um framework estruturado de *priorização de iniciativas*. O RICE preenche exatamente essa lacuna. → Nota completa: [[Framework RICE de Priorização]]

---

#### O que é o RICE?

O RICE é um framework de priorização criado pelo time de produto do Intercom para tomar decisões mais objetivas sobre o que construir primeiro. O nome é um acrônimo de quatro variáveis: **Reach** (alcance), **Impact** (impacto), **Confidence** (confiança) e **Effort** (esforço).

A fórmula é simples:

```
RICE Score = (Reach × Impact × Confidence) ÷ Effort
```

Quanto maior o score, maior a prioridade da iniciativa.

---

#### As quatro variáveis explicadas

**Reach (Alcance):** Quantos usuários ou clientes serão impactados por essa iniciativa em um período definido (tipicamente um trimestre ou mês)? Use dados reais sempre que possível. Exemplo: "Essa feature impacta os 1.200 restaurantes que usam campanhas de WhatsApp mensalmente."

**Impact (Impacto):** Qual é o impacto esperado sobre o objetivo que você está perseguindo? O Intercom usa uma escala qualitativa: 3 = impacto massivo, 2 = alto, 1 = médio, 0,5 = baixo, 0,25 = mínimo. Seja honesto — superestimar impacto é o erro mais comum.

**Confidence (Confiança):** Qual é o seu nível de certeza sobre as estimativas de reach e impact? Expresso em porcentagem: 100% = muito confiante (dados fortes), 80% = confiança alta, 50% = confiança média, 20% = palpite. Esse fator é o "antídoto ao entusiasmo" — ele força você a admitir quando uma ideia parece ótima mas ainda não tem evidência.

**Effort (Esforço):** Quantas "person-weeks" ou "person-months" são necessários para entregar essa iniciativa? Inclua todos os perfis: produto, design, backend, frontend, QA. Esse é o único fator que divide em vez de multiplicar — quanto maior o esforço, menor o score.

---

#### Por que o RICE é poderoso?

O maior problema com priorização ad hoc é que ela sofre de vários vieses: o HiPPO (Highest Paid Person's Opinion), o viés de novidade (a última ideia sempre parece a melhor), e o viés de ancoragem (a primeira solução proposta domina a discussão). O RICE não elimina esses vieses, mas torna o raciocínio explícito e debatível.

Além disso, o fator Confidence é uma inovação elegante em relação a outros frameworks como o ICE (que usa Impact, Confidence e Ease, mas não tem Reach). Ao separar "o que achamos que vai acontecer" de "o quanto temos certeza", o RICE penaliza naturalmente ideias que parecem boas mas não têm validação.

---

#### RICE na prática: exemplo com Repediu

Imagine três iniciativas no backlog:

| Iniciativa | Reach | Impact | Confidence | Effort | Score |
|---|---|---|---|---|---|
| Campanha automática de aniversário | 4.000 restaurantes | 2 (alto) | 80% | 2 meses | **3.200** |
| Integração com novo PDV (nicho) | 300 restaurantes | 3 (massivo) | 50% | 4 meses | **112** |
| Melhoria no relatório de campanhas | 7.000 restaurantes | 1 (médio) | 100% | 1 mês | **7.000** |

Surpresa: a melhoria no relatório — que parece "pequena" — tem o maior score porque alcança toda a base com esforço mínimo e alta confiança. Isso é o poder do RICE: revelar iniciativas subestimadas.

---

#### Limitações do RICE

O framework tem críticas válidas: é difícil comparar iniciativas de naturezas muito diferentes (melhorias de UX vs. novas integrações), os números podem criar uma falsa sensação de objetividade, e o Reach favorece naturalmente features que atingem toda a base em detrimento de features estratégicas de nicho. Use o RICE como ponto de partida para a conversa, não como árbitro final.

---

> [!note] 📖 Para se aprofundar
> - [RICE: Simple prioritization for product managers — Intercom Blog](https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers/)
> - [RICE and ICE Prioritization Framework — Kaizenko](https://www.kaizenko.com/scoring-frameworks-ice-rice-and-weighted-scoring-for-product-prioritization/)
> - [RICE Scoring Model — ProductPlan Glossary](https://www.productplan.com/glossary/rice-scoring-model/)

---

## 📰 Notícia do Dia

### 1. Meta atualiza modelo de identidade e preços do WhatsApp Business API

**Fonte:** Mobile Ecosystem Forum / Infobip  
**URL:** [https://mobileecosystemforum.com/2026/04/08/whatsapp-business-april-2026/](https://mobileecosystemforum.com/2026/04/08/whatsapp-business-april-2026/)

A partir de abril de 2026, a Meta implementou mudanças significativas na precificação e no modelo de identidade do WhatsApp Business Platform. Em termos de preços, houve ajustes em mercados selecionados (Arabia Saudita, Índia, Paquistão, Turquia) e a introdução de 8 novas moedas de faturamento, incluindo ARS e BRL-adjacentes. Mais relevante para o futuro: a Meta está migrando para um modelo baseado em username em vez de número de telefone, com previsão de rollout a partir de meados de 2026.

> [!warning] Por que isso importa para PMs
> Se o WhatsApp migrar para identificação por username/business scoped user IDs, toda a lógica de matching entre contatos do restaurante e usuários da plataforma precisará ser revisitada. Vale monitorar de perto e garantir que o time de integração está ciente das mudanças no Business Manager.

---

### 2. IA ainda não ajuda no que mais importa para PMs, aponta pesquisa

**Fonte:** Atlassian / Diginomica  
**URL:** [https://diginomica.com/product-teams-under-pressure-atlassian-state-product-report-role-in-flux](https://diginomica.com/product-teams-under-pressure-atlassian-state-product-report-role-in-flux)

O State of Product 2026 revelou que a IA economiza em média 2 horas por dia para PMs — mas os casos de uso mais comuns são automação de tarefas rotineiras e documentação. O problema: priorização, planejamento estratégico e analytics avançada — as tarefas de maior valor — ainda são predominantemente humanas. A maioria dos times usa entre 1 e 3 ferramentas de IA diariamente, mas o impacto está concentrado na camada de produtividade, não na camada estratégica.

> [!note] Por que isso importa para PMs
> Isso muda a pergunta de "como usar IA no meu trabalho?" para "como uso IA para melhorar minha *tomada de decisão* e não só minha *execução*?" O PM que apenas usa IA para escrever mais rápido está deixando o maior valor na mesa.

---

## 🎯 Desafio do Dia

### Priorização com RICE no contexto de um CRM de restaurantes

**Cenário:**

Você é PM de uma plataforma de CRM para restaurantes (soa familiar?). O time tem capacidade para 3 meses de desenvolvimento e o stakeholder de negócios quer "saber o que vamos entregar". Você tem as seguintes iniciativas no backlog, todas com interesse da liderança:

1. **Campanha automática de reativação de clientes inativos** — lógica de envio por WhatsApp para clientes que não pediram nos últimos 60 dias
2. **Dashboard de performance por canal** (WhatsApp, SMS, e-mail) — relatório consolidado que hoje exige exportação manual de 3 telas diferentes
3. **Integração com novo ERP de nicho** — solicitado por 2 clientes enterprise que juntos representam R$180k ARR
4. **Editor drag-and-drop para templates de campanha** — feature de UX solicitada por 30% dos restaurantes no último NPS

**Sua base:** 5.000 restaurantes ativos. Equipe: 1 PM, 1 designer, 2 devs backend, 1 dev frontend.

**Questões:**

1. Atribua estimativas de Reach, Impact, Confidence e Effort para cada iniciativa e calcule o score RICE. Quais premissas você precisa declarar explicitamente?
2. O resultado do RICE surpreende em relação à intuição inicial? Por quê?
3. A integração com ERP tem score baixo, mas representa R$180k ARR. Como você equilibra o RICE com considerações estratégicas que o framework não captura?]

**Respostas:**
1. 
	1. R: 5.000; I: 3; C: 50; E: 1 semana = 7500
	2. R: 5.000; I: 1; C: 100; E: 4 semanas = 1250
	3. R: 2; I: 3; C: 100; E: 2 semanas = 3
	4. R: 1.500; I: 0,5; C: 80; E: 4 semanas = 150
2. Um pouco, O fator financeiro não afeta muito o RICE, então uma feature relativamente simples de ser implantada e que vai trazer 180k de ARR fica para tras por não impactar muita gente.
3. Eu priorizo o maior rice e logo em seguida puxaria o fator financeiro, sabendo que não leva muito esforço, ela subiria na minha prioridade.


---

> [!example]- 💡 Gabarito (clique para revelar)
> 
> **Estimativas sugeridas:**
> 
> | Iniciativa | Reach | Impact | Confidence | Effort (meses) | Score |
> |---|---|---|---|---|---|
> | Reativação de inativos | 5.000 | 2 | 70% | 1,5 | **4.667** |
> | Dashboard multicanal | 5.000 | 1 | 100% | 1 | **5.000** |
> | Integração ERP nicho | 2 clientes / ~10 rest | 3 | 60% | 3 | **6** |
> | Editor drag-and-drop | 1.500 (30% da base) | 1 | 80% | 2 | **600** |
> 
> **Surpresa:** O dashboard multicanal — que parece entediante — tem o maior score. Alcança toda a base, tem altíssima confiança (a dor é documentada) e exige esforço moderado.
> 
> **Sobre a integração ERP:** Aqui está a limitação do RICE. R$180k ARR pode ser estratégico para a empresa mesmo com score baixo. A saída correta é ser transparente: "O RICE indica baixa prioridade para o time de produto, mas reconhecemos o valor estratégico. A decisão de priorizar isso requer aprovação explícita de liderança e potencialmente um alocação de capacidade separada (ex: contratação de dev especialista ou parceiro)." Nunca esconda o trade-off — torne-o visível.
> 
> **Sobre as premissas:** A qualidade do RICE depende diretamente das premissas de Reach e Impact. Se você não tem dados de engajamento com o dashboard atual, o Confidence deve ser 50% ou menos. Documente as premissas junto com o score — caso contrário, o número vira ficção com aparência de objetividade.

---

*Gerado automaticamente em 2026-04-20*
