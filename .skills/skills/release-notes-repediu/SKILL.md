---
name: release-notes-repediu
description: Gera release notes da Repediu a partir de itens concluídos no Jira (projeto RPD) que ainda não foram lançados. Use esta skill sempre que o usuário pedir para criar, gerar ou montar um release notes, comunicado de lançamento, changelog ou notas de versão. Também dispara para perguntas sobre o que foi entregue, o que saiu na sprint ou o que tem para lançar.
---

# Release Notes – Repediu

Você vai buscar itens concluídos no Jira (projeto RPD), interpretar o contexto de cada um e montar uma mensagem de release notes formatada para o Slack em português.

## Contexto do Jira da Repediu

- **Cloud ID**: `a1b60d0b-d982-4862-88ba-6fa934275b54`
- **Projeto principal**: `RPD`
- **Issue types relevantes**: Bug, Story, Task, Feature
- **Label de integração**: `integration` — itens com essa label pertencem à categoria Integrações
- **fixVersions**: nunca é preenchido — não use como critério de "lançado"

## Como identificar itens "não lançados"

O projeto não usa fixVersions nem versionamento formal. O critério de "não lançado" precisa ser acordado com o usuário. As abordagens possíveis são:

1. **Por período de tempo** — itens que ficaram Done nos últimos X dias (ex: última semana, últimos 14 dias)
2. **Por sprint** — itens de uma sprint específica
3. **Desde uma data de referência** — "o que ficou Done desde [data]"

Se o usuário não especificar o período, pergunte antes de prosseguir:
> "Qual o período que devo considerar para o release notes? (ex: últimos 7 dias, última sprint, desde [data])"

## Passo a passo

### 1. Buscar os itens no Jira

Use `searchJiraIssuesUsingJql` com a query adequada ao período:

```
project = RPD 
AND status = Done 
AND statusCategory = Done
AND updated >= "[DATA_INICIO]"
ORDER BY updated DESC
```

Campos para buscar: `summary`, `description`, `issuetype`, `labels`, `status`, `fixVersions`, `updated`, `assignee`
Use `maxResults: 50` e `responseContentFormat: "markdown"`. Se houver mais de 50 itens, use paginação com `nextPageToken`.

### 2. Filtrar itens relevantes

Descarte itens com:
- Status diferente de `Done` (por segurança extra)
- Tipo `Sub-task` (são detalhes técnicos, não itens de release)
- Tipo `Epic` (são containers, não entregáveis)

Mantenha: Bug, Story, Task, Feature.

### 3. Ler o contexto completo de cada item

Use `summary` e `description` da busca. Se a descrição for insuficiente (muito curta ou técnica demais), use `getJiraIssue` para buscar comentários que revelem o que de fato foi entregue. Use o bom senso para evitar excesso de chamadas.

### 4. Classificar cada item em uma categoria

| Condição | Categoria |
|---|---|
| Label `integration` | 🔗 Integrações |
| Issue type = `Bug` | 🐛 Correções |
| Issue type = `Feature` | ✨ Novas Funcionalidades |
| Issue type = `Story` + título de algo novo | ✨ Novas Funcionalidades |
| Issue type = `Story` + título de melhoria/ajuste | 🔧 Melhorias |
| Issue type = `Task` | 🔧 Melhorias |

**Prioridade**: Label `integration` > Issue type.

### 5. Gerar o texto de cada item

Reescreva em linguagem acessível (não-técnica). Foque no que foi **entregue para o usuário**, não no que foi feito tecnicamente.

**Regras:**
- Evite jargões: `framework`, `refatorar`, `endpoint`, `job`, `fix`, `migration`
- Use palavras como: melhoria, correção, ajuste, nova funcionalidade, segurança, estabilidade
- Mantenha frases curtas (até 10 palavras)
- Formato: `• [Descrição acessível] (RPD-XXXX)`

### 6. Montar a mensagem no formato Slack

```
🚀 *Release Notes – Repediu* | [DATA_ATUAL_EM_PORTUGUES]

Confira o que foi entregue [período]:

---

🔗 *Integrações*
• [item] (`RPD-XXXX`)

✨ *Novas Funcionalidades*
• [item] (`RPD-XXXX`)

🔧 *Melhorias*
• [item] (`RPD-XXXX`)

🐛 *Correções*
• [item] (`RPD-XXXX`)

---
_Total: X itens entregues_
```

**Formatação**:
- Negrito: `*texto*`
- Itálico: `_texto_`
- Omita categorias vazias.

### 7. Perguntar se o usuário quer enviar

Após exibir o release notes, pergunte se o usuário deseja enviar para o Slack via `slack_send_message`, ajustar o texto ou apenas copiar.
