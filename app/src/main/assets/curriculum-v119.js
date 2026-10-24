/* Content preparation and learning completion are deliberately separate measurements. */
(function(){
"use strict";
var filter='all',query='',page=0,pageSize=25;
var labels={long:'Uzun macera',short:'Kısa mekanizma',base:'Temel FBT kartı'};
function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function count(lessons){return (lessons||[]).reduce(function(t,l){return t+(l.segments||[]).reduce(function(x,z){return x+(z.paragraphs||[]).join(' ').trim().split(/\s+/).filter(Boolean).length},0)},0)}
function prepared(q){return q&&q.lessons&&q.lessons.length===3&&q.lessons.every(function(l){return l.segments&&l.segments.length===3})&&q.boss&&q.boss.length===7}
function progress(n){
 var state=n===16?null:(s.quests115||{})[n];
 var values=n===16?s.chapter:state&&state.done;
 var done=Array.isArray(values)?values.reduce(function(t,v){return t+(Number.isInteger(v)&&v>=0&&v<=3?v:0)},0):0;
 return {decisions:done,passed:n===16?s.passed===true:!!state&&state.passed===true};
}
function snapshot(){
 var quests=(window.SON_QUESTS115||{}).quests||{},mechanisms=new Set(((window.SON_MECHANISMS||{}).diagrams||[]).map(function(d){return d.n}));
 var audit=(window.FBT_AUDIT||{}).reviewed||{},candidates=(window.FBT_SLIDE_CANDIDATES||{}).questions||{};
 var rows=(window.FBT_BANK||[]).filter(function(q){return !q.missing}).map(function(q){
  var n=q.number,long=n===16?!!window.SON_NOBET_CONTENT:prepared(quests[n]),p=progress(n),z=quests[n];
  return {number:n,title:q.title,sourcePage:q.sourcePage,category:q.category||'Diğer',
   preparation:long?'long':mechanisms.has(n)?'short':'base',
   words:long?count(n===16?window.SON_NOBET_CONTENT.lessons:z.lessons):0,
   originalScanCompared:Object.prototype.hasOwnProperty.call(audit,n),
   sourceNoteNeedsReview:!!q.needsReview,
   candidateSlideCount:(candidates[n]||[]).length,
   candidateSlidesAreVerified:false,
   decisions:long?p.decisions:0,bossPassed:long&&p.passed};
 }).sort(function(a,b){return a.number-b.number});
 var stats={total:rows.length,long:0,short:0,base:0,scanCompared:0,scanPending:0,bossPassed:0};
 rows.forEach(function(r){stats[r.preparation]++;if(r.originalScanCompared)stats.scanCompared++;else stats.scanPending++;if(r.bossPassed)stats.bossPassed++;});
 return {schema:'son-nobet-curriculum',schemaVersion:1,rows:rows,stats:stats,missingNumbers:(window.FBT_BANK||[]).filter(function(q){return q.missing}).map(function(q){return q.number})};
}
function selected(){var needle=query.toLocaleLowerCase('tr-TR');return snapshot().rows.filter(function(r){
 if(filter==='scan'&&r.originalScanCompared)return false;
 if(filter==='passed'&&!r.bossPassed)return false;
 if(['long','short','base'].indexOf(filter)>=0&&r.preparation!==filter)return false;
 return !needle||(String(r.number)+' '+String(r.number).padStart(3,'0')+' '+r.title+' '+r.category).toLocaleLowerCase('tr-TR').indexOf(needle)>=0;
});}
function results(){var list=selected(),pages=Math.max(1,Math.ceil(list.length/pageSize));if(page>=pages)page=0;
 return '<div class="row mini" style="margin:12px 0"><b>'+list.length+' kaynak sorusu</b><span>Sayfa '+(page+1)+'/'+pages+'</span></div>'+list.slice(page*pageSize,(page+1)*pageSize).map(function(r){
  return '<div class="panel" style="padding:16px"><div class="row"><span class="chip">FBT #'+String(r.number).padStart(3,'0')+'</span><span class="tag">'+esc(labels[r.preparation])+'</span></div><h3 style="margin-top:12px">'+esc(r.title)+'</h3><p class="caption">'+esc(r.category)+' · Kaynak s.'+r.sourcePage+' · '+(r.originalScanCompared?'Özgün PDF karşılaştırıldı':'Özgün PDF karşılaştırması bekliyor')+'</p>'+
  (r.preparation==='long'?'<p class="mini">'+r.words.toLocaleString('tr-TR')+' kelime · '+r.decisions+'/9 karar · '+(r.bossPassed?'Boss geçildi':'Boss henüz geçilmedi')+'</p>':'<p class="mini">Uzun ders macerası henüz hazırlanmadı.</p>')+
  '<button class="btn alt small" onclick="SON_COURSE.open('+r.number+')">'+(r.preparation==='long'?'🎮 MACERAYI AÇ':'FBT KARTINI AÇ')+'</button>'+
  (r.preparation==='long'?'<button class="btn ghost small" onclick="FBT.open('+r.number+')">ÖZGÜN FBT KARTI</button>':'')+'</div>';
 }).join('')+(list.length?'':'<div class="panel"><p class="mini">Bu filtrede soru bulunamadı.</p></div>')+
 '<div class="pager"><button class="btn alt small" '+(page===0?'disabled':'')+' onclick="SON_COURSE.flip(-1)">← ÖNCEKİ</button><span class="mini">'+(page+1)+'/'+pages+'</span><button class="btn alt small" '+(page+1>=pages?'disabled':'')+' onclick="SON_COURSE.flip(1)">SONRAKİ →</button></div>';
}
function view(){var st=snapshot().stats;
 return '<button class="btn alt small" onclick="go(&quot;home&quot;)">← ANA ÜS</button><div class="eyebrow" style="margin-top:24px">FBT · İÇERİK VE ÖĞRENME</div><h1>MÜFREDAT<br>RADARI</h1><p class="lead">Hangi ders hazır, hangisi bekliyor? Hazırlanma durumu ile senin öğrenme ilerlemen ayrı gösterilir.</p>'+
 '<div class="panel hero"><div class="metricGrid"><div><strong>'+st.long+'/'+st.total+'</strong><small>Uzun macera hazır</small></div><div><strong>'+st.short+'</strong><small>Kısa mekanizma</small></div><div><strong>'+st.base+'</strong><small>Temel kart</small></div></div><p class="mini">Uzun macera: 3 ders, 9 karar ve 7 boss. Kısa mekanizma uzun ders yerine sayılmaz.</p><div class="progress"><div class="bar" style="width:'+(st.long/st.total*100).toFixed(2)+'%"></div></div><p class="caption">'+st.bossPassed+' uzun maceranın bossunu geçtin. Hazır içerik sayısı, öğrenilmiş soru sayısı değildir.</p></div>'+
 '<div class="panel"><h3>Kaynak denetimi ayrı</h3><p class="mini">'+st.scanCompared+'/'+st.total+' özgün kaynak görseli karşılaştırıldı; '+st.scanPending+' bekliyor. Kaynak karşılaştırması tek başına güncel klinik doğrulama değildir. #358 özgün kaynakta yoktur.</p><p class="caption">Otomatik slayt adayları içerik okunup doğrulanmış kaynak olarak sayılmaz.</p></div>'+
 '<div class="panel"><label for="courseSearch" class="mini">Soru numarası, konu veya branş ara</label><input class="fbtSearch" id="courseSearch" placeholder="Örn. 021 / hiperkalemi / vaskülit" value="'+esc(query)+'" oninput="SON_COURSE.search(this.value)"></div>'+
 '<div class="filterScroll">'+[['all','Tümü'],['long','Uzun maceralar'],['short','Kısa mekanizmalar'],['base','Temel kartlar'],['scan','PDF bekliyor'],['passed','Boss geçildi']].map(function(x){return '<button class="filterPill '+(filter===x[0]?'on':'')+'" onclick="SON_COURSE.filter(\''+x[0]+'\')">'+x[1]+'</button>'}).join('')+'</div><div id="courseResults">'+results()+'</div>';
}
function updateResults(){var target=document.getElementById('courseResults');if(target)target.innerHTML=results()}
function open(n){var r=snapshot().rows.find(function(x){return x.number===Number(n)});if(!r)return;
 if(r.preparation==='long'){if(r.number===16)go('map');else window.NOBET115.open(r.number)}else FBT.open(r.number);
}
window.SON_COURSE={snapshot:snapshot,view:view,open:open,show:function(){go('curriculum')},
 search:function(v){query=String(v).slice(0,200);page=0;updateResults()},
 filter:function(v){if(['all','long','short','base','scan','passed'].indexOf(v)<0)return;filter=v;page=0;render()},
 flip:function(v){if(v!==1&&v!==-1)return;var max=Math.max(0,Math.ceil(selected().length/pageSize)-1);page=Math.max(0,Math.min(max,page+v));updateResults();window.scrollTo(0,0)},
 matches:function(){return selected().map(function(r){return r.number})}};
var oldRender=render;
render=function(){if(s.screen==='curriculum'){renderHud();document.getElementById('app').innerHTML=view();return;}
 oldRender();var root=document.getElementById('app');if(!root)return;
 if(s.screen==='home'){var st=snapshot().stats;root.insertAdjacentHTML('afterbegin','<div class="panel hero"><div class="row"><span class="chip">MÜFREDAT RADARI</span><span class="tag">'+st.long+'/'+st.total+' uzun macera</span></div><p class="mini">Hazır dersleri ve bekleyen soruları birlikte gör.</p><button class="btn" onclick="SON_COURSE.show()">442 SORUNUN DURUMUNU GÖR →</button></div>');}
};
var oldBack=window.appBack;
window.appBack=function(){if(s.screen==='curriculum')go('home');else if(oldBack)oldBack()};
render();
})();
