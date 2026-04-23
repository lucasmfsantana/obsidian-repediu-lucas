---
title: Agenda de Reuniões e Modelo de Gestão
tags:
  - llm-context
  - area/repediu
  - meetings
updated: 2026-03-16
---

# Agenda de Reuniões e Modelo de Gestão

## Cadência de reuniões (a partir de março/2026)

- **Reunião semanal de lideranças (War Room)** — Todas as segundas-feiras. Participam todos os heads + diretoria (Fernando Nogarini). Formato: cada líder apresenta seu scorecard semanal e aprofunda discussão sobre bloqueios. Não é conversa aberta — é gestão por números.
- **Alinhamento com CEO (1:1 Fernando)** — Todas as terças-feiras. Participam Lucas (PM) e Fernando Nogarini (CEO). Pauta fixa: visão de produto e direção (Fernando), status dos devs gerenciados por Fernando, status dos devs sob gestão do Lucas (backlog, entregas), qualidade das entregas. Template: `Template - Alinhamento CEO.md`. Notas em `02 - Areas/Reuniões/`.
- **GRC Semanal (Elton)** — Todas as sextas-feiras. Participam Lucas (PM), Elton Monteiro (Head Tech/Infra/Governança), Caíque, Lucas Palacios, Luis. Foco: governança, risco e compliance. Dinâmica: cada participante reporta progresso semanal nos épicos do board GRC no Jira. Issues GRC que exigem código → Lucas direciona a um dev e gerencia execução. Template: `Template - GRC Semanal.md`. Notas em `02 - Areas/Reuniões/`.
- **Business review mensal** — Acompanhamento dos "rocks" (objetivos trimestrais críticos).
- **Reuniões individuais de aprofundamento** — Fernando agenda com cada head durante a semana para refinar scorecards e configurar uso de IA.

## Modelo de gestão: Scorecards semanais

Cada líder mantém um scorecard com 3-4 indicadores-chave, alimentado semanalmente (idealmente sexta-feira). Inclui tabela com histórico de 10 semanas e gráfico dos últimos 6 meses para o indicador principal. A IA (via NECT + Cloud Cowork) é usada para gerar e atualizar esses scorecards automaticamente.

### Scorecards por área

| Área | Head | Indicadores principais |
|------|------|----------------------|
| Vendas | Aparecido Belletti (Cidinho) | NMRe (nova receita recorrente), serviço, novos clientes (qtd), meta |
| Marketing/Growth | Gustavo Matiuzzi (Matuzzi) | CPM, CPC, CPL, CPD, CPA, leads gerados (+ saúde do lead), investimento em Ads |
| CS Indireto (Parceiros) | Giovane Angonese (Gil) | Contas antigas de parceiros migradas para API Oficial, % migrado, cancelamentos/reversões |
| Financeiro | Poleana Casteleti | Inadimplência, MRR, valor recebido |
| Produto e Tecnologia | Lucas (PM) + Elton Monteiro (Infra/Governança) | A definir — reunião marcada para alinhar divisão de responsabilidades |
| Parcerias | Luciana Malaquias | A definir — Fernando puxará reunião |
| RevOps (novo) | Willians Camilo | Indicadores de receita e monetização do produto |

## Papel de RevOps (Willians Camilo)

Willians transicionou de geração manual de relatórios para Revenue Operations. Foco: ser o guardião dos números de receita, cobrar liderança sobre prazos de entregas que se convertem em lucro, identificar avenidas de monetização. Reporta e alinha com Fernando e Kiko.

## Ferramentas do modelo de gestão

- **Slack** — Ferramenta oficial de comunicação (obrigatório, compliance LGPD). Canais seguem nomenclatura `bote-[equipe]-[tema]`. Threads obrigatórias. Canais PROG para projetos específicos.
- **Notion** — Alimentação semanal dos scorecards (tabelas com histórico).
- **NEKT (ETL)** — Plataforma de dados conectada a Postgre, Intercom, Plumes, Superlógica, IUGO. Usa AWS Athena. Possui conector MCP para Cloud Cowork.
- **IA (Claude Cowork / Claude)** — Uso obrigatório para todos os líderes e devs. Automação de relatórios, geração de scorecards, busca de dados via NEKT.

## Contexto relevante para Lucas (PM)

- Preciso definir meu scorecard de produto com Elton e Caíque (reunião marcada).
- Fernando quer métricas de entrega de produto (features, código) sob minha responsabilidade; Elton cuida de infra, governança e compliance.
- Fernando provocou o time a pensar em: tempo de deploy, uptime, zero bugs como indicadores de produtividade.
- Os indicadores de negócio (CAC, payback, LTV/CAC) são responsabilidade compartilhada de todos os heads, não só de Marketing.
