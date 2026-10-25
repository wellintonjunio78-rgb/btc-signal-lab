# Binance AI Scanner — Spot V2

Site estático para GitHub Pages. Envie `index.html` à raiz do repositório.

- Usa dados públicos reais da Binance Spot (REST e WebSocket do gráfico selecionado).
- Examina até 35 pares USDT de maior volume, em lotes, a cada 15 segundos. Não analisa todos os ativos simultaneamente.
- Pré-alerta para a abertura da próxima vela, condicionado a indicadores das velas fechadas e ao movimento da vela em formação, de 12 a 55 segundos antes. Pode falhar, desaparecer ou chegar tarde.
- COMPRA indica possível aquisição; VENDA somente para ativos que você informou possuir. Não há venda a descoberto no Spot.
- Resultado direcional não inclui spread, taxas, slippage e não demonstra rentabilidade. Histórico somente na sessão do navegador.
- Não é uma IA treinada: utiliza regras técnicas. Não é recomendação de investimento.
- Precisa de internet, acesso às APIs da Binance e navegador aberto; não envia notificações em segundo plano.
