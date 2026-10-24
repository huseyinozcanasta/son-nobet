const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const source=fs.readFileSync(path.join(__dirname,'../app/src/main/assets/restore-storage.js'),'utf8');
const keys=['son-nobet-fbt-v1','son-nobet-v1','son-nobet-v2','son-nobet-mechanisms-v1','son-nobet-transfer-receipt'];
const old=Object.fromEntries(keys.map((k,i)=>[k,i===2?null:JSON.stringify({xp:i+1})]));
const newer=Object.fromEntries(keys.map((k,i)=>[k,JSON.stringify({xp:i+100})]));
function boot(data,failAt=0){let writes=0;const c={window:null,localStorage:{getItem:k=>data.get(k)??null,setItem(k,v){if(++writes===failAt)throw Error('Quota or interrupted write');data.set(k,v)},removeItem:k=>data.delete(k)}};c.window=c;vm.createContext(c);vm.runInContext(source,c);return c.SON_STORAGE}
for(let failAt=1;failAt<=7;failAt++){
 const data=new Map(Object.entries(old).filter(([,v])=>v!==null)),s=boot(data,failAt);
 assert.throws(()=>s.apply(newer,false));
 for(const k of keys)assert.equal(data.get(k)??null,old[k],'rollback '+failAt+' '+k);
 assert.equal(data.has('son-nobet-transfer-journal'),false);
}
const data=new Map(Object.entries(old).filter(([,v])=>v!==null)),s=boot(data);
s.apply(newer,false);for(const k of keys)assert.equal(data.get(k),newer[k]);assert.equal(s.canUndo(),true);
s.undo();for(const k of keys)assert.equal(data.get(k)??null,old[k]);assert.equal(s.canUndo(),false);
for(let interruptedAfter=0;interruptedAfter<=keys.length;interruptedAfter++){
 const store=new Map(Object.entries(old).filter(([,v])=>v!==null));
 store.set('son-nobet-transfer-journal',JSON.stringify({version:1,before:old,previousUndo:null}));
 keys.slice(0,interruptedAfter).forEach(k=>store.set(k,newer[k]));
 const restarted=boot(store);for(const k of keys)assert.equal(store.get(k)??null,old[k]);assert.match(restarted.notice,/Yarım kalan aktarım geri alındı/);
}
console.log('PASS: durable restore rollback at each write, recovery before game load, exact undo.');
