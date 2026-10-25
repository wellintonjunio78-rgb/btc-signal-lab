# AI Hunter Live — Binance Spot PWA

Publique todos os arquivos na raiz de um repositório GitHub Pages, incluindo index.html, manifest.webmanifest, sw.js e ícones. No iPhone, abra o site no Safari e use Compartilhar > Adicionar à Tela de Início.

O aplicativo consulta dados públicos da Binance Spot (data-api.binance.vision) a cada 20 segundos enquanto a página está visível. Examina 12 pares USDT com velas fechadas de 1 minuto e combina EMA 9/21/50, RSI, volume relativo e momentum. É uma estratégia técnica transparente, **não** usa o arquivo model.joblib nem se apresenta como IA treinada. Um pré-alerta é candidato para a próxima abertura de vela, não previsão comprovada. A direção VENDA no Spot significa possível saída de uma posição já detida. Não executa ordens nem armazena credenciais.

A rede, restrições regionais ou limites da API podem impedir o funcionamento. Quando isso ocorrer, mostra erro. Alertas sonoros só funcionam com a página aberta e som habilitado. Sem notificações push com o iPhone bloqueado. O histórico local não é uma medição de acerto.

O código foi verificado estaticamente; não foi validado em iPhone nem teve lucratividade comprovada. Para alertas em segundo plano e IA realmente treinada, é necessário um serviço de backend com validação de desempenho.
