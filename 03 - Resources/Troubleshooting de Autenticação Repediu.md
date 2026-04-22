---
title: Troubleshooting de Autenticação Repediu
date: 2026-04-01
tags:
  - resource
  - area/repediu
  - troubleshooting
  - firebase
---

Guia de diagnóstico para problemas de login e autenticação na plataforma Repediu.

# Erros de Login — Diagnóstico Rápido

## 1. SMS de verificação não chega

**Causa mais comum:** instabilidade no Firebase Cloud Messaging (FCM).

**Como verificar:** acessar https://status.firebase.google.com/cloud-messaging/ e checar se há "delays and interruptions".

**Workaround:** orientar o usuário a aguardar 30 minutos e tentar novamente. O SMS geralmente chega após a estabilização.

**Quando escalar:** se após 30 minutos o problema persistir em múltiplos clientes, abrir issue no Jira apontando para o dev responsável pela autenticação (Vagner).

## 2. Erro "Sequence contains more than one element"

**Causa:** usuário duplicado no banco de dados (dois registros com o mesmo email, sendo um deles deletado, mas com MFA ativo).

**Solução:** chamar o Vagner (dev) para:
1. Identificar o usuário duplicado no banco
2. Remover todas as sessões ativas do usuário problemático
3. Remover o MFA do usuário deletado

**Exemplo real (31/03/26):** `caioakira@kottadigital.com` — conta duplicada, um registro deletado mas com MFA → Vagner removeu sessões e MFA.

> Este erro **não é relacionado** à instabilidade do Firebase — é um problema de duplicidade no banco de dados.

## 3. Email não existe no sistema

**Sintoma:** CS reporta que um email não existe na plataforma e o cliente não consegue acessar.

**Processo:** verificar no banco se o email está cadastrado. Se não estiver, orientar o CS a encaminhar para o suporte verificar o CNPJ do cliente e localizar o acesso correto.

# Processo de triagem para o CS

Quando o CS identificar problema de autenticação de clientes:

1. **Abre a issue diretamente no Jira** com todos os dados (company ID, email afetado, descrição do erro, screenshot)
2. Não é necessário falar com Lucas antes — a issue cai diretamente no backlog de bugs
3. Anexar print do erro e, se possível, o erro do console (F12 → Network → erro na requisição)

> **Regra:** quem pega o problema abre a issue. Não há necessidade de intermediação de Lucas para bugs de autenticação.
