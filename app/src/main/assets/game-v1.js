/* SON NÖBET v1.0 — 443 indexed FBT tasks; 442 readable source questions. */
(function(){
"use strict";
var bank=(window.FBT_BANK||[]).sort(function(a,b){return a.number-b.number});
if(bank.length!==443)throw Error('FBT 1.0 içerikleri eksik: '+bank.length);
var KEY='son-nobet-fbt-v1';
var defaults={records:{},xp:0,active:16,filter:'all',query:'',category:'all',chapter:0,page:0,mode:'browse',session:[],sessionPos:0,sessionResults:[],spoken:'',revealed:false,toast:'',lastOpen:'',created:Date.now()};
var ps;
try{ps=Object.assign({},defaults,JSON.parse(localStorage.getItem(KEY)||'{}'))}catch(e){ps=Object.assign({},defaults)}
if(!ps.records||typeof ps.records!=='object')ps.records={};
function store(){try{localStorage.setItem(KEY,JSON.stringify(ps))}catch(e){}}
function $id(id){return document.getElementById(id)}
function safe(s){return h(s)}
function item(n){return bank[n-1]}
function timeISO(){return new Date().toISOString().slice(0,10)}
function midnightAdd(days){var d=new Date();d.setHours(12,0,0,0);d.setDate(d.getDate()+days);return d.toISOString().slice(0,10)}
function state(q){return ps.records[q.number]||{grade:-1,attempts:0,due:'',ever:false}}
function scored(q){return !!state(q).ever}
function due(q){var r=state(q);return r.ever&&r.due&&r.due<=timeISO()}
function counters(){var seen=bank.filter(function(q){return !q.missing&&scored(q)}).length;var dueCount=bank.filter(function(q){return !q.missing&&due(q)}).length;var strong=bank.filter(function(q){return state(q).grade===3}).length;return {seen:seen,due:dueCount,strong:strong,remaining:442-seen}}
function cat(q){return q.category||'Diğer'}
function listFilter(q){var r=state(q);if(ps.filter==='unseen'&&r.ever)return false;if(ps.filter==='due'&&!due(q))return false;if(ps.filter==='hard'&&r.grade!==0&&r.grade!==1)return false;if(ps.filter==='flagged'&&!q.needsReview)return false;if(ps.filter==='done'&&!r.ever)return false;if(ps.filter==='missing'&&!q.missing)return false;if(ps.filter==='pdfchecked'&&!auditFor(q))return false;if(ps.filter==='unchecked'&&(auditFor(q)||q.missing))return false;if(ps.category!=='all'&&cat(q)!==ps.category)return false;if(ps.chapter>0&&Math.ceil(q.number/20)!==ps.chapter)return false;if(ps.query){var needle=(q.number+' '+q.title+' '+q.sourceNote).toLocaleLowerCase('tr-TR');if(needle.indexOf(ps.query.toLocaleLowerCase('tr-TR'))===-1)return false;}return true}
function filtered(){return bank.filter(listFilter)}
function navNew(screen){s.screen=screen;ps.revealed=false;ps.spoken='';store();go(screen)}
function displayNew(screen){var sc=window.scrollY;render();window.scrollTo(0,screen==='keep'?sc:0)}
function short(q){var r=state(q);if(q.missing)return 'Kaynakta yok';if(!r.ever)return 'Yeni görev';return due(q)?'Tekrar zamanı':r.grade===3?'Biliyorum':r.grade===2?'İyi':r.grade===1?'Zorlandı':'Tekrar et'}
function auditFor(q){return window.FBT_AUDIT&&window.FBT_AUDIT.reviewed&&window.FBT_AUDIT.reviewed[q.number]||null}
function chip(q){if(q.missing)return '<span class="sourceChip missing">KAYNAKTA EKSİK</span>';var a=auditFor(q);return '<span class="sourceChip '+(a?'':'attention')+'">'+(a?'PDF GÖRSELİ GÖRÜLDÜ':'PDF KARŞILAŞTIRMASI BEKLİYOR')+'</span>'+(a&&a.warning?'<span class="sourceChip attention">ÖNEMLİ DÜZELTME</span>':q.needsReview?'<span class="sourceChip attention">AKTARIM ŞÜPHELİ</span>':'')}
function main(){var v=counters(),percent=Math.round(v.seen/442*100);return '<div class="eyebrow">SON NÖBET · V1.5 · TAM FBT ARŞİVİ</div><h1>443 KAPI.<br><span style="color:var(--cyan)">TEK NÖBET.</span></h1><p class="lead">442 kaynak sorusuyla sözlü çalış; 358 numaralı kaydın orijinalde eksik olduğunu unutma. Her cevap bir antrenman, her tekrar kalıcı öğrenme.</p><div class="panel hero"><div class="row"><span class="chip">⚔️ ANA HİKÂYE</span><span class="tag">FBT 001–443</span></div><h2 style="margin-top:15px">Klinik bilgi seferi</h2><div class="progress"><div class="bar" style="width:'+percent+'%"></div></div><div class="row mini"><span>'+v.seen+'/442 kaynak sorusu çalışıldı</span><b>'+percent+'%</b></div><div class="metricGrid"><div><strong>'+ps.xp+'</strong><small>FBT XP</small></div><div><strong>'+v.due+'</strong><small>Tekrar bekliyor</small></div><div><strong>'+v.remaining+'</strong><small>Yeni soru</small></div></div><button class="btn" onclick="FBT.startSprint()">⚡ 10 SORULUK NÖBET BAŞLAT</button><button class="btn alt" onclick="FBT.openList()">443 SORULUK HARİTAYI AÇ</button></div><div class="panel"><h3>🎮 Derinleşme: Elektrolit Krizi</h3><p class="mini">FBT #016 için üç ayrıntılı ders, dokuz klinik karşılaşma ve boss savaşı önceki sürümden korundu.</p><button class="btn alt" onclick="go(&quot;map&quot;)">FBT #016 UZUN DERS GÖREVİ →</button></div><div class="panel"><h3>🧠 Aralıklı tekrar</h3><p class="mini">Zorlanılan sorular ertesi güne, iyi bilinenler 3–7 gün sonraya planlanır. İlerleme bu telefonda saklanır.</p><button class="btn alt" onclick="FBT.viewDue()">TEKRAR GÖREVLERİ ('+v.due+')</button></div><div class="panel"><h3>📚 Kaynak durumu</h3><p class="mini">443 numaralık dizin, 442 kaynak sorusu, <b>1 eksik numara (#358)</b>. Şüpheli el yazısı aktarımı ve kısa cevaplar ayrıca işaretlenmiştir. Bu notlar sınav çalışma kaynağıdır, güncel klinik rehber değildir.</p></div>'}
function filtersUI(){var opts=[['all','Tümü'],['unseen','Yeni'],['due','Tekrar'],['hard','Zor'],['done','Bitirdim'],['flagged','Kontrol'],['pdfchecked','PDF görüldü'],['unchecked','Bekliyor'],['missing','Eksik']];return '<div class="filterScroll">'+opts.map(function(x){return '<button class="filterPill '+(ps.filter===x[0]?'on':'')+'" onclick="FBT.setFilter(\''+x[0]+'\')">'+x[1]+'</button>'}).join('')+'</div>'}
function selectedList(){var matches=filtered();var start=ps.page*25;var segment=matches.slice(start,start+25);var pages=Math.max(1,Math.ceil(matches.length/25));if(ps.page>=pages){ps.page=0;return selectedList()};return '<div class="row mini" style="margin:12px 0"><b>'+matches.length+' soru</b><span>Sayfa '+(ps.page+1)+'/'+pages+'</span></div>'+segment.map(function(q){return '<button class="fbrow '+(q.missing?'noSource':'')+'" onclick="FBT.open('+q.number+')"><span class="fbNo">#'+String(q.number).padStart(3,'0')+'</span><span class="grow"><b>'+safe(q.title)+'</b><span class="caption">'+safe(q.category)+' • s.'+q.sourcePage+' • '+short(q)+'</span></span><span class="arrow">›</span></button>'}).join('')+(matches.length===0?'<p class="mini">Bu filtrede soru bulunamadı.</p>':'')+'<div class="pager"><button class="btn alt small" '+(ps.page===0?'disabled':'')+' onclick="FBT.flip(-1)">← Önceki</button><span class="mini">'+(ps.page+1)+' / '+pages+'</span><button class="btn alt small" '+(ps.page+1>=pages?'disabled':'')+' onclick="FBT.flip(1)">Sonraki →</button></div>'}
function listView(){var cats=Array.from(new Set(bank.map(cat))).sort(function(a,b){return a.localeCompare(b,'tr')});return '<button class="btn alt small" onclick="go(&quot;home&quot;)">← ANA ÜS</button><div class="eyebrow" style="margin-top:24px">BÜTÜN FBT SORULARI</div><h1>GÖREV<br>ARŞİVİ.</h1><div class="panel"><label for="fbtSearch" class="mini">Soru, bulgu veya numarayla ara</label><input class="fbtSearch" id="fbtSearch" placeholder="Örn. vaskülit / 117 / diyabet" value="'+safe(ps.query)+'" oninput="FBT.search(this.value)"><div class="selectBar"><label class="mini" for="fbtChapter">Bölüm</label><select id="fbtChapter" onchange="FBT.setChapter(this.value)"><option value="0">Tüm numaralar</option>'+Array.from({length:23},function(_,i){var a=i*20+1,b=Math.min(443,a+19);return '<option value="'+(i+1)+'" '+(ps.chapter===i+1?'selected':'')+'>'+a+'–'+b+'</option>'}).join('')+'</select></div><div class="selectBar"><label class="mini" for="fbtCategory">Alan</label><select id="fbtCategory" onchange="FBT.setCategory(this.value)"><option value="all">Bütün alanlar</option>'+cats.map(function(c){return '<option '+(ps.category===c?'selected':'')+'>'+safe(c)+'</option>'}).join('')+'</select></div>'+filtersUI()+'</div><div id="fbtResults">'+selectedList()+'</div>'}
function questionView(){var q=item(ps.active),r=state(q),hasAnswer=!q.missing;return '<button class="btn alt small" onclick="FBT.back()">← '+(ps.mode==='sprint'?'NÖBETİ DURDUR':'SORU LİSTESİ')+'</button><div class="eyebrow" style="margin-top:24px">'+(ps.mode==='sprint'?'⚡ NÖBET '+(ps.sessionPos+1)+' / '+ps.session.length:'🎯 FBT SORU '+q.number+' / 443')+'</div><h1>LEVEL<br>#'+String(q.number).padStart(3,'0')+'</h1><div class="panel hero"><div class="row"><span class="chip">'+safe(cat(q)).toUpperCase()+'</span><span class="mini">Kaynak sayfa '+q.sourcePage+'</span></div><h2 style="font-size:22px;margin-top:17px">'+safe(q.title)+'</h2>'+chip(q)+'<div class="sep"></div><label for="selfAnswer" class="mini">Önce kendi yanıtını yaz veya sesli söyle</label><textarea id="selfAnswer" placeholder="Hocam, öncelikle..." oninput="FBT.write(this.value)" spellcheck="false">'+safe(ps.spoken)+'</textarea><button class="btn" '+(!hasAnswer?'disabled':'')+' onclick="FBT.reveal()">📖 KAYNAK NOTUNU GÖSTER</button>'+(q.missing?'<div class="hint">358 numaralı soru özgün aktarımda bulunmuyor. Bu level cevaplanabilir sayılmıyor.</div>':'')+'</div>'+(ps.revealed?'<div class="panel sourcePanel"><h3>📜 Orijinal FBT notu</h3><div class="sourceText">'+safe(q.number===443?q.sourceNote.split('Sayfa kontrolü ve belirsizlik listesi')[0].trim():q.sourceNote)+'</div><div class="caption" style="margin-top:16px">Transkripsiyon kaynağı: özgün FBT PDF sayfa '+q.sourcePage+'. [?] işareti belirsiz okumadır. Klinik bilgiler bağımsız olarak tek tek doğrulanmadı.</div></div><div class="panel"><h3>🧠 Kendini değerlendir</h3><p class="mini">Cevabı gerçekten söyleyebildiysen ona göre seç. Uydurma otomatik puan yok; XP ilk değerlendirmede verilir.</p><div class="gradeGrid"><button class="grade bad" onclick="FBT.grade(0)">✕ Bilemedim<span>Bugün tekrar</span></button><button class="grade hard" onclick="FBT.grade(1)">△ Zorlandım<span>Yarın tekrar</span></button><button class="grade good" onclick="FBT.grade(2)">✓ Bildim<span>3 gün sonra</span></button><button class="grade easy" onclick="FBT.grade(3)">★ Çok iyi<span>7 gün sonra</span></button></div></div>':'')+'<div class="panel"><h3>🎓 Öğrenme modu</h3><p class="mini">Bu sorunun ayrıntılı üç derslik sürümü '+(q.number===16?'hazır.':'henüz eklenmedi.')+' Öncelik bütün FBT sorularını aktif hatırlamayla bitirmek.</p>'+(q.number===16?'<button class="btn alt" onclick="go(&quot;map&quot;)">ÜÇ UZUN DERSE GEÇ</button>':'')+'</div>'}
function gradeReport(score){return '<div class="panel hero" style="text-align:center"><div class="reward">'+(score.good>=7?'🏆':'🩺')+'</div><h1>'+score.good+'/'+score.total+'<br>SÖZLÜ GÖREVİ</h1><p class="lead" style="margin:auto">'+score.hard+' soruda zorlandın. Cevabı notlara bakmadan yeniden söyleyebildiğinde öğrenme pekişecek.</p><h2 style="margin-top:20px">+'+score.earned+' XP</h2><button class="btn" onclick="FBT.startSprint()">YENİ BİR NÖBET →</button><button class="btn alt" onclick="go(&quot;home&quot;)">ANA ÜSSE DÖN</button></div>'}
function reportView(){return '<button class="btn alt small" onclick="go(&quot;home&quot;)">← ANA ÜS</button><div class="eyebrow" style="margin-top:25px">NÖBET RAPORU</div>'+gradeReport(ps.lastReport||{good:0,hard:0,total:0,earned:0})}

function verifiedSummary(q){if(!ps.revealed)return '';
  var a=auditFor(q);
  if(!a)return '<div class="panel auditPending"><h3>⏳ Kaynak denetimi bekliyor</h3><p class="mini">Bu kayıt dijital FBT aktarımından alınmıştır. El yazısı PDF ile <b>henüz sayfa sayfa karşılaştırılmadı</b> ve tıbbi cevap bağımsız doğrulanmadı. Kaynak notunu çalışırken şüpheli eşik, ilaç veya dozları ayrıca kontrol et.</p></div>';
  var refs=(a.sources||[]).map(function(x){var url=String(x.url||'');if(!/^https:\/\/[a-z0-9.-]+\//i.test(url))return '';return '<p class="mini">📎 <a href="'+safe(url)+'" target="_blank">'+safe(x.name)+'</a></p>'}).join('');
  return '<div class="panel auditChecked"><h3>🔍 Kaynak karşılaştırması</h3><p class="mini">FBT özgün PDF: <b>sayfa '+q.sourcePage+'</b> · el yazısı görseliyle karşılaştırıldı. Bu onay sadece kaynak aktarımı içindir.</p>'
 + (a.warning?'<div class="hint"><b>⚠️ Dikkat: özgün notta sorun olabilir.</b><p>'+safe(a.warning)+'</p></div>':'')
 + (a.summary?'<h3>🎓 Genişletilmiş / düzeltilmiş açıklama</h3><p>'+safe(a.summary)+'</p>':'')
 + (a.extraQuestion?'<div class="hint"><h3>🧩 Özgün kaynakta ikinci soru (aynı numara)</h3><p><b>'+safe(a.extraQuestion.prompt)+'</b></p><p><b>Orijinal cevap:</b> '+safe(a.extraQuestion.sourceAnswer)+'</p><p class="caption">'+safe(a.extraQuestion.note)+'</p></div>':'')
 + '<div class="sep"></div><b class="mini">Diğer referanslar</b>'+(refs||'<p class="caption">Henüz bağımsız ders slaytı veya klinik rehber eşleştirilmedi.</p>')
 +'<p class="caption">Orijinal not, üstte ayrı ve değiştirilmeden tutulur. Açıklama ek doğrulamadır; kaynak görsel eşleşmesi tek başına klinik doğruluk garantisi değildir.</p></div>';
}
var originalQuestionView=questionView;
questionView=function(){var html=originalQuestionView();var key='<div class="panel"><h3>🎓 Öğrenme modu</h3>';return html.replace(key,verifiedSummary(item(ps.active))+key)};
var originalMain=main;
main=function(){var checked=Object.keys((window.FBT_AUDIT&&window.FBT_AUDIT.reviewed)||{}).length;return originalMain().replace('<div class="panel"><h3>📚 Kaynak durumu</h3>','<div class="panel"><h3>🔬 Orijinal PDF denetimi</h3><p class="mini"><b>'+checked+'/442</b> soru özgün el yazısı PDF ile tek tek karşılaştırıldı. Kalan '+(442-checked)+' soru henüz <b>doğrulanmadı</b>. Doğrulanmamış yanıtlar gerçek klinik bilgi olarak sunulmaz.</p><button class="btn alt" onclick="FBT.setFilter(&quot;unchecked&quot;);FBT.openList()">KONTROL BEKLEYENLERİ GÖR</button></div><div class="panel"><h3>📚 Kaynak durumu</h3>')};


function inspectionFlags(q){
 var t=q.sourceNote||'',f=[];
 if(t.indexOf('[?]')>=0)f.push('Kaynakta [?] belirsizlik işaretleri var');
 if(t.toLocaleLowerCase('tr-TR').indexOf('okunamadı')>=0)f.push('Aktarımda okunamayan parça var');
 if(t.indexOf('[Kaynak notu kısaltıldı.')>=0)f.push('Aktarılan cevap kısaltılmış; özgün görsele bak');
 if(q.number===443)f.push('Dijital metne karışan 109 sayfalık aktarım kalite raporu, burada cevap metninden ayrıldı');
 if(!q.sourcePage||q.sourcePage<2||q.sourcePage>108)f.push('Kaynak sayfası incelenmeli');
 if(q.needsReview&&!f.length)f.push('Kısa/şüpheli kaynak notu — klinik açıdan ayrıca doğrula');
 return f;
}
function specificTerm(s){return String(s||'').toLocaleLowerCase('tr-TR').replace(/ı/g,'i').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^\wğüşöçıİ]+/g,' ').trim()}
function topicSlideCandidates(q){
 var b=window.FBT_SLIDE_CANDIDATES&&window.FBT_SLIDE_CANDIDATES.questions; if(!b)return [];
 var arr=b[q.number]||[];
 return arr.filter(function(x){return x.topicHits>=1&&x.rankScore>=16&&x.url.indexOf('https://drive.google.com/file/d/')===0&&!(q.number===443&&x.title.indexOf('Solunum')>=0)}).slice(0,3);
}
var previousVerifiedSummary=verifiedSummary;
verifiedSummary=function(q){
 if(!ps.revealed)return '<div class="panel"><p class="caption">Kaynak denetimi ve ders referansları, kendi cevabını verdikten sonra açılacak.</p></div>';
 var flags=inspectionFlags(q),arr=topicSlideCandidates(q),base=previousVerifiedSummary(q);
 var warning='<div class="panel auditQuality"><h3>📋 Tüm sorular için kaynak kalite kontrolü</h3><p class="mini">Orijinal PDF sayfası: <b>'+q.sourcePage+'</b> / 109. Bu referans geçerlidir; '+(auditFor(q)?'bu soru el yazısı görseliyle karşılaştırıldı.':'bu soru henüz el yazısı görseliyle tek tek karşılaştırılmadı.')+'</p>';
 warning += flags.length?'<div class="hint"><b>Kontrol gerektiren noktalar</b>'+flags.map(function(f){return '<p class="mini">⚠ '+safe(f)+'</p>'}).join('')+'</div>':'<p class="mini">Otomatik aktarım taramasında özel bir metin kusuru işaretlenmedi. Bu, tıbbi doğruluk onayı değildir.</p>';
 warning += '</div>';
 var slide='<div class="panel auditSuggestions"><h3>📚 Konuyla eşleşen ders slaytları</h3><p class="caption"><b>Otomatik konu başlığı eşleşmesi.</b> Slayt bağlantısı, cevabın bu kaynak tarafından doğrulandığı anlamına gelmez. Kaynak içeriğini kontrol et.</p>';
 slide += arr.length?arr.map(function(z){return '<p class="mini">↗ <a target="_blank" href="'+safe(z.url)+'">'+safe(z.title)+'</a></p>'}).join(''):'<p class="mini">Bu soru için güvenilir düzeyde konu başlığı eşleşmesi çıkmadı; rastgele slayt atamadım.</p>';
 slide += '</div>';
 return base+warning+slide;
};
var baseHomeAudit=main;
main=function(){
 var v=baseHomeAudit(),audit=window.FBT_AUDIT&&window.FBT_AUDIT.reviewed||{},checked=Object.keys(audit).length;
 return v.replace('SON NÖBET · V1.0 · TAM FBT ARŞİVİ','SON NÖBET · V1.2 · KAYNAK DENETİMİ')
 .replace('<div class="panel"><h3>📚 Kaynak durumu</h3>','<div class="panel auditQuality"><h3>🗂️ Tam kaynak kayıt taraması</h3><p class="mini"><b>442/442</b> sorunun PDF sayfa referansı geçerli. <b>'+checked+'/442</b> soru görselle karşılaştırıldı. <b>'+(442-checked)+'</b> soru görsel doğrulama bekliyor. 146 notta [?], 18 notta okunamayan metin, 3 notta kısaltılmış içerik var. 358 numarası özgün kaynakta eksik.</p><p class="caption">Bu otomatik kaynak bütünlüğü incelemesidir, 442 tıbbi yanıtın klinik doğrulanması değildir.</p></div><div class="panel"><h3>📚 Kaynak durumu</h3>');
};

var prevRender=render;var prevHome=home;
home=function(){return main()};
render=function(){var screen=s.screen;renderHud();if(screen==='fbt_list'){$id('app').innerHTML=listView();return;}if(screen==='fbt_card'){$id('app').innerHTML=questionView();return;}if(screen==='fbt_report'){$id('app').innerHTML=reportView();return;}prevRender();};
function open(n){var q=item(n);if(!q)return;ps.active=n;ps.revealed=false;ps.spoken='';store();navNew('fbt_card')}
function doGrade(g){var q=item(ps.active);if(!ps.revealed||q.missing)return;var old=state(q);var first=!old.ever;var gap=[0,1,3,7][g];var n=old.attempts||0;var cur={grade:g,attempts:n+1,ever:true,last:timeISO(),due:midnightAdd(gap)};ps.records[q.number]=cur;var points=first?[2,5,10,15][g]:0;ps.xp+=points;ps.totalAnswers=(ps.totalAnswers||0)+1;ps.lastOpen=q.number;
if(ps.mode==='sprint'){
 ps.sessionResults.push({n:q.number,grade:g,earned:points});ps.sessionPos++;
 if(ps.sessionPos>=ps.session.length){var results=ps.sessionResults;ps.lastReport={total:results.length,good:results.filter(function(x){return x.grade>=2}).length,hard:results.filter(function(x){return x.grade<2}).length,earned:results.reduce(function(n,x){return n+x.earned},0)};ps.mode='browse';store();navNew('fbt_report');return;}
 ps.active=ps.session[ps.sessionPos];ps.revealed=false;ps.spoken='';store();navNew('fbt_card');return;
}
 store();s.xp=s.xp+points;save();navNew('fbt_list');
}
function sprint(){ps.mode='sprint';ps.sessionResults=[];ps.sessionPos=0;var pending=bank.filter(function(q){return !q.missing&&due(q)});var unseen=bank.filter(function(q){return !q.missing&&!scored(q)});var retry=bank.filter(function(q){return !q.missing&&state(q).grade<2&&scored(q)&&!due(q)});var known=bank.filter(function(q){return !q.missing&&scored(q)});var ids=new Set();var selection=[];[pending,unseen,retry,known].forEach(function(pool){for(var i=0;i<pool.length&&selection.length<10;i++){var q=pool[i];if(!ids.has(q.number)){selection.push(q.number);ids.add(q.number)}}});ps.session=selection;if(!selection.length){ps.mode='browse';navNew('home');return;}ps.active=selection[0];ps.revealed=false;ps.spoken='';store();navNew('fbt_card');}
window.FBT={
 open:open,back:function(){ps.mode='browse';navNew('fbt_list')},openList:function(){ps.mode='browse';navNew('fbt_list')},startSprint:sprint,
 viewDue:function(){ps.filter='due';ps.category='all';ps.chapter=0;ps.query='';ps.page=0;ps.mode='browse';navNew('fbt_list')},
 setFilter:function(x){ps.filter=x;ps.page=0;store();displayNew('keep')},
 setChapter:function(x){ps.chapter=Number(x)||0;ps.page=0;store();displayNew('keep')},
 setCategory:function(x){ps.category=x;ps.page=0;store();displayNew('keep')},
 search:function(x){ps.query=x;ps.page=0;store();$id('fbtResults').innerHTML=selectedList()},
 flip:function(d){ps.page=Math.max(0,ps.page+d);store();displayNew('full')},
 write:function(x){ps.spoken=x;store()},
 reveal:function(){ps.revealed=true;store();var txt=$id('selfAnswer');if(txt)ps.spoken=txt.value;displayNew('keep')},
 grade:doGrade
};
window.appBack=function(){if(s.screen==='fbt_card'){FBT.back()}else if(s.screen==='fbt_list'||s.screen==='fbt_report'){go('home')}else{go('home')}};
if(ps.lastOpen&&ps.lastOpen>0&&ps.active<1)ps.active=ps.lastOpen;
if(s.screen==='fbt_card'||s.screen==='fbt_list'||s.screen==='fbt_report')s.screen='home';
store();render();
})();