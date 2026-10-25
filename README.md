# BTC Signal Lab — simulação de 1 minuto

Site estático para GitHub Pages. Descompacte e envie **todos os arquivos** à raiz do repositório, substituindo `index.html`, `sw.js` e `manifest.webmanifest`. Depois, atualize a página (se necessário, limpe os dados do site).

- Somente Bitcoin BTC/USDT da Binance. Não usa dados da Hezilex.
- WebSocket para atualizações de candle de 1 minuto; pré-alertas experimentais nos 20 segundos anteriores à virada.
- Modelo estatístico simples ajustado a candles históricos e testado em uma fatia separada; não é uma IA validada para lucro.
- Simulações locais no navegador, com registro de preço de entrada e saída observados no fluxo; exigem página aberta. Se o fluxo ficar interrompido, os resultados podem ficar inexatos. O preço de execução da Hezilex pode ser diferente.
- Nenhuma ordem real, nenhuma garantia de acerto, nenhuma conexão com Hezilex.
