# Crypto Signal Lab — Binance Live V2

Aplicativo estático para GitHub Pages. Use `index.html` na raiz.

**Recursos:** 12 ativos Binance Spot (pares USDT); candles OHLC de 1 minuto; EMA 9/21; volume; horário de Brasília; scanner de modelos estatísticos locais; pré-alerta experimental. Atualizações do ativo selecionado por WebSocket; scanner de todos os ativos a cada 60 s via API REST.

**Limitações:** o scanner não é um fluxo de ticks de todos os ativos. Modelos são regressões logísticas simples e backtests curtos, sem taxas, spread, slippage ou execução real. Não é garantia de acerto, não faz ordens e não requer chaves de API. O navegador deve permanecer aberto para o aviso sonoro. Se dados estiverem atrasados, não use o sinal.

**Instalação:** envie todos os arquivos para a raiz do repositório GitHub Pages, branch main; confirme em Settings > Pages. Se versão antiga persistir, remova os dados do site no Safari (service worker pode manter cache).

V3: previsão experimental para o próximo minuto disponível desde o começo do minuto atual (até 60 segundos antes), recalculada conforme chegam novos candles parciais. Não é previsão garantida nem recomendação de investimento.
