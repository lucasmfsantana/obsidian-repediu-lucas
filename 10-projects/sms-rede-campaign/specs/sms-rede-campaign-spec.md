---
title: "Spec: Campanhas SMS no nível da Rede"
date: 2026-03-28
tags:
  - spec
  - project/sms
  - area/repediu
  - status/active
---

# Spec: Campanhas SMS no nível da Rede (multi-loja)

## 1. Problema

Hoje a Repediu permite criar campanhas de WhatsApp no nível da **Rede** (`group_id`), selecionando quais lojas (`company_id`) participam. Para **SMS**, isso não existe — campanhas só podem ser criadas no nível da loja individual.

Isso obriga operadores de redes a criar manualmente uma campanha de SMS em cada loja, o que é inviável para redes com muitas unidades.

> [!note] Evidência no banco
> Das 2.102 campanhas de SMS existentes, **nenhuma** possui `group_id` preenchido, e a média é de exatamente 1 loja por campanha. Em contraste, campanhas de WhatsApp possuem média de 1,55 lojas/campanha com 2.851 campanhas criadas em nível de Rede.

## 2. Objetivo

Permitir que um operador de marketing de uma rede crie uma campanha de SMS no painel da Rede, selecionando quais lojas participam — **idêntico ao fluxo já existente para WhatsApp**.

### Não-objetivos (fora de escopo)

- Alterar o fluxo de criação de campanha SMS no nível da loja individual (permanece como está)
- Validar se a loja tem `sms_settings` configurado (pré-requisito separado)
- Criar novos componentes de UI — o seletor de empresas já existe no WhatsApp e deve ser reutilizado

## 3. Modelo de dados

### Tabelas envolvidas

```
campaigns
├── id (PK)
├── group_id (FK → groups) ← HOJE É NULL PARA SMS, PRECISA SER PREENCHIDO
├── channel ('SMS')
├── name, status, scheduled_at, ...
└── ...

campaign_companies
├── campaign_id (FK → campaigns)
├── company_id (FK → empresas)
└── ...
↑ JÁ EXISTE e é usado por WhatsApp. SMS precisa usar o mesmo mecanismo.

empresas
├── id (PK, = company_id)
├── idgrupo (FK → groups, = group_id)
└── ...
```

### Fluxo de dados esperado

1. Usuário cria campanha SMS na Rede → `campaigns.group_id` = ID da rede
2. Usuário seleciona lojas → inserir registros em `campaign_companies` (um por loja)
3. No disparo, o sistema itera sobre `campaign_companies` e envia SMS para clientes de cada loja selecionada

> [!important] Referência de implementação
> O fluxo de WhatsApp já implementa exatamente essa lógica. O dev deve usar o código de criação de campanha de WhatsApp na Rede como referência direta.

## 4. Interface

### Tela atual (SMS na loja)

A tela de "Nova campanha de SMS" na loja **não muda**. Ela continuará funcionando como hoje.

### Nova tela (SMS na Rede)

Quando o usuário está no painel da **Rede** e clica em criar campanha de SMS, a tela deve incluir:

- **Seletor de empresas** (mesmo componente usado em campanhas de WhatsApp na Rede — ver seção `Comunicação > Empresas` na tela de WhatsApp)
- O seletor deve listar todas as lojas da rede (`empresas` com `idgrupo = group_id` do usuário)
- Os demais campos permanecem iguais: nome da campanha, agendamento, definições, investimento (cupom), audiência, anúncio, limite de mensagens

> [!tip] Componente existente
> O componente de seletor de empresas já existe no frontend para campanhas de WhatsApp. Reutilizar o mesmo componente, apenas integrando-o na tela de criação de campanha SMS quando o contexto é Rede.

## 5. Regras de negócio

| Regra | Descrição |
|---|---|
| **Criação na Rede** | Quando `group_id` está presente no contexto, a campanha é criada com `campaigns.group_id` preenchido e registros em `campaign_companies` |
| **Criação na loja** | Fluxo atual, sem alteração. `group_id = null`, um único registro em `campaign_companies` |
| **Seleção de lojas** | O usuário deve selecionar pelo menos 1 loja. Validação no frontend e backend |
| **Disparo** | O sistema deve iterar sobre `campaign_companies` para determinar quais lojas participam, respeitando a base de clientes de cada loja |
| **Retrocompatibilidade** | Campanhas SMS existentes (sem `group_id`) continuam funcionando normalmente |

## 6. Segurança

### Isolamento multi-tenant

O seletor de lojas no frontend deve exibir **somente** lojas pertencentes ao `group_id` do usuário logado. A query no backend **deve filtrar por `group_id`** — nunca confiar apenas no frontend para essa restrição.

```sql
-- Exemplo: buscar lojas da rede para o seletor
SELECT id, nome FROM empresas WHERE idgrupo = :user_group_id
```

### Log de auditoria

Registrar qual usuário criou a campanha na Rede e quais lojas foram selecionadas, para rastreabilidade.

## 7. Checklist de implementação

- [ ] Backend: aceitar `group_id` na criação de campanha SMS (endpoint de criação de campanha)
- [ ] Backend: inserir registros em `campaign_companies` ao criar campanha SMS na Rede
- [ ] Backend: validar que `company_ids` enviados pertencem ao `group_id` do usuário
- [ ] Backend: garantir que o disparo de SMS itera sobre `campaign_companies`
- [ ] Frontend: exibir seletor de empresas na tela de criação de campanha SMS quando contexto = Rede
- [ ] Frontend: reutilizar componente de seletor de empresas do WhatsApp
- [ ] Frontend: validar que pelo menos 1 loja foi selecionada antes de publicar
- [ ] Teste: criar campanha SMS na Rede com múltiplas lojas e verificar disparo correto
- [ ] Teste: verificar que campanha SMS na loja individual continua funcionando (retrocompatibilidade)
- [ ] Teste: verificar isolamento multi-tenant (rede A não vê lojas da rede B)
