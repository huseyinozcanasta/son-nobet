/* SON NOBET 1.15: extensible FBT quest engine, independent of the original FBT #016 adventure. */
(function(){
"use strict";
var payload=window.SON_QUESTS115;
if(!payload||!payload.quests||!window.FBT)throw Error("1.15 gorev verileri veya FBT motoru eksik");
var Q=payload.quests;
function e(t){return String(t==null?"":t).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function valid(n){return Object.prototype.hasOwnProperty.call(Q,String(n))}
function store(n){
  if(!s.quests115||typeof s.quests115!=="object")s.quests115={};
  if(!s.quests115[n])s.quests115[n]={done:[0,0,0],picks:{},boss:{},passed:false,best:0};
  var v=s.quests115[n];
  if(!Array.isArray(v.done)||v.done.length!==3)v.done=[0,0,0];
  if(!v.picks)v.picks={};
  if(!v.boss)v.boss={};
  return v;
}
function wordCount(lesson){return lesson.segments.reduce(function(sum,z){return sum+z.paragraphs.join(" ").trim().split(/\s+/).filter(Boolean).length},0)}
function completed(v){return v.done.reduce(function(t,n){return t+n},0)}
function refs(q){return '<div class="panel"><h3>📎 Kullanılan kaynaklar</h3><p class="caption">Özgün FBT cevabı korunur. Ders PDF ve kılavuz yorumları eğitim amaçlıdır; birbirinin yerine geçmez.</p>'+q.refs.map(function(x){return '<p class="mini"><a target="_blank" rel="noopener noreferrer" href="'+e(x.url)+'">'+e(x.name)+' ↗</a></p>'}).join('')+'</div>'}
function button(text,action,secondary){return '<button class="btn '+(secondary?"alt":"")+'" onclick="'+action+'">'+text+'</button>'}
function path(){var n=s.quest115num,q=Q[n],v=store(n);
 var cards=q.lessons.map(function(l,i){return '<div class="panel"><div class="row"><h2>'+e(l.icon)+' '+e(l.name)+'</h2><span class="chip">'+v.done[i]+'/3</span></div><p class="caption">'+wordCount(l)+' kelime · yaklaşık '+Math.max(1,Math.ceil(wordCount(l)/150))+' dk okumalık bölüm</p>'+
 l.segments.map(function(z,j){var locked=j>v.done[i];return '<button class="stageBtn '+(locked?'locked':'')+'" '+(locked?'disabled':'')+' onclick="NOBET115.stage('+i+','+j+')"><span class="nodeIcon">'+(j<v.done[i]?'✓':locked?'🔒':j+1)+'</span><span class="grow"><b>'+e(z.name)+'</b><span class="caption">'+(locked?'Önceki aşama gerekli':j<v.done[i]?'Yeniden oku':'Klinik karşılaşma · +30 XP')+'</span></span><span class="arrow">›</span></button>'}).join('')+'</div>'}).join('');
 var lock=completed(v)!==9;
 return '<button class="btn alt small" onclick="NOBET115.back()">← FBT KARTI</button><div class="eyebrow" style="margin-top:22px">YENİ KLİNİK RPG · FBT #'+n+'</div><h1>'+e(q.icon)+' '+e(q.title)+'</h1><p class="lead">'+e(q.subtitle)+'</p><div class="panel hero"><span class="chip">'+completed(v)+'/9 KARAR AÇILDI</span><div class="progress"><div class="bar" style="width:'+Math.round(completed(v)/9*100)+'%"></div></div><p class="mini">Her aşama doğru klinik kararla açılır. Yanlış yanıtta açıklama verilir, ilerleme kaybolmaz.</p></div>'+cards+
 '<div class="panel hero"><h2>👑 SON NÖBET BOSS</h2><p class="mini">7 soru · geçmek için 6 doğru · +150 XP (ilk başarı)</p>'+button(lock?'🔒 ÖNCE 9 AŞAMAYI TAMAMLA':'⚔️ BOSS SAVAŞINA GİR','NOBET115.boss()',false).replace('<button ','<button '+(lock?'disabled ':'') )+'</div>'+refs(q);
}
function stageView(){var n=s.quest115num,q=Q[n],i=s.quest115lesson,j=s.quest115stage,v=store(n);
 var l=q.lessons[i],z=l.segments[j],key=i+'-'+j,done=j<v.done[i],pick=v.picks[key];
 var ans=z.challenge.answers.map(function(x,k){return '<button class="option '+(pick===k?'selected':'')+'" onclick="NOBET115.pick('+i+','+j+','+k+')">'+String.fromCharCode(65+k)+'. '+e(x)+'</button>'}).join('');
 return '<button class="btn alt small" onclick="NOBET115.map()">← GÖREV HARİTASI</button><div class="eyebrow" style="margin-top:22px">FBT #'+n+' · DERS '+(i+1)+'/3 · AŞAMA '+(j+1)+'/3</div><h1>'+e(l.icon)+' '+e(z.name)+'</h1><div class="panel"><p class="caption">Kaynak: '+e(q.source)+'</p><p class="caption">📖 '+z.paragraphs.join(" ").trim().split(/\s+/).length+' kelime</p></div><div class="panel reading"><h2>'+e(l.name)+'</h2>'+z.paragraphs.map(function(p){return '<p>'+e(p)+'</p>'}).join('')+'</div><div class="panel encounter"><span class="chip">⚔️ KLİNİK KARAR</span><h3 style="margin-top:16px">'+e(z.challenge.q)+'</h3>'+ans+
 (done?'<div class="success">✓ Tamamlandı. '+e(z.challenge.explain)+'</div>':button('KARARI KONTROL ET →','NOBET115.check()').replace('<button ','<button '+(pick===undefined?'disabled ':'') ))+
 '<div id="quest115feedback" role="status"></div></div>'+button('HARİTAYA DÖN','NOBET115.map()',true)+refs(q);
}
function bossView(){var n=s.quest115num,q=Q[n],v=store(n),all=completed(v)===9;
 if(!all)return path();
 return '<button class="btn alt small" onclick="NOBET115.map()">← HARİTA</button><div class="eyebrow" style="margin-top:22px">👑 BOSS · FBT #'+n+'</div><h1>SON SÖZLÜ</h1><p class="lead">7 klinik karar, en az 6 doğru. Yanıt anahtarı göndermeden görünmez.</p>'+
 q.boss.map(function(z,i){return '<div class="panel"><div class="step">SORU '+(i+1)+'/7</div><h3>'+e(z.q)+'</h3>'+z.answers.map(function(a,j){return '<button class="option '+(v.boss[i]===j?'selected':'')+'" onclick="NOBET115.bossPick('+i+','+j+')">'+String.fromCharCode(65+j)+'. '+e(a)+'</button>'}).join('')+'</div>'}).join('')+
 button("SONUCU AÇ →","NOBET115.finish()").replace('<button ','<button '+(Object.keys(v.boss).length<7?'disabled ':'') );
}
function result(){var n=s.quest115num,q=Q[n],v=store(n),score=q.boss.reduce(function(t,x,i){return t+(x.correct===v.boss[i]?1:0)},0);
 return '<div class="panel hero" style="text-align:center"><div class="reward">'+(score>=6?'🏆':'🩺')+'</div><h1>'+(score>=6?'BOSS YENİLDİ!':'TEKRAR DENE')+'</h1><h2>'+score+'/7 DOĞRU</h2><p class="mini">En iyi: '+(v.best||score)+'/7 · '+(v.passed?'Bu görevi başarıyla tamamladın':'Geçiş için 6 doğru gerekli')+'</p>'+button('HARİTAYA DÖN','NOBET115.map()',true)+button('BOSS TEKRAR','NOBET115.retry()')+'</div>'+
 q.boss.map(function(x,i){return '<div class="panel"><b>'+(x.correct===v.boss[i]?'✓ Doğru':'✕ Tekrar')+'</b><h3>'+e(x.q)+'</h3><p class="mini"><b>Yanıt:</b> '+e(x.answers[x.correct])+'</p><p class="caption">'+e(x.why)+'</p></div>'}).join('');
}
function active(){var n=s.quest115num;if(!valid(n))n=17;return n}
function draw(){var n=active();s.quest115num=n;renderHud();var el=document.getElementById('app');if(!el)return;
 el.innerHTML=s.quest115view==='stage'?stageView():s.quest115view==='boss'?bossView():s.quest115view==='result'?result():path();
}
function open(n){n=Number(n);if(!valid(n))return;s.quest115num=n;s.quest115view='map';store(n);save();go('quest115')}
function stage(i,j){var n=active(),v=store(n);if(!Q[n].lessons[i]||!Q[n].lessons[i].segments[j]||j>v.done[i])return;
 s.quest115lesson=i;s.quest115stage=j;s.quest115view='stage';save();go('quest115')}
function pick(i,j,k){var n=active(),v=store(n);v.picks[i+'-'+j]=k;save();var y=window.scrollY;render();window.scrollTo(0,y)}
function check(){var n=active(),v=store(n),i=s.quest115lesson,j=s.quest115stage,z=Q[n].lessons[i].segments[j],p=v.picks[i+'-'+j],target=document.getElementById('quest115feedback');
 if(j<v.done[i])return;
 if(p!==z.challenge.correct){if(target)target.innerHTML='<div class="hint">🩹 Henüz değil. '+e(z.challenge.explain)+' Yeniden dene.</div>';return;}
 v.done[i]=Math.max(v.done[i],j+1);award(30);save();
 s.quest115view='map';save();go('quest115');
}
function boss(){var n=active(),v=store(n);if(completed(v)!==9)return;s.quest115view='boss';save();go('quest115')}
function bossPick(i,j){var v=store(active());v.boss[i]=j;save();var y=window.scrollY;render();window.scrollTo(0,y)}
function finish(){var n=active(),v=store(n),q=Q[n];if(Object.keys(v.boss).length<7||completed(v)!==9)return;
 var score=q.boss.reduce(function(t,x,i){return t+(x.correct===v.boss[i]?1:0)},0);v.best=Math.max(v.best||0,score);
 if(score>=6&&!v.passed){v.passed=true;award(150);}
 s.quest115view='result';save();go('quest115')}
function retry(){var v=store(active());v.boss={};s.quest115view='boss';save();go('quest115')}
function back(){FBT.open(active())}
function map(){s.quest115view='map';save();go('quest115')}
window.NOBET115={open:open,stage:stage,pick:pick,check:check,boss:boss,bossPick:bossPick,finish:finish,retry:retry,back:back,map:map,meta:payload};
var oldRender=render;
render=function(){
 if(s.screen==='quest115'){draw();return;}
 oldRender();
 var root=document.getElementById('app');if(!root)return;
 if(s.screen==='home'){
   var locked=root.querySelector('.miniLevel');if(locked)locked.innerHTML='<h3>🆕 UZUN KLİNİK GÖREVLER</h3><p class="mini">FBT #017 ve #018 için 3 ders, 9 karar ve boss eklendi.</p>'+button('🫀 FBT #017 · DİRENÇLİ HT','NOBET115.open(17)')+button('🔥 FBT #018 · RANSON','NOBET115.open(18)',true);
 }
 if(s.screen==='fbt_card'){
   var state;
   try{state=JSON.parse(localStorage.getItem('son-nobet-fbt-v1')||'{}')}catch(err){state={}}
   var n=state.active;
   if(valid(n)){
     var target=root.querySelector('.hero');
     if(target)target.insertAdjacentHTML('afterend','<div class="panel hero"><span class="chip">🆕 KLİNİK MACERA HAZIR</span><h3>'+e(Q[n].title)+'</h3><p class="mini">3 ders · 9 karar · boss · kaynak bağlantıları</p>'+button('🎮 UZUN DERSİ AÇ →','NOBET115.open('+n+')')+'</div>');
   }
 }
};
var oldBack=window.appBack;
window.appBack=function(){if(s.screen==='quest115'){NOBET115.back()}else{oldBack()}};
save();render();
})();
