---
title: Integrações — Status e Contexto dos Parceiros
tags:
  - llm-context
  - business
updated: 2026-04-09
---

# Integrações — Status e Contexto dos Parceiros

Mapa do status atual das integrações com PDVs, ERPs e delivery. Atualizar a cada mudança relevante. Para perguntas sobre "qual é o status da integração X", "tem alguma pendência com Y", consultar este arquivo.

Devs responsáveis por integrações: **Anderson Kawano (Han)**, **Luiz Roberto Reinoso**, **Danilo**.

---

## 🟢 Funcionando normalmente

### Saipos
- Integração ativa, dados de pedidos fluindo
- **Telemetria em produção**: pausada temporariamente até retorno do Palácios (RPD-1924, Parking)
- **Atenção**: unidades com plano cancelado no Saipos não enviam dados — verificar junto ao cliente se ID está ativo (ex: Marikota São Caetano do Sul tinha ID cancelado)

### Goomer
- Integração ativa
- Ativação do modo tablet: contatar suporte Goomer (+55 15 98170-0745)

### Cloudfy
- Integração existente, cliente sendo onboardado
- Contato do suporte: +55 41 4106-0603
- Ver [[integracao-cloudfy]] para detalhes técnicos

### PDV Legal
- Integração ativa (RPD-100 em progresso contínuo)
- Logo: https://assets.repediu.com.br/integrations_logos/pdv-legal.png

### Define Sistemas (PDV)
- Ativa, funcionando normalmente

---

## 🟡 Em ajuste / acompanhamento

### Anota AI
- **Status**: integração com falhas de autenticação (RPD-1963, In Progress — Anderson)
- **Contexto**: em 08/04/2026, todas as integrações com Anota AI deram erro 401 (592 falhas). A hipótese era mudança de autenticação, mas Caíque confirmou que a nova auth **ainda não foi lançada**.
- **Próximo passo**: Anota AI vai enviar documentação da nova autenticação na semana de 13/04. Anderson ajustará a integração após receber.
- **Credenciais atuais** (client_id): 51bc6697-e497-4c2b-a2a0-b22c477b706c

### Godino
- **Status**: integração ativa, mas com risco de travar — investigação em andamento (Anderson/Luiz)
- **Contexto**: Lucas desabilitou/habilitou a integração na segunda-feira para puxar histórico — travou no meio. Em 09/04, time técnico confirmou risco de novo travamento.
- **Possível causa**: refatoração necessária no fluxo de puxada de histórico

### Fidelizi
- **Status**: integração ativa, mas com bug pontual de data inválida no endpoint; em correção pelo time Fidelizi
- **Atenção**: Repediu ainda usa **API v3** da Fidelizi. Em 08/04/2026, Johnny Castilho informou que a **v4 está sendo desenvolvida** com novos recursos. Os endpoints seguem padrão similar, mas é necessário avaliar o impacto da migração.
- **Doc v4**: https://developers.fidelizi.com.br/listar-clientes.html
- **Contato principal**: Johnny Castilho (+55 19 99631-3477)
- **Pendência**: avaliar migração v3 → v4 com Luiz/Danilo

### Waybit ✅ (Homologada em 09/04/2026 — mover para 🟢 em breve)
- **Status**: **HOMOLOGADA** em 09/04/2026. Credenciais enviadas ao cliente (client_id: 7670).
- **Próximo passo**: acompanhar ativação e primeiros dados em produção
- **Contato**: Raphael Oliveira (Waybit)

### BigDim
- **Status**: aviso de credencial inválida mesmo após configuração correta (RPD-1946, Parking)
- **Pendência**: Matheus Freitas (CS) vai verificar com o cliente

### Bitbar
- **Status**: erros recorrentes "Company not found" no n8n (bot #bot-devs-integrations)
- **Contexto**: erros aparecem com frequência — podem indicar clientes com chaves inválidas ou empresa não cadastrada na Bitbar
- **Sem issue criada ainda**

---

## 🔵 Em desenvolvimento / onboarding

### Hanzo
- **Status**: integração existente, novo cliente interessado em conectar
- **Próximo passo**: enviar solicitação para Vinicius Norberto (Hanzo) no particular para que ele organize o token de ativação (+55 16 98114-8519)

### La Pimpolina / Colibri
- **Status**: aguardando credenciais para iniciar testes
- **Contato**: Pedro Santos / Airton (+55 11 95133-8888)

### Cardápio.ai
- **Status**: credenciais enviadas ao parceiro em 09/04/2026 (client_id: 7670)
- **Próximo passo**: acompanhar ativação e testes

### Meep
- **Status**: em contato (grupo Repediu <> Meep ativo no WhatsApp)
- Luciana Malaquias é o contato da Meep

---

## 📋 Processo de onboarding de novas integrações

1. CS ou comercial abre demanda com credenciais do cliente
2. Lucas cria issue no Jira (projeto RPD) e atribui para Anderson ou Luiz
3. Dev implementa e testa com dados do cliente piloto
4. Lucas valida comportamento no painel
5. CS ativa para o cliente e monitora primeiros dias

---

## Contatos rápidos de suporte

| Parceiro | Contato |
|---|---|
| Cloudfy | +55 41 4106-0603 |
| Goomer | +55 15 98170-0745 |
| Fidelizi | Johnny Castilho +55 19 99631-3477 |
| Hanzo | Vinicius Norberto +55 16 98114-8519 |
| La Pimpolina / Colibri | Airton +55 11 95133-8888 |
