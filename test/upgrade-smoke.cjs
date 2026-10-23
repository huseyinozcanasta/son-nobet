/* SON NOBET v1.10: update hub and source-based mechanism regression tests */
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path'),assert=require('node:assert/strict');
const base=path.join(__dirname,'..','app','src','main','assets');
const values=new Map(),elements={};
function el(id){return elements[id]||(elements[id]={id,innerHTML:'',value:'',focus(){},select(){}})}
let copied='',reloaded=0;
const ctx={console,Date,JSON,Math,Number,Array,Object,Set,String,RegExp,
 document:{getElementById:el},
 localStorage:{getItem:k=>values.get(k)||null,setItem:(k,v)=>values.set(k,v),removeItem:k=>values.delete(k)},
 confirm:()=>true,location:{reload:()=>{reloaded++}},
 SonBridge:{copyText:t=>{copied=t},checkUpdates:()=>{}},
 FBT_AUDIT:{reviewed:Object.fromEntries(Array.from({length:322},(_,i)=>[i+1,{summary:'x'}]))},
 window:null};
ctx.window=ctx;
vm.createContext(ctx);
for(const name of ['mechanisms-v19.js','mechanisms-v110.js','mechanisms-v111.js','release-center-v19.js'])vm.runInContext(fs.readFileSync(path.join(base,name),'utf8'),ctx);
assert.equal(ctx.SON_MECHANISMS.diagrams.length,25,'25 manually reviewed mechanism diagrams');
assert.equal(new Set(ctx.SON_MECHANISMS.diagrams.map(x=>x.n)).size,25);
assert.deepEqual([...ctx.SON_MECHANISMS.diagrams.map(x=>x.n)],[16,131,151,185,207,225,234,244,246,251,253,254,258,264,267,273,278,281,284,289,290,291,301,302,306]);
for(const d of ctx.SON_MECHANISMS.diagrams){assert.equal(d.steps.length,4);assert.equal(d.choices.length,3);assert.ok(d.correct>=0&&d.correct<3);assert.ok(d.url.startsWith('https://'))}
assert.ok(ctx.SON_CENTER.view().includes('Güncelleme radarın'));
assert.ok(ctx.SON_CENTER.view().includes('442'));
assert.ok(ctx.SON_CENTER.panel(16).includes('HAFIZA HARİTASI'));
assert.ok(ctx.SON_CENTER.panel(246).includes('HAFIZA HARİTASI'));
assert.ok(ctx.SON_CENTER.panel(290).includes('HAFIZA HARİTASI'));
assert.ok(ctx.SON_CENTER.panel(306).includes('HAFIZA HARİTASI'));
assert.ok(ctx.SON_CENTER.view().includes('25'));
assert.equal(ctx.SON_CENTER.VERSION,'1.11.0');
assert.ok(ctx.SON_CENTER.panel(310).includes('HENÜZ HAZIR DEĞİL'));
for(let i=0;i<3;i++)ctx.SON_CENTER.next(16);
ctx.SON_CENTER.answer(16,2);
assert.equal(ctx.SON_CENTER.done(),0,'wrong answer must not unlock');
ctx.SON_CENTER.answer(16,0);
assert.equal(ctx.SON_CENTER.done(),1,'correct answer unlocks one card');
assert.equal(ctx.SON_CENTER.compare('v1.10.0','1.9.0'),1);
assert.equal(ctx.SON_CENTER.compare('v1.9.0','1.9.0'),0);
assert.equal(ctx.SON_CENTER.compare('v1.8.0','1.9.0'),-1);
ctx.SON_CENTER.onRelease(JSON.stringify({tag:'v1.10.0',apk:'https://github.com/huseyinozcanasta/son-nobet/releases/download/v1.10.0/SonNobet-debug.apk'}));
assert.ok(el('releaseInfo').innerHTML.includes('v1.10.0'));
ctx.SON_CENTER.onRelease(JSON.stringify({tag:'v99.0.0',apk:'https://attacker.example.com/app.apk'}));
assert.ok(!el('releaseInfo').innerHTML.includes('attacker.example.com'),'block non-GitHub APK URL');
values.set('son-nobet-fbt-v1',JSON.stringify({xp:45,records:{16:{grade:2,ever:true,attempts:1,due:'2026-10-25'}}}));
ctx.SON_CENTER.backup();
assert.ok(copied.includes('"son-nobet-progress"'));
assert.ok(copied.includes('"16"'));
values.delete('son-nobet-fbt-v1');
el('progressText').value=copied;
ctx.SON_CENTER.restore();
assert.equal(JSON.parse(values.get('son-nobet-fbt-v1')).xp,45);
assert.equal(reloaded,1);
el('progressText').value='{"schema":"son-nobet-progress","schemaVersion":1,"items":{"son-nobet-fbt-v1":{"records":{"9999":{"grade":2}}}}}';
ctx.SON_CENTER.restore();
assert.ok(el('progressStatus').textContent.includes('Geri yükleme başarısız'));
assert.equal(JSON.parse(values.get('son-nobet-fbt-v1')).records[16].grade,2,'invalid import must not destroy original');
console.log('PASS: v1.9 mechanisms, quiz safety, versions, URL validation, backup and restore.');
