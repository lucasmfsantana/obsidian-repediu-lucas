---
title: Integração Open Delivery — API Repediu (Passo a Passo)
date: 2026-04-23
tags:
  - resource
  - area/repediu
  - integração/open-delivery
  - status/active
---

# Integração Open Delivery — API Repediu

Documento de referência para o processo oficial de uso da API da Repediu por parceiros que utilizam o padrão Open Delivery. Extraído da troca de e-mails com Gabriel Alves (Cowtelo Burger, gabriel@cowtelo.com) em 22-23/04/2026.

> [!important] A Repediu adota o **padrão Open Delivery**, mas os endpoints são os **da API própria da Repediu** — não os do protocolo Open Delivery genérico. Parceiros que tentarem usar os endpoints `/v1/events:polling`, `/v1/merchant`, etc., receberão HTTP 500.

---

## Passo a passo: Como acessar a API da Repediu via Open Delivery

### 1. Obter as credenciais dentro da Repediu

1. Acesse a Repediu e verifique se está em **rede ou unidade** (canto superior esquerdo — nome da empresa)
2. Selecione a **unidade** que deseja configurar o Open Delivery
3. Vá em **Integrações > Fonte de dados** e pesquise por **"Open Delivery"**
4. Clique em **Habilitar**
5. Copie o `client_id` e o `client_secret`
   - Se não existir `client_secret`, clique em **Gerar**

> [!warning] O `client_id` e `client_secret` são gerados **dentro da Repediu**, não fornecidos pelo protocolo Open Delivery externo.

---

### 2. Autenticar e obter o token

Faça uma requisição **POST** para:

```
https://public-api.repediu.com.br/authentication/users/accessToken
```

**Body (JSON):**
```json
{
  "clientId": "{{client_id}}",
  "clientSecret": "{{client_secret}}"
}
```

O retorno será um **Bearer token** para uso nas requisições seguintes.

> [!warning] O token tem duração de **30 minutos** — precisa ser renovado periodicamente.

---

### 3. Buscar as vendas

Faça uma requisição **GET** para:

```
https://public-api.repediu.com.br/sales?Page=1&PageSize=5
```

**Header obrigatório:**
```
Authorization: Bearer {{token}}
```

A consulta é **paginada** — use os parâmetros `Page` e `PageSize` para navegar pelos resultados.

Documentação completa: **https://api-docs.repediu.com.br/**

---

## Limitações e comportamentos conhecidos

### Saipos — múltiplas lojas no iFood
A integração com a Saipos busca **tudo o que o token gerado por eles fornece** — a API da Saipos não oferece distinção de loja ou marca nativamente. Workaround: em alguns casos, a Saipos pode gerar tokens separados por loja. Nesse cenário, cada token traria apenas as vendas da loja correspondente.

### Dados divergentes em abril (dias 17-19/04)
Gabriel Alves reportou dados fora da realidade para o período 17-19/04/2026 ao comparar a API com fontes externas. O próximo passo é entender como ele está realizando a soma e com qual fonte está comparando.

> [!todo] Pendência aberta (23/04): Solicitar a Gabriel detalhes de como ele está somando as vendas e qual fonte está usando para comparação.

---

## Contexto do parceiro

- **Parceiro:** Cowtelo Burger — Cordeiro, Recife/PE
- **Contato:** Gabriel Alves (CEO) — gabriel@cowtelo.com — (81) 98268-6862
- **client_id no sistema:** 3241
- **Objetivo do parceiro:** Consumir eventos em tempo real + puxar detalhes de pedidos via API para montar dashboard de previsão de vendas (canal, bairro, cliente, cancelamento)
- **Status em 23/04:** Conseguiu acessar e puxar dados via API ✅ — questionamento sobre divergência nos dados de abril em aberto

---

## Erro comum: HTTP 500 nos endpoints Open Delivery genéricos

**Sintoma:** Parceiro usa os headers `X-App-Id` e `X-App-MerchantId` com os endpoints do protocolo Open Delivery padrão e recebe 500.

**Causa:** A Repediu adota o padrão Open Delivery mas expõe sua **própria API** — não o protocolo Open Delivery público diretamente.

**Solução:** Usar os endpoints `public-api.repediu.com.br` conforme o passo a passo acima.

_Ver também: [[integracoes-status-parceiros]] para status atual de todos os parceiros Open Delivery._
