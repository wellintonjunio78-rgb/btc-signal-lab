# Binance AI Hunter — IA treinável (Spot)

Esta edição adiciona um pipeline REAL de treinamento supervisionado, não apenas indicadores. **O ZIP NÃO contém um modelo já treinado**: sem acesso à Binance no ambiente de construção, seria incorreto inventar resultados ou afirmar que a IA foi validada.

## Como treinar (computador/servidor com Python 3.10+ e internet)

```bash
cd server
pip install -r requirements.txt
python train.py --batches 8
ALLOWED_ORIGINS=https://SEU-USUARIO.github.io MODEL_PATH=model.joblib uvicorn api:app --host 0.0.0.0 --port 8000
```

O treinamento usa 12 pares, até 8 mil velas fechadas por par, atributos causais e divisão temporal 65% treino, 15% validação, 20% teste. A saída `model.json` registra métricas no teste e uma linha de base. **Não há garantia de lucro ou de previsão antecipada.** Há risco de vazamento por sobreposição de amostras entre conjuntos e dependência entre ativos; para uso financeiro sério, adicione embargo temporal, custos de negociação, backtest walk-forward e calibração. Os rótulos usam retorno da próxima vela acima de ±0,1%, sem custos. Modelo não foi avaliado neste pacote.

## Como usar no iPhone

Publique os arquivos da raiz do ZIP no GitHub Pages. Hospede o servidor separadamente em HTTPS (por exemplo num serviço de hospedagem Python). Abra o PWA e configure a URL HTTPS da API no painel **IA treinada**. GitHub Pages não executa Python nem mantém tarefas em segundo plano. O app só consulta a API enquanto está aberto; notificações com tela bloqueada exigem backend de agendamento e Web Push, que **não estão implementados**.

O painel de indicadores existente continua disponível quando a IA não está conectada, mas não é rotulado como IA. A venda no Spot representa saída de uma posição que você já tem; não é short.
