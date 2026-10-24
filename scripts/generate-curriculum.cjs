const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const ctx=require('./load-curriculum.cjs')(),snapshot=ctx.SON_COURSE.snapshot();
const meta=require('../release.json'),root=path.join(__dirname,'..');
const rows=snapshot.rows.map(({decisions,bossPassed,...rest})=>rest);
const long=rows.filter(r=>r.preparation==='long');
const json=JSON.stringify({version:meta.version,scope:'Preparation only; no user learning data.',stats:{...snapshot.stats,bossPassed:undefined},missingNumbers:snapshot.missingNumbers,rows},null,2)+'\n';
const md=`# SON NÖBET ${meta.version} — Gerçek içerik kapsamı\n\n`+
`${snapshot.stats.total} mevcut kaynak kaydı; ${snapshot.stats.long} uzun macera, ${snapshot.stats.short} kısa mekanizma, ${snapshot.stats.base} temel kart. `+
`${snapshot.stats.scanCompared} özgün PDF görüntüsü karşılaştırıldı; ${snapshot.stats.scanPending} bekliyor. Kaynakta eksik numara: ${snapshot.missingNumbers.join(', ')}.\n\n`+
`Uzun maceralar 3 ders, 9 karar ve 7 boss içerir. Kelime sayısı klinik uzman denetimi anlamına gelmez. Slayt adayları doğrulanmış kaynak sayılmaz.\n\n`+
`| FBT | Uzun görev | Kelime | Kaynak sayfa |\n|---|---|---:|---:|\n`+
long.map(r=>`| #${String(r.number).padStart(3,'0')} | ${r.title.replace(/\|/g,'/')} | ${r.words} | ${r.sourcePage} |`).join('\n')+
`\n\nKalan ${snapshot.stats.total-snapshot.stats.long} kayıt için uzun görev hazırlanması açıktır. Tüm kayıtların hazırlık ve kaynak durumu [curriculum.json](curriculum.json) içindedir.\n`;
for(const [name,value] of [['curriculum.json',json],['CURRICULUM.md',md]]){
 const file=path.join(root,'docs',name);
 if(process.argv.includes('--check'))assert.equal(fs.readFileSync(file,'utf8'),value,'Regenerate '+name);
 else{fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,value);}
}
console.log('PASS curriculum manifest:',snapshot.stats.total,'records;',snapshot.stats.long,'long quests;',snapshot.stats.scanCompared,'original scans');
