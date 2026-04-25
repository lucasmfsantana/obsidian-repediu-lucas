---
title: "Article of the Day — 2026-04-24"
date: 2026-04-24
tags:
  - article-of-the-day
  - product-management
---

# Article of the Day — 24 de abril de 2026

---

## 🗞️ Conteúdo do Dia

### Amplitude lança AI Assistant embutido no produto para guiar usuários em tempo real

**Fonte:** Amplitude (via BusinessWire / SiliconANGLE) · 21 de abril de 2026
**URL:** https://amplitude.com/press/amplitude-launches-ai-assistant-to-help-users-get-unstuck-inside-any-product-experience

A Amplitude anunciou na semana passada o lançamento do **Amplitude AI Assistant**, um agente de suporte contextual embutido diretamente dentro da experiência do produto. A proposta é simples e poderosa: quando um usuário trava, o assistente aparece para guiá-lo — seja com instruções passo a passo, seja executando ações pelo usuário (como preencher formulários ou navegar por menus) — tudo sem que o usuário precise sair do produto para buscar ajuda.

O que diferencia essa solução das IAs de suporte tradicionais é a integração direta com os dados de comportamento da Amplitude Analytics. Em vez de responder com base apenas em documentação estática, o assistente conecta as respostas ao histórico de jornada do usuário, às guias de produto e às métricas de engajamento. Isso significa que o contexto é real: o sistema sabe onde o usuário está, o que ele tentou antes, e onde está o gargalo.

O AI Assistant também é projetado para aparecer de forma seletiva — ativado por sinais que indicam que o usuário realmente precisa de ajuda — em vez de interromper fluxos de trabalho sem necessidade. Atualmente está em beta fechado e será oferecido como um add-on à plataforma analítica da Amplitude.

Do ponto de vista de produto, essa é uma evolução importante: o suporte deixa de ser um canal separado (chat, help center, email) e passa a ser uma camada da própria experiência do produto. É a materialização do conceito de **produto que se ensina a usar sozinho**.

> [!tip] 💡 Insight para a Repediu
> Esse lançamento toca diretamente no problema de ativação de novos restaurantes. Quantos clientes abandonam o onboarding porque não encontram o próximo passo? Um assistente contextual embutido — mesmo que simples, via tooltip progressivo ou guide interativo — poderia reduzir o tempo para ativação (TTA) e aumentar o uso de funcionalidades-chave como campanhas de WhatsApp e cardápio digital. Vale explorar como ferramentas como Intercom Tooltips, Pendo ou produto próprio podem endereçar isso.

---

## 📚 Tópico de Estudo do Dia

### Roadmap Baseado em Outcomes (Outcome-Based Roadmap)

Um dos dilemas mais recorrentes na vida de um PM é como comunicar o plano do produto sem criar uma lista de promessas de features que engessa a equipe. A solução que ganhou força nos últimos anos é o **Roadmap Baseado em Outcomes** — uma abordagem em que o roadmap deixa de listar *o que será construído* e passa a declarar *qual resultado queremos alcançar*.

#### O problema com o roadmap de features

O roadmap tradicional funciona como uma fila de funcionalidades com datas. Ele é fácil de comunicar, mas cria dois problemas sérios:

1. **Mentalidade de feature factory**: a equipe passa a medir sucesso pela entrega das features, não pelo impacto que elas geram. Uma feature pode ser entregue no prazo e ser irrelevante para o negócio. [^1]
2. **Compromisso prematuro com soluções**: ao listar "notificações push" no roadmap de Q3, você já está comprometendo uma solução antes de saber se ela é a melhor forma de atingir o objetivo. Stakeholders encaram como contrato. [^2]

#### O que é um outcome?

Um **outcome** é uma mudança de comportamento mensurável — do usuário ou do negócio — que indica que você está criando valor. Não é uma entrega (*output*); é o efeito dela no mundo.

- **Output**: Lançar a funcionalidade de agendamento de campanhas
- **Outcome**: Aumentar em 30% a proporção de restaurantes que disparam ao menos uma campanha por mês 

A distinção parece sutil, mas muda completamente como a equipe trabalha. Com um outcome como norte, a equipe tem liberdade para descobrir *qual* feature ou solução melhor atinge aquele resultado — e pode pivotar se descobrir um caminho melhor. [^3]
#### A estrutura Now / Next / Later

Uma das formas mais populares de organizar um roadmap por outcomes é o modelo **Now / Next / Later** (Agora / Em seguida / Mais tarde):

- **Now (Agora)**: Outcomes com alta confiança, que já têm hipóteses validadas e estão em execução.
- **Next (Em seguida)**: Outcomes que você já identificou, mas que ainda precisam de discovery para definir as melhores soluções.
- **Later (Mais tarde)**: Oportunidades no horizonte, que ainda exigem exploração para entender se valem o investimento.

Essa estrutura deliberadamente **não tem datas** nas colunas Next e Later — porque declarar uma data seria uma mentira disfarçada de plano.

#### Por que funciona melhor para equipes ágeis?

Roadmaps por outcome são mais honestos com a incerteza inerente ao desenvolvimento de produto. Eles comunicam a *direção estratégica* sem prender a equipe a soluções definidas meses antes. Além disso, forçam uma conversa mais madura com stakeholders: em vez de "quando vai sair o feature X?", a discussão se torna "como estamos avançando em direção ao resultado Y?".

> [!note] 📖 Referências para aprofundamento
> - [Roman Pichler — How to Get Started with Outcome-Based Product Roadmaps](https://www.romanpichler.com/blog/how-to-get-started-with-outcome-based-product-roadmaps/)
> - [ProductPlan — Outcome-Driven Roadmaps](https://www.productplan.com/learn/outcome-driven-roadmaps)
> - [Mind the Product — Escape from the Feature Roadmap](https://www.mindtheproduct.com/escape-from-the-feature-roadmap-to-outcome-driven-development/)

---

## 🎯 Desafio do Dia

### Aplicando Outcome-Based Roadmap num CRM de Restaurantes

#### Cenário

Você é PM de um CRM de food marketing B2B com 7.000 restaurantes clientes. A liderança pediu para você preparar o roadmap do próximo trimestre para apresentar ao board. Seu backlog atual tem estas iniciativas previstas:

1. Novo editor de campanhas de WhatsApp com templates visuais
2. Integração com PDV para puxar dados de vendas automaticamente
3. Dashboard de métricas de campanha com gráficos customizáveis
4. Automação de envio por horário de pico

A pressão do board é por crescimento de receita e redução de churn.

#### Perguntas

1. Se você fosse reescrever esse backlog como um roadmap baseado em outcomes, quais outcomes você definiria para o trimestre? (pense em métricas de negócio e de comportamento do usuário)
   *R: Aumento aumento de 10% na taxa de conversão das campanhas após começar a puxar dados de venda e criar campanhas a partir do comportamento dos clientes e envios em horários de pico. Quantidade de campanhas criadas aumento em 5% após nova tela de criação de campanhas e novas dashboards com métricas*
2. Como você priorizaria quais outcomes entram em "Now" vs "Next" sem ter dados completos?
   *R: Now: Aumento na taxa de conversão das campanhas. Next: Aumento das campanhas criadas*
3. Como você explicaria ao board por que o roadmap não tem datas de entrega para as iniciativas de Next/Later?
   *R: Esse trimestre nós iremos focar em aumentar a taxa de conversão dos usuários e aumentar a quantidade de campanhas que cada empresa cria. Primeiro vamos entregar melhorias na taxa de conversão e em seguida iremos implementar melhorias na criação e monitoramento de campanhas para tornar mais fácil e atrativo para o usuário criar mais campanhas.*

> [!example]- 💡 Gabarito (clique para revelar)
>
> **1. Possíveis outcomes para o trimestre:**
> - Aumentar em 25% a proporção de restaurantes que disparam ao menos 2 campanhas/mês (outcome de engajamento → liga ao churn)
> - Reduzir o tempo médio de criação de uma campanha de 15 para 8 minutos (outcome de usabilidade → facilita o engajamento)
> - Aumentar em 15% a receita média por cliente via upsell de canais adicionais (outcome de receita → liga ao crescimento)
>
> Repare que as 4 features listadas podem contribuir para esses outcomes — mas agora a equipe tem liberdade para descobrir *quais* delas são mais eficazes e em qual ordem.
>
> **2. Priorização Now vs Next sem dados completos:**
> - Use sinais de discovery já existentes: tickets de suporte, entrevistas, dados de uso atuais
> - Coloque em "Now" os outcomes que têm ao menos uma hipótese de solução bem fundamentada (ex: se entrevistas mostram que o editor atual é a principal barreira, o outcome de redução de tempo de criação vai para Now)
> - "Next" fica com outcomes que você sabe que importam, mas ainda não sabe *como* atacar melhor — precisam de mais discovery
>
> **3. Como explicar ao board a ausência de datas:**
> Argumento honesto: "Colocar datas em iniciativas de Next e Later seria dar a vocês uma falsa sensação de controle. Em vez disso, estamos comprometidos com esses outcomes e vamos reportar progresso a cada sprint. Se descobrirmos um caminho mais rápido, aproveitamos. Se uma hipótese falhar, pivotamos sem ter 'quebrado o roadmap'."
> Reforce que o que você está entregando é *clareza sobre a direção*, não uma lista de promessas de feature.

---

*Gerado automaticamente em 2026-04-24 · [[Product Manager]] · #article-of-the-day #product-management*

[^1]: Hoje, meu papel é mais de PO, o racional por trás do que vai ser feito nos próximos meses vem do Fernando. Então é muito difícil mudar a mentalidade de feature factory, é melhor eu aprender a jogar o jogo. 

[^2]: Faz sentido mas no meu caso, o Stakeholder principal acaba mandando no produto por ser o CEO e Founder. Então não tem nada escrito em pedra, daqui um mês esse planejamento pode mudar. 

[^3]: Agora eu começo a entender por que times de produtos tem regras de 1 PM para cada engenheiro e cada vez essa proporção diminuí. É tanta coisa para pensar em medir em um único outcome, que vai ficando humanamente impossível controlar vários outcomes ao mesmo tempo. 
