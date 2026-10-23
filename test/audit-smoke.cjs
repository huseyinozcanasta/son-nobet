const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const base=path.join(__dirname,'..','app','src','main','assets');
const values=new Map(),elements={app:{innerHTML:''},fbtResults:{innerHTML:''}};
const ctx={console,Set,Date,Array,Object,Math,JSON,Number,String,Error,RegExp,
document:{getElementById:(id)=>elements[id]||(elements[id]={innerHTML:'',id}),querySelector:()=>null},
localStorage:{getItem:x=>values.get(x)||null,setItem:(k,v)=>values.set(k,v),removeItem:k=>values.delete(k)},
s:{screen:'home',xp:0},renderHud:()=>{},h:x=>String(x).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])),save:()=>{},render:()=>{},home:()=>'',go:null,window:null};
ctx.window=ctx;ctx.go=function(screen){ctx.s.screen=screen;ctx.render()};vm.createContext(ctx);
for(let i=1;i<=10;i++)vm.runInContext(fs.readFileSync(path.join(base,'bank-'+String(i).padStart(2,'0')+'.js'),'utf8'),ctx);
vm.runInContext(fs.readFileSync(path.join(base,'audit-v11.js'),'utf8'),ctx);
vm.runInContext(fs.readFileSync(path.join(base,'game-v1.js'),'utf8'),ctx);
assert.equal(ctx.FBT_BANK.length,443);assert.equal(ctx.FBT_BANK.filter(q=>!q.missing).length,442);
assert.ok(ctx.FBT_BANK.find(q=>q.number===358).missing);
assert.equal(Object.keys(ctx.FBT_AUDIT.reviewed).length,21);
assert.ok(ctx.FBT_AUDIT.reviewed[18].warning.includes('BUN'));
assert.ok(ctx.FBT_BANK.find(q=>q.number===16).sourceNote.includes('Hipokalemi - hiperkalsemi'));
ctx.FBT.open(18);assert.ok(elements.app.innerHTML.includes('PDF GÖRSELİ GÖRÜLDÜ'));assert.ok(elements.app.innerHTML.includes('ÖNEMLİ DÜZELTME'));
ctx.FBT.open(22);assert.ok(elements.app.innerHTML.includes('PDF KARŞILAŞTIRMASI BEKLİYOR'));
ctx.FBT.open(16);ctx.FBT.reveal();assert.ok(elements.app.innerHTML.includes('Hipokalemi - hiperkalsemi'));
ctx.FBT.grade(2);assert.equal(JSON.parse(values.get('son-nobet-fbt-v1')).records[16].grade,2);
ctx.FBT.open(358);assert.ok(elements.app.innerHTML.includes('KAYNAKTA EKSİK'));
console.log('PASSED: 443 records, 21 visual matches, 421 pending reviews.');