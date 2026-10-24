const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const root=path.join(__dirname,'..'),base=path.join(root,'app/src/main/assets');
const meta=JSON.parse(fs.readFileSync(path.join(root,'release.json'),'utf8'));
const html=fs.readFileSync(path.join(base,'index.html'),'utf8');
const contentFiles=[...html.matchAll(/<script src="(content-v1\d+\.js)"><\/script>/g)].map(x=>x[1]);
const ctx={window:{}};vm.createContext(ctx);
for(const file of contentFiles)vm.runInContext(fs.readFileSync(path.join(base,file),'utf8'),ctx,{filename:file});
const wc=p=>p.join(' ').trim().split(/\s+/).filter(Boolean).length;
const all=ctx.window.SON_QUESTS115.quests;
for(const [n,q] of Object.entries(all)){
 assert.equal(q.lessons.length,3,n+' lessons');assert.equal(q.boss.length,7,n+' boss questions');
 assert.equal(q.mechanism.length,4,n+' mechanism');assert.ok(q.oral.prompt&&q.oral.model);
 assert.ok(q.sourceSections.length>=2,n+' inspected source sections');
 let total=0;
 for(const l of q.lessons){assert.equal(l.segments.length,3);let words=0;
  for(const z of l.segments){words+=wc(z.paragraphs);assert.ok(z.paragraphs.every(p=>typeof p==='string'&&p.trim()));
   assert.ok(new Set(z.paragraphs).size===z.paragraphs.length,'No duplicate padding');
   const c=z.challenge;assert.ok(c.answers.length>=3);assert.ok(Number.isInteger(c.correct)&&c.correct>=0&&c.correct<c.answers.length);assert.ok(c.explain.length>=25);
  }assert.ok(words>=meta.minimumLessonWords,n+' short lesson: '+words);total+=words;
 }
 assert.ok(total>=meta.minimumQuestWords,n+' short quest: '+total);
 for(const b of q.boss){assert.ok(b.answers.length>=3);assert.ok(Number.isInteger(b.correct)&&b.correct>=0&&b.correct<b.answers.length);assert.ok(b.why);}
 for(const ref of q.refs){const u=new URL(ref.url);assert.equal(u.protocol,'https:');assert.ok(ref.name);}
 console.log('PASS curriculum:',n,total+' words',q.lessons.map(l=>l.segments.reduce((t,z)=>t+wc(z.paragraphs),0)).join('/'));
}
assert.equal(ctx.window.SON_QUESTS115.version,meta.version);
const baseline=JSON.parse(fs.readFileSync(path.join(root,'test/content-baseline.json'),'utf8'));
for(const [file,expected] of Object.entries(baseline))assert.equal(crypto.createHash('sha256').update(fs.readFileSync(path.join(base,file))).digest('hex'),expected,'Original content changed: '+file);
assert.ok(html.indexOf('content-v116.js')<html.indexOf('quest-v115.js'));
assert.ok(fs.readFileSync(path.join(root,'app/build.gradle'),'utf8').includes("versionName '"+meta.version+"'"));
console.log('PASS original #016 lessons and all ten source banks unchanged; release versions agree.');
