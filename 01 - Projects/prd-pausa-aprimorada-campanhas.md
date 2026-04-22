---
title: "PRD: Pausa Aprimorada de Campanhas"
date: 2026-04-06
tags:
  - project
  - project/campanhas
  - status/active
  - area/pm
  - area/repediu
issues: [RPD-1666, RPD-1525, RPD-1474, RPD-1655, RPD-1580, RPD-1859]
---

# PRD: Pausa Aprimorada de Campanhas

> [!info] Issues relacionadas
> [[RPD-1666]] PAUSA PROGRAMADA · [[RPD-1525]] PROGRAMAR PAUSA DAS CAMPANHAS · [[RPD-1474]] Melhorias para Pausa de Campanha · [[RPD-1655]] Intervalo de Datas para Pausar Campanha · [[RPD-1580]] Botão de Pausar Todas as Campanhas · [[RPD-1859]] Bug de validação de tenant (Done — contexto de segurança)

---

## Problema

O fluxo de pausa de campanhas na Repediu possui dois problemas críticos confirmados por 5 issues independentes de parceiros:

**1. Alto atrito no fluxo de pausa imediata:** pausar uma campanha exige percorrer 3 telas (confirmação → avaliação → motivo com campo de texto obrigatório). Os dados de motivo coletados **não são utilizados em nenhuma análise ou relatório** hoje. O campo "Outros" tem limite de caracteres que não é exibido ao usuário, gerando falhas silenciosas (RPD-1474).

**2. Ausência de pausa programada:** parceiros precisam pausar campanhas manualmente em datas específicas (feriados, fechamento sazonal, obras) e lembrar de reativá-las. O risco de esquecimento gera campanhas disparando para clientes de restaurantes que não estão operando — experiência ruim para o consumidor final e desperdício de mensagens pagas (RPD-1666, RPD-1525, RPD-1655, RPD-1580).

---

## Goals e Métricas de Sucesso

| Goal | Métrica | Linha de base | Alvo |
|------|---------|--------------|------|
| Reduzir atrito na pausa | Tempo médio para pausar uma campanha | ~3 cliques / 3 telas | 1 clique / 1 confirmação |
| Eliminar disparos em dias fechados | Tickets de suporte sobre "campanha disparou fora do horário" | A medir | Redução de 50% em 60 dias |
| Adoção da pausa programada | % de parceiros que usam o recurso em 30 dias | 0% | ≥ 15% |

**Non-goals (fora do escopo desta versão):**
- Pausa global de todas as campanhas com um único botão (RPD-1580) → backlog futuro
- Múltiplos intervalos de pausa por campanha (ex: pausar dias 24, 25 e 26/12 em série) → v2
- Reintrodução da coleta de motivo de pausa (removida por falta de uso dos dados)
- Pausa programada na visão de lista (apenas na visão de cards por ora)

---

## RICE

| Fator | Score | Notas |
|-------|-------|-------|
| Reach | 7/10 | Afeta todos os ~7.000 parceiros que gerenciam campanhas ativas |
| Impact | 2/3 | Reduz atrito crítico + previne disparos indesejados em dias fechados |
| Confidence | 80% | 6 issues independentes reportando a mesma dor; dor clara e bem documentada |
| Effort | ~3 person-weeks | 2 stories de frontend + 1 backend (job + 2 campos no DB) |
| **RICE Score** | **≈ 3.7** | (7 × 2 × 0.8) / 3 |

---

## Contexto Técnico — Nekt (DB)

A tabela `campaigns` já possui campos relevantes:

```sql
-- Campos existentes (confirmado via Nekt)
suspended          BOOLEAN       -- flag de pausa atual
suspended_at       TIMESTAMP     -- quando foi pausada
active             BOOLEAN       -- se a campanha está ativa
inactive_at        TIMESTAMP     -- quando foi desativada
start_date         TIMESTAMP     -- data início da campanha (uso operacional)
end_date           TIMESTAMP     -- data fim da campanha (uso operacional)
group_id           VARCHAR       -- tenant identifier (multi-tenant)
```

A tabela `reason_campaigns_deactivation` registra os motivos de pausa atuais. Com a simplificação do fluxo, novos registros não serão criados — a tabela pode ser mantida para histórico.

**Mudanças de DB necessárias para pausa programada:**

```sql
ALTER TABLE campaigns
  ADD COLUMN scheduled_pause_start_at TIMESTAMP NULL,
  ADD COLUMN scheduled_pause_end_at   TIMESTAMP NULL;
```

**Job (cron — sugestão de execução a cada 5 minutos):**

```
1. Ativar pausa programada:
   WHERE scheduled_pause_start_at <= NOW()
     AND scheduled_pause_end_at > NOW()
     AND suspended = false
   → SET suspended = true, suspended_at = NOW()

2. Reativar campanhas após fim da pausa:
   WHERE scheduled_pause_end_at <= NOW()
     AND suspended = true
     AND scheduled_pause_end_at IS NOT NULL
   → SET suspended = false,
         scheduled_pause_start_at = NULL,
         scheduled_pause_end_at = NULL
```

> [!warning] Atenção ao multi-tenant
> O job **deve filtrar por `group_id`** em qualquer query que envolva campanhas de múltiplos tenants. Não processar campanhas em lote sem validação de tenant é o mesmo padrão de vulnerabilidade descrito no RPD-1859 (já resolvido).

---

## User Stories

---

### Story 1 — Pausa imediata simplificada
*Consolida: RPD-1474*

**Título:** Simplificar fluxo de pausa imediata de campanha

Como **parceiro Repediu** (operador do painel),
quero **pausar uma campanha com um único clique de confirmação**,
para que **eu possa reagir rapidamente a situações operacionais sem percorrer múltiplas telas.**

**Contexto:** Hoje o fluxo de pausa exige 3 telas: (1) confirmação, (2) avaliação da campanha com pergunta "foi útil?", (3) motivo em texto livre obrigatório com limite de caracteres oculto. Os dados coletados não são usados em nenhum relatório. O campo de motivo já causou falhas silenciosas (RPD-1474).

#### INVEST
- [x] Independente — não depende de outra story não concluída
- [x] Negociável — a implementação do modal pode variar
- [x] Valioso — reduz atrito direto no fluxo crítico de pausa
- [x] Estimável — alteração de frontend (remoção de telas) + remoção do POST para `reason_campaigns_deactivation`
- [x] Small — 1–2 dias de frontend
- [x] Testável — fluxo de pausa pode ser testado end-to-end

#### Critérios de Aceite

```gherkin
Scenario: Parceiro pausa campanha pelo menu de contexto
  Given o parceiro está na listagem de campanhas (visão cards ou lista)
    And a campanha está com status "Ativa"
  When o parceiro clica nos 3 pontos (⋮) da campanha
    And seleciona a opção "Pausar"
  Then exibe um modal de confirmação com:
       - Título: "Pausar campanha?"
       - Subtítulo: "A campanha ficará inativa até você reativá-la manualmente."
       - Botão "Cancelar" (texto, sem ação)
       - Botão "Pausar agora" (contained, vermelho)
       - Nenhum campo de motivo ou avaliação

Scenario: Pausa confirmada com sucesso
  Given o modal de confirmação está aberto
  When o parceiro clica em "Pausar agora"
  Then a campanha muda para status "Pausada" visualmente em < 2 segundos
    And exibe toast: "Campanha pausada com sucesso."
    And o modal fecha automaticamente
    And o status na listagem atualiza sem recarregar a página

Scenario: Parceiro cancela a pausa
  Given o modal de confirmação está aberto
  When o parceiro clica em "Cancelar" ou no X do modal
  Then o modal fecha sem alterar o status da campanha

Scenario: Erro ao pausar (falha de rede ou servidor)
  Given o modal de confirmação está aberto
  When o parceiro clica em "Pausar agora"
    And a API retorna erro (timeout ou 5xx)
  Then exibe toast de erro: "Não foi possível pausar a campanha. Tente novamente."
    And o modal permanece aberto para nova tentativa
    And o status da campanha não é alterado
```

#### 🔒 Security Considerations

- **Authorization:** A ação de pausa deve verificar que o `company_id` / `group_id` da campanha pertence ao tenant do usuário autenticado. Replicar a correção do RPD-1859 para este endpoint.
- **Audit trail:** Registrar o evento de pausa em `campaign_events` com `event_type = 'paused'`, `user_id` e timestamp. Necessário para rastreabilidade e suporte.
- **Rate limiting:** Considerar limite de pausas/reativações em sequência rápida para evitar abuso automatizado via API.

---

### Story 2 — Programar pausa com data de início e fim
*Consolida: RPD-1666, RPD-1525, RPD-1655*

**Título:** Programar pausa futura de campanha com data de início e fim

Como **parceiro Repediu** (operador do painel),
quero **agendar uma pausa de campanha com data e hora de início e fim**,
para que **o sistema pause e reative automaticamente a campanha no período certo, sem eu precisar lembrar de fazer isso manualmente.**

**Contexto:** Parceiros com operações sazonais (feriados, reformas, eventos) precisam pausar campanhas em datas específicas. Hoje fazem isso manualmente, correndo risco de esquecer de reativar (RPD-1666, RPD-1525). Um parceiro descreveu especificamente querer pausar uma campanha que "roda fulltime" apenas no dia 24/12 (RPD-1655).

#### INVEST
- [x] Independente — não depende da Story 1 (podem coexistir)
- [x] Negociável — granularidade da data (hora ou só dia) pode ser ajustada
- [x] Valioso — elimina risco operacional real de disparos em dias fechados
- [x] Estimável — 2 campos de DB + job + modal frontend ≈ 3–5 dias
- [x] Small — escopo limitado a uma pausa por campanha (múltiplos intervalos é v2)
- [x] Testável — pode ser testado com datas passadas no ambiente de staging

#### Critérios de Aceite

```gherkin
Scenario: Parceiro acessa a opção de programar pausa
  Given o parceiro está na listagem de campanhas
    And a campanha está com status "Ativa"
  When o parceiro clica nos 3 pontos (⋮) da campanha
  Then o menu de contexto exibe as opções:
       - Editar
       - Duplicar
       - Pausar
       - Programar pausa  ← nova opção
       - Ver histórico
    And "Programar pausa" está habilitada apenas para campanhas com status "Ativa" ou "Agendada"

Scenario: Parceiro programa uma pausa futura válida
  Given o parceiro clicou em "Programar pausa"
  Then abre um modal com:
       - Título: "Programar pausa"
       - Campo "Pausar em:" com date-time picker (DD/MM/YYYY HH:mm)
       - Campo "Reativar em:" com date-time picker (DD/MM/YYYY HH:mm)
       - Botão "Cancelar" (texto)
       - Botão "Salvar programação" (contained, vermelho)
  When o parceiro preenche "Pausar em: 24/12/2026 00:00"
    And "Reativar em: 25/12/2026 00:00"
    And clica em "Salvar programação"
  Then exibe toast: "Pausa programada para 24/12/2026."
    And o modal fecha
    And a campanha exibe badge "Pausa programada" na listagem
    And ao hover no badge, exibe tooltip: "Pausa de 24/12 às 00:00 até 25/12 às 00:00"

Scenario: Data de fim anterior à data de início
  Given o parceiro está preenchendo o modal de programar pausa
  When o parceiro define "Reativar em" com data anterior a "Pausar em"
  Then o botão "Salvar programação" permanece desabilitado
    And exibe mensagem inline: "A data de reativação deve ser posterior à data de pausa."

Scenario: Data de início no passado
  Given o parceiro está preenchendo o modal de programar pausa
  When o parceiro define "Pausar em" com data e hora anterior ao momento atual
  Then exibe mensagem inline: "A data de pausa deve ser no futuro."
    And o botão "Salvar programação" permanece desabilitado

Scenario: Job ativa a pausa programada no horário correto
  Given uma campanha tem scheduled_pause_start_at = T
    And o sistema está operando normalmente
  When o job de pausa executar após o horário T
  Then a campanha muda para suspended = true
    And um evento é registrado em campaign_events com event_type = 'scheduled_pause_activated'
    And o status na UI muda para "Pausada" na próxima visita do parceiro

Scenario: Job reativa a campanha ao fim da pausa programada
  Given uma campanha está suspensa com scheduled_pause_end_at = T
  When o job de pausa executar após o horário T
  Then a campanha muda para suspended = false
    And scheduled_pause_start_at e scheduled_pause_end_at são limpos (NULL)
    And um evento é registrado: event_type = 'scheduled_pause_ended'
    And o badge "Pausa programada" é removido da listagem na próxima visita

Scenario: Campanha já possui pausa programada
  Given a campanha já tem uma pausa programada configurada
  When o parceiro abre o menu de contexto
  Then a opção "Programar pausa" exibe "Editar pausa programada"
    And ao clicar, abre o modal com os valores atuais pré-preenchidos
    And há um botão "Remover programação" (texto, cor cinza) para cancelar a pausa
```

#### 🔒 Security Considerations

- **Authorization:** As queries do job devem **sempre filtrar por `group_id`** para evitar que o processamento em lote de um tenant afete campanhas de outro. Ver RPD-1859.
- **Input validation:** As datas recebidas pela API devem ser validadas como timestamps válidos, futuros, e com fuso horário explícito (sugestão: armazenar sempre em UTC, exibir em `America/Sao_Paulo`).
- **Audit trail:** O job deve registrar em `campaign_events` cada ativação e desativação automática, incluindo o motivo `scheduled`. Isso é essencial para rastreabilidade de suporte ("minha campanha foi pausada sozinha").
- **Idempotência do job:** O job deve ser idempotente — se executar duas vezes no mesmo intervalo, não deve pausar/reativar duas vezes nem criar eventos duplicados. Usar `scheduled_pause_start_at` como flag de controle.
- **Data exposure:** O campo `scheduled_pause_start_at` e `scheduled_pause_end_at` não devem ser expostos em endpoints públicos ou em respostas de API que não exijam autenticação.

---

### Story 3 — Visualizar e cancelar pausa programada
*Consolida: RPD-1666, RPD-1525 (fluxo de gestão)*

**Título:** Visualizar e cancelar uma pausa programada de campanha

Como **parceiro Repediu**,
quero **ver quando uma campanha tem uma pausa programada e poder cancelá-la facilmente**,
para que **eu mantenha controle sobre a agenda das campanhas sem precisar lembrar do que programei.**

**Contexto:** Complementar obrigatório da Story 2. Uma pausa programada sem visibilidade e cancelamento cria confusão — o parceiro não saberá por que a campanha pausou "sozinha".

#### Critérios de Aceite

```gherkin
Scenario: Badge de pausa programada na listagem (cards)
  Given uma campanha tem scheduled_pause_start_at no futuro
    And status é "Ativa"
  Then exibe badge "Pausa programada" abaixo do status da campanha
    And o badge usa cor laranja (#FFAB00) para distinguir de "Pausada" (cinza)
    And ao hover, exibe tooltip com as datas

Scenario: Badge de pausa ativa (pausa programada em curso)
  Given uma campanha foi pausada por uma pausa programada (scheduled_pause_start_at <= NOW() <= scheduled_pause_end_at)
  Then exibe badge "Pausada automaticamente" em cinza
    And ao hover, exibe: "Retoma em [data de reativação]"

Scenario: Cancelar pausa programada pelo menu de contexto
  Given a campanha tem pausa programada
  When o parceiro acessa o menu ⋮ > "Editar pausa programada"
    And clica em "Remover programação"
  Then exibe confirmação: "Remover a pausa programada?"
    And se confirmado, os campos scheduled_pause_start_at e scheduled_pause_end_at são zerados
    And o badge desaparece da listagem
    And toast: "Pausa programada removida."
```

#### 🔒 Security Considerations

- **Authorization:** O cancelamento de pausa programada deve verificar que o `group_id` da campanha pertence ao tenant do usuário. Mesma regra do RPD-1859.
- **Audit trail:** Registrar cancelamento de pausa programada em `campaign_events` com `event_type = 'scheduled_pause_cancelled'` e `user_id`.

---

## Fluxo Atual vs. Fluxo Proposto

### Pausa imediata hoje:
```
Clique em "Pausar" → Tela 1: Confirmação → Tela 2: Avaliação ("foi útil?")
→ Tela 3: Motivo (texto obrigatório, limite oculto) → Campanha pausada
```
**3 telas, ~30 segundos, dados de motivo não utilizados**

### Pausa imediata proposta:
```
Clique em "Pausar" → Modal: Confirmação simples → Campanha pausada
```
**1 modal, ~5 segundos**

### Nova opção: Pausa programada:
```
Clique em "Programar pausa" → Modal: data início + data fim → Salvar
→ Job ativa pausa no horário correto → Job reativa no horário correto
```

---

## Diagrama de Estados da Campanha

```
          ┌─────────────────────────────────────────┐
          │                                         │
    [Ativa] ──── Pausar ────────────────────> [Pausada]
          │                                     │
          │ ◄── Reativar ──────────────────────┘
          │
          │ ──── Programar pausa ──────> [Ativa + badge "Pausa programada"]
          │                                         │
          │                              (job ativa no horário)
          │                                         │
          │ ◄──────────── job reativa ──── [Pausada automaticamente]
```

---

## Perguntas em Aberto

- [ ] **Fuso horário:** Armazenar em UTC e exibir em `America/Sao_Paulo`? Ou permitir que o parceiro selecione o fuso? — Owner: Lucas + Eng — Due: antes do refinamento técnico
- [ ] **Granularidade de tempo:** O date-time picker deve incluir hora e minuto, ou apenas data (dia inteiro)? A RPD-1655 sugere hora. — Owner: Lucas — Due: refinamento
- [ ] **Notificação:** Enviar notificação ao parceiro quando a pausa programada ativar/desativar? (ex: e-mail, push ou notificação no painel) — Owner: Lucas — Due: v2
- [ ] **Pausa durante agendamento:** Se uma campanha tem disparos agendados durante uma pausa programada, o que acontece? As mensagens são descartadas ou fila? — Owner: Eng — Due: antes da implementação
- [ ] **Limite de pausas programadas:** Uma campanha pode ter N pausas no futuro? Para v1, assumir máximo de 1 pausa ativa por vez. Confirmar. — Owner: Lucas + Eng

---

## Fora do Escopo (v1)

- Pausa global de todas as campanhas de um parceiro com um clique (RPD-1580)
- Múltiplos intervalos de pausa por campanha (RPD-1655 — variante avançada)
- Recoletar motivo de pausa de qualquer forma
- Pausa programada por horário de funcionamento (ex: não disparar fora do horário comercial — isso é `campaign_hours`, funcionalidade separada)
