# Crypto Signal Lab — scanner inteligente multiativos

Inclui varredura de 12 ativos em paralelo a cada 60 segundos, modelo de regressão logística separado para cada ativo, validação cronológica em 80 exemplos, comparação com baseline e indicação AGUARDAR se os critérios mínimos não forem atendidos. Mantém pré-alerta 20s antes do minuto no ativo selecionado e WebSocket para o ativo escolhido.

**Não é IA de 100% de acerto.** As previsões são experimentais e calculadas com preços públicos da Binance, não com o feed Hezilex. A avaliação histórica é limitada e não valida operações de 60 segundos na Hezilex. Alguns pares podem não estar disponíveis. Requer internet, site aberto e navegador permitindo conexão com Binance.

Para publicar no GitHub Pages, substitua os arquivos na raiz do repositório, especialmente index.html e sw.js.
