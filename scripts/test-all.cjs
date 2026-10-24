const fs=require('node:fs'),path=require('node:path'),cp=require('node:child_process');
const root=path.join(__dirname,'..');
for(const f of fs.readdirSync(path.join(root,'test')).filter(f=>f.endsWith('.cjs')&&f!=='browser-smoke.cjs'))cp.execFileSync(process.execPath,[path.join(root,'test',f)],{stdio:'inherit'});
cp.execFileSync(process.execPath,[path.join(__dirname,'generate-curriculum.cjs'),'--check'],{stdio:'inherit'});
