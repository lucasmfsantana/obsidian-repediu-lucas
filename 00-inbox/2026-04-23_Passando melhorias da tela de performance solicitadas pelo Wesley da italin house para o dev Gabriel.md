# Passando melhorias da tela de performance solicitadas pelo Wesley da italin house para o dev Gabriel
Date: 2026-04-23 21:05
Meeting ID: 9ea17bc0-9b9b-4d37-818c-55f9f08bfbc1

---

## AI-Generated Notes

### Problema da Italian House com visualização de dados

- Wesley precisa separar dados de rede dos dados das unidades
- Franqueados precisam prestar contas individuais
  - Não conseguem distinguir conversões próprias vs campanhas da rede
  - Controle rigoroso de gastos (questionam até 34 centavos extras)
- Nestor (dono de Barretos) não se importa com gastos, mas franqueados sim

### Solução proposta

- Criar linha separada apenas para dados da rede
- Remover informações de rede das unidades na listagem atual
- Implementar seletor/botão para alternar entre:
  1. Visão agrupada (rede + unidades juntas)
  2. Visão separada (linha da rede isolada)
- Italian House sempre usará visão separada por padrão

### Considerações técnicas e UX

- Cuidado para não afetar outros clientes que não precisam dessa separação
- Maioria dos clientes não opera como Italian House
- Seletor deve ficar na própria tabela, não no botão de visões atual
  - Botão de visões será usado para outras funcionalidades futuras (6 meses)
- Design similar ao seletor da Meta para campanhas

### Problema no exportar Excel

- Coluna “quantidade de envios” aparece zerada
- Causa: mudança de “entregue” para “enviado” na coleção
- Correção simples necessária

### Próximos passos

- Descartar desenvolvimento atual da funcionalidade
- Implementar apenas linha separada para rede
- Prazo: entregar até segunda-feira
  - Sexta: desenvolvimento e testes iniciais
  - Segunda: PR, code review e deploy
- Evitar over-engineering para funcionalidades não solicitadas

---

Chat with meeting transcript: [https://notes.granola.ai/t/7e0a1337-a0f5-499f-abce-541e8ec18119](https://notes.granola.ai/t/7e0a1337-a0f5-499f-abce-541e8ec18119)
