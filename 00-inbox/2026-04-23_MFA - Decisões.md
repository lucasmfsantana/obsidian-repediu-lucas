# MFA - Decisões
Date: 2026-04-23 15:23
Meeting ID: 90127cdd-ab21-4936-9d81-96418d27c509

---

# MFA - Decisões

Thu, 23 Apr 26 · vagner@repediu.com.br, deivid@repediu.com.br

### Problema Atual com Autenticação de Dois Fatores

- Volume alto de tickets de suporte por problemas com MFA
    - SMS não chegando
    - Usuários perdendo acesso ao aplicativo autenticador
    - Clientes não sabem qual app usar para códigos
- Suporte precisa remover MFA constantemente para resolver problemas
    - Processo atual: remove autenticação → usuário loga normal → renotificação em 7 dias
    - Cada problema gera escalação: suporte → produto → desenvolvimento
- Falhas de segurança identificadas:
    - Usuários enviando login/senha por email para teste
    - Sugestão perigosa do suporte: redefinir senha remove MFA completamente

### Soluções Propostas e Análise

- WhatsApp como método de autenticação (proposta principal)
    - Vantagens: alta confiabilidade de entrega, todos têm WhatsApp, simplicidade
    - Desafios técnicos: não é nativo no Firebase, precisa implementar lógica própria
    - Repediu já tem conhecimento interno de WhatsApp e número dedicado
- Login com Google
    - Mais fácil de implementar
    - Resolve apenas usuários Gmail
    - Problemas: como amarrar usuário Google com empresa existente
- Códigos de backup (estilo GitHub)
    - Lista de 10 códigos para guardar
    - Considerado mas não priorizado
- Magic link por email como fallback
    - Firebase tem suporte nativo
    - Menos confiável que WhatsApp mas mais que SMS

### Estratégia de Implementação Definida

- Fase 1: Forçar ativação de dois métodos de autenticação
    - Banner fixo no topo pedindo ativação de segundo método
    - Aviso no login com prazo (7 dias) igual ao atual
    - Melhorar UX da tela de login para diferenciar SMS vs App
- Fase 2: Adicionar email como terceiro método de recuperação
    - Opção “Sem acesso ao celular? Receber link no email”
    - Aparece apenas quando outros métodos falharem
    - Usar como fallback discreto
- Monitoramento: Avaliar volume de suporte no próximo mês
    - Se problemas persistirem, implementar WhatsApp (15-30 dias de desenvolvimento)

### Ações Definidas

- Banner fixo no topo pedindo para ativar nova forma de autenticação
- Aviso no login para usuário ativar segundo método
- Após período (30 segundos) sem preencher código, adicionar opção “tentar outro método”
- Opção de magic link para quando as duas outras falharem
- Melhorar UI da tela para usuário saber se está solicitando código SMS ou de app de autenticação
- Limitar envios de SMS (máximo 4 tentativas) para evitar bloqueios
- Implementar logs de tentativas de login e envios para análise
- Lucas criará 2-3 protótipos de UX para validação com equipe e suporte

---

Chat with meeting transcript: [https://notes.granola.ai/t/90127cdd-ab21-4936-9d81-96418d27c509-00best9l](https://notes.granola.ai/t/90127cdd-ab21-4936-9d81-96418d27c509-00best9l)