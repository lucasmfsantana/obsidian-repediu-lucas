---
title: Integração Cloudfy
date: 2026-03-23
tags:
  - llm-context
  - business
  - integração/cloudfy
---

# Integração Cloudfy

Documento de referência sobre a integração entre a Repediu e a Cloudfy (sistema de PDV/ERP). Dev responsável: Anderson Kawano (Han).

## Status atual

Em desenvolvimento. Previsão de ~2 semanas para produção (estimativa de 23/03/2026).

## Limitações da API da Cloudfy

- **Rate limit**: 7 requisições por empresa por hora (168/dia). Limite é regra da Cloudfy, não da Repediu — é definitivo e não negociável.
- **Restrição de horário**: consultas à API só podem ser feitas após as 16h.
- **Histórico**: originalmente planejado para 3 anos, reduzido para **1 ano** devido ao rate limit.
- **Carga inicial**: ~1 ano de dados processado por dia → **3 a 5 dias** para puxar o histórico completo de um cliente.

## Decisões de produto

- Integração será **100% via API** (não por arquivo/CSV — alternativa descartada por ser impraticável para o cliente).
- Será adicionado um **aviso no card da integração** na Repediu informando que a Cloudfy pode levar mais tempo que outras integrações por conta do rate limit da API deles.
- O processo de carga não requer solicitação manual do cliente — é automático após ativação.

## Contexto técnico

- Anderson (Han) tem um "projeto genérico para integrações via arquivo" que poderia ser reaproveitado, mas foi descartado para a Cloudfy porque o formato de dados pode variar (CSV inconsistente).
- A Cloudfy respondeu com um documento "Regras Api.txt" detalhando as restrições (compartilhado no Slack em 19/03/2026).

## Links relacionados

- [[WhatsApp API oficial]] — outro canal com limitações de rate limit semelhantes
- [[meu-papel-como-pm]] — integrações estão no meu escopo
