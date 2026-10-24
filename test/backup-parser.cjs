const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path'),assert=require('node:assert/strict');
const c={window:null,console,document:{getElementById:()=>null},localStorage:{getItem:()=>null},location:{reload(){}},confirm(){throw Error('Native confirm is unavailable')}};c.window=c;
vm.createContext(c);vm.runInContext(fs.readFileSync(path.join(__dirname,'../app/src/main/assets/release-center-v19.js'),'utf8'),c);
const fixture={schema:'son-nobet-progress',schemaVersion:1,items:{'son-nobet-v1':{xp:420,chapter:[3,3,3],passed:true,quests115:{17:{done:[3,3,3],passed:true,best:7,picks:{},boss:{}}}},'son-nobet-fbt-v1':{xp:15,records:{16:{grade:3,ever:true,attempts:1,due:'2026-10-25'}}}}};
const raw=JSON.stringify(fixture);
for(const text of [raw,' \n\uFEFF'+raw+'\n ', '```json\n'+raw+'\n```',JSON.stringify(raw)]){
 const p=c.SON_CENTER.parseBackup(text);assert.equal(p.items['son-nobet-v1'].xp,420);assert.equal(p.found.length,2);
}
for(const text of ['',raw.slice(0,-10),JSON.stringify({...fixture,schemaVersion:999}),JSON.stringify({...fixture,items:{'son-nobet-v1':{xp:-1}}}),JSON.stringify({...fixture,items:{'son-nobet-v1':{xp:1,quests115:{17:{done:[3,99,3]}}}}}),'x'.repeat(2000001),'{"schema":"son-nobet-progress","schemaVersion":1,"items":{"son-nobet-v1":{"xp":1,"__proto__":{"bad":true}}}}'])assert.throws(()=>c.SON_CENTER.parseBackup(text));
assert.equal({}.bad,undefined);
console.log('PASS: old backup JSON, BOM, code blocks, quoted JSON, truncated and invalid progress cases.');
