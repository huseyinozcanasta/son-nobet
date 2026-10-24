const fs=require('node:fs'),path=require('node:path');
const root=path.join(__dirname,'..'),meta=JSON.parse(fs.readFileSync(path.join(root,'release.json'),'utf8'));
if(!/^\d+\.\d+\.\d+$/.test(meta.version)||!Number.isInteger(meta.versionCode)||!/^com\.huseyin\.sonnobet\.[a-z0-9]+$/.test(meta.applicationId))throw Error('Invalid release metadata');
function edit(file,from,to){const p=path.join(root,file),v=fs.readFileSync(p,'utf8');if(!from.test(v))throw Error('Version target not found: '+file);fs.writeFileSync(p,v.replace(from,to));}
edit('app/build.gradle',/applicationId '[^']*'/,"applicationId '"+meta.applicationId+"'");
edit('app/build.gradle',/versionCode \d+/,'versionCode '+meta.versionCode);
edit('app/build.gradle',/versionName '[^']*'/,"versionName '"+meta.version+"'");
edit('app/src/main/res/values/strings.xml',/Son Nöbet \d+\.\d+/ ,meta.label);
edit('app/src/main/assets/release-center-v19.js',/const VERSION="[^"]*"/,'const VERSION="'+meta.version+'"');
edit('app/src/main/assets/game-v1.js',/SON NÖBET · V\d+\.\d+ · TAM FBT ARŞİVİ/,'SON NÖBET · V'+meta.version.replace(/\.0$/,'')+' · TAM FBT ARŞİVİ');
console.log('Release metadata applied:',meta.version,meta.applicationId);
