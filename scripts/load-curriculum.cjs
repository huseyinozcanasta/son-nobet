const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
module.exports=function(){
 const assets=path.join(__dirname,'..','app/src/main/assets');
 const html=fs.readFileSync(path.join(assets,'index.html'),'utf8');
 const c={console,Date,JSON,Math,Number,Array,Object,Set,String,URL,
  s:{screen:'home',chapter:[0,0,0],passed:false},render(){},renderHud(){},go(screen){c.s.screen=screen},
  document:{getElementById(){return null}},window:null};c.window=c;c.scrollTo=()=>{};
 vm.createContext(c);
 const files=[...html.matchAll(/<script src="([^"]+)"><\/script>/g)].map(m=>m[1]).filter(n=>/^(bank-|audit-|mechanisms-|content-|slide-candidates-|curriculum-)/.test(n));
 for(const file of files)vm.runInContext(fs.readFileSync(path.join(assets,file),'utf8'),c,{filename:file});
 return c;
};
