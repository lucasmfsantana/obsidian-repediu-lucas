Guia do funcionamento da API oficial para consultas futuras

# Envios 
- 100 mensagens enviadas a cada 5 minutos por campanha ativa.
- Envios não tem priorização por campanha.
- Envios são divididos para campanhas que estejam programadas para enviar em dois períodos do dia
- Caso uma campanha esteja agendada para começar mais tarde que a outra, as campanhas que iniciam antes podem consumir o limite.
# Templates
- Sempre que uma campanha é publica é criado um template de mensagem na meta para cada criativo (3 criativos com 3 fotos cada geram 9 templates)

# Tags
- Na Rede, não é possível usar tag de link no botão [[2026-03-05]]

# Business Manager (BM) — Bloqueios e Segurança

## Como bloqueios acontecem em cascata
- A Meta cruza sinais de risco entre todos os administradores de uma mesma BM. Se um perfil é flaggeado, o alerta de fraude se propaga para os demais admins da estrutura.
- A ordem típica de queda é dos perfis mais recentes/frágeis para os mais antigos — mas eventualmente atinge todos.
- Quando o perfil base (que sustenta integrações) cai, todas as conexões vinculadas a ele também caem: relatórios, agendamentos, ferramentas de gestão de posts e conexões com plataformas externas.

## Gatilhos confirmados pela Meta para bloqueio
1. **Verificações excessivas em sequência** — Muitas verificações de conta em um curto período acendem alertas de fraude para todos os admins ligados àquela BM.
2. **Nome incorreto nos documentos enviados** — Arquivos com nomes genéricos (ex: "documento123.pdf") fazem o algoritmo desconfiar da autenticidade. O nome do arquivo deve identificar claramente o documento.
3. **Conflito de identidade na verificação** — Se a empresa é do Pedro mas quem realiza a verificação é a Bruna, a plataforma interpreta como inconsistência. Cada responsável deve usar seu próprio perfil Meta.

## Orientações da Meta após bloqueio
- **Período de cooling:** não realizar verificações nem criar novos ativos por 15 dias após o incidente.
- **Ritmo seguro:** após o período, fazer no máximo 2 a 3 verificações por semana.
- **Documentos:** garantir que todos os arquivos enviados tenham identificação correta no nome.
- **Perfis individuais:** cada pessoa que realiza verificação deve usar seu próprio perfil no Meta (não o de terceiros).

## Erros de Health Status da Meta (API Oficial)

Ao verificar o health status de um WABA via endpoint da Meta, os campos importantes são:
- `can_send_message` no nível de **BUSINESS**: se `BLOCKED`, o cliente não consegue enviar campanhas, independente do WABA e APP estarem disponíveis
- `error_code 141005` + `"The account has failed the commerce check"` → bloqueio por checagem de comércio (commerce check). Solução: submeter apelação via Meta Business Support
- Verificar via n8n webhook antes de escalar para dev: `https://n8n-prd.plug4sales.io/webhook/33100746-3b91-43aa-956e-604ff976d438?companyId={companyId}`

> Campanhas com status "aprovado" mas sem envio **quase sempre indicam bloqueio de BM na Meta** — não são bugs da Repediu.

## Distribuição de envios entre campanhas

- Múltiplas campanhas ativas no mesmo canal compartilham o limite diário de envios.
- A distribuição é **aleatória, não linear** — não há garantia de proporção igual entre campanhas.
- Se duas campanhas têm o mesmo horário de início (ex: 18h30), os envios podem se concentrar desproporcionalmente em uma delas.
- Exemplo com 50 envios/dia e 5 campanhas: pode ser 3 em uma, 7 em outra — não necessariamente 10 cada.

## Boas práticas de estrutura
- Manter no mínimo 3 perfis de backup como administradores de todas as BMs.
- Não concentrar todas as integrações (relatórios, agendamentos, plataformas) em um único perfil — distribuir para evitar ponto único de falha.
- Criar perfis de acesso para novos membros do time antecipadamente, não apenas em emergência.
- Franqueados que não têm Facebook ou não aceitam convites de admin geram o cenário de conflito de identidade — é importante resolver isso proativamente.
- **Cada pessoa que for realizar verificações precisa ter um perfil próprio no Meta** (ex: Wesley, Dante, primo — cada um com seu Facebook individual).
- **Só realizar verificações em BMs com pelo menos 30 dias de atividade** — BMs novas não devem passar por verificação imediatamente.
- **Evitar ter mais de uma BM para a mesma unidade** — múltiplas BMs por unidade aumentam o risco de bloqueio.
