/* SON NOBET 1.15: quest data, progression, and boss regression smoke tests. */
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const assets=path.join(__dirname,'..','app','src','main','assets');
const main={innerHTML:'',querySelector:()=>null};
const feedback={innerHTML:''};
const saved={};
const ctx={console,Date,JSON,Number,Array,Object,Set,String,Math,
  s:{screen:'home',xp:0},
  document:{getElementById(id){return id==='app'?main:id==='quest115feedback'?feedback:null}},
  localStorage:{getItem(k){return saved[k]||null},setItem(k,v){saved[k]=v}},
  window:null,FBT:{open(n){ctx.s.screen='fbt_card';ctx.s.active=n}},
  renderHud(){},render(){main.innerHTML='<main>home</main>'},
  save(){saved['son-nobet-v1']=JSON.stringify(ctx.s)},
  award(n){ctx.s.xp+=n;ctx.save()},
  go(screen){ctx.s.screen=screen;ctx.save();ctx.render()}
};
ctx.window=ctx;
ctx.window.scrollY=0;ctx.window.scrollTo=()=>{};
vm.createContext(ctx);
for(const name of ['content-v115.js','quest-v115.js'])vm.runInContext(fs.readFileSync(path.join(assets,name),'utf8'),ctx,{filename:name});
const q=ctx.SON_QUESTS115.quests;
assert.deepEqual(Object.keys(q).sort(),['17','18']);
for(const n of [17,18]){
 const z=q[n];
 assert.equal(z.lessons.length,3);
 assert.equal(z.boss.length,7);
 assert.equal(z.refs.length,3);
 assert.equal(z.lessons.reduce((t,l)=>t+l.segments.length,0),9);
 assert.ok(z.refs.every(r=>r.url.startsWith('https://')));
 for(const l of z.lessons)for(const stage of l.segments){
  assert.equal(stage.challenge.answers.length,3);
  assert.ok(stage.challenge.correct>=0&&stage.challenge.correct<3);
  assert.ok(stage.paragraphs.join(' ').trim().split(/\s+/).length>=120,'Too little instructional content');
 }
 for(const b of z.boss)assert.equal(b.answers.length,3);
}
assert.ok(JSON.stringify(q[18]).includes('BUN başvuruya göre >5 mg/dL artar'),'BUN rise clarification must be present');
ctx.NOBET115.open(17);
assert.equal(ctx.s.screen,'quest115');
assert.ok(main.innerHTML.includes('Dirençli Hipertansiyon'));
ctx.NOBET115.stage(0,1);
assert.equal(ctx.s.quest115view,'map','Future stage must stay locked');
ctx.NOBET115.stage(0,0);
assert.equal(ctx.s.quest115view,'stage');
const first=q[17].lessons[0].segments[0].challenge;
const wrong=(first.correct+1)%3;
ctx.NOBET115.pick(0,0,wrong);
ctx.NOBET115.check();
assert.ok(feedback.innerHTML.includes('Henüz değil'));
assert.equal(ctx.s.xp,0);
for(let i=0;i<3;i++)for(let j=0;j<3;j++){
 const st=q[17].lessons[i].segments[j];
 ctx.NOBET115.stage(i,j);
 ctx.NOBET115.pick(i,j,st.challenge.correct);
 ctx.NOBET115.check();
}
assert.equal(ctx.s.quests115[17].done.join(','),'3,3,3');
assert.equal(ctx.s.xp,270,'Nine first-time stages reward exactly 270 XP');
ctx.NOBET115.stage(0,0);
ctx.NOBET115.check();
assert.equal(ctx.s.xp,270,'Replay must not grant duplicate XP');
ctx.NOBET115.boss();
assert.equal(ctx.s.quest115view,'boss');
for(let i=0;i<7;i++)ctx.NOBET115.bossPick(i,q[17].boss[i].correct);
ctx.NOBET115.finish();
assert.equal(ctx.s.quests115[17].passed,true);
assert.equal(ctx.s.xp,420,'First boss success awards 150 XP');
ctx.NOBET115.retry();
for(let i=0;i<7;i++)ctx.NOBET115.bossPick(i,q[17].boss[i].correct);
ctx.NOBET115.finish();
assert.equal(ctx.s.xp,420,'Replaying passed boss awards no extra XP');
ctx.NOBET115.open(18);
assert.deepEqual(Array.from(ctx.s.quests115[18].done),[0,0,0]);
assert.equal(ctx.s.quests115[17].passed,true);
assert.ok(saved['son-nobet-v1'].includes('"quests115"'),'Quest progress is included in legacy backup state');
console.log('PASS: FBT 17/18 3x3 stages, wrong answers, locks, XP safety, boss and backup persistence.');
const xpBefore=ctx.s.xp;
for(const args of [[-1,0],[0,-1],[3,0],[0,3],[NaN,0],[0,0.5]])assert.doesNotThrow(()=>ctx.NOBET115.stage(...args));
ctx.s.quest115lesson=-1;ctx.s.quest115stage=999;ctx.s.quest115view='stage';
assert.doesNotThrow(()=>ctx.NOBET115.check());
assert.doesNotThrow(()=>ctx.render());
assert.equal(ctx.s.quest115view,'map');
ctx.s.quests115[18]={done:[-1,99,'3'],picks:null,boss:{999:0},passed:'yes',best:999};
ctx.NOBET115.open(18);
assert.deepEqual(Array.from(ctx.s.quests115[18].done),[0,0,0]);
assert.equal(ctx.s.quests115[18].passed,false);
assert.deepEqual(Object.keys(ctx.s.quests115[18].boss),[]);
ctx.NOBET115.bossPick(0,0);ctx.NOBET115.finish();
assert.equal(ctx.s.quests115[18].passed,false,'Locked boss cannot be answered programmatically');
assert.equal(ctx.s.xp,xpBefore,'Invalid state and navigation never award XP');
console.log('PASS: invalid indices, malformed legacy quest records and locked boss are safe.');

