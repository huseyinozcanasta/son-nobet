/* Run before any game state is loaded: recover an interrupted progress transfer. */
(function(){
'use strict';
const KEYS=['son-nobet-fbt-v1','son-nobet-v1','son-nobet-v2','son-nobet-mechanisms-v1','son-nobet-transfer-receipt'];
const JOURNAL='son-nobet-transfer-journal',UNDO='son-nobet-transfer-undo';
let notice='';
function snapshot(){let out={};KEYS.forEach(k=>{out[k]=localStorage.getItem(k)});return out}
function valid(values){return values&&typeof values==='object'&&!Array.isArray(values)&&Object.keys(values).length===KEYS.length&&KEYS.every(k=>Object.prototype.hasOwnProperty.call(values,k)&&(values[k]===null||typeof values[k]==='string'))}
function put(k,value){if(value===null)localStorage.removeItem(k);else localStorage.setItem(k,value);if(localStorage.getItem(k)!==value)throw Error('Kayıt yazımı doğrulanamadı')}
function rollback(j){
 if(!j||j.version!==1||!valid(j.before)||!(j.previousUndo===null||typeof j.previousUndo==='string'))throw Error('Koruma yedeği okunamadı');
 // Free space first, then restore the exact strings that existed before the transfer.
 KEYS.forEach(k=>localStorage.removeItem(k));localStorage.removeItem(UNDO);
 KEYS.forEach(k=>put(k,j.before[k]));put(UNDO,j.previousUndo);localStorage.removeItem(JOURNAL);
}
function recover(){let raw=localStorage.getItem(JOURNAL);if(!raw)return;rollback(JSON.parse(raw));notice='Yarım kalan aktarım geri alındı; önceki ilerlemen korundu.'}
try{recover()}catch(e){notice='Yarım kalan aktarım kurtarılamadı. Yeni işlem yapmadan önce yedek kodunu sakla.'}
function apply(values,undoing){
 if(localStorage.getItem(JOURNAL))throw Error('Önce yarım kalan aktarımın kurtarılması gerekiyor; uygulamayı yeniden aç');
 if(!valid(values))throw Error('Aktarım kayıtları eksik');
 let j={version:1,before:snapshot(),previousUndo:localStorage.getItem(UNDO)},started=false;
 try{
  const raw=JSON.stringify(j);put(JOURNAL,raw);started=true;
  KEYS.forEach(k=>put(k,values[k]));
  put(UNDO,undoing?null:JSON.stringify({version:1,before:j.before}));
  localStorage.removeItem(JOURNAL);return true;
 }catch(e){if(started){try{rollback(j)}catch(r){throw Error('Aktarım kesildi; koruma yedeği saklandı. Uygulamayı yeniden aç.')}}throw e}
}
function undo(){let u=JSON.parse(localStorage.getItem(UNDO)||'null');if(!u||u.version!==1||!valid(u.before))throw Error('Geri alınacak aktarım bulunamadı');apply(u.before,true)}
window.SON_STORAGE={snapshot,apply,undo,canUndo:()=>!!localStorage.getItem(UNDO),notice};
})();
