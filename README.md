# BellaFlow Studio

Crie o Web App Micro SaaS BellaFlow para Nail Designers e Manicures conforme o PRD:

1. Identidade Visual Premium:
- Paleta: Branco (#FFFFFF), Nude (#F4E7E1), Rosa Claro (#F8DDE6), Dourado Suave (#C8A97E), Cinza Escuro (#444444).
- Estilo minimalista, feminino elegante, cards arredondados (16px), sombras suaves, tipografia refinada e layout responsivo (estilo Notion/Framer/Fresha).

2. Navegação e Estrutura:
- Menu lateral fixo com: Dashboard, Clientes, Agenda, Atendimentos, Financeiro, Configurações, com avatar da profissional no rodapé.

3. Módulos do Sistema:
- Dashboard: Indicadores rápidos (clientes, agendamentos hoje, atendimentos do mês, receita do mês, ticket médio), lista de próximos atendimentos do dia com status e gráfico de barras com faturamento dos últimos 6 meses.
- Clientes: Tabela com busca, cadastro/edição/exclusão (nome, telefone, instagram, nascimento, preferência de serviço, observações) e gaveta lateral (drawer) ao clicar para ver histórico detalhado e total gasto.
- Agenda: Visualização semanal/diária elegante com slots de horário, criação de agendamento (cliente, serviço, data, horário, duração, valor, observações, status: Agendado, Confirmado, Realizado, Cancelado em badges coloridos) e ação para marcar como Realizado.
- Atendimentos: Histórico completo com filtros por período, cliente e serviço, calculando valor total filtrado.
- Financeiro: Indicadores (receita hoje, semana, mês, ticket médio, total atendimentos), gráfico de barras de faturamento mensal, gráfico pizza de serviços mais populares e tabela de movimentações recentes.
- Configurações: Perfil da profissional e lista/gestão dos serviços padrão (Alongamento R$ 180, Manutenção R$ 120, Esmaltação em Gel R$ 90, Blindagem R$ 80, Spa dos Pés R$ 70).

4. Fluxo e Dados Demo:
- Fluxo ponta a ponta funcional: ao marcar agendamento como Realizado, alimenta automaticamente o histórico de atendimentos e atualiza as métricas de receita/ticket no Dashboard e no Financeiro.
- Pré-carregar dados fictícios realistas brasileiros (12 clientes, 18 agendamentos e 24 atendimentos distribuídos nos últimos meses).

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://bellaflow-nails-hub.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/33119917-e89c-4892-9536-ea1066ce10dd).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
