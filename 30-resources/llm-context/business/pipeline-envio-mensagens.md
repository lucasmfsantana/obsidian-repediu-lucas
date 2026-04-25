---
title: Pipeline de Envio de Mensagens — E-mail e SMS
date: 2026-04-24
tags:
  - llm-context
  - resource
  - area/repediu
  - canal/sms
  - canal/email
---

# Pipeline de Envio de Mensagens — E-mail e SMS

Contexto sobre como funciona o envio de mensagens transacionais e de campanha via SMS e e-mail na Repediu, incluindo comportamentos de erro, decisões de produto e histórico de incidentes.

## Canais suportados

A Repediu suporta múltiplos canais de envio para campanhas e jornadas: WhatsApp (não oficial e oficial), SMS e e-mail. Cada canal tem seu próprio projeto/serviço de envio.

## Como funcionam Campanhas vs. Jornadas

- **Campanhas avulsas**: disparo pontual para um segmento de clientes, criado manualmente na plataforma.
- **Jornadas (Journeys)**: fluxos automatizados de mensagens disparadas por gatilho (ex: cliente sem pedido há X dias, aniversariante). As mensagens de jornada são registradas em `journey_messages`, não em campanhas.
- **Ponto de confusão frequente**: quando o suporte recebe reclamação de "SMS enviado sem campanha", pode ser uma mensagem de jornada ativa. Para investigar, verificar a tabela `journey_messages` no Nekt com o texto exato da mensagem.

### Exemplo real (24/04/2026)
> A Brenari recebeu SMS "15% OFF disponível para você, somente 24h! cupom: RETORNO15". O suporte achou que não havia campanha. Na verdade era a Journey "120dias+" (ID `0d176e98-fe64-4852-bac8-900230c5e1ff`), status ativa, canal SMS, com 782 disparos desde 26/02/2026.

## Infraestrutura de envio

- E-mails são enviados via **AWS SES**. É possível verificar o volume de envios das últimas 24h no painel da AWS.
- SMS usa um provedor externo; os registros de envio ficam na tabela do banco de dados da Repediu.
- Variáveis de ambiente controlam a conexão dos serviços de envio. Se uma variável estiver faltando, o serviço falha silenciosamente em produção.

## Comportamento em caso de erro

### Incidente de 22–24/04/2026
Uma variável de ambiente ficou faltando no projeto de envio após o deploy que incluiu a feature de "unsubscribe" (por volta de quarta-feira, 22/04).

- **E-mail**: cobrava créditos do cliente mas não conseguia enviar a mensagem. Zero e-mails enviados nas 24h anteriores à descoberta.
- **SMS**: cobrava créditos e enviava a mensagem, mas não conseguia inserir o registro no banco de dados. Resultado: mensagens duplicadas enviadas repetidamente. Estimativa inicial: ~17k mensagens, das quais ~6.481 duplicadas.

**Solução imediata**: Wudson corrigiu a variável de ambiente e planejou inserção manual dos registros faltantes no banco (análise detalhada na semana seguinte).

## Decisão de produto — pausa automática em caso de erro

**Decisão tomada em 24/04/2026** (Wudson + Caique):

> Quando ocorrer qualquer erro inesperado no pipeline de envio, o sistema deve pausar automaticamente **todos os envios do canal afetado**.

Motivação: sem observabilidade adequada dos serviços de envio, o suporte só descobre o problema quando o impacto já é grande. É preferível receber reclamação de "não está enviando" do que ter mensagens duplicadas em massa ou cobranças indevidas.

## Observabilidade atual (limitações)

- Não há alertas automáticos quando o pipeline de envio falha.
- O monitoramento é reativo: o problema é detectado quando clientes reclamam ao suporte.
- A AWS SES oferece relatórios de volume que podem ser consultados manualmente.
- Wudson usa a "Ótima" (ferramenta interna de analytics) para análise post-mortem.

## Pontos de atenção para PM

- Sempre que houver reclamação de "mensagem enviada sem campanha", investigar jornadas ativas antes de concluir que é um bug.
- Deploys que alterem variáveis de ambiente devem ter checklist de validação de envio logo após.
- O projeto de melhoria de observabilidade dos canais de envio está associado ao incidente acima e deve ser priorizado no backlog.
