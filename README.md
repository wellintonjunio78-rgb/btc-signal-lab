# BTC Signal Lab — pacote PWA para iPhone

Este pacote prepara o protótipo para ser publicado como um Progressive Web App (PWA) e adicionado à tela inicial do iPhone.

## Como usar
1. Publique todos os arquivos deste diretório em um host HTTPS estático (por exemplo, GitHub Pages ou outro serviço de hospedagem estática).
2. Abra a URL HTTPS publicada no Safari do iPhone.
3. Toque em Compartilhar → Adicionar à Tela de Início. Se aparecer a opção, ative “Abrir como App” e toque em Adicionar.
4. Abra pelo ícone criado.

## Importante
- Não é um arquivo IPA nativo nem um app da App Store. iOS não instala executáveis Windows (.exe) ou binários desktop.
- O PWA precisa de URL HTTPS publicada para instalação normal. Este ZIP não publica o site automaticamente.
- O service worker faz cache dos arquivos estáticos; os dados de mercado continuam dependendo de conexão à internet.
- A disponibilidade do endpoint de mercado pode variar.
- O REA/MCP não está embutido no app: ele deve ser configurado separadamente num ambiente de desenvolvimento compatível.
- Os sinais são experimentais, não constituem recomendação financeira e não garantem lucro.


## Versão ao vivo (WebSocket)
Esta versão recebe o stream público `btcusdt@kline_1m` da Binance por WebSocket seguro. O preço e o sinal são recalculados enquanto o candle de 1 minuto está em formação; por isso, o sinal ao vivo é provisório e pode mudar antes do fechamento. O histórico de sinais registra os candles fechados. Se a conexão cair, o app tenta reconectar automaticamente. Requer internet e disponibilidade do serviço público.

Para atualizar o GitHub Pages, envie os arquivos desta pasta para a raiz do repositório e substitua os arquivos existentes, incluindo `index.html` e `sw.js`; depois faça Commit changes.
