'use strict';
const $=id=>document.getElementById(id);let sound=false,lastAlert='',busy=false,next=0;const symbols=['BTCUSDT','ETHUSDT','BNBUSDT','SOLUSDT','XRPUSDT','DOGEUSDT','ADAUSDT','AVAXUSDT','LINKUSDT','LTCUSDT','TRXUSDT','DOTUSDT'];
const endpoints=['https://data-api.binance.vision','https://api.binance.com'];
async function get(path){let error;for(const base of endpoints){try{const ctrl=new AbortController();const timer=setTimeout(()=>ctrl.abort(),8500);try{const r=await fetch(base+path,{signal:ctrl.signal,cache:'no-store'});if(!r.ok)throw Error('HTTP '+r.status);return await r.json()}finally{clearTimeout(timer)}}catch(e){error=e}}throw error||Error('API indisponível')}
function ema(a,n){const k=2/(n+1);let v=a[0];return a.map((x,i)=>v=i?v+(x-v)*k:x)}
function rsi(a,n=14){if(a.length<n+2)return 50;let g=0,l=0;for(let i=1;i<=n;i++){const d=a[i]-a[i-1];g+=Math.max(d,0);l+=Math.max(-d,0)}g/=n;l/=n;for(let i=n+1;i<a.length;i++){let d=a[i]-a[i-1];g=(g*(n-1)+Math.max(d,0))/n;l=(l*(n-1)+Math.max(-d,0))/n}return l===0?(g===0?50:100):100-100/(1+g/l)}
function analyze(sym,raw){const now=Date.now();const candles=raw.filter(k=>Number(k[6])<now);if(candles.length<40)throw Error('Poucos candles fechados');const c=candles.map(x=>+x[4]),v=candles.map(x=>+x[5]);const e9=ema(c,9),e21=ema(c,21),i=c.length-1,price=c[i],r=rsi(c),volume=v[i]/(v.slice(-21,-1).reduce((a,b)=>a+b,0)/20||1);const up=e9[i]>e21[i]&&e9[i]>e9[i-1]&&price>e9[i],down=e9[i]<e21[i]&&e9[i]<e9[i-1]&&price<e9[i];const buy=up&&r>=52&&r<=68&&volume>=1.15&&c[i]>c[i-1];const sell=down&&r>=32&&r<=48&&volume>=1.15&&c[i]<c[i-1];const action=buy?'COMPRA':sell?'VENDA':'AGUARDAR';const score=Math.min(100,Math.round((volume-1)*25+Math.abs(e9[i]/e21[i]-1)*3000+Math.abs(r-50)*1.2));return{sym,price,r,volume,action,score,candleClose:+candles[i][6],time:new Date(+candles[i][6]+1),reason:`EMA 9/21 ${up?'alta':down?'baixa':'sem alinhamento'} • RSI ${r.toFixed(1)} • volume ${volume.toFixed(2)}×`}}
function fmt(n){return n.toLocaleString('pt-BR',{maximumFractionDigits:n<1?6:2})}function time(t){return new Date(t).toLocaleTimeString('pt-BR',{timeZone:'America/Sao_Paulo',hour:'2-digit',minute:'2-digit',second:'2-digit'})}
function beep(){try{const ctx=new (window.AudioContext||window.webkitAudioContext)(),o=ctx.createOscillator(),g=ctx.createGain();o.connect(g);g.connect(ctx.destination);o.frequency.value=720;g.gain.value=.05;o.start();o.stop(ctx.currentTime+.2);o.onended=()=>ctx.close()}catch(e){}}
async function scan(){if(aiActive)return;if(busy)return;busy=true;$('connection').textContent='Consultando…';$('radarText').textContent='⌕ Analisando candles fechados…';try{const res=await Promise.allSettled(symbols.map(async s=>analyze(s,await get(`/api/v3/klines?symbol=${s}&interval=1m&limit=100`))));const items=res.filter(x=>x.status==='fulfilled').map(x=>x.value),errors=res.length-items.length;items.sort((a,b)=>(b.action!=='AGUARDAR')-(a.action!=='AGUARDAR')||b.score-a.score);$('count').textContent=items.length;$('results').replaceChildren();for(const item of items){const el=document.createElement('div');el.className='row';const label=document.createElement('div');const title=document.createElement('strong');title.textContent=item.sym.replace('USDT','/USDT');const info=document.createElement('div');info.className='muted status';info.textContent=`${fmt(item.price)} USDT • ${item.reason}`;label.append(title,info);const side=document.createElement('div');side.style.textAlign='right';const tag=document.createElement('div');tag.className=item.action==='COMPRA'?'buy':item.action==='VENDA'?'sell':'wait';tag.textContent=item.action;const btn=document.createElement('button');btn.textContent='Ver';btn.onclick=()=>show(item);side.append(tag,btn);el.append(label,side);$('results').append(el)}const best=items.find(x=>x.action!=='AGUARDAR');if(best){show(best);const id=best.sym+best.action+best.candleClose;if(sound&&id!==lastAlert){beep();lastAlert=id}}else{$('detail').textContent='AGUARDAR — nenhuma entrada passou nos filtros. Não operar também é uma decisão válida.'} $('connection').textContent=errors?`${items.length}/${symbols.length} conectados`:'Dados reais';$('radarText').textContent=best?'Possível configuração detectada':'Procurando condições técnicas…';if(!items.length)throw Error('Sem dados acessíveis da Binance. Verifique conexão e disponibilidade regional.')}catch(e){$('connection').textContent='Sem conexão';$('radarText').textContent='Falha ao consultar Binance';$('detail').textContent='Sem dados confiáveis: nenhum sinal será emitido. '+e.message}finally{busy=false;next=Date.now()+20000}}
function show(x){$('detail').replaceChildren();const heading=document.createElement('h2');heading.className=x.action==='COMPRA'?'buy':x.action==='VENDA'?'sell':'wait';heading.textContent=x.action+' • '+x.sym.replace('USDT','/USDT');const p=document.createElement('p');p.textContent=`Preço de referência (última vela fechada): ${fmt(x.price)} USDT`;const q=document.createElement('p');q.textContent=`Próxima abertura de vela: ${time(x.time)} (Brasília). Horário indicativo, não é previsão confirmada.`;const r=document.createElement('p');r.textContent=x.reason;const s=document.createElement('small');s.textContent='Pontuação técnica: '+x.score+'/100 (não é probabilidade de acerto). Aguarde confirmação no mercado.';$('detail').append(heading,p,q,r,s)}
$('notify').onclick=()=>{sound=!sound;$('notify').textContent=sound?'Som ativado ✓':'Ativar alerta sonoro';if(sound)beep()};$('refresh').onclick=scan;setInterval(()=>{$('countdown').textContent=Math.max(0,Math.ceil((next-Date.now())/1000))+'s';if(Date.now()>=next&&!busy)scan()},1000);scan();if('serviceWorker'in navigator)navigator.serviceWorker.register('./sw.js').catch(()=>{});

// Trained model integration: requires separately hosted Python API.
let aiActive=false,aiEndpoint='',aiBusy=false,aiTimer=null;
async function aiPoll(){
 if(!aiActive||aiBusy)return;aiBusy=true;
 try{
  const ctrl=new AbortController(),timer=setTimeout(()=>ctrl.abort(),20000);
  let response;
  try{response=await fetch(aiEndpoint+'/signals',{cache:'no-store',signal:ctrl.signal});}finally{clearTimeout(timer)}
  if(!response.ok)throw Error('API HTTP '+response.status);
  const data=await response.json();if(!Array.isArray(data.signals))throw Error('Resposta inválida');
  $('aiStatus').textContent=`IA conectada • ${data.signals.length} ativos • atualização ${time(data.generated_at)}`;
  $('aiResults').replaceChildren();
  for(const x of data.signals){
   const row=document.createElement('div');row.className='row';
   const a=document.createElement('div'),b=document.createElement('div');
   a.textContent=x.symbol.replace('USDT','/USDT')+' • '+fmt(x.price)+' USDT';
   b.textContent=x.action+' • score '+Math.round(x.model_score*100)+'/100';
   b.className=x.action==='COMPRA'?'buy':x.action==='VENDA'?'sell':'wait';row.append(a,b);$('aiResults').append(row);
  }
  const best=data.signals.find(x=>x.action!=='AGUARDAR');
  $('detail').textContent=best?`IA: ${best.action} ${best.symbol} • referência ${fmt(best.price)} USDT • próximo início de vela ${time(best.next_candle_at)} (Brasília). Score bruto ${Math.round(best.model_score*100)}/100; não é probabilidade calibrada nem garantia.`:'IA: AGUARDAR. Nenhum ativo atingiu os critérios do modelo.';
  $('radarText').textContent='Análise do modelo treinado';$('connection').textContent='IA conectada';
 }catch(e){$('aiStatus').textContent='IA indisponível: '+e.message;$('detail').textContent='IA indisponível. Nenhuma entrada de IA será emitida.';$('connection').textContent='IA offline';}
 finally{aiBusy=false}
}
$('aiConnect').onclick=async()=>{
 const url=$('aiUrl').value.trim().replace(/\/+$/,'');
 if(!url.startsWith('https://')){$('aiStatus').textContent='Use uma URL HTTPS válida.';return}
 aiEndpoint=url;aiActive=true;clearInterval(aiTimer);$('aiStatus').textContent='Conectando…';await aiPoll();aiTimer=setInterval(aiPoll,15000)
};
$('aiDisconnect').onclick=()=>{aiActive=false;clearInterval(aiTimer);$('aiStatus').textContent='IA desconectada — análise técnica disponível';$('aiResults').replaceChildren();scan()};
