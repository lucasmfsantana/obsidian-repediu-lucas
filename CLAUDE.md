# CLAUDE.md

Instruções para Claude Code e Cowork ao trabalhar neste vault.

## Quem sou eu

Lucas, Product Manager na Repediu (CRM de Food Marketing, 7.000+ restaurantes no Brasil). Trabalho em português brasileiro. Para detalhes sobre a empresa, meu papel e minha rotina, consulte a pasta `05 - LLM Context/`.

## Este vault

Obsidian Vault pessoal funcionando como second brain e base de contexto para IA. Não é um projeto de software — não tem build, testes ou linting.

## Estrutura de pastas (PARA + extensões)

```
00 - Inbox/        → Rascunhos e capturas antes de processar
01 - Projects/     → Projetos ativos com início/fim claro
02 - Areas/        → Responsabilidades contínuas (PM, Repediu)
03 - Resources/    → Referências e conhecimento para consulta
04 - Archive/      → Projetos finalizados, notas desativadas
05 - LLM Context/  → Arquivos de contexto para IA (ver seção abaixo)
Daily/             → Daily notes (formato YYYY-MM-DD.md)
Templates/         → Templates de daily, projeto, reunião, bug
Attachments/       → Imagens e arquivos anexados
```

## LLM Context — como usar

A pasta `05 - LLM Context/` contém arquivos pequenos e focados com contexto sobre meu trabalho e vida pessoal. O objetivo é que a IA carregue **somente o contexto relevante** para cada tarefa.

- **Comece pelo índice**: `05 - LLM Context/business-profile.md` lista todos os arquivos disponíveis e o que cada um contém.
- **Carregue só o necessário**: se a tarefa é sobre WhatsApp, carregue `whatsapp-api.md`. Se é sobre user stories, carregue `meu-papel-como-pm.md`. Não carregue tudo de uma vez.
- **Se o contexto não existe ainda**, me pergunte e depois crie um novo arquivo na pasta apropriada.

## Convenções do vault

- Idioma: português brasileiro (incluindo nomes de arquivos)
- Formato de daily notes: `YYYY-MM-DD.md` dentro de `Daily/`
- Obsidian-flavored markdown: `[[wikilinks]]`, `#tags`, frontmatter YAML (`---`)
- Não modificar `.obsidian/` a menos que eu peça
- Novas notas devem ter frontmatter com pelo menos: `title`, `date`, `tags`
- Imagens e anexos vão em `Attachments/`

## Ao criar ou editar notas

1. Sempre use frontmatter YAML com `title`, `date` e `tags`
2. Use `[[wikilinks]]` para conectar a outras notas do vault
3. Use callouts (`> [!tip]`, `> [!warning]`, etc.) para destacar informações
4. Siga o sistema de tags:
   - `#daily`, `#meeting`, `#project`, `#resource`, `#bug`, `#decision`
   - Tags hierárquicas: `#project/whatsapp`, `#area/pm`, `#area/repediu`
   - Status: `#status/active`, `#status/done`
5. Ao terminar uma sessão, me pergunte: "O que aprendemos hoje que deveria virar um arquivo de contexto?"

## Ao trabalhar com tarefas de PM

- User stories seguem INVEST e formato "Como [persona], quero [ação] para [benefício]"
- Sempre considere segurança (LGPD, multi-tenant, integrações) nos artefatos
- Protótipos seguem o design system da Repediu (MUI + Mulish)
- Referências de PM estão em `03 - Resources/`

## Ferramentas que uso

- **Jira**: Kanban board e backlog (fonte de verdade para tarefas, sem sprints)
- **Slack**: comunicação interna (devs + suporte)
- **WhatsApp Business**: parceiros tecnológicos
- **Obsidian**: second brain, notas, contexto
- **Claude CLI / Cowork**: automação, escrita, prototipagem
