---
title: "Auto-documentação de integrações via Mapper"
date: 2026-03-24
jira: RPD-1874
tags:
  - project
  - area/repediu
  - area/pm
  - status/active
  - decision
---

# Auto-documentação de integrações via Mapper

## Contexto do problema

Hoje a Repediu não tem uma **fonte da verdade confiável** sobre o que cada integração traz. Existem duas tentativas:

1. **Documento no Notion** — preenchido manualmente, depende de alguém atualizando constantemente. Na prática, fica desatualizado.
2. **Cards de integração no painel admin** (`/integrações`) — cada integração tem um card com campos editáveis (módulos, marketplaces, status, padrão push/pull), mas também não está completamente preenchido.

O resultado: ninguém — nem produto, nem devs, nem agências — sabe com certeza quais campos cada integração mapeia (telefone, endereço, histórico de vendas, cupons, etc.).

## Ideia proposta

Usar o **Mapper** que o time de integração já mantém (responsável por mapear os dados que chegam da API parceira para o banco de dados da Repediu) como **fonte de verdade automática**.

**Fluxo conceitual:**
1. O Mapper já sabe quais campos uma integração mapeia (ex: telefone, email, vendas, cupons)
2. O Mapper gera/alimenta um **JSON de capacidades** da integração
3. Esse JSON alimenta automaticamente o **card da integração** no painel admin
4. Se a integração A mapeia `telefone` → o campo aparece como `true` no JSON → card mostra que traz telefone
5. Se a integração B **não** mapeia `telefone` → campo fica como `false` → card mostra que não traz

> [!tip] Princípio
> A própria integração é responsável por se documentar. Nenhum humano precisa manter planilha ou doc.

## Impacto

- **Interno**: time de produto, devs e suporte sabem exatamente o que cada integração entrega
- **Agências**: parceiros que gerenciam a Repediu para clientes conseguem consultar capacidades sem perguntar ao time
- **Qualidade de dados**: facilita identificar gaps (ex: integração X não traz telefone → oportunidade de melhoria)
- **Onboarding de novas integrações**: o processo de documentação vem "de graça" com o desenvolvimento

## Perguntas em aberto

- [ ] Qual o formato ideal do JSON de capacidades? (campos booleanos? objetos com metadados?)
- [ ] O Mapper atual consegue exportar esse JSON ou precisa de adaptação?
- [ ] O card no admin precisa de redesign para consumir esse JSON?
- [ ] Vamos deprecar o documento do Notion ou mantê-lo como referência histórica?

## Referências

- Screenshots do card atual e modal de edição de integração (Dose como exemplo)
- Conversa com time de integração sobre o Mapper
- [[stack-tecnico]] — contexto de integrações da Repediu

---

## Story para o Jira (RPD)

**Título:** Gerar documentação automática de integrações a partir do Mapper

**Tipo:** Story

---

**Como** membro do time de produto ou suporte da Repediu,
**Quero** que cada integração documente automaticamente quais dados ela mapeia (telefone, email, vendas, cupons, etc.) a partir do próprio Mapper,
**Para que** tenhamos uma fonte da verdade sempre atualizada sobre as capacidades de cada integração, eliminando a dependência de documentação manual.

**Contexto / Background:**
Hoje temos um documento no Notion e cards editáveis no painel admin (`/integrações`), mas ambos dependem de atualização manual e estão desatualizados. O time de integração já possui um Mapper que mapeia os campos recebidos de cada parceiro para o banco de dados. A ideia é que esse Mapper alimente automaticamente um JSON de capacidades que popula o card da integração.

---

### Critérios de Aceitação

```gherkin
Scenario: Mapper gera JSON de capacidades ao processar dados
  Given uma integração configurada com Mapper ativo (ex: Dose)
  When o Mapper processa o mapeamento dos campos da integração
  Then um arquivo/registro JSON de capacidades é gerado contendo cada campo mapeado como true e campos não mapeados como false
  And o JSON inclui pelo menos: telefone, email, nome, endereco, vendas, cupom, fidelidade, cashback, leads, avaliacoes

Scenario: Card da integração no admin exibe dados do JSON
  Given que o JSON de capacidades da integração Dose existe e contém {telefone: true, cashback: false}
  When um usuário admin acessa /integrações e abre o card da Dose
  Then o card exibe "Telefone" como dado disponível (com indicador visual positivo)
  And o card exibe "Cashback" como dado não disponível (com indicador visual negativo)

Scenario: Nova integração sem Mapper configurado
  Given uma integração recém-cadastrada que ainda não tem Mapper configurado
  When um usuário admin acessa o card dessa integração
  Then o card exibe uma mensagem indicando "Capacidades ainda não mapeadas"
  And todos os campos do JSON aparecem como false ou "não configurado"

Scenario: Atualização do Mapper reflete automaticamente no card
  Given que a integração B tinha {telefone: false} no JSON
  When o time de integração adiciona o mapeamento de telefone no Mapper da integração B
  Then o JSON de capacidades é atualizado para {telefone: true}
  And o card da integração B passa a exibir "Telefone" como disponível sem intervenção manual
```

---

### 🔒 Considerações de Segurança

- **Isolamento multi-tenant**: o JSON de capacidades é por integração (não por restaurante), mas garantir que a visualização do card respeite as permissões do usuário logado — apenas admins e membros autorizados do time devem editar/ver detalhes técnicos das integrações.
- **Dados expostos**: o JSON não deve conter dados reais de clientes — apenas metadados booleanos sobre quais campos são mapeados. Garantir que nenhum dado pessoal de consumidores (nome, telefone, endereço) vaze no JSON de capacidades.
- **Log de alterações**: registrar quando o JSON de capacidades é atualizado (quem/quando/o que mudou) para rastreabilidade — especialmente útil se algum campo sumir inesperadamente.
- **Validação de input**: se o JSON for gerado automaticamente pelo Mapper, garantir que o formato seja validado antes de persistir (evitar JSON malformado ou injeção de dados).

---

### INVEST Check

- ✅ **Independent** — não depende de outra story não finalizada
- ✅ **Negotiable** — o "como" (formato do JSON, trigger de geração, redesign do card) é negociável com o time
- ✅ **Valuable** — elimina problema crônico de documentação desatualizada
- ✅ **Estimable** — escopo claro: Mapper → JSON → Card
- ⚠️ **Small** — pode precisar ser quebrada em sub-tasks (1. definir schema JSON, 2. adaptar Mapper, 3. adaptar card no admin)
- ✅ **Testable** — cenários Gherkin claros acima

### Sugestão de sub-tasks (se necessário quebrar)

1. **Spike: definir schema do JSON de capacidades** — levantar com o time de integração todos os campos possíveis e definir o formato (Est: S)
2. **Adaptar Mapper para gerar JSON de capacidades** — implementar a geração automática do JSON a partir do mapeamento existente (Est: M)
3. **Adaptar card de integração para consumir JSON** — front-end do card lê o JSON e exibe capacidades visualmente (Est: M)
4. **Migrar integrações existentes** — rodar o novo processo para todas as integrações ativas e validar (Est: S)
