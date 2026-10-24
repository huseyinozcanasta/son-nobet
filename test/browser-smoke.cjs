/* Run with PLAYWRIGHT_MODULE=/absolute/path/to/playwright if it is not installed locally. */
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH||chromium.executablePath(),args:['--no-sandbox']});
 try{
  const page=await browser.newPage({viewport:{width:393,height:851}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('dialog',d=>d.accept());
  await page.goto('file://'+path.join(__dirname,'..','app/src/main/assets/index.html'));
  await page.evaluate(()=>go('home'));
  assert.ok((await page.locator('body').innerText()).includes('FBT #017'));
  assert.ok((await page.locator('body').innerText()).includes('FBT #018'));
  await page.getByRole('button',{name:'442 SORUNUN DURUMUNU GÖR →',exact:true}).click();
  assert.ok((await page.locator('#app').innerText()).includes('8/442'));
  await page.locator('#courseSearch').fill('358');
  assert.ok((await page.locator('#courseResults').innerText()).includes('0 kaynak sorusu'));
  await page.locator('#courseSearch').fill('021');
  assert.ok((await page.locator('#courseResults').innerText()).includes('1 kaynak sorusu'));
  await page.getByRole('button',{name:'🎮 MACERAYI AÇ',exact:true}).click();
  assert.equal(await page.evaluate(()=>s.quest115num),21);
  await page.evaluate(()=>go('home'));
  const numbers=await page.evaluate(()=>Object.keys(SON_QUESTS115.quests).map(Number));
  for(const n of numbers){
   await page.evaluate(n=>NOBET115.open(n),n);
   assert.ok((await page.locator('#app').innerText()).includes('0/9'));
   const warning=await page.evaluate(n=>SON_QUESTS115.quests[n].warning||'',n);
   if(warning)assert.ok((await page.locator('#app').innerText()).includes(warning),'Clinical source warning must be visible');
   await page.getByRole('button',{name:'🎙️ SÖZLÜ PROVA',exact:true}).click();
   assert.ok(await page.locator('details').count());
   await page.locator('summary').click();
   assert.ok(await page.locator('details').getAttribute('open')!==null);
   await page.getByRole('button',{name:'← HARİTA',exact:true}).click();
   for(let i=0;i<3;i++)for(let j=0;j<3;j++){
    await page.locator('button[onclick="NOBET115.stage('+i+','+j+')"]').click();
    const correct=await page.evaluate(({n,i,j})=>SON_QUESTS115.quests[n].lessons[i].segments[j].challenge.correct,{n,i,j});
    if(i===0&&j===0){
     await page.locator('.encounter .option').nth((correct+1)%3).click();
     await page.getByRole('button',{name:'KARARI KONTROL ET →',exact:true}).click();
     assert.ok((await page.locator('#quest115feedback').innerText()).includes('Henüz değil'));
    }
    await page.locator('.encounter .option').nth(correct).click();
    await page.getByRole('button',{name:'KARARI KONTROL ET →',exact:true}).click();
   }
   const xp=await page.evaluate(()=>s.xp);
   await page.reload();
   assert.ok((await page.locator('#app').innerText()).includes('9/9'));
   await page.getByRole('button',{name:'⚔️ BOSS SAVAŞINA GİR',exact:true}).click();
   const boss=await page.evaluate(n=>SON_QUESTS115.quests[n].boss,n);
   for(let i=0;i<7;i++)await page.locator('button[onclick="NOBET115.bossPick('+i+','+boss[i].correct+')"]').click();
   await page.getByRole('button',{name:'SONUCU AÇ →',exact:true}).click();
   assert.ok((await page.locator('#app').innerText()).includes('7/7 DOĞRU'));
   assert.equal(await page.evaluate(()=>s.xp),xp+150);
   await page.getByRole('button',{name:'BOSS TEKRAR',exact:true}).click();
   for(let i=0;i<7;i++)await page.locator('button[onclick="NOBET115.bossPick('+i+','+boss[i].correct+')"]').click();
   await page.getByRole('button',{name:'SONUCU AÇ →',exact:true}).click();
   assert.equal(await page.evaluate(()=>s.xp),xp+150);
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Mobile horizontal overflow');
   console.log('PASS browser quest',n,'wrong answer, nine decisions, reload, oral, boss, XP');
  }
  await page.evaluate(()=>FBT.openUpdates());
  await page.getByRole('button',{name:'YEDEK KODU OLUŞTUR / KOPYALA',exact:true}).click();
  const backup=await page.locator('#progressText').inputValue();
  assert.ok(JSON.parse(backup).items['son-nobet-v1'].quests115[numbers[0]].passed);
  await page.getByRole('button',{name:'YEDEĞİ GERİ YÜKLE',exact:true}).click();
  await page.getByRole('button',{name:'AKTARIMI ONAYLA',exact:true}).click();
  await page.waitForLoadState('load');
  assert.ok(await page.evaluate(()=>Object.values(s.quests115).every(q=>q.passed)));
  assert.ok((await page.locator('#progressStatus').innerText()).includes('Aktarım tamamlandı'));

  await page.evaluate(()=>SON_COURSE.show());
  assert.equal(await page.evaluate(()=>SON_COURSE.snapshot().stats.bossPassed),numbers.length);
  await page.locator('#courseSearch').fill('');
  await page.getByRole('button',{name:'Boss geçildi',exact:true}).click();
  assert.ok((await page.locator('#courseResults').innerText()).includes(numbers.length+' kaynak sorusu'));
  assert.deepEqual(errors,[],'Browser runtime errors');
  if(process.env.QA_SCREENSHOT){await page.evaluate(()=>go('home'));await page.screenshot({path:process.env.QA_SCREENSHOT,fullPage:true});}
  console.log('PASS browser backup restore and mobile layout; zero runtime errors.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
