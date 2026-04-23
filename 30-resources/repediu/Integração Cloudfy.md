---
title: Integração Cloudfy
date: 2026-04-14
tags:
  - resource
  - area/repediu
  - integração/cloudfy
---

# Integração Cloudfy

Referência operacional sobre o comportamento da integração Cloudfy na Repediu — limitações técnicas, comportamento esperado e pontos de atenção para suporte e vendas.

## O que é a Cloudfy

Sistema de PDV/gestão para restaurantes. A Repediu se integra com a Cloudfy para puxar o histórico de vendas e montar a base de clientes para campanhas.

## Limitação de busca de histórico (rate limit)

> [!warning] **A Cloudfy limita a quantidade de vendas retornadas por requisição.**

A API da Cloudfy não permite buscar todo o histórico de uma vez. A integração faz buscas em lotes (busca binária), o que torna o processo **muito lento para restaurantes com grande volume de vendas**.

- **Tempo estimado para puxar histórico completo: 3 a 5 dias**, dependendo do volume de transações do restaurante.
- Restaurantes com 30.000+ vendas no histórico levam mais tempo.
- Durante esse período, a tela de canais de venda (`/sales/channels`) pode parecer vazia ou incompleta — **isso é comportamento esperado, não é bug**.

**O que fazer:** informar ao parceiro/vendedor que o carregamento do histórico demora e que um aviso será exibido na plataforma (RPD pendente). O restaurante já pode ser habilitado para vendas enquanto o histórico carrega.

## Comportamento esperado ao ativar um cliente Cloudfy

1. Integração é ativada na Repediu.
2. Processo de busca do histórico começa automaticamente — pode levar de 3 a 5 dias.
3. A tela de canais de venda (`/sales/channels`) ficará vazia ou incompleta durante esse período.
4. O restaurante já pode usar a Repediu para envio de campanhas com a base de clientes que for sendo carregada progressivamente.
5. Ao final, o histórico completo estará disponível.

## Contas inativas (mais de 90 dias)

Contas que ficaram inativas por **mais de 90 dias não podem ser reativadas** na Repediu. É necessário **começar do zero** — criar uma nova conta/integração. Não existe processo de reativação.

## Tela de canais de venda não carrega

Se a tela `/sales/channels` não carrega para um cliente Cloudfy:

1. Verificar se o histórico ainda está sendo carregado (primeiros dias após ativação → comportamento esperado).
2. Verificar se todas as vendas estão sendo enviadas com canal de venda preenchido. Vendas sem canal ficam fora da tela.
3. Verificar se há problemas de sincronização com o banco de dados da integração (acionar dev — Anderson Kawano).

**Caso conhecido (14/04/2026):** Cliente Define (ID 7639) — tela não carregava porque as vendas estavam sendo enviadas todas com o mesmo canal. Anderson investigou e concluiu que o problema era de sincronização do lado do cliente, não da integração Repediu → issue RPD-1996.

## Issues relacionadas

- **RPD-1996** — Bug: Falha no carregamento na tela de canais de venda (Company ID 7639 / Define)
