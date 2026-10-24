const fs=require('node:fs'),path=require('node:path'),cp=require('node:child_process');
const root=path.join(__dirname,'..'),minor=Number(process.argv[2]),plan=require('../docs/release-plan.json')[minor];
if(!Number.isInteger(minor)||minor<20||minor>29||!plan)throw Error('Expected one release from 20 through 29');
const p=path.join(root,'release.json'),m=JSON.parse(fs.readFileSync(p,'utf8'));
Object.assign(m,{version:`1.${minor}.0`,versionCode:minor+4,applicationId:`com.huseyin.sonnobet.audit${minor}`,label:`Son Nöbet 1.${minor}`,title:`Son Nöbet 1.${minor} — ${plan.title}`});
fs.writeFileSync(p,JSON.stringify(m,null,2)+'\n');
fs.writeFileSync(path.join(root,'release-notes.md'),`${plan.notes}\n\nÖnceki FBT içerikleri, özgün soru bankası ve PDF görsel kontrol sayacı korunur. Hazır uzun ders ile öğrenilmiş soru ayrı gösterilir. Ayrı audit${minor} debug APK; eski uygulamadan alınan yedek yeni sürümde kontrol edilip AKTARIMI ONAYLA ile yüklenir. Klinik eğitim içindir. Gerçek Redmi cihazında kullanıcı testi ayrıca gereklidir.\n`);
cp.execFileSync(process.execPath,[path.join(__dirname,'set-version.cjs')],{stdio:'inherit'});
cp.execFileSync(process.execPath,[path.join(__dirname,'generate-curriculum.cjs')],{stdio:'inherit'});
