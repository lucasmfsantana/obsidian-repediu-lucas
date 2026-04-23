---
title: Integração MultiPedidos
date: 2026-03-30
tags:
  - resource
  - area/repediu
  - integração/multipedidos
---

Documentação operacional da integração Repediu <> MultiPedidos. Campos da API, endpoints relevantes e comportamentos observados.

## Campos de cashback na API

Confirmado por Marlon (MultiPedidos) em 30/03/2026 via WhatsApp.

### Campos no objeto `order`
- **`cashbackEarned`** — cashback que o cliente ganhou naquela compra específica
- **`cashbackSpent`** — cashback que o cliente usou/resgatou naquele pedido

### Saldo, expiração e datas do cliente

Para pegar o **saldo atualizado**, **data de expiração** e **saldo pendente** do cashback do cliente:

```
GET /restaurant/{restaurantID}/cashback/{clientID}/balance
```

Retorna:
- `balance` — saldo de cashback disponível
- `pendingBalance` — saldo pendente (cashback ainda não aprovado)
- `expirationDate` — data de expiração do cashback

Para obter **`updatedAt`** e **`createdAt`** da conta de cashback do cliente:

```
POST /restaurant/{restaurantID}/cashback/accounts
```

## Contexto do uso

- Issue relacionada: **RPD-1552** — Tag de cashback na MultiPedidos (dev: Anderson Kawano)
- Integração inclui pontos de fidelidade (implementação anterior) e cashback (em desenvolvimento em março/2026)
- A API MultiPedidos não possui documentação pública — consultas são feitas diretamente ao time deles via WhatsApp

## Contatos

- **Marlon** (+55 47 8469-1826) — dev/técnico, responde dúvidas de API
- Grupo: **Integração Repediu <> Multipedidos** (WhatsApp)
