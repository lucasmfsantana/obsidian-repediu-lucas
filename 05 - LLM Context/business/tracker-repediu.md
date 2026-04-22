---
title: Tracker Repediu
tags:
  - llm-context
  - business
  - project/tracker
updated: 2026-03-20
---

# Tracker Repediu

SDK JavaScript para captura de eventos comportamentais em cardápios digitais de restaurantes parceiros da Repediu.

## O que é

Um script leve (<8KB) que restaurantes instalam no cardápio digital. Captura eventos como visualizações de itens, adições ao carrinho, buscas e compras. Esses dados alimentam a segmentação comportamental e campanhas automatizadas personalizadas dentro da Repediu.

## Status

- **Issue**: [[RPD-1860]] (Feature, Selected for Dev)
- **Dev responsável**: Vagner
- **Liderança de produto**: Fernando Nogarini (Lucas acompanha em calls pontuais)
- **Início**: março/2026

## Por que importa

Hoje a segmentação da Repediu é baseada em dados transacionais (comprou, não comprou, valor, frequência). O Tracker adiciona uma camada comportamental — o que o cliente *olhou* mas não comprou, quanto tempo ficou na página, que tipo de item busca. Isso permite:

- Campanhas de abandono de carrinho
- Recomendações baseadas em navegação
- Segmentos como "olhou pizza mas comprou hamburger"
- Automações baseadas em intenção (não só em ação)

## Detalhes a documentar conforme avançar

- Arquitetura do SDK (como os dados chegam na Repediu)
- Eventos capturados e formato
- Como integrar com o sistema de segmentação existente
- Requisitos de privacidade/LGPD para tracking comportamental
- Performance e impacto no cardápio digital do restaurante
