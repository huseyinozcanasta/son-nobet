/* SON NOBET 1.9 -- offline memory map and release manager */
(function(){
"use strict";
const VERSION="1.20.0", BASE="https://github.com/huseyinozcanasta/son-nobet", STORE="son-nobet-mechanisms-v1";
const KEYS=["son-nobet-fbt-v1","son-nobet-v1","son-nobet-v2",STORE];
const ITEMS=(window.SON_MECHANISMS||{}).diagrams||[];
const BY={};ITEMS.forEach(x=>{BY[x.n]=x});
let mem;try{mem=JSON.parse(localStorage.getItem(STORE)||"{}")||{}}catch(e){mem={}}
mem.stage=mem.stage||{};mem.passed=mem.passed||{};
let latest=null,error="Sürüm henüz kontrol edilmedi.",message="",pendingRestore=null;
try{let receipt=JSON.parse(localStorage.getItem("son-nobet-transfer-receipt")||"null");if(receipt&&receipt.message)message=receipt.message}catch(e){}
const esc=t=>String(t===undefined?"":t).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&#39;"}[c]));
const save=()=>localStorage.setItem(STORE,JSON.stringify(mem));
const done=()=>Object.keys(mem.passed).filter(n=>mem.passed[n]&&BY[n]).length;
function compare(a,b){let A=String(a).match(/(\d+)\.(\d+)\.(\d+)/),B=String(b).match(/(\d+)\.(\d+)\.(\d+)/);if(!A||!B)return 0;for(let i=1;i<=3;i++){if(+A[i]!==+B[i])return +A[i]>+B[i]?1:-1}return 0}
function draw(n){
let d=BY[n];if(!d)return "";
let stage=Math.max(1,Math.min(d.steps.length,Number(mem.stage[n])||1)),passed=mem.passed[n];
let nodes=d.steps.map((part,i)=>'<div class="memoryChunk '+(i<stage?"visible":"concealed")+'"><div class="memoryNode"><div class="memoryCounter">'+(i+1)+'</div><div><small>'+esc(part[0])+'</small><strong>'+esc(part[1])+'</strong></div></div>'+(i===d.steps.length-1?"":'<div class="memoryArrow">↓</div>')+'</div>').join("");
let opts=d.choices.map((v,i)=>'<button class="option" onclick="SON_CENTER.answer('+n+','+i+')">'+String.fromCharCode(65+i)+'. '+esc(v)+'</button>').join("");
return '<div class="memoryBoard '+esc(d.color)+'"><div class="memoryEyebrow">🧬 HAFIZA HARİTASI · FBT #'+n+'</div><h3>'+esc(d.title)+'</h3><p class="caption">'+esc(d.label)+'</p><div class="memoryHook">'+esc(d.hook)+'</div>'+nodes+
(stage<d.steps.length?'<button class="btn alt" onclick="SON_CENTER.next('+n+')">SONRAKİ HALKAYI AÇ ↓</button>':passed?'<div class="success">✦ Mekanizma kristali kazanıldı. Zinciri kendi cümlenle yeniden kur.</div>':'<div class="memoryChallenge"><b>⚔️ AKTİF HATIRLAMA</b><h3>'+esc(d.check)+'</h3>'+opts+'<div id="memoryMessage-'+n+'"></div></div>')+
(d.sourceAuditPending?'<p class="hint">⚠️ Bu mekanizma bilimsel referansla çalışılmıştır; bu FBT sorusu özgün el yazısı PDF ile henüz görsel olarak karşılaştırılmamıştır.</p>':'')+'<p class="caption">Bilimsel referans: <a target="_blank" href="'+esc(d.url)+'">'+esc(d.source)+'</a>. Eğitim amaçlı sadeleştirilmiş şemadır.</p></div>';
}
function panel(n){n=Number(n);return BY[n]?'<div id="memory-'+n+'">'+draw(n)+'</div>':'<div class="panel memoryPending"><span class="chip lock">MEKANİZMA KARTI HENÜZ HAZIR DEĞİL</span><p class="mini">Bu sorunun öğrenme kartı henüz hazırlanmadı; dijital kaynak ile özgün görsel denetimi ayrı süreçlerdir.</p></div>'}
function next(n){n=Number(n);if(!BY[n]||mem.passed[n])return;mem.stage[n]=Math.min(BY[n].steps.length,(Number(mem.stage[n])||1)+1);save();let e=document.getElementById("memory-"+n);if(e)e.innerHTML=draw(n)}
function answer(n,i){n=Number(n);let d=BY[n];if(!d||mem.passed[n])return;if(i!==d.correct){let e=document.getElementById("memoryMessage-"+n);if(e)e.innerHTML='<div class="hint">İpucu: '+esc(d.explain)+'</div>';return}mem.passed[n]=true;mem.stage[n]=d.steps.length;save();let el=document.getElementById("memory-"+n);if(el)el.innerHTML=draw(n)}
function latestHTML(){if(!latest)return '<p class="mini">'+esc(error)+'</p>';let newer=compare(latest.tag,VERSION)>0;return '<div class="releaseBadge"><span class="chip">'+(newer?"YENİ SÜRÜM VAR":"BU SÜRÜM GÜNCEL")+'</span><h3>'+esc(latest.tag)+'</h3><a class="btn updateLink" target="_blank" href="'+esc(latest.apk)+'">APK DOSYASINI GITHUB DAN İNDİR ↗</a></div>'}
function showRelease(){let e=document.getElementById("releaseInfo");if(e)e.innerHTML=latestHTML()}
function check(){error="GitHub kontrol ediliyor…";showRelease();if(window.SonBridge&&window.SonBridge.checkUpdates){window.SonBridge.checkUpdates()}else{error="Bağlantı kontrolü bu cihazda kullanılmıyor. GitHub sürüm sayfasını aç.";showRelease()}}
function onRelease(s){try{let x=JSON.parse(s);if(x.error)throw Error(x.error);if(!/^v\d+\.\d+\.\d+$/.test(x.tag)||!/^https:\/\/github\.com\/huseyinozcanasta\/son-nobet\/releases\/download\//.test(x.apk))throw Error("Kaynak adresi doğrulanamadı");latest=x;error=""}catch(e){latest=null;error=String(e.message||e)}showRelease()}
function backup(){
let obj={schema:"son-nobet-progress",schemaVersion:1,date:new Date().toISOString(),items:{}};
KEYS.forEach(k=>{try{let v=localStorage.getItem(k);if(v)obj.items[k]=JSON.parse(v)}catch(e){}});
let data=JSON.stringify(obj);let el=document.getElementById("progressText");if(el){el.value=data;el.focus();el.select()}
message="Yedek kodu hazır ("+data.length+" karakter).";
if(window.SonBridge&&window.SonBridge.copyText){window.SonBridge.copyText(data);message+=" Panoya kopyalandı."}status();
}
function status(){let e=document.getElementById("progressStatus");if(e)e.textContent=message}
function validate(k,v){if(!v||typeof v!=="object"||Array.isArray(v))return false;if(k==="son-nobet-fbt-v1")return v.records&&typeof v.records==="object"&&Object.keys(v.records).length<=443&&Object.keys(v.records).every(n=>/^\d{1,3}$/.test(n)&&+n>=1&&+n<=443);if(k===STORE)return v.passed&&typeof v.passed==="object";return Number.isFinite(Number(v.xp||0))}
function restore(){
try{let input=document.getElementById("progressText");if(!input)throw Error("Yedek alanı bulunamadı");let raw=input.value;if(!raw.trim())throw Error("Önce yedek kodunu bu alana yapıştır");if(raw.length>2000000)throw Error("Yedek sınırı aşıldı");
let b=JSON.parse(raw);if(b.schema!=="son-nobet-progress"||b.schemaVersion!==1||!b.items)throw Error("Yedek formatı uyuşmuyor");
let found=KEYS.filter(k=>Object.prototype.hasOwnProperty.call(b.items,k));if(!found.length)throw Error("Kayıt bulunamadı");
found.forEach(k=>{if(!validate(k,b.items[k]))throw Error("Geçersiz kayıt: "+k)});
pendingRestore={raw,items:b.items,found};
message="Yedek geçerli. Aktarmak için aşağıdaki AKTARIMI ONAYLA düğmesine dokun.";status();
let target=document.getElementById("restorePreview");if(target)target.innerHTML='<div class="panel hero"><h3>Yedek bulundu</h3><p class="mini">'+found.length+' kayıt seti aktarılacak. Bu sürümdeki ilgili kayıtların yerini alır.</p><button class="btn" onclick="SON_CENTER.commitRestore()">AKTARIMI ONAYLA</button><button class="btn alt" onclick="SON_CENTER.cancelRestore()">VAZGEÇ</button></div>';
return true;
}catch(e){pendingRestore=null;message="Geri yükleme başarısız: "+String(e.message||e);status();let target=document.getElementById("restorePreview");if(target)target.innerHTML='';return false}
}
function cancelRestore(){pendingRestore=null;let target=document.getElementById("restorePreview");if(target)target.innerHTML='';message="Aktarım iptal edildi; mevcut ilerleme korundu.";status()}
function commitRestore(){
if(!pendingRestore){message="Önce yedek kodunu kontrol et.";status();return false}
let plan=pendingRestore,input=document.getElementById("progressText");
if(!input||input.value!==plan.raw){cancelRestore();message="Yedek kodu değişti; yeniden kontrol et.";status();return false}
let before={};try{
plan.found.forEach(k=>{before[k]=localStorage.getItem(k)});
plan.found.forEach(k=>{let value=JSON.parse(JSON.stringify(plan.items[k]));if(k==='son-nobet-v1')value.screen='fbt_updates';let text=JSON.stringify(value);localStorage.setItem(k,text);if(localStorage.getItem(k)!==text)throw Error("Kayıt yazımı doğrulanamadı")});
message="Aktarım tamamlandı. "+plan.found.length+" kayıt seti geri yüklendi.";
localStorage.setItem('son-nobet-transfer-receipt',JSON.stringify({message,date:new Date().toISOString()}));pendingRestore=null;status();location.reload();return true;
}catch(e){
try{Object.keys(before).forEach(k=>localStorage.removeItem(k));Object.keys(before).forEach(k=>{if(before[k]!==null)localStorage.setItem(k,before[k])});message="Aktarım tamamlanamadı; önceki kayıtlar korundu: "+String(e.message||e)}catch(rollback){message="Aktarım hatası: "+String(e.message||e)+". Yedek kodunu sakla ve yeniden dene."}
status();return false;
}
}

function view(){
let checked=Object.keys((window.FBT_AUDIT||{}).reviewed||{}).length;
let links=ITEMS.map(d=>'<button class="memoryIndex" onclick="FBT.open('+d.n+')"><span>#'+d.n+'</span><strong>'+esc(d.title)+'</strong><span>'+(mem.passed[d.n]?"✓":"›")+'</span></button>').join("");
return '<button class="btn small alt" onclick="go(&quot;home&quot;)">← ANA ÜS</button><div class="eyebrow" style="margin-top:22px">SON NÖBET · SÜRÜM MERKEZİ</div><h1>YENİ SÜRÜM.<br><span style="color:var(--cyan)">AYNI HEDEF.</span></h1><div class="panel hero"><div class="row"><span class="chip">KURULU v'+VERSION+'</span><span class="tag">GITHUB RELEASES</span></div><h2 style="margin-top:15px">Güncelleme radarın</h2><p class="mini">Yeni APK için GitHub sürümlerini kontrol et. İnternet yokken dersler çevrimdışı çalışır.</p><div id="releaseInfo">'+latestHTML()+'</div><button class="btn" onclick="SON_CENTER.check()">YENİ SÜRÜM KONTROLÜ ↗</button><a class="btn alt updateLink" target="_blank" href="'+BASE+'/releases">TÜM GITHUB SÜRÜMLERİ ↗</a><p class="caption">Debug imzaları/paket adları farklı olduğundan yeni APK otomatik olarak eskisinin üstüne kurulamaz.</p></div>'+
'<div class="panel"><h2>💾 İlerlemeni koru</h2><p class="mini">v1.9 ve sonraki sürümlerde kayıtları yedek kodu ile taşı. Eski v1.8 uygulamasında bu özellik olmadığı için oradan otomatik aktarım yapılamaz.</p><button class="btn" onclick="SON_CENTER.backup()">YEDEK KODU OLUŞTUR / KOPYALA</button><textarea id="progressText" rows="4" placeholder="Buraya yedek kodunu yapıştırarak geri yükleyebilirsin."></textarea><button class="btn alt" onclick="SON_CENTER.restore()">YEDEĞİ GERİ YÜKLE</button><div id="restorePreview"></div><p class="caption" id="progressStatus" role="status" aria-live="polite">'+esc(message)+'</p></div>'+
'<div class="panel"><div class="row"><h2>🧬 Hafıza haritası</h2><span class="chip">'+done()+'/'+ITEMS.length+'</span></div><p class="mini">Her soruda dört adımlı mekanizma zincirini aç, son kararı kendin ver.</p>'+links+'</div>'+
'<div class="panel"><h3>🔬 Soru denetimi</h3><div class="progress"><div class="bar" style="width:'+(checked/442*100).toFixed(2)+'%"></div></div><div class="row mini"><b>'+checked+'/442 kaynak görseli incelendi</b><span>'+(442-checked)+' bekliyor</span></div><p class="caption">PDF karşılaştırması tek başına bilimsel doğrulama değildir. 82 kart oluşturuldu; 57 soru için dijital DOCX bölüm eşlemesi yapıldı. Bunlar özgün el yazısı PDF görsel denetimi değildir.</p></div>';
}
window.SON_CENTER={VERSION,view,panel,next,answer,check,onRelease,backup,restore,commitRestore,cancelRestore,done,compare};
})();