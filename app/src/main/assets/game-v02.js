/* SON NOBET v0.2: offline gamification layer; loaded after base engine. */
(function(){
"use strict";
var source=window.SON_NOBET_CONTENT;
if(!source||!source.lessons||source.lessons.length!==3)throw Error("Ders kaynaklari yuklenemedi");
if(!s.v2started){
  s.previousPass=!!s.passed;
  s.read=[false,false,false];s.passed=false;s.quiz={};s.score=null;
  s.chapter=[0,0,0];s.combo=0;s.hearts=3;s.badges=s.previousPass?["Eski sürüm gazisi"]:[];
  s.v2started=true;s.dailyDay="";s.dailyPick=-1;save();
}
s.chapter=Array.isArray(s.chapter)?s.chapter:[0,0,0];
s.badges=Array.isArray(s.badges)?s.badges:[];
s.combo=Number(s.combo)||0;s.hearts=typeof s.hearts==="number"?s.hearts:3;
function addBadge(name){if(s.badges.indexOf(name)<0)s.badges.push(name)}
function countDone(){return s.chapter.reduce(function(a,b){return a+b},0)}
function wordCount(i){return source.lessons[i].segments.reduce(function(n,x){return n+x.paragraphs.join(" ").trim().split(/\s+/).length},0)}
function mins(i){return Math.max(8,Math.ceil(wordCount(i)/150))}
function htmlSafe(x){return h(x)}
function choice(t,what,on){return '<button class="option '+(on?"selected":"")+'" onclick="'+what+'">'+htmlSafe(t)+'</button>'}
function progressBar(v){return '<div class="progress"><div class="bar" style="width:'+v+'%"></div></div>'}
function path(i){
 var l=source.lessons[i],n=s.chapter[i];
 return '<div class="panel"><div class="row"><h2>'+l.icon+' '+htmlSafe(l.name)+'</h2><span class="chip">'+n+'/3</span></div><p class="mini">'+htmlSafe(l.subtitle)+' · '+wordCount(i)+' kelime · yaklaşık '+mins(i)+' dk</p>'+progressBar(n/3*100)+l.segments.map(function(stage,j){
  return '<button class="stageBtn '+(j>n?"locked":"")+'" '+(j>n?"disabled":"")+' onclick="gameOpen('+i+','+j+')"><span class="nodeIcon">'+(j<n?"✓":j>n?"🔒":j+1)+'</span><span class="grow"><b>'+htmlSafe(stage.name)+'</b><span class="caption">'+(j<n?"Yeniden oku":j===n?"Klinik karşılaşma • +30 XP":"Önceki perdeyi bitir")+'</span></span><span class="arrow">›</span></button>'
 }).join("")+'</div>'
}
home=function(){
var done=countDone(),pct2=Math.round((done+(s.passed?1:0))/10*100);
return '<div class="eyebrow">FBT 016 · SAHA GÜNLÜĞÜ · v0.2</div><h1>SON <span style="color:var(--cyan)">NÖBET</span><br>LEVEL ATLAR</h1><p class="lead">3 derinleştirilmiş ders · 9 karşılaşma · 7 soruluk final. Gerçekten oku, klinik kararı ver, kombonu yükselt.</p><div class="panel hero"><span class="chip">🎮 AKTİF GÖREV</span><h2 style="margin-top:15px">Elektrolit Krizi</h2><p class="mini">FBT #016 — Barsak seslerini azaltan elektrolit bozukluğu?</p>'+progressBar(pct2)+'<div class="row mini"><span>'+done+' / 9 kontrol noktası</span><b>'+pct2+'%</b></div><button class="btn" onclick="go(&quot;map&quot;)">GÖREV HARİTASI →</button></div><div class="dividerHead">ÜÇ BÖLÜMLÜ MACERA</div>'+source.lessons.map(function(x,i){return '<button class="missionCard" onclick="gameOpen('+i+','+Math.min(s.chapter[i],2)+')"><span class="missionIcon">'+x.icon+'</span><span class="grow"><b>'+htmlSafe(x.name)+'</b><span class="caption">'+s.chapter[i]+'/3 perde · '+mins(i)+' dk</span>'+progressBar(s.chapter[i]/3*100)+'</span><span class="arrow">›</span></button>'}).join("")+'<div class="panel"><h3>🎲 Günün sürpriz vakası</h3><p class="mini">Günde bir kez +20 XP kazan. Farklı bir vaka sorusu.</p><button class="btn alt" onclick="go(&quot;daily&quot;)">VAKAYI AÇ →</button></div><div class="panel"><h3>🎖️ Madalya vitrini</h3><p class="mini">'+(s.badges.length?s.badges.map(htmlSafe).join(" · "):"İlk karşılaşmayı geçince madalyalar burada görünür.")+'</p></div><div class="panel miniLevel"><b>🔒 #017 Dirençli Hipertansiyon</b><p class="caption">Sonraki içerik paketinde açılacak.</p><b>🔒 #018 Ranson kriterleri</b><p class="caption">Henüz eklenmedi.</p></div>'
};
map=function(){var done=countDone();return '<button class="btn alt small" onclick="go(&quot;home&quot;)">← ANA MENÜ</button><div class="eyebrow" style="margin-top:24px">9 KLİNİK KONTROL NOKTASI</div><h1>GÖREV<br>HARİTASI</h1><p class="lead">Her ders yaklaşık '+Math.round(source.lessons.reduce(function(n,x,i){return n+mins(i)},0))+' dakikalık özgün çalışma notlarından seçilmiş metin içerir. Bekleme sayacı yok; ilerleme mini klinik sınavla açılır.</p>'+source.lessons.map(function(x,i){return path(i)}).join("")+'<div class="panel hero"><h2>👑 BOSS — Son sözlü</h2><p class="mini">7 klinik soru · 6 doğru gerekli · +150 XP</p><button class="btn" '+(done<9?"disabled":"")+' onclick="go(&quot;quiz&quot;)">'+(done<9?"ÖNCE 9 AŞAMAYI BİTİR":"BOSS SAVAŞINA GİR →")+'</button></div>'};
window.gameOpen=function(i,j){if(j>s.chapter[i])return;s.currentLesson=i;s.currentStage=j;s.pick[i]=null;go("lesson"+i)};
lesson=function(i){
var j=typeof s.currentStage==="number"?s.currentStage:s.chapter[i],l=source.lessons[i],seg=l.segments[j],completed=j<s.chapter[i];
var ps=seg.paragraphs.map(function(p){return '<p>'+htmlSafe(p)+'</p>'}).join("");
var answers=seg.challenge.answers.map(function(a,k){return choice(String.fromCharCode(65+k)+". "+a,"pickLesson("+i+","+k+")",s.pick[i]===k)}).join("");
return '<button class="btn alt small" onclick="go(&quot;map&quot;)">← GÖREV HARİTASI</button><div class="eyebrow" style="margin-top:22px">BÖLÜM 0'+(i+1)+' / 03 · PERDE '+(j+1)+'/3</div><h1>'+l.icon+' '+htmlSafe(seg.name)+'</h1><div class="panel"><div class="row"><span class="tag">📖 '+seg.paragraphs.join(" ").split(/\s+/).length+' kelime</span><span class="tag">+30 XP</span></div><p class="caption">Kaynak: '+htmlSafe(l.source)+'</p></div><div class="panel reading"><h2>'+htmlSafe(l.name)+'</h2>'+ps+'</div><div class="panel encounter"><div class="row"><span class="chip">⚔️ KLİNİK KARŞILAŞMA</span><span class="mini">❤️ '+s.hearts+' · 🔥 '+s.combo+'</span></div><h3 style="margin-top:15px">'+htmlSafe(seg.challenge.q)+'</h3>'+answers+(completed?'<div class="success">✓ Daha önce geçtin. '+htmlSafe(seg.challenge.explain)+'</div>':'<button class="btn" '+(s.pick[i]===null?"disabled":"")+' onclick="checkLesson('+i+')">KARAR VER →</button>')+'<div id="feedback"></div></div>'+(completed?'<button class="btn" onclick="gameNext('+i+','+j+')">SONRAKİ AŞAMA →</button>':'')+'<button class="btn ghost" onclick="go(&quot;map&quot;)">HARİTAYA DÖN</button>'
};
pickLesson=function(i,j){s.pick[i]=j;save();var y=window.scrollY;render();window.scrollTo(0,y)};
checkLesson=function(i){
var j=s.currentStage,seg=source.lessons[i].segments[j],f=document.getElementById("feedback");
if(j<s.chapter[i]){go("map");return}
if(s.pick[i]!==seg.challenge.correct){
 s.hearts=Math.max(0,s.hearts-1);s.combo=0;save();
 if(f)f.innerHTML='<div class="hint">🩹 Yanlış karar. İpucu: '+htmlSafe(seg.challenge.explain)+' Tekrar dene; canın bitse de görevden atılmazsın.</div>';
 return;
}
s.chapter[i]=Math.max(s.chapter[i],j+1);s.combo++;s.hearts=Math.min(5,s.hearts+1);
if(countDone()===1)addBadge("🔎 İlk vaka");
if(s.combo>=3)addBadge("🔥 Üçlü kombo");
if(countDone()===9)addBadge("🧪 Dokuz görev");
if(s.chapter[i]===3){s.read[i]=true;award(35)}award(30+(s.combo>=3?10:0));s.pick[i]=null;save();go("stagewin")
};
window.gameNext=function(i,j){if(j<2)window.gameOpen(i,j+1);else go("map")};
var boss=[
 {q:"FBT #016: Bağırsak seslerini azaltabilen iki elektrolit bozukluğu?",a:["Hipokalemi ve hiperkalsemi","Hipernatremi ve hipofosfatemi","Hiperkalemi ve hipokalsemi","Hiponatremi ve hipokloremi"],c:0,why:"FBT s.6 yanıtı hipokalemi ve hiperkalsemidir."},
 {q:"K⁺ 2,8 mEq/L, distansiyon ve hipomotilite. Hangi durumla ilişkilidir?",a:["Hiperkalemi","Hipokalemi","Hipernatremi","Yalnız hiperfosfatemi"],c:1,why:"Hipokalemi bağırsak düz kas hareketlerini azaltabilir."},
 {q:"Hiperkalsemide en olası GİS yakınması hangisi?",a:["Kabızlık","Hemoptizi","Kanlı kusma","Zorunlu sulu ishal"],c:0,why:"Hiperkalsemi gastrointestinal motiliteyi azaltabilir."},
 {q:"Batın muayenesinde tipik sıra?",a:["Palpasyon → dinleme → bakma","İnspeksiyon → oskültasyon → perküsyon → palpasyon","Perküsyon → palpasyon → inspeksiyon","Derin palpasyon → inspeksiyon"],c:1,why:"Oskültasyon genellikle perküsyon/palpasyondan önce yapılır."},
 {q:"Azalmış bağırsak sesi tek başına neyi kanıtlamaz?",a:["Hipomotilite ihtimali","Klinik değerlendirmenin gerekliliği","Kesin paralitik ileus tanısını","Elektrolit bakmanın anlamını"],c:2,why:"Tek oskültasyon bulgusu kesin tanı koydurmaz."},
 {q:"Hiperkalsemide etiyoloji ayrımında ilk değerlendirilecek hormon hangisi?",a:["PTH","T3","FSH","Prolaktin"],c:0,why:"PTH, PTH bağımlı / bağımsız hiperkalsemiyi ayırmada temel laboratuvar basamağıdır."},
 {q:"Ağır hipokalemide bağırsak bulgularının yanı sıra hangi sistemin riskini değerlendirirsin?",a:["Yalnız göz","Kalp ritmi / EKG","Sadece deri","Sadece tiroid"],c:1,why:"Hipokalemi kalbin elektriksel sistemini de etkiler."}
];
quiz=boss.map(function(x){return x});
quizView=function(){return '<button class="btn alt small" onclick="go(&quot;map&quot;)">← HARİTA</button><div class="eyebrow" style="margin-top:24px">👑 BOSS FIGHT · FBT #016</div><h1>SON SÖZLÜ</h1><p class="lead">7 soru, 6 doğruyla geçersin. Sonuçlar teslim edene kadar saklı.</p>'+quiz.map(function(q,i){return '<div class="panel"><div class="step">SORU '+(i+1)+'/7</div><h3>'+htmlSafe(q.q)+'</h3>'+q.a.map(function(a,j){return choice(String.fromCharCode(65+j)+". "+a,"pickQuiz("+i+","+j+")",s.quiz[i]===j)}).join("")+'</div>'}).join("")+'<button class="btn" '+(Object.keys(s.quiz).length<7?"disabled":"")+' onclick="finish()">BOSS\'U YEN →</button>'};
pickQuiz=function(i,j){s.quiz[i]=j;save();var y=window.scrollY;render();window.scrollTo(0,y)};
finish=function(){var n=quiz.filter(function(q,i){return q.c===s.quiz[i]}).length;s.score=n;if(n>=6&&!s.passed){s.passed=true;addBadge("🏆 Son nöbet galibi");award(150)}else{save()}go("victory")};
victory=function(){var n=Number(s.score)||0,pass=n>=6;return '<div class="panel hero" style="text-align:center"><div class="reward">'+(pass?"🏆":"🩺")+'</div><h1>'+(pass?"BOSS YENİLDİ!":"YENİDEN DENE!")+'</h1><h2>'+n+'/7 doğru</h2><p class="lead">'+(pass?"FBT #016 finalini geçtin. Kalıcılık için ertesi gün tekrar gerek.":"Hedef 6 doğru. Hatalarını inceleyerek tekrar oyna.")+'</p><button class="btn" onclick="go(&quot;oral&quot;)">SÖZLÜ PROVA →</button></div>'+quiz.map(function(q,i){return '<div class="panel"><b>'+(q.c===s.quiz[i]?"✓ Doğru":"✕ Tekrar")+'</b><p>'+htmlSafe(q.q)+'</p><p class="mini"><b>Yanıt:</b> '+htmlSafe(q.a[q.c])+' — '+htmlSafe(q.why)+'</p></div>'}).join("")+'<button class="btn alt" onclick="gameRetryBoss()">TEKRAR SAVAŞ</button><button class="btn ghost" onclick="go(&quot;home&quot;)">ANA MENÜ</button>'};
window.gameRetryBoss=function(){s.quiz={};save();go("quiz")};
var cases=[
 {q:"K⁺ 2,9 mEq/L ve distansiyon. FBT'nin hangi doğru yanıtı akla gelir?",a:["Hipokalemi","Hipernatremi","Hipofosfatemi"],c:0,why:"K⁺ değeri 3,5 mEq/L altındadır."},
 {q:"Taş öyküsü, kabızlık, yüksek Ca²⁺: hangi sorun?",a:["Hiponatremi","Hiperkalsemi","İzole hipokloremi"],c:1,why:"Yüksek kalsiyum hem renal hem gastrointestinal bulgulara yol açabilir."},
 {q:"Bağırsak sesleri azaldığında hangisi doğrudur?",a:["Tek başına kesin tanı koyar","Mutlaka ameliyat gerekir","Öykü, muayene ve tetkik birlikte değerlendirilir"],c:2,why:"Tek ses bulgusu kesin tanı koydurmaz."}
];
function dailyView(){var d=new Date().getDate()%cases.length,q=cases[d];return '<button class="btn alt small" onclick="go(&quot;home&quot;)">← ANA MENÜ</button><div class="eyebrow" style="margin-top:24px">🎲 GÜNÜN VAKASI</div><h1>ACİL NÖBET</h1><div class="panel hero"><span class="chip">'+(s.dailyDay===today()?"BUGÜN TAMAMLANDI":"+20 XP")+'</span><h3 style="margin-top:16px">'+htmlSafe(q.q)+'</h3>'+q.a.map(function(a,i){return choice(a,"gamePickDaily("+i+")",s.dailyPick===i)}).join("")+'<button class="btn" '+(s.dailyPick<0?"disabled":"")+' onclick="gameCheckDaily()">CEVAPLA →</button><div id="dailyResponse"></div></div>'}
window.gamePickDaily=function(i){s.dailyPick=i;save();var y=window.scrollY;render();window.scrollTo(0,y)};
window.gameCheckDaily=function(){var q=cases[new Date().getDate()%cases.length];var ok=s.dailyPick===q.c;var box=document.getElementById("dailyResponse");if(ok){if(s.dailyDay!==today()){s.dailyDay=today();addBadge("🧠 Günlük görev");award(20)}box.innerHTML='<div class="success">✓ Doğru! '+htmlSafe(q.why)+'</div>'}else{box.innerHTML='<div class="hint">İpucu: '+htmlSafe(q.why)+'</div>'}save()};
var oldRenderHud=renderHud;renderHud=function(){oldRenderHud();var stats=document.querySelectorAll(".stat strong");if(stats[0])stats[0].textContent=s.xp<250?"İNTÖRN":s.xp<500?"ASİSTAN":"UZMAN"};
var oldRender=render;render=function(){if(s.screen==="stagewin"){renderHud();document.getElementById("app").innerHTML='<div class="panel hero" style="text-align:center"><div class="reward">🏅</div><h1>AŞAMA GEÇİLDİ!</h1><h2>+30 XP</h2><p class="lead">🔥 Kombo: '+s.combo+' · ❤️ Can: '+s.hearts+'</p><button class="btn" onclick="gameNext('+s.currentLesson+','+s.currentStage+')">SONRAKİ PERDE →</button><button class="btn alt" onclick="go(&quot;map&quot;)">GÖREV HARİTASI</button></div>';return}
if(s.screen==="daily"){renderHud();document.getElementById("app").innerHTML=dailyView();return}
oldRender()
};
var oldReset=reset;reset=function(){if(confirm("Tüm SON NÖBET v0.2 ilerlemesi ve XP silinsin mi?")){localStorage.removeItem("son-nobet-v1");s=Object.assign({},s,{chapter:[0,0,0],read:[false,false,false],xp:0,combo:0,hearts:3,passed:false,quiz:{},score:null,badges:[],streak:0,lastDay:"",dailyDay:"",dailyPick:-1});save();go("home")}};
save();render();
})();