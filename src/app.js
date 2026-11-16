'use strict';
/* ---------- helpers ---------- */
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const no4=n=>String(n).padStart(4,'0');
const BY=new Map(B.map(b=>[b.n,b]));
const MON=['January','February','March','April','May','June','July','August','September','October','November','December'];
const ROM=['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII'];
const pad2=n=>String(n).padStart(2,'0');
const todayISO=()=>{const d=new Date();return d.getFullYear()+'-'+pad2(d.getMonth()+1)+'-'+pad2(d.getDate())};
const slug=s=>s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const RADIUS=150; // check-in radius in metres (configurable)
const P={ // icon paths (design icons from Figma; tab/search/etc drawn to match)
 back:'M12.5 4.17 6.67 10l5.83 5.83',bookmark:'M5.83 3.33h8.34v13.34L10 13.33l-4.17 3.34V3.33Z',share:'M10 2.5v10M14.17 6.67 10 2.5 5.83 6.67M4.17 10.83v5.84h11.66v-5.84',
 pin:'M10 17.5s-5-5.17-5-9.17a5 5 0 0 1 10 0c0 4-5 9.17-5 9.17ZM10 10.17a1.83 1.83 0 1 0 0-3.67 1.83 1.83 0 0 0 0 3.67Z',check:'M4.17 10.42l3.75 3.75 7.91-7.92',
 image:'M15 4.17H5c-.92 0-1.67.74-1.67 1.66v8.34c0 .92.75 1.66 1.67 1.66h10c.92 0 1.67-.74 1.67-1.66V5.83c0-.92-.75-1.66-1.67-1.66ZM3.33 13.33 7.5 9.17l3.33 3.33 2.5-2.5 3.34 3.33',
 cal:'M15 4.17H5c-.92 0-1.67.74-1.67 1.66V15c0 .92.75 1.67 1.67 1.67h10c.92 0 1.67-.75 1.67-1.67V5.83c0-.92-.75-1.66-1.67-1.66ZM3.33 8.33h13.34M7.5 2.5v3.33M12.5 2.5v3.33',
 camera:'M3.33 6.67h2.5L7.5 4.17h5l1.67 2.5h2.5v9.16H3.33V6.67ZM10 13.75a2.92 2.92 0 1 0 0-5.83 2.92 2.92 0 0 0 0 5.83Z',note:'M6.67 7.5h6.66M6.67 10.83h6.66M6.67 14.17h4.16M4.17 3.33h11.66v13.34H4.17V3.33Z',
 chevL:'M11.67 5l-5 5 5 5',chevD:'M5 8.33l5 5 5-5',chevR:'M8.33 5l5 5-5 5',plus:'M10 4.17v11.66M4.17 10h11.66',close:'M5 5l10 10M15 5 5 15',
 search:'M9.17 15a5.83 5.83 0 1 0 0-11.67 5.83 5.83 0 0 0 0 11.67ZM17.5 17.5l-4.17-4.17',filter:'M3.33 5.83h13.34M5.83 10h8.34M8.33 14.17h3.34',
 list:'M6.67 5h10M6.67 10h10M6.67 15h10M3.33 5h.01M3.33 10h.01M3.33 15h.01',map:'M7.5 3.33 2.5 5.83v10.84l5-2.5 5 2.5 5-2.5V3.33l-5 2.5-5-2.5ZM7.5 3.33v10.84M12.5 5.83v10.84',
 grid:'M3.33 3.33h5.84v5.84H3.33zM10.83 3.33h5.84v5.84h-5.84zM3.33 10.83h5.84v5.84H3.33zM10.83 10.83h5.84v5.84h-5.84z',
 compass:'M10 17.5a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15ZM13.17 6.83l-1.59 4.75-4.75 1.59 1.59-4.75 4.75-1.59Z',book:'M3.33 4.17h5A1.67 1.67 0 0 1 10 5.83v10.84a1.67 1.67 0 0 0-1.67-1.67h-5V4.17ZM16.67 4.17h-5A1.67 1.67 0 0 0 10 5.83v10.84a1.67 1.67 0 0 1 1.67-1.67h5V4.17Z',
 user:'M10 10a3.33 3.33 0 1 0 0-6.67A3.33 3.33 0 0 0 10 10ZM3.33 17.5c0-3.22 2.99-5 6.67-5s6.67 1.78 6.67 5',dir:'M17.5 2.5 9.17 10.83M17.5 2.5l-5.42 15-2.91-6.67L2.5 7.92l15-5.42Z',
 edit:'M11.67 4.17l4.16 4.16M3.33 16.67l.84-4.17 9.16-9.17 3.34 3.34-9.17 9.16-4.17.84Z',trash:'M3.33 5.83h13.34M7.5 5.83V3.33h5v2.5M5 5.83l.83 10.84h8.34L15 5.83',target:'M10 13.33a3.33 3.33 0 1 0 0-6.66 3.33 3.33 0 0 0 0 6.66ZM10 1.67v3.33M10 15v3.33M1.67 10H5M15 10h3.33'};
const I=(n,cls='')=>`<svg class="ic ${cls}" viewBox="0 0 20 20" aria-hidden="true"><path d="${P[n]}"/></svg>`;
const drawing=(n,cls='')=>`<svg class="dr ${cls}" viewBox="0 0 300 200" aria-hidden="true"><g>${D[n]||''}</g></svg>`;

/* ---------- data service (swap this object for a real backend later) ---------- */
const KEY='archlog.v1';
const NATIVE=!!window.NATIVE_APP; // true in the phone app build: no demo data, real location only
const GPS={fix:null,state:'idle',watch:null};
const NO_FIX={lat:51.5074,lng:-0.1278,label:'Location off',demo:false,pending:true};
const Data={
 s:null,persist:true,
 defaults(){return{visits:[],saves:{},milestones:{},settings:{celebrate:true,units:'km',loc:null}}},
 load(){
  try{const raw=localStorage.getItem(KEY);if(raw){this.s=Object.assign(this.defaults(),JSON.parse(raw));return}}
  catch(e){this.persist=false}
  this.s=NATIVE?this.defaults():seed();this.save();
 },
 save(){if(!this.persist)return true;try{localStorage.setItem(KEY,JSON.stringify(this.s));return true}catch(e){return false}},
 reset(empty){this.s=empty?Object.assign(this.defaults(),{settings:this.s.settings}):seed();this.save()},
 loc(){return NATIVE?(GPS.fix||NO_FIX):(this.s.settings.loc||DEFAULT_LOC)},
 visitsFor(n){return this.s.visits.filter(v=>v.b===n).sort((a,b)=>sortKey(b).localeCompare(sortKey(a)))},
 primary(n){const vs=this.s.visits.filter(v=>v.b===n);if(!vs.length)return null;return vs.find(v=>v.verified)||vs.sort((a,b)=>a.created-b.created)[0]},
 visitedSet(){return new Set(this.s.visits.map(v=>v.b))},
 isSaved(n){return!!this.s.saves[n]},
 toggleSave(n){if(this.s.saves[n])delete this.s.saves[n];else this.s.saves[n]=Date.now();this.save();return!!this.s.saves[n]},
 addVisit(v){v.id='v'+Date.now().toString(36)+Math.random().toString(36).slice(2,6);v.created=Date.now();this.s.visits.push(v);if(!this.save()){this.s.visits.pop();return null}return v},
 updateVisit(id,patch){const v=this.s.visits.find(x=>x.id===id);if(!v)return false;const old={...v};Object.assign(v,patch);if(!this.save()){Object.assign(v,old);return false}return true},
 deleteVisit(id){this.s.visits=this.s.visits.filter(v=>v.id!==id);this.save()},
 stats(){const vs=this.s.visits,set=this.visitedSet(),bs=[...set].map(n=>BY.get(n)).filter(Boolean);
  return{buildings:set.size,verified:new Set(vs.filter(v=>v.verified).map(v=>v.b)).size,styles:new Set(bs.map(b=>b.style)).size,boroughs:new Set(bs.map(b=>b.boro)).size,inside:new Set(vs.filter(v=>v.inside).map(v=>v.b)).size,saved:Object.keys(this.s.saves).length}},
};
const sortKey=v=>(v.date||'0000')+'~'+pad2(0)+v.created;
const STYLES=(()=>{const m=new Map();B.forEach(b=>m.set(b.style,(m.get(b.style)||0)+1));return[...m].sort((a,b)=>b[1]-a[1]).map(([name,count])=>({name,count,id:slug(name)}))})();
const ERAS=[...new Set(B.slice().sort((a,b)=>a.y-b.y).map(b=>b.era))];
const BOROS=[...new Set(B.map(b=>b.boro))].sort();
const find=q=>B.find(b=>b.name.startsWith(q))||B.find(b=>b.name.includes(q));
const BARB=find('Barbican Estate');
const near=(b,label)=>({lat:b.lat+0.00036,lng:b.lng,label:label||b.name,demo:true});
const DEFAULT_LOC=near(BARB,'Barbican, Silk Street');
const MILESTONES=[
 {id:'first',t:'First entry',d:'Log your first building',n:1,k:'buildings'},{id:'ten',t:'Ten buildings',d:'Collect 10 buildings',n:10,k:'buildings'},
 {id:'v5',t:'On the ground',d:'Check in on site at 5 buildings',n:5,k:'verified'},{id:'s5',t:'Five styles',d:'Collect buildings in 5 styles',n:5,k:'styles'},
 {id:'b5',t:'Five boroughs',d:'Collect buildings in 5 boroughs',n:5,k:'boroughs'},{id:'in5',t:'Through the door',d:'Go inside 5 buildings',n:5,k:'inside'},
 {id:'s10',t:'Ten styles',d:'Collect buildings in 10 styles',n:10,k:'styles'},{id:'25',t:'Twenty-five',d:'Collect 25 buildings',n:25,k:'buildings'},{id:'50',t:'Fifty',d:'Collect 50 buildings',n:50,k:'buildings'}];
function checkMilestones(silent){const st=Data.stats(),fresh=[];MILESTONES.forEach(m=>{if(st[m.k]>=m.n&&!Data.s.milestones[m.id]){Data.s.milestones[m.id]=silent?'seed':todayISO();fresh.push(m)}});if(fresh.length)Data.save();return fresh}
function seed(){
 const s=Data.defaults();let t=Date.now()-9e8;
 const add=(q,o)=>{const b=find(q);if(b)s.visits.push(Object.assign({id:'d'+b.n,b:b.n,created:t++,date:'',precision:'unknown',time:'',verified:false,inside:false,note:'',photos:[]},o))};
 add("St Paul's Cathedral",{date:'2026-10-03',precision:'day',time:'10:12',verified:true,inside:true,note:'Climbed to the Whispering Gallery. The dome is far bigger from inside than it looks from Ludgate Hill.'});
 add('Tate Modern',{date:'2026-09-14',precision:'day',time:'15:40',verified:true,inside:true,note:'Turbine Hall on a quiet weekday.'});
 add('Battersea Power Station',{date:'2026-08-22',precision:'day',time:'12:05',verified:true,inside:true});
 add('National Theatre',{date:'2026-06-07',precision:'day',time:'18:31',verified:true,note:'Board-marked concrete glowing at dusk.'});
 add('British Museum',{date:'2025-05',precision:'month',inside:true,note:'Great Court roof, then the Parthenon galleries.'});
 add('Natural History Museum',{date:'2024',precision:'year',inside:true});
 add('Tower Bridge',{date:'2023-11-18',precision:'day'});
 add('Trellick Tower',{date:'2019-06',precision:'month',note:'Walked up Golborne Road to see it from the canal.'});
 add("Lloyd's Building",{date:'2018',precision:'year'});
 add('The Shard',{date:'',precision:'unknown'});
 add('Somerset House',{date:'2022-07',precision:'month',inside:true});
 add('Royal Festival Hall',{date:'2021',precision:'year',inside:true,note:'Demo entry: concert in the main auditorium.'});
 ['Isokon Building','Palm House','Dulwich Picture Gallery','Coal Drops Yard',"Maggie's Barts",'Tate Modern','2 Willow Road'].forEach((q,i)=>{const b=find(q);if(b)s.saves[b.n]=t+i});
 const keep=Data.s;Data.s=s;const st=Data.stats();MILESTONES.forEach(m=>{if(st[m.k]>=m.n)s.milestones[m.id]='seed'});Data.s=keep;
 return s;
}
/* ---------- formatting ---------- */
function dist(b){const l=Data.loc(),R=6371000,r=Math.PI/180,p1=l.lat*r,p2=b.lat*r,dp=p2-p1,dl=(b.lng-l.lng)*r,h=Math.sin(dp/2)**2+Math.cos(p1)*Math.cos(p2)*Math.sin(dl/2)**2;return 2*R*Math.asin(Math.sqrt(h))}
const inRange=b=>!Data.loc().pending&&dist(b)<=RADIUS;
const away=m=>Data.loc().pending?'':fmtDist(m)+' away';
function fmtDist(m){if(Data.loc().pending)return'';if(Data.s.settings.units==='mi'){const mi=m/1609.34;return mi<0.1?Math.max(10,Math.round(m*1.0936/10)*10)+' yd':mi.toFixed(mi<10?1:0)+' mi'}return m<1000?Math.max(10,Math.round(m/10)*10)+' m':(m/1000).toFixed(m<10000?1:0)+' km'}
function fmtDate(v){if(!v.date||v.precision==='unknown')return'Date not recorded';const[y,m,d]=v.date.split('-');if(v.precision==='year')return y;if(v.precision==='month')return MON[m-1]+' '+y;return+d+' '+MON[m-1].slice(0,3)+' '+y}
function stampMid(v){if(!v.date||v.precision==='unknown')return'UNDATED';const[y,m,d]=v.date.split('-');if(v.precision==='year')return y;if(v.precision==='month')return ROM[m-1]+'·'+y;return+d+'·'+ROM[m-1]+'·'+y.slice(2)}
function stampShort(v){if(!v.date||v.precision==='unknown')return'✓';const[y,m]=v.date.split('-');return v.precision==='year'?y:ROM[m-1]+'·'+y.slice(2)}
const SEAL_PATH=(()=>{let d='';for(let k=0;k<40;k++){const r=k%2?40.2:43,t=k/40*Math.PI*2-Math.PI/2;d+=(k?'L':'M')+(44+r*Math.cos(t)).toFixed(2)+' '+(44+r*Math.sin(t)).toFixed(2)}return d+'Z'})();
function stamp(v,mini,n){const mem=!v.verified,num=n!=null?String(n):'✓',ink='#FFFDF8',fill=mem?'#D0704E':'#C4532D',fs=mini?(num.length>2?24:28):(num.length>2?25:29);
 return`<div class="stamp seal ${mem?'mem':''}" role="img" aria-label="${mem?'Logged from memory':'Verified on site'}, ${esc(fmtDate(v))}"><svg viewBox="0 0 88 88"><path d="${SEAL_PATH}" fill="${fill}" stroke-linejoin="round"/><path d="M22 30a26 26 0 0 1 20-14" fill="none" stroke="#FFFDF8" stroke-opacity=".28" stroke-width="3" stroke-linecap="round"/><circle cx="44" cy="44" r="${mini?31:33}" fill="none" stroke="${ink}" stroke-opacity=".6" stroke-width="${mini?1.8:1}" ${mem?'stroke-dasharray="2.5 2.5"':''}/>${mini?'':`<text x="44" y="29" font-family="IBM Plex Mono,monospace" font-weight="500" font-size="6.5" letter-spacing=".8" fill="${ink}">${mem?'MEMORY':'LONDON'}</text><text x="44" y="66" font-family="IBM Plex Mono,monospace" font-weight="500" font-size="6.5" letter-spacing=".6" fill="${ink}">${esc(stampShort(v)==='✓'?'UNDATED':stampShort(v))}</text>`}<text x="44" y="${mini?53:54}" font-family="Fraunces,Georgia,serif" font-weight="600" font-size="${fs}" fill="${ink}">${esc(num)}</text></svg></div>`}
const byline=b=>[b.arch,b.years].filter(Boolean).join(' · ');
function card(b,v,anim){
 return`<div class="card ${v?'v':''} ${anim?'anim pre':''}"><div class="in"><div class="hd"><span class="no">No. ${no4(b.n)}</span><span class="st">${esc(b.style)}</span></div>
 <div class="plate">${v?'<i class="sun"></i>':''}${anim?`<svg class="dr" viewBox="0 0 300 200" aria-hidden="true"><g class="ghost">${D[b.n]}</g><g class="ink">${D[b.n]}</g></svg>`:drawing(b.n,v?'':'faint')}</div>
 <div class="nm">${esc(b.name)}</div><div class="by">${esc(byline(b))}</div>
 <div class="ft"><div class="l">${v?'Visited':'Not yet visited'}</div><div class="d">${v?esc(fmtDate(v)):esc(away(dist(b)))}</div></div>${v?stamp(v,false,b.n):''}</div></div>`}
function mini(b,v){return`<button class="mini ${v?'v':''}" data-go="b-${no4(b.n)}" aria-label="${esc(b.name)}${v?', visited '+esc(fmtDate(v)):', not yet visited'}"><div class="no">No. ${no4(b.n)}</div><div class="mp">${v?'<i class="sun"></i>':''}${drawing(b.n,v?'':'faint')}</div><div class="nm">${esc(b.name)}</div><div class="d">${v?esc(fmtDate(v)):'Not yet visited'}</div>${v?stamp(v,true,b.n):''}</button>`}
function item(b,vis,extra){const v=vis.has(b.n),s=Data.isSaved(b.n);
 return`<button class="item" data-go="b-${no4(b.n)}"><span class="thumb ${v?'in':''}">${drawing(b.n,v?'thin':'thin faint')}</span><span class="grow"><span class="nm">${esc(b.name)}</span><span class="meta ${v?'v':''}" style="display:block">No. ${no4(b.n)} · ${esc(b.style)}</span><span class="sub" style="display:block">${esc(extra||byline(b))}</span></span><span class="side"><span>${fmtDist(dist(b))}</span>${v?`<span class="state-v" title="Visited">${I('check')}</span>`:s?`<span class="state-s" title="Saved">${I('bookmark','fill')}</span>`:''}</span></button>`}
function progress(label,x,y,blue,from){const w=y?x/y*100:0,w0=from==null?w:(y?from/y*100:0);return`<div class="prog"><div class="row"><b>${esc(label)}</b><span class="num">${x} / ${y}</span></div><div class="bar ${blue?'blue':''}"><i class="${x?'':'zero'}" style="width:${w0}%" data-w="${w}"></i></div></div>`}

/* ---------- toast / dialog / sheet ---------- */
let toastT;function toast(msg){const t=$('#toast');t.innerHTML=`<div>${esc(msg)}</div>`;clearTimeout(toastT);toastT=setTimeout(()=>t.innerHTML='',2600)}
function overlay(cls,html){const el=document.createElement('div');el.className=cls;el.innerHTML=html;$('#app').appendChild(el);return el}
function confirmDlg(title,text,okLabel,danger){return new Promise(res=>{const el=overlay('dlg',`<div role="alertdialog" aria-modal="true" aria-label="${esc(title)}"><h3>${esc(title)}</h3><p>${esc(text)}</p><div class="row"><button class="btn soft" data-x="0">Cancel</button><button class="btn ${danger?'primary':'dark'}" data-x="1">${esc(okLabel)}</button></div></div>`);
 el.addEventListener('click',e=>{const b=e.target.closest('[data-x]');if(b||e.target===el){el.remove();res(!!b&&b.dataset.x==='1')}});$('[data-x="0"]',el).focus()})}
let sheetEl=null;
function openSheet(title,render,opts={}){closeSheet();sheetEl=overlay('scrim',`<div class="sheet" role="dialog" aria-modal="true" aria-label="${esc(title)}"><div class="grab"></div><div class="shd"><button class="cancel" data-close>${opts.cancel||'Cancel'}</button><h3>${esc(title)}</h3><span></span></div><div class="sbody" style="display:contents"></div></div>`);
 sheetEl.addEventListener('click',e=>{if(e.target===sheetEl||e.target.closest('[data-close]'))(opts.onCancel||closeSheet)()});
 sheetEl.rerender=()=>{const sc=$('.body',sheetEl),top=sc?sc.scrollTop:0;$('.sbody',sheetEl).innerHTML=render();const n=$('.body',sheetEl);if(n)n.scrollTop=top};sheetEl.rerender();return sheetEl}
function closeSheet(){if(sheetEl){sheetEl.remove();sheetEl=null}}
document.addEventListener('keydown',e=>{if(e.key==='Escape'){const d=$('.dlg')||$('.lightbox');if(d)d.remove();else if(sheetEl)closeSheet()}});

/* ---------- router ---------- */
const TABS=[['explore','Explore','compass'],['saved','Saved','bookmark'],['logbook','Logbook','book'],['profile','Profile','user']];
let stack=['explore'];const scrolls={};
const cur=()=>stack[stack.length-1];
function go(r,replace){scrolls[cur()]=$('#view').scrollTop;if(TABS.some(t=>t[0]===r))stack=[r];else if(replace)stack[stack.length-1]=r;else if(cur()!==r)stack.push(r);render()}
function back(){scrolls[cur()]=0;if(stack.length>1)stack.pop();else stack=['explore'];render(true)}
function tabOf(){return TABS.some(t=>t[0]===stack[0])?stack[0]:'explore'}
let selfHash='';
function render(restore){const r=cur(),view=$('#view');mapCleanup();
 let html,bar='';
 if(r==='explore')html=vExplore();else if(r==='saved')html=vSaved();else if(r==='logbook')html=vLogbook();else if(r==='profile')html=vProfile();
 else if(r.startsWith('b-')&&BY.has(+r.slice(2))){const o=vDetail(BY.get(+r.slice(2)));html=o.html;bar=o.bar}
 else if(r.startsWith('c-')&&collection(r.slice(2)))html=vCollection(collection(r.slice(2)));
 else{stack=['explore'];return render()}
 view.innerHTML=html;$('#bar').innerHTML=bar;$('#bar').hidden=!bar;$('#tabs').hidden=!!bar;
 $('#tabs').innerHTML=TABS.map(t=>`<button data-go="${t[0]}" aria-label="${t[1]}" ${tabOf()===t[0]?'aria-current="page"':''}>${I(t[2])}</button>`).join('');
 view.scrollTop=(restore||TABS.some(t=>t[0]===r))?(scrolls[r]||0):0;
 afterRender(r);selfHash='#'+r;try{if(location.hash!==selfHash)history.replaceState(null,'',selfHash)}catch(e){try{location.hash=selfHash}catch(_){}}}
window.addEventListener('hashchange',()=>{if(location.hash&&location.hash!==selfHash){closeSheet();go(location.hash.slice(1))}});

/* ---------- Explore ---------- */
const F={q:'',styles:new Set(),eras:new Set(),boro:'',status:'all',sort:'near',view:'list',shown:30};
const SORTS={near:'Nearest first',no:'Catalogue no.',old:'Oldest first',new:'Newest first',az:'A to Z'};
function filterCount(){return F.styles.size+F.eras.size+(F.boro?1:0)+(F.status!=='all'?1:0)}
function results(){const q=F.q.trim().toLowerCase(),vis=Data.visitedSet();
 let r=B.filter(b=>(!q||(b.name+' '+b.arch+' '+b.style+' '+b.boro+' '+b.street+' '+b.type).toLowerCase().includes(q))&&(!F.styles.size||F.styles.has(b.style))&&(!F.eras.size||F.eras.has(b.era))&&(!F.boro||b.boro===F.boro)&&(F.status==='all'||(F.status==='visited'?vis.has(b.n):F.status==='todo'?!vis.has(b.n):Data.isSaved(b.n))));
 const s=F.sort;r=r.map(b=>[b,s==='near'?dist(b):0]);r.sort(s==='near'?(a,b)=>a[1]-b[1]:s==='no'?(a,b)=>a[0].n-b[0].n:s==='old'?(a,b)=>a[0].y-b[0].y||a[0].n-b[0].n:s==='new'?(a,b)=>b[0].y-a[0].y||a[0].n-b[0].n:(a,b)=>a[0].name.localeCompare(b[0].name));return r.map(x=>x[0])}
function hereBanner(){const vis=Data.visitedSet(),c=Data.loc().pending?[]:B.map(b=>[b,dist(b)]).filter(x=>x[1]<=RADIUS).sort((a,b)=>a[1]-b[1]);if(NATIVE&&!GPS.fix)return gpsBanner();if(!c.length)return'';
 const t=c.find(x=>!vis.has(x[0].n))||c[0],seen=vis.has(t[0].n);
 return`<div class="pad" style="padding-bottom:12px"><button class="here" data-go="b-${no4(t[0].n)}"><span class="dot">${I('pin')}</span><span class="grow"><b>You’re at ${esc(t[0].name)}</b><span>Within ${fmtDist(t[1])}. ${seen?'Already in your logbook.':'Check in to collect it.'}${c.length>1?' '+(c.length-1)+' more in range.':''}</span></span>${I('chevR')}</button></div>`}
function vExplore(){const loc=Data.loc(),fc=filterCount();
 return`<header class="top"><div class="row between"><button class="pill city" data-act="city" aria-label="Change city, currently London">London${I('chevD')}</button><button class="pill loc" data-act="loc" aria-label="Change location, currently ${esc(loc.label)}">${I('pin')}<span>${esc(loc.demo?'Demo: ':'')}${esc(loc.label)}</span></button></div><h1>Explore</h1>
 <div class="search">${I('search')}<input id="q" type="search" inputmode="search" enterkeyhint="search" autocomplete="off" placeholder="Buildings, architects, styles" aria-label="Search buildings" value="${esc(F.q)}"><button class="clear" data-act="clearq" aria-label="Clear search" ${F.q?'':'hidden'}>${I('close')}</button></div>
 <div class="row" style="margin-top:12px"><div class="seg grow" role="group" aria-label="View"><button data-act="view" data-v="list" aria-pressed="${F.view==='list'}">${I('list')}List</button><button data-act="view" data-v="map" aria-pressed="${F.view==='map'}">${I('map')}Map</button></div>
 <button class="chip" data-act="filters" style="min-height:40px">${I('filter')}Filters${fc?`<span class="badge">${fc}</span>`:''}</button></div></header>
 <div class="chips" role="group" aria-label="Quick style filters">${STYLES.slice(0,10).map(s=>`<button class="chip" data-act="style" data-s="${esc(s.name)}" aria-pressed="${F.styles.has(s.name)}">${esc(s.name)}<span class="n">${s.count}</span></button>`).join('')}</div>
 <div id="here">${hereBanner()}</div><div id="results"></div>`}
function drawResults(){const el=$('#results');if(!el)return;const r=results(),vis=Data.visitedSet();
 const head=`<div class="count"><span class="label" aria-live="polite">${r.length} ${r.length===1?'building':'buildings'}</span>${F.view==='list'?`<select class="sel" id="sort" aria-label="Sort">${Object.entries(SORTS).map(([k,v])=>`<option value="${k}" ${F.sort===k?'selected':''}>${v}</option>`).join('')}</select>`:''}</div>`;
 if(!r.length){mapCleanup();el.innerHTML=head+`<div class="empty"><div class="serif">No buildings match</div><p>Try a different search, or clear the filters to see all ${B.length} buildings.</p><button class="btn soft" data-act="clearall">Clear search and filters</button></div>`;return}
 if(F.view==='map'){el.innerHTML=head+mapHTML();initMap(r);return}
 mapCleanup();el.innerHTML=head+`<div class="pad"><button class="soon" data-act="city"><b>More cities coming soon</b><span>London is the first city in the logbook.</span></button></div><div class="list">${r.slice(0,F.shown).map(b=>item(b,vis)).join('')}</div>${r.length>F.shown?`<div class="pad" style="padding:16px 20px 24px"><button class="btn soft wide" data-act="more" id="more">Show more (${r.length-F.shown} left)</button></div>`:'<div style="height:24px"></div>'}`;
 const m=$('#more');if(m&&'IntersectionObserver'in window){const io=new IntersectionObserver(es=>{if(es[0].isIntersecting){io.disconnect();F.shown+=30;drawResults()}},{root:$('#view'),rootMargin:'300px'});io.observe(m)}}
function openFilters(){const tmp={styles:new Set(F.styles),eras:new Set(F.eras),boro:F.boro,status:F.status};
 const count=()=>{const keep={styles:F.styles,eras:F.eras,boro:F.boro,status:F.status};Object.assign(F,tmp);const n=results().length;Object.assign(F,keep);return n};
 const el=openSheet('Filters',()=>`<div class="body"><div class="flabel"><span class="label">Status</span></div><div class="seg">${[['all','All'],['todo','Not visited'],['visited','Visited'],['saved','Saved']].map(([k,l])=>`<button data-f="status" data-v="${k}" aria-pressed="${tmp.status===k}">${l}</button>`).join('')}</div>
 <div class="flabel"><span class="label">Style</span><small>${tmp.styles.size||'Any'}</small></div><div class="wrapchips">${STYLES.map(s=>`<button class="chip" data-f="styles" data-v="${esc(s.name)}" aria-pressed="${tmp.styles.has(s.name)}">${esc(s.name)}<span class="n">${s.count}</span></button>`).join('')}</div>
 <div class="flabel"><span class="label">Era</span><small>${tmp.eras.size||'Any'}</small></div><div class="wrapchips">${ERAS.map(s=>`<button class="chip" data-f="eras" data-v="${esc(s)}" aria-pressed="${tmp.eras.has(s)}">${esc(s)}</button>`).join('')}</div>
 <div class="flabel"><label class="label" for="fboro">Borough</label></div><select class="field" id="fboro"><option value="">All boroughs</option>${BOROS.map(b=>`<option ${tmp.boro===b?'selected':''}>${esc(b)}</option>`).join('')}</select><div style="height:8px"></div></div>
 <div class="foot"><div class="row"><button class="btn soft" data-f="clear">Clear</button><button class="btn dark grow" data-f="apply" ${count()?'':'disabled'}>${count()?`Show ${count()} buildings`:'No matches'}</button></div></div>`);
 el.addEventListener('click',e=>{const b=e.target.closest('[data-f]');if(!b)return;const f=b.dataset.f,v=b.dataset.v;
  if(f==='status')tmp.status=v;else if(f==='styles'||f==='eras'){tmp[f].has(v)?tmp[f].delete(v):tmp[f].add(v)}else if(f==='clear'){tmp.styles.clear();tmp.eras.clear();tmp.boro='';tmp.status='all'}
  else if(f==='apply'){Object.assign(F,tmp,{shown:30});closeSheet();render();return}el.rerender()});
 el.addEventListener('change',e=>{if(e.target.id==='fboro'){tmp.boro=e.target.value;el.rerender()}})}

/* ---------- schematic map ---------- */
const MK=10000,MC=Math.cos(51.5*Math.PI/180),px=lng=>(lng+0.52)*MK*MC,py=lat=>(51.70-lat)*MK;
const THAMES=[[-0.337,51.404],[-0.308,51.411],[-0.322,51.431],[-0.318,51.446],[-0.307,51.457],[-0.318,51.472],[-0.288,51.487],[-0.268,51.478],[-0.250,51.472],[-0.240,51.487],[-0.230,51.489],[-0.222,51.478],[-0.213,51.467],[-0.190,51.464],[-0.180,51.472],[-0.170,51.482],[-0.150,51.485],[-0.144,51.484],[-0.126,51.487],[-0.122,51.495],[-0.122,51.501],[-0.120,51.507],[-0.116,51.509],[-0.104,51.510],[-0.088,51.508],[-0.075,51.506],[-0.058,51.503],[-0.045,51.506],[-0.035,51.508],[-0.028,51.503],[-0.027,51.493],[-0.022,51.487],[-0.010,51.4855],[0.000,51.4875],[-0.003,51.497],[-0.002,51.506],[0.008,51.509],[0.017,51.503],[0.022,51.495],[0.037,51.497],[0.062,51.495],[0.085,51.500],[0.12,51.512],[0.15,51.511],[0.19,51.497]];
const AREAS=[['City',51.5148,-0.0905],['Westminster',51.4965,-0.134],['Camden',51.5395,-0.1426],['Greenwich',51.4775,-0.0005],['Kensington',51.4995,-0.1937],['Canary Wharf',51.501,-0.021],['Stratford',51.5435,-0.004],['Hampstead',51.5585,-0.178],['Richmond',51.461,-0.303],['Kew',51.481,-0.2956],['Wembley',51.56,-0.2796],['Croydon',51.378,-0.0984],['Battersea',51.474,-0.160],['Islington',51.540,-0.103],['Hackney',51.547,-0.055],['Woolwich',51.487,0.065],['Southwark',51.499,-0.090],['Bloomsbury',51.523,-0.126],['Hampton Court',51.407,-0.337]];
let mapV=null,mapOff=null,mapSel=null;
/* Google Maps: set a browser key here (restrict it by HTTP referrer in Google Cloud). Empty = schematic map. */
const GOOGLE_MAPS_KEY=window.GOOGLE_MAPS_KEY||'';
const G={state:GOOGLE_MAPS_KEY?'idle':'off',view:null};
const useGoogle=()=>G.state==='ready'||G.state==='loading'||G.state==='idle';
const PAPER_STYLE=[{elementType:'geometry',stylers:[{color:'#EFE9DD'}]},{elementType:'labels.icon',stylers:[{visibility:'off'}]},{elementType:'labels.text.fill',stylers:[{color:'#6B655C'}]},{elementType:'labels.text.stroke',stylers:[{color:'#F3EEE4'},{weight:3}]},
 {featureType:'administrative',elementType:'geometry.stroke',stylers:[{color:'#D9D1C3'}]},{featureType:'administrative.land_parcel',stylers:[{visibility:'off'}]},{featureType:'administrative.neighborhood',elementType:'labels.text.fill',stylers:[{color:'#8A8377'}]},
 {featureType:'landscape.man_made',elementType:'geometry',stylers:[{color:'#ECE5D8'}]},{featureType:'landscape.natural',elementType:'geometry',stylers:[{color:'#EAE4D6'}]},
 {featureType:'poi',stylers:[{visibility:'off'}]},{featureType:'poi.park',elementType:'geometry',stylers:[{visibility:'on'},{color:'#DDE3D3'}]},
 {featureType:'road',elementType:'geometry.fill',stylers:[{color:'#FFFDF8'}]},{featureType:'road',elementType:'geometry.stroke',stylers:[{color:'#E2DCD0'}]},{featureType:'road',elementType:'labels.text.fill',stylers:[{color:'#8A8377'}]},
 {featureType:'road.highway',elementType:'geometry.fill',stylers:[{color:'#F7EFE0'}]},{featureType:'road.highway',elementType:'geometry.stroke',stylers:[{color:'#D9D1C3'}]},{featureType:'road.local',elementType:'labels',stylers:[{visibility:'simplified'}]},
 {featureType:'transit.line',stylers:[{visibility:'off'}]},{featureType:'transit.station',elementType:'labels.text.fill',stylers:[{color:'#8A8377'}]},
 {featureType:'water',elementType:'geometry',stylers:[{color:'#CBD6D6'}]},{featureType:'water',elementType:'labels.text.fill',stylers:[{color:'#7E9494'}]}];
function loadGoogle(){G.state='loading';window.__gmReady=()=>{G.state='ready';if($('#gmap'))render(true)};window.gm_authFailure=()=>googleFailed('Google Maps rejected the key. Showing the schematic map.');
 const sc=document.createElement('script');sc.src='https://maps.googleapis.com/maps/api/js?key='+encodeURIComponent(GOOGLE_MAPS_KEY)+'&v=weekly&loading=async&callback=__gmReady';sc.async=true;sc.onerror=()=>googleFailed('Google Maps couldn’t load here. Showing the schematic map.');document.head.appendChild(sc);
 setTimeout(()=>{if(G.state==='loading')googleFailed('Google Maps is taking too long. Showing the schematic map.')},12000)}
function googleFailed(msg){if(G.state==='failed')return;G.state='failed';toast(msg);if($('#gmap'))render(true)}
function initGoogle(list){const el=$('#gmap');if(!el)return;if(G.state==='idle')loadGoogle();if(G.state!=='ready')return;
 const gm=google.maps,loc=Data.loc(),vis=Data.visitedSet();if(!G.view)G.view={center:{lat:loc.lat,lng:loc.lng},zoom:15};
 const map=new gm.Map(el,{center:G.view.center,zoom:G.view.zoom,styles:PAPER_STYLE,disableDefaultUI:true,zoomControl:true,gestureHandling:'greedy',clickableIcons:false,backgroundColor:'#EFE9DD',minZoom:9,maxZoom:19});
 map.addListener('idle',()=>{const c=map.getCenter();if(c)G.view={center:{lat:c.lat(),lng:c.lng()},zoom:map.getZoom()}});
 const icon=(b,sel)=>{const v=vis.has(b.n),s=Data.isSaved(b.n);return{path:gm.SymbolPath.CIRCLE,scale:sel?9:6,fillOpacity:1,strokeWeight:1.5,fillColor:sel?'#1D1B17':v?'#C4532D':s?'#DDE8E3':'#FFFDF8',strokeColor:sel?'#1D1B17':v?'#C4532D':s?'#3E6B5C':'#1D1B17'}};
 const marks=new Map();const showCard=()=>{const c=$('#mapcard'),b=BY.get(mapSel);if(c){c.innerHTML=b?mapCardHTML(b,vis):'';if(b&&c.firstElementChild.scrollIntoView)c.firstElementChild.scrollIntoView({block:'nearest',behavior:'smooth'})}};
 const select=n=>{const old=marks.get(mapSel);mapSel=n;if(old)old.m.setIcon(icon(old.b,false));const cur=marks.get(n);if(cur){cur.m.setIcon(icon(cur.b,true));cur.m.setZIndex(999)}showCard();recluster(true)};
 list.forEach(b=>{const m=new gm.Marker({position:{lat:b.lat,lng:b.lng},icon:icon(b,b.n===mapSel),title:b.name,zIndex:vis.has(b.n)?2:1});m.addListener('click',()=>select(b.n));marks.set(b.n,{m,b})});
 /* clustering: pins closer than 44 px at the current zoom merge into one numbered marker */
 let clusters=[],lastZ=null;const wpx=(b,z)=>{const s=256*Math.pow(2,z),sn=Math.sin(b.lat*Math.PI/180);return[(b.lng+180)/360*s,(.5-Math.log((1+sn)/(1-sn))/(4*Math.PI))*s]};
 function recluster(force){const z=map.getZoom();if(z==null||(!force&&z===lastZ))return;lastZ=z;clusters.forEach(c=>c.setMap(null));clusters=[];const R=z>=17?0:44,groups=[];
  list.forEach(b=>{const p=wpx(b,z),solo=b.n===mapSel;let g=null;if(R&&!solo)for(const x of groups){if(!x.solo&&Math.hypot(x.x-p[0],x.y-p[1])<R){g=x;break}}
   if(g){g.items.push(b);const k=g.items.length;g.x+=(p[0]-g.x)/k;g.y+=(p[1]-g.y)/k;g.lat+=(b.lat-g.lat)/k;g.lng+=(b.lng-g.lng)/k}else groups.push({x:p[0],y:p[1],lat:b.lat,lng:b.lng,items:[b],solo})});
  groups.forEach(g=>{const k=g.items.length;if(k===1){const m=marks.get(g.items[0].n).m;if(m.getMap()!==map)m.setMap(map);return}
   g.items.forEach(b=>marks.get(b.n).m.setMap(null));const got=g.items.filter(b=>vis.has(b.n)).length;
   const c=new gm.Marker({position:{lat:g.lat,lng:g.lng},map,zIndex:500,title:k+' buildings'+(got?', '+got+' visited':'')+'. Tap to zoom in',label:{text:String(k),color:'#FFFDF8',fontFamily:'IBM Plex Mono, ui-monospace, monospace',fontSize:'11px',fontWeight:'500'},icon:{path:gm.SymbolPath.CIRCLE,scale:k<10?13:k<50?16:19,fillColor:'#1D1B17',fillOpacity:.94,strokeColor:got?'#C4532D':'#FFFDF8',strokeWeight:got?2.5:2}});
   c.addListener('click',()=>{if(mapSel!=null)select(null);if(map.getZoom()>=16){map.setZoom(map.getZoom()+1);map.panTo({lat:g.lat,lng:g.lng})}else{const bb=new gm.LatLngBounds();g.items.forEach(b=>bb.extend({lat:b.lat,lng:b.lng}));map.fitBounds(bb,56)}});clusters.push(c)})}
 map.addListener('zoom_changed',()=>recluster());recluster(true);G.dbg=()=>({zoom:map.getZoom(),clusters:clusters.length,singles:[...marks.values()].filter(x=>x.m.getMap()).length});
 G.me=loc.pending?null:new gm.Marker({position:{lat:loc.lat,lng:loc.lng},map,clickable:false,zIndex:1000,title:'You',icon:{path:gm.SymbolPath.CIRCLE,scale:7,fillColor:'#3E6B5C',fillOpacity:1,strokeColor:'#FFFFFF',strokeWeight:2.5}});
 map.addListener('click',()=>select(null));const btn=$('[data-m="me"]',el.parentNode);if(btn)btn.onclick=()=>{map.panTo({lat:loc.lat,lng:loc.lng});map.setZoom(15)};
 if(mapSel&&!marks.has(mapSel))mapSel=null;showCard()}
function mapHTML(){if(useGoogle())return`<div class="mapwrap g"><div id="gmap" style="position:absolute;inset:0" role="application" aria-label="Map of buildings. Use the list view for an accessible list."></div>${G.state==='ready'?'':'<div class="mapnote">Loading map…</div>'}<div class="mapctl" style="top:auto;bottom:118px"><button data-m="me" aria-label="Centre on my location">${I('target')}</button></div><div id="mapcard"></div></div>
 <div class="legend"><span><i></i>Not visited</span><span><i class="s"></i>Saved</span><span><i class="v"></i>Visited</span><span><i class="c"></i>Several, tap to zoom</span><span><i class="me"></i>You</span></div>`;return`<div class="mapwrap"><svg class="m" id="map" role="application" aria-label="Schematic map of buildings. Use the list view for an accessible list."><path class="river" d="M${THAMES.map(p=>px(p[0]).toFixed(0)+' '+py(p[1]).toFixed(0)).join('L')}"/><g id="lbls">${AREAS.map(a=>`<text class="lbl" x="${px(a[2]).toFixed(0)}" y="${py(a[1]).toFixed(0)}">${a[0].toUpperCase()}</text>`).join('')}</g><g id="pins"></g><circle class="halo" id="halo"/><circle class="me" id="me"/></svg>
 <div class="mapnote">Schematic map · not for navigation</div><div class="mapctl"><button data-m="in" aria-label="Zoom in">+</button><button data-m="out" aria-label="Zoom out">−</button><button data-m="me" aria-label="Centre on my location">${I('target')}</button></div><div id="mapcard"></div></div>
 <div class="legend"><span><i></i>Not visited</span><span><i class="s"></i>Saved</span><span><i class="v"></i>Visited</span><span><i class="me"></i>You</span></div>`}
function mapCleanup(){if(mapOff){mapOff();mapOff=null}}
function mapCardHTML(b,vis){return`<div class="mapcard">${item(b,vis)}<button class="dirb" data-act="dir" data-n="${b.n}" aria-label="Get directions to ${esc(b.name)}">${I('dir')}</button></div>`}
function fitMap(){const w=$('.mapwrap'),v=$('#view');if(!w||!v)return;const lg=w.nextElementSibling&&w.nextElementSibling.classList.contains('legend')?w.nextElementSibling.offsetHeight:0,top=w.getBoundingClientRect().top-v.getBoundingClientRect().top+v.scrollTop;w.style.height=Math.max(360,v.clientHeight-top-lg-16)+'px'}
window.addEventListener('resize',fitMap);
function initMap(list){fitMap();if(useGoogle())return initGoogle(list);const svg=$('#map');if(!svg)return;const loc=Data.loc(),vis=Data.visitedSet();
 if(!mapV)mapV={cx:px(loc.lng),cy:py(loc.lat),w:520};
 const pts=list.map(b=>({b,x:px(b.lng),y:py(b.lat)}));
 $('#pins',svg).innerHTML=pts.map(p=>`<circle class="pin ${vis.has(p.b.n)?'v':Data.isSaved(p.b.n)?'s':''}" data-n="${p.b.n}" cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}"/>`).join('');
 const me=$('#me',svg),halo=$('#halo',svg);[me,halo].forEach(c=>{c.setAttribute('cx',px(loc.lng));c.setAttribute('cy',py(loc.lat))});
 const size=()=>svg.getBoundingClientRect();
 function apply(){const r=size(),u=mapV.w/r.width,h=mapV.w*r.height/r.width;mapV.w=Math.min(6500,Math.max(40,mapV.w));svg.setAttribute('viewBox',`${mapV.cx-mapV.w/2} ${mapV.cy-h/2} ${mapV.w} ${h}`);
  const pr=(mapV.w>2500?3.2:mapV.w>900?4.5:6)*u;$$('.pin',svg).forEach(c=>{const sel=+c.dataset.n===mapSel;c.setAttribute('r',sel?pr*1.5:pr);c.setAttribute('stroke-width',1.5*u);c.classList.toggle('sel',sel)});
  me.setAttribute('r',6*u);me.setAttribute('stroke-width',2*u);halo.setAttribute('r',16*u);$('.river',svg).setAttribute('stroke-width',Math.max(14,7*u));$$('.lbl',svg).forEach(t=>t.setAttribute('font-size',10.5*u));$('#lbls',svg).style.display=mapV.w<180?'none':''}
 function showCard(){const el=$('#mapcard');if(!el)return;const b=BY.get(mapSel);el.innerHTML=b?mapCardHTML(b,vis):'';if(b&&el.firstElementChild.scrollIntoView)el.firstElementChild.scrollIntoView({block:'nearest',behavior:'smooth'})}
 const ptrs=new Map();let start=null,moved=0;
 const down=e=>{svg.setPointerCapture(e.pointerId);ptrs.set(e.pointerId,[e.clientX,e.clientY]);start={t:Date.now(),x:e.clientX,y:e.clientY};moved=0};
 const move=e=>{if(!ptrs.has(e.pointerId))return;const r=size(),u=mapV.w/r.width,prev=ptrs.get(e.pointerId);
  if(ptrs.size===1){mapV.cx-=(e.clientX-prev[0])*u;mapV.cy-=(e.clientY-prev[1])*u;moved+=Math.abs(e.clientX-prev[0])+Math.abs(e.clientY-prev[1])}
  else if(ptrs.size===2){const o=[...ptrs.entries()].find(x=>x[0]!==e.pointerId)[1],d0=Math.hypot(prev[0]-o[0],prev[1]-o[1]),d1=Math.hypot(e.clientX-o[0],e.clientY-o[1]);if(d0>0&&d1>0)mapV.w*=d0/d1;moved+=10}
  ptrs.set(e.pointerId,[e.clientX,e.clientY]);apply()};
 const up=e=>{if(!ptrs.has(e.pointerId))return;ptrs.delete(e.pointerId);if(start&&moved<10&&Date.now()-start.t<500){const r=size(),u=mapV.w/r.width,h=mapV.w*r.height/r.width,x=mapV.cx-mapV.w/2+(e.clientX-r.left)*u,y=mapV.cy-h/2+(e.clientY-r.top)*u;
   let best=null,bd=26*u;pts.forEach(p=>{const d=Math.hypot(p.x-x,p.y-y);if(d<bd){bd=d;best=p}});mapSel=best?best.b.n:null;apply();showCard()}};
 const wheel=e=>{e.preventDefault();mapV.w*=e.deltaY>0?1.15:0.87;apply()};
 const ctl=e=>{const b=e.target.closest('[data-m]');if(!b)return;if(b.dataset.m==='in')mapV.w*=0.6;else if(b.dataset.m==='out')mapV.w*=1.6;else{mapV.cx=px(loc.lng);mapV.cy=py(loc.lat);mapV.w=520}apply()};
 svg.addEventListener('pointerdown',down);svg.addEventListener('pointermove',move);svg.addEventListener('pointerup',up);svg.addEventListener('pointercancel',up);svg.addEventListener('wheel',wheel,{passive:false});
 const wrap=svg.parentNode;wrap.addEventListener('click',ctl);window.addEventListener('resize',apply);mapOff=()=>window.removeEventListener('resize',apply);
 if(mapSel&&!list.some(b=>b.n===mapSel))mapSel=null;apply();showCard()}

/* ---------- Building detail ---------- */
function vDetail(b){const vs=Data.visitsFor(b.n),pv=Data.primary(b.n),d=dist(b),here=inRange(b),saved=Data.isSaved(b.n),nph=vs.reduce((a,v)=>a+v.photos.length,0),loc=Data.loc();
 const facts=[['Listed',b.listed],['Completed',b.done],['Material',b.mat]].filter(f=>f[1]);
 const paras=b.about.split(/\n+/).filter(Boolean);
 const html=`<div class="hero"><i class="sun"></i>${drawing(b.n)}<div class="cap">Elevation · ${esc(b.street)}</div>${nph?`<div class="photos">${I('image')}${nph} ${nph===1?'photo':'photos'}</div>`:''}
 <div class="heroBtns"><button class="round" data-act="back" aria-label="Back">${I('back')}</button><span class="grow"></span><button class="round ${saved?'on':''}" data-act="save" data-n="${b.n}" aria-label="${saved?'Remove from Want to visit':'Save to Want to visit'}" aria-pressed="${saved}">${I('bookmark',saved?'fill':'')}</button><button class="round" data-act="share" data-n="${b.n}" aria-label="Share">${I('share')}</button></div></div>
 <div class="pad" style="padding-top:20px"><div class="eyebrow">No. ${no4(b.n)} · ${esc(b.style)} · London</div><div class="dname ${b.name.length>22?'long':''}" role="heading" aria-level="1">${esc(b.name)}</div>
 <div style="font-weight:500">${esc(byline(b))}</div><p class="muted" style="line-height:1.48;margin:10px 0 16px">${esc(b.sum)}</p><hr class="rule">
 <div class="facts">${facts.map(f=>`<div><span class="label">${f[0]}</span><b>${esc(f[1])}</b></div>`).join('')}</div>
 ${here?`<div class="here"><span class="dot">${I('pin')}</span><span class="grow"><b>You’re here</b><span>Within ${fmtDist(d)}. ${pv?'Check in to add a verified visit.':'Check in to collect it, verified on site.'}</span></span></div>`:''}
 <div class="note-box locbox"${here?' style="margin-top:10px"':''}><b style="font-weight:600;display:block">${away(d)||'Turn on location to see the distance'}</b><span class="muted" style="display:block;font-size:13px;margin-top:2px">${esc(b.street)}, ${esc(b.boro)}</span><button class="btn soft wide" data-act="dir" data-n="${b.n}" style="margin-top:12px">${I('dir')}Get directions</button></div>
 ${here||NATIVE?'':`<div style="text-align:center"><button class="link" data-act="standhere" data-n="${b.n}">Demo: pretend I’m standing here</button></div>`}</div>
 ${vs.length?`<div class="sec"><span class="label">In your logbook · ${vs.length} ${vs.length===1?'visit':'visits'}</span>${vs.map(visitHTML).join('')}</div>`:''}
 ${b.why?`<div class="sec"><span class="label">Why it matters</span><p class="serif" style="font-size:21px;line-height:1.3">${esc(b.why)}</p></div>`:''}
 <div class="sec"><span class="label">About</span>${paras.map(p=>`<p>${esc(p)}</p>`).join('')}</div>
 <div class="sec"><span class="label">Details</span>${[['Style',b.style],['Era',b.era],['Type',b.type],['Architect',b.arch],['Built',b.years],['Awards',b.awards],['Borough',b.boro]].filter(k=>k[1]).map(k=>`<div class="kv"><span>${k[0]}</span><span>${esc(k[1])}</span></div>`).join('')}</div>
 <div class="sec srcs"><details><summary><span class="label">Sources · ${b.src.length}</span><span class="chev">${I('chevD')}</span></summary>${srcList(b.src)}
 <p class="muted" style="font-size:12.5px;margin-top:12px;margin-bottom:0">${esc(b.fc.startsWith('Verified')?'Text fact-checked against the sources above.':b.fc)}${b.pin.startsWith('Approx')?' Map pin: '+esc(b.pin.toLowerCase())+'.':''} The drawing is a stylised impression, not a survey.</p></details></div><div style="height:28px"></div>`;
 const primary=here?`<button class="btn primary grow" data-act="checkin" data-n="${b.n}">${I('check')}${pv?'Check in again':'Check in'}</button>`:`<button class="btn ${pv?'line':'primary'} grow" data-act="past" data-n="${b.n}">${I(pv?'plus':'check')}${pv?'Log another visit':'I’ve been here'}</button>`;
 const bar=`<div class="row"><button class="sq ${saved?'on':''}" data-act="save" data-n="${b.n}" aria-label="${saved?'Remove from Want to visit':'Save to Want to visit'}" aria-pressed="${saved}">${I('bookmark',saved?'fill':'')}</button>${primary}</div>
 <div class="under">${here?`<button class="link" data-act="past" data-n="${b.n}">Been before? Log a past visit</button>`:`<span class="link muted" style="font-weight:500">${pv?'Collected '+esc(fmtDate(pv)):'Check-in unlocks within '+RADIUS+' m'}</span>`}</div>`;
 return{html,bar}}
function visitHTML(v){return`<div class="visit"><div class="row between"><span class="when">${esc(fmtDate(v))}${v.time?' · '+esc(v.time):''}</span><button class="link" style="min-height:32px" data-act="editvisit" data-id="${v.id}" aria-label="Edit visit">${I('edit')}Edit</button></div>
 <div class="row" style="flex-wrap:wrap;gap:6px;margin-top:6px"><span class="tag ${v.verified?'verd':'brick'}">${v.verified?I('check')+'Verified on site':'From memory'}</span>${v.inside?'<span class="tag">Went inside</span>':''}</div>
 ${v.note?`<p>${esc(v.note)}</p>`:''}${v.photos.length?`<div class="ph">${v.photos.map((p,i)=>`<button data-act="photo" data-id="${v.id}" data-i="${i}" aria-label="View photo ${i+1}"><img src="${p}" alt="" loading="lazy"></button>`).join('')}</div>`:''}</div>`}

/* ---------- Log a visit ---------- */
const MAXPH=3,MAXNOTE=500;
function clampDate(dr){const t=todayISO().split('-').map(Number);if(dr.y>t[0])dr.y=t[0];if(dr.y<1900)dr.y=1900;if(dr.y===t[0]&&dr.m>t[1])dr.m=t[1];const dim=new Date(dr.y,dr.m,0).getDate();if(dr.d>dim)dr.d=dim;if(dr.y===t[0]&&dr.m===t[1]&&dr.d>t[2])dr.d=t[2]}
function atMax(dr){const t=todayISO().split('-').map(Number);return dr.precision==='year'?dr.y>=t[0]:dr.precision==='month'?(dr.y>t[0]||(dr.y===t[0]&&dr.m>=t[1])):(dr.y+'-'+pad2(dr.m)+'-'+pad2(dr.d))>=todayISO()}
function draftDate(dr){return dr.precision==='unknown'?'':dr.precision==='year'?''+dr.y:dr.precision==='month'?dr.y+'-'+pad2(dr.m):dr.y+'-'+pad2(dr.m)+'-'+pad2(dr.d)}
function openLog(n,mode,editId){const b=BY.get(n),now=new Date(),first=!Data.primary(n);let busy=false,err='';
 const ev=editId?Data.s.visits.find(v=>v.id===editId):null;if(editId&&!ev)return;
 const dr={mode,precision:'month',y:now.getFullYear(),m:now.getMonth()+1,d:now.getDate(),inside:false,note:'',photos:[],noteOpen:false};
 if(mode==='past'){dr.m--;if(dr.m<1){dr.m=12;dr.y--}dr.d=1}
 if(ev){dr.precision=ev.precision;dr.inside=ev.inside;dr.note=ev.note;dr.photos=[...ev.photos];dr.noteOpen=true;dr.verified=ev.verified;const p=(ev.date||'').split('-');if(p[0])dr.y=+p[0];if(p[1])dr.m=+p[1];if(p[2])dr.d=+p[2]}
 if(mode==='site')dr.noteOpen=true;
 const loc=Data.loc(),time=pad2(now.getHours())+':'+pad2(now.getMinutes());
 const title=ev?'Edit visit':mode==='site'?'Log a visit':'Log a past visit';
 const dirty=()=>dr.note.trim()||dr.photos.length>(ev?ev.photos.length:0);
 const tryClose=async()=>{if(busy)return;if(dirty()&&!(ev&&dr.note===ev.note)){if(!await confirmDlg('Discard this visit?','Your note and photos haven’t been saved.','Discard',true))return}closeSheet()};
 const photosHTML=()=>`<div class="photos">${dr.photos.map((p,i)=>`<div class="photo"><img src="${p}" alt="Photo ${i+1}"><button class="x" data-l="rmph" data-i="${i}" aria-label="Remove photo ${i+1}"><i>${I('close')}</i></button></div>`).join('')}${dr.photos.length<MAXPH?`<label class="addph">${I('camera')}<span>Add</span><input type="file" accept="image/*" aria-label="Add a photo"></label>`:''}</div>`;
 const when=()=>{if(mode==='site'||(ev&&ev.verified))return`<div class="box when">${I('cal')}<span class="grow"><b>${ev?esc(fmtDate(ev))+(ev.time?' · '+ev.time:''):'Today, '+now.getDate()+' '+MON[now.getMonth()].slice(0,3)+' · '+time}</b><small>${ev?'Set at check-in':Math.abs(loc.lat).toFixed(4)+'° '+(loc.lat>=0?'N':'S')+', '+Math.abs(loc.lng).toFixed(4)+'° '+(loc.lng>=0?'E':'W')}</small></span><span class="tag verd">${I('check')}Verified</span></div>`;
  const p=dr.precision,big=p==='unknown'?'Not sure when':p==='year'?dr.y:p==='month'?MON[dr.m-1]+' '+dr.y:dr.d+' '+MON[dr.m-1]+' '+dr.y,lab={day:'Exact day · tap to pick',month:'Month & year',year:'Year only',unknown:'No date on the stamp'}[p];
  return`<div class="seg" role="group" aria-label="Date precision">${[['day','Day'],['month','Month'],['year','Year'],['unknown','Not sure']].map(([k,l])=>`<button data-l="prec" data-v="${k}" aria-pressed="${p===k}">${l}</button>`).join('')}</div>
  <div class="box picker" style="margin-top:12px"><button data-l="step" data-v="-1" aria-label="Earlier" ${p==='unknown'||(p==='year'&&dr.y<=1900)?'disabled':''}>${I('chevL')}</button><div class="mid"><div class="big" aria-live="polite">${big}</div><span class="label">${lab}</span>${p==='day'?`<input type="date" aria-label="Pick the exact day" max="${todayISO()}" min="1900-01-01" value="${draftDate(dr)}">`:''}</div><button data-l="step" data-v="1" aria-label="Later" ${p==='unknown'||atMax(dr)?'disabled':''}>${I('chevR')}</button></div>
  ${ev?'':`<div class="memo"><b>Logged from memory</b><span>Counts towards progress and milestones. The verified stamp is only for on-site check-ins.</span></div>`}`};
 const total=Data.visitedSet().size+(first?1:0);
 const body=()=>`<div class="body"><div class="who"><span class="thumb in">${drawing(n,'thin')}</span><div class="grow"><div class="nm">${esc(b.name)}</div><div class="meta">No. ${no4(n)} · ${esc(b.style)} · London</div></div></div>
 <div class="flabel"><span class="label">When</span></div>${when()}
 ${mode==='site'?`<div class="box rowsw"><span id="insl">Went inside</span><button class="toggle" role="switch" aria-labelledby="insl" aria-checked="${dr.inside}" data-l="inside"></button></div>`:''}
 <div class="flabel"><label class="label" for="note">Notes</label><small><span id="nc">${dr.note.length}</span>/${MAXNOTE} · optional</small></div>
 ${dr.noteOpen?`<textarea class="note" id="note" maxlength="${MAXNOTE}" placeholder="What did you notice?">${esc(dr.note)}</textarea>`:`<button class="box rowbtn" data-l="note">${I('note')}<span class="grow">Add a note</span>${I('chevR')}</button>`}
 <div class="flabel"><span class="label">${mode==='site'?'Photos':'From your library'}</span><small>${dr.photos.length}/${MAXPH} · optional</small></div>${photosHTML()}
 ${err?`<div class="err" role="alert">${esc(err)}</div>`:''}
 ${mode!=='site'?`<div class="box rowsw"><span id="insl">Went inside</span><button class="toggle" role="switch" aria-labelledby="insl" aria-checked="${dr.inside}" data-l="inside"></button></div>`:''}
 ${ev?`<div style="text-align:center;margin-top:8px"><button class="link danger" data-l="delete">${I('trash')}Delete this visit</button></div>`:''}<div style="height:6px"></div></div>
 <div class="foot"><button class="btn primary wide" data-l="submit" style="min-height:56px;font-size:17px">${ev?'Save changes':mode==='site'?I('check')+(first?'Collect '+esc(b.name.length>24?'this building':b.name):'Add verified visit'):I('plus')+'Add to logbook'}</button>${ev?'':`<small>${first?`You’ll have ${total} of ${B.length} buildings in London`:'This adds a dated entry to the same card'}</small>`}</div>`;
 const el=openSheet(title,body,{onCancel:tryClose});
 el.addEventListener('input',e=>{if(e.target.id==='note'){dr.note=e.target.value;$('#nc',el).textContent=dr.note.length}});
 el.addEventListener('change',e=>{const t=e.target;
  if(t.type==='date'&&t.value){const p=t.value.split('-').map(Number);dr.y=p[0];dr.m=p[1];dr.d=p[2];clampDate(dr);el.rerender()}
  if(t.type==='file'&&t.files[0]){const f=t.files[0];err='';if(!f.type.startsWith('image/')){err='That file isn’t an image. Choose a photo.';return el.rerender()}if(f.size>25e6){err='That photo is over 25 MB. Choose a smaller one.';return el.rerender()}
   const lab=t.closest('.addph');lab.querySelector('span').textContent='Adding…';shrink(f).then(u=>{dr.photos.push(u);el.rerender()}).catch(()=>{err='That photo couldn’t be read. Try another one.';el.rerender()})}});
 el.addEventListener('click',async e=>{const t=e.target.closest('[data-l]');if(!t||busy)return;const a=t.dataset.l;
  if(a==='prec'){dr.precision=t.dataset.v;clampDate(dr)}else if(a==='step'){const s=+t.dataset.v;if(dr.precision==='year')dr.y+=s;else if(dr.precision==='month'){dr.m+=s;if(dr.m<1){dr.m=12;dr.y--}if(dr.m>12){dr.m=1;dr.y++}}else{const d=new Date(dr.y,dr.m-1,dr.d+s);dr.y=d.getFullYear();dr.m=d.getMonth()+1;dr.d=d.getDate()}clampDate(dr)}
  else if(a==='inside')dr.inside=!dr.inside;else if(a==='note'){dr.noteOpen=true;el.rerender();const n=$('#note',el);if(n)n.focus();return}else if(a==='rmph')dr.photos.splice(+t.dataset.i,1);
  else if(a==='delete'){if(await confirmDlg('Delete this visit?',Data.visitsFor(n).length===1?b.name+' will go back to “not yet visited” and leave your logbook.':'This entry will be removed. The building stays in your logbook.','Delete',true)){Data.deleteVisit(ev.id);closeSheet();render(true);toast('Visit deleted')}return}
  else if(a==='submit'){if(dr.note.length>MAXNOTE){err='Keep the note under '+MAXNOTE+' characters.';return el.rerender()}
   busy=true;t.disabled=true;const note=dr.note.trim();
   if(ev){const patch={inside:dr.inside,note,photos:dr.photos};if(!ev.verified){patch.precision=dr.precision;patch.date=draftDate(dr)}
    if(!Data.updateVisit(ev.id,patch)){busy=false;err='Couldn’t save: this device’s storage is full. Remove a photo and try again.';return el.rerender()}closeSheet();render(true);toast('Visit updated');return}
   const before={total:Data.visitedSet().size,style:styleCount(b.style),pts:score().total},mBefore=medalMap();
   const v=Data.addVisit(mode==='site'?{b:n,date:todayISO(),precision:'day',time,verified:true,inside:dr.inside,note,photos:dr.photos}:{b:n,date:draftDate(dr),precision:dr.precision,time:'',verified:false,inside:dr.inside,note,photos:dr.photos});
   if(!v){busy=false;err='Couldn’t save: this device’s storage is full. Remove a photo and try again.';return el.rerender()}
   checkMilestones(true);const lvB=levelOf(before.pts).cur.n,lvA=levelOf(score().total).cur;const fresh=newMedals(mBefore).concat(lvA.n>lvB?[{level:true,lv:lvA,t:'Level '+lvA.n+', '+lvA.name}]:[]);closeSheet();if(first)reveal(b,v,before,fresh);else{render(true);toast('Visit added to '+b.name);if(fresh.length)celebrate(fresh)}return}
  el.rerender()})}
function shrink(file){return new Promise((res,rej)=>{const url=URL.createObjectURL(file),img=new Image();img.onload=()=>{try{const k=Math.min(1,720/Math.max(img.width,img.height)),c=document.createElement('canvas');c.width=Math.round(img.width*k);c.height=Math.round(img.height*k);c.getContext('2d').drawImage(img,0,0,c.width,c.height);URL.revokeObjectURL(url);res(c.toDataURL('image/jpeg',.72))}catch(e){rej(e)}};img.onerror=()=>{URL.revokeObjectURL(url);rej()};img.src=url})}
const styleCount=s=>{const vis=Data.visitedSet();return B.filter(b=>b.style===s&&vis.has(b.n)).length};
const styleTotal=s=>STYLES.find(x=>x.name===s).count;

/* ---------- Card reveal + milestones ---------- */
function reveal(b,v,before,fresh){render(true);const total=Data.visitedSet().size,sc=styleCount(b.style);
 const el=overlay('full',`<div class="rings">${[560,420,300].map(s=>`<i style="width:${s}px;height:${s}px"></i>`).join('')}</div><div class="rv" role="dialog" aria-modal="true" aria-label="Collected ${esc(b.name)}"><div class="row"><span class="grow"></span><button class="round" data-r="done" aria-label="Close">${I('close')}</button></div>
 <div style="text-align:center;margin-top:4px"><div class="eyebrow" style="font-size:12px;letter-spacing:.14em">Collected</div><div class="muted" style="font-size:13px;margin-top:6px">Entry No. ${no4(b.n)} is in your logbook</div><div class="gain">+${num(score().total-before.pts)} points</div></div>
 <div class="cardwrap">${card(b,v,true)}</div><div style="margin-top:20px">${progress('London',total,B.length,false,before.total)}${progress(b.style+' collection',sc,styleTotal(b.style),true,before.style)}</div>
 <div class="acts"><button class="btn line" data-r="share">Share card</button><button class="btn dark" data-r="done">Done</button></div></div>`);
 $$('.ink *',el).forEach(e=>e.setAttribute('pathLength','1'));
 requestAnimationFrame(()=>requestAnimationFrame(()=>{$('.card',el).classList.remove('pre');setTimeout(()=>$$('.bar i',el).forEach(i=>{i.style.width=i.dataset.w+'%';i.classList.remove('zero')}),1150);setTimeout(haptic,1100)}));
 el.addEventListener('click',e=>{const t=e.target.closest('[data-r]');if(!t)return;if(t.dataset.r==='share')shareText(`I collected No. ${no4(b.n)} ${b.name} (${b.style}) in my architecture logbook: ${total} of ${B.length} London buildings.`,'Card text copied');else{el.remove();if(fresh.length)celebrate(fresh)}});
 $('[data-r="done"].btn',el).focus()}
function celebrate(list){if(!Data.s.settings.celebrate){toast((list[0].medal?'Medal won: ':list[0].level?'Level up: ':'Milestone reached: ')+list.map(m=>m.t).join(', '));return}const m=list[0],rest=list.slice(1);
 if(m.medal){const lab=m.c.by==='style'?'buildings':m.c.by==='era'?'buildings from this era':'buildings in '+m.c.name;const el=overlay('full',`<div class="rv" role="dialog" aria-modal="true" aria-label="${esc(m.t)} medal won" style="text-align:center;justify-content:center"><div class="eyebrow" style="font-size:12px;letter-spacing:.14em">Medal won</div><div class="bigmedal">${medalSVG(m.tier)}</div><h1 style="margin:0">${esc(m.c.name)}</h1><p class="serif" style="font-size:22px;margin:4px 0 0">${MEDAL[m.tier].name}</p><p class="muted" style="line-height:1.5;margin:10px 0 0">${m.n} of ${m.tt} ${m.c.by==='style'?esc(m.c.name)+' buildings':esc(lab)} collected.${m.tier<3?' Next: '+esc(tier(m.n,m.tt).next)+'.':''}</p><div class="acts" style="margin-top:36px"><button class="btn line" data-r="view">See collection</button><button class="btn dark" data-r="ok">Continue</button></div></div>`);
  el.addEventListener('click',e=>{const t=e.target.closest('[data-r]');if(!t)return;el.remove();if(t.dataset.r==='view')go('c-'+m.c.id);else if(rest.length)celebrate(rest)});$('.btn.dark',el).focus();return}
 if(m.level){const nx=LEVELS[m.lv.n]||null,el=overlay('full',`<div class="rv" role="dialog" aria-modal="true" aria-label="Level up: ${esc(m.t)}" style="text-align:center;justify-content:center"><div class="eyebrow" style="font-size:12px;letter-spacing:.14em">Level up</div><div style="margin:24px auto 20px">${ring(1,`<b style="font-size:54px">${m.lv.n}</b>`,148)}</div><h1 style="margin:0">${esc(m.lv.name)}</h1><p class="muted" style="line-height:1.5;margin:10px 0 0">${esc(m.lv.d)}</p><p class="muted" style="line-height:1.5;margin:10px 0 0;font-size:13.5px">${nx?`Next: ${esc(nx.name)} at ${num(nx.at)} points.`:'This is the top level.'}</p><div class="acts" style="margin-top:36px"><button class="btn line" data-r="view">See all levels</button><button class="btn dark" data-r="ok">Continue</button></div></div>`);
  el.addEventListener('click',e=>{const t=e.target.closest('[data-r]');if(!t)return;el.remove();if(t.dataset.r==='view'){go('profile');openLevels()}else if(rest.length)celebrate(rest)});$('.btn.dark',el).focus();return}
 const el=overlay('full',`<div class="rv" role="dialog" aria-modal="true" aria-label="Milestone reached" style="text-align:center;justify-content:center"><div class="eyebrow" style="font-size:12px;letter-spacing:.14em">Milestone</div>
 <div style="width:132px;height:132px;border-radius:50%;border:2px solid var(--brick);margin:22px auto;display:flex;align-items:center;justify-content:center;background:var(--card);box-shadow:inset 0 0 0 6px var(--card),inset 0 0 0 7px var(--brick)"><span class="serif" style="font-size:44px;color:var(--brick)">${m.n}</span></div>
 <h1 style="margin:0">${esc(m.t)}</h1><p class="muted" style="line-height:1.5;margin:10px 0 0">${esc(m.d)}. Done.</p><div class="acts" style="margin-top:36px"><button class="btn dark" data-r="ok">Continue</button></div><p class="muted" style="font-size:12.5px;margin:16px 0 0">You can turn celebrations off in Profile.</p></div>`);
 el.addEventListener('click',e=>{if(e.target.closest('[data-r]')){el.remove();if(rest.length)celebrate(rest)}});$('.btn',el).focus()}

const SITE={'historicengland.org.uk':'Historic England','british-history.ac.uk':'British History Online','en.wikipedia.org':'Wikipedia','londongardenstrust.org':'London Gardens Trust','c20society.org.uk':'Twentieth Century Society','victorianweb.org':'The Victorian Web','layersoflondon.org':'Layers of London','english-heritage.org.uk':'English Heritage','nationaltrust.org.uk':'National Trust','hrp.org.uk':'Historic Royal Palaces','architecture.com':'RIBA','ribapix.com':'RIBApix','cityoflondon.gov.uk':'City of London','theguardian.com':'The Guardian','dezeen.com':'Dezeen','archdaily.com':'ArchDaily'};
function srcLabel(u){const m=u.match(/^https?:\/\/(?:www\.)?([^\/?#]+)([^?#]*)/);if(!m)return[u,''];const host=m[1];let site=SITE[host]||host;
 const segs=m[2].split('/').filter(Boolean);let last=segs.length?decodeURIComponent(segs[segs.length-1]):'';
 const le=m[2].match(/list-entry\/(\d+)/);if(le)return[site,'List entry '+le[1]];
 last=last.replace(/\.(html?|php|aspx?)$/i,'').replace(/\.pdf$/i,' (PDF)').replace(/[-_]+/g,' ').trim();
 if(/^\d+$/.test(last)&&segs.length>1)last=segs[segs.length-2].replace(/[-_]+/g,' ')+' '+last;
 if(last.length>48)last=last.slice(0,46)+'…';return[site,last?last.charAt(0).toUpperCase()+last.slice(1):'Home page']}
function srcList(src){const seen=new Set();return src.filter(s=>{const k=s.replace(/^https?:\/\/(www\.)?/,'').replace(/\/$/,'');if(seen.has(k))return false;seen.add(k);return true}).map(s=>{if(!/^https?:\/\//.test(s))return`<div>${esc(s)}</div>`;const[site,page]=srcLabel(s);return`<a href="${esc(s)}" target="_blank" rel="noopener"><b>${esc(site)} ↗</b>${page?`<span>${esc(page)}</span>`:''}</a>`}).join('')}

function haptic(){try{const H=window.Capacitor&&Capacitor.Plugins&&Capacitor.Plugins.Haptics;if(H)H.impact({style:'MEDIUM'});else if(navigator.vibrate)navigator.vibrate(12)}catch(e){}}
async function shareText(text,ok,url){if(NATIVE)url=null;const SP=window.Capacitor&&Capacitor.Plugins&&Capacitor.Plugins.Share;if(SP){try{await SP.share({text})}catch(e){}return}if(navigator.share){try{await navigator.share(url?{text,url}:{text});return}catch(e){if(e&&e.name==='AbortError')return}}try{await navigator.clipboard.writeText(text);toast(ok)}catch(e){const el=overlay('dlg',`<div role="dialog" aria-modal="true"><h3>Copy to share</h3><p style="color:var(--ink);user-select:all;-webkit-user-select:all">${esc(text)}</p><div class="row"><button class="btn dark" data-x>Close</button></div></div>`);el.addEventListener('click',e=>{if(e.target===el||e.target.closest('[data-x]'))el.remove()})}}

/* ---------- Saved ---------- */
const SV={boro:'',view:'list'};
function vSaved(){const vis=Data.visitedSet(),all=Object.entries(Data.s.saves).sort((a,b)=>b[1]-a[1]).map(([n])=>BY.get(+n)).filter(Boolean),boros=[...new Set(all.map(b=>b.boro))].sort();if(SV.boro&&!boros.includes(SV.boro))SV.boro='';
 const list=all.filter(b=>!SV.boro||b.boro===SV.boro),done=all.filter(b=>vis.has(b.n)).length;
 if(!all.length)return`<header class="top"><div class="eyebrow">Saved</div><h1>Want to visit</h1></header><div class="empty"><div class="serif">Nothing saved yet</div><p>Tap the bookmark on any building to keep it here for later.</p><button class="btn primary" data-go="explore">Explore buildings</button></div>`;
 return`<header class="top"><div class="eyebrow">Saved · ${all.length} ${all.length===1?'building':'buildings'}${done?' · '+done+' visited':''}</div><h1>Want to visit</h1>
 <div class="row" style="margin-top:14px"><div class="seg grow" role="group" aria-label="View"><button data-act="sview" data-v="list" aria-pressed="${SV.view==='list'}">${I('list')}List</button><button data-act="sview" data-v="map" aria-pressed="${SV.view==='map'}">${I('map')}Map</button></div></div>
 ${boros.length>1?`<select class="field" id="sboro" aria-label="Filter by borough" style="margin-top:12px"><option value="">All boroughs</option>${boros.map(b=>`<option ${SV.boro===b?'selected':''}>${esc(b)}</option>`).join('')}</select>`:''}</header>
 ${SV.view==='map'?`<div id="smap">${mapHTML()}</div>`:`<div class="list">${list.map(b=>item(b,vis,vis.has(b.n)?'Visited · '+fmtDate(Data.primary(b.n)):b.boro)).join('')}</div><div style="height:24px"></div>`}`}

/* ---------- Logbook ---------- */
const LB={style:'',year:'',sort:'recent',view:'grid',by:'style'};
const eraName=e=>e.replace(/\s*\(.*\)$/,'').replace('Wren & the Baroque','Wren & Baroque');
const ERA_ORDER=[...new Set(B.map(b=>b.era))].sort((x,y)=>{const yr=s=>{const m=s.match(/\((?:to )?(\d{4})/);return m?(/\(to /.test(s)?0:+m[1]):(parseInt(s)||9999)};return yr(x)-yr(y)});
const GROUPS={
 style:()=>STYLES.filter(s=>s.count>=4).map(s=>({id:s.id,name:s.name,list:B.filter(b=>b.style===s.name)})),
 era:()=>ERA_ORDER.map(k=>({id:'era-'+slug(eraName(k)),name:eraName(k),dates:(k.match(/\((.*)\)/)||[])[1]||'',list:B.filter(b=>b.era===k)})),
 area:()=>[...new Set(B.map(b=>b.boro))].map(k=>({id:'area-'+slug(k),name:k,list:B.filter(b=>b.boro===k)}))};
const BY_LABEL={style:'Style',era:'Era',area:'Area'};
function collections(by='style'){const vis=Data.visitedSet();return GROUPS[by]().map(c=>Object.assign(c,{by,got:c.list.filter(b=>vis.has(b.n)).length}))}
function collection(id){if(id==='london'){const vis=Data.visitedSet();return{id,name:'London',list:B,got:vis.size,city:true}}for(const by of ['style','era','area']){const c=collections(by).find(c=>c.id===id);if(c)return c}}
const MEDAL=[null,{name:'Bronze',a:'#E2AE7E',b:'#9A5B2E',t:'#6E3D1A'},{name:'Silver',a:'#F1F2F4',b:'#9EA4A9',t:'#555B61'},{name:'Gold',a:'#F6DC8A',b:'#C0912E',t:'#76560F'}];
let medalUid=0;
function medalSVG(t,ghost,label=true){const m=MEDAL[t],id='mg'+(++medalUid);return`<svg class="medal ${ghost?'ghost':''}" viewBox="0 0 40 40" aria-hidden="true">${ghost?'<circle cx="20" cy="20" r="18.6" fill="#F0EBE1" stroke="#B3A994" stroke-width="1.3" stroke-dasharray="3 2.4"/>':`<defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${m.a}"/><stop offset="1" stop-color="${m.b}"/></linearGradient></defs><circle cx="20" cy="20" r="19" fill="url(#${id})"/>`}<circle cx="20" cy="20" r="15.2" fill="none" stroke="${ghost?'#B3A994':'#fff'}" stroke-opacity="${ghost?.6:.5}" stroke-width=".9"/>${label?`<text x="20" y="25" text-anchor="middle" font-family="Fraunces,Georgia,serif" font-weight="600" font-size="${t===3?12.5:14}" fill="${ghost?'#B3A994':m.t}">${['','I','II','III'][t]}</text>`:''}</svg>`}
function tiers(tot){return tot<=3?[{t:3,n:tot}]:tot<=6?[{t:1,n:3},{t:3,n:tot}]:[{t:1,n:3},{t:2,n:Math.ceil(tot/2)},{t:3,n:tot}]}
function tierOf(got,tot){let cur=0;for(const x of tiers(tot))if(got>=x.n)cur=x.t;return cur}
function tier(got,tot){const cur=tierOf(got,tot),nx=tiers(tot).find(x=>got<x.n);return{t:cur,now:cur?MEDAL[cur].name:'',next:nx?`${MEDAL[nx.t].name} in ${nx.n-got}`:'',nextT:nx?nx.t:0,nextN:nx?nx.n:0}}
function medalMap(){const m={};for(const by of ['style','era','area'])for(const c of collections(by)){const t=tierOf(c.got,c.list.length);if(t)m[c.id]={t,c}}return m}
function newMedals(before){const now=medalMap(),out=[];for(const[id,x] of Object.entries(now))if(!before[id]||before[id].t<x.t)out.push({medal:true,t:x.t,c:x.c,id:'medal-'+id+'-'+x.t,n:x.c.got,tt:x.c.list.length});out.forEach(m=>m.t2=m.c.name+' '+MEDAL[m.t].name);return out.map(m=>Object.assign(m,{tier:m.t,t:m.t2}))}
function closestMedals(k=3){const out=[];for(const by of ['style','era','area'])for(const c of collections(by)){const tt=tier(c.got,c.list.length);if(!tt.nextT)continue;const nl=nearestLocked(c);out.push({c,by,t:tt.nextT,rem:tt.nextN-c.got,d:nl?nl.d:1e9})}out.sort((x,y)=>x.rem-y.rem||x.d-y.d);return out.slice(0,k)}
function nearestLocked(c){const vis=Data.visitedSet();let best=null,bd=1e12;for(const b of c.list){if(vis.has(b.n))continue;const d=dist(b);if(d<bd){bd=d;best=b}}return best?{b:best,d:bd}:null}
function ticks(got,tot){return`<span class="ticks ${tot>40?'dense':''}" aria-hidden="true">${Array.from({length:tot},(_,i)=>`<span class="${i<got?'on':''}"></span>`).join('')}${tiers(tot).map(x=>`<i class="coin" style="left:${(x.n-.5)/tot*100}%">${medalSVG(x.t,got<x.n,false)}</i>`).join('')}</span>`}
function collRow(c){const vis=Data.visitedSet(),tot=c.list.length,got=c.got,t=tier(got,tot),nl=nearestLocked(c);
 let thumbN;if(got){const vs=c.list.filter(b=>vis.has(b.n)).map(b=>({n:b.n,v:Data.primary(b.n)}));vs.sort((x,y)=>((y.v&&y.v.date)||'').localeCompare((x.v&&x.v.date)||'')||((y.v&&y.v.created)||0)-((x.v&&x.v.created)||0));thumbN=vs[0].n}else thumbN=(nl?nl.b:c.list[0]).n;
 const sub=!got?'Visit any 1 to unlock':[t.now,t.next].filter(Boolean).join(' · ')+(nl&&got<tot&&!Data.loc().pending?` · next ${fmtDist(nl.d)}`:'');
 return`<button class="crow ${got?'':'locked'} ${got===tot?'done':''}" data-go="c-${c.id}" aria-label="${esc(c.name)}, ${got} of ${tot} unlocked${t.now?', '+t.now+' medal':''}"><span class="cth ${got?'in':''}">${drawing(thumbN,got?'thin':'thin faint')}</span><span class="cm"><b>${esc(c.name)}</b><small>${c.dates&&!got?esc(c.dates)+' · ':''}${esc(sub)}</small></span><span class="cn">${t.t?medalSVG(t.t):''}<span>${got}<i>/${tot}</i></span></span>${ticks(got,tot)}</button>`}
function tallyCard(vis){const mm=Object.values(medalMap()),cnt=[0,0,0,0];mm.forEach(x=>cnt[x.t]++);const cl=closestMedals(1)[0];
 return`<button class="tally" data-go="c-london" aria-label="${vis.size} of ${B.length} unlocked in London, ${mm.length} medals. Open city page"><span class="row"><span class="grow"><b>${vis.size} of ${B.length} unlocked</b><small>${mm.length?mm.length+(mm.length===1?' medal':' medals')+' won':'No medals yet'}${cl?` · next: ${esc(cl.c.name)} ${MEDAL[cl.t].name}`:''}</small></span><span class="tl">${[1,2,3].map(t=>`<span class="${cnt[t]?'':'z'}">${medalSVG(t,!cnt[t])}<b>${cnt[t]}</b></span>`).join('')}</span></span><span class="bar"><i class="${vis.size?'':'zero'}" style="width:${vis.size/B.length*100}%"></i></span></button>`}
function vIndex(){const by=LB.by;let cols=collections(by);if(by!=='era')cols.sort((a,b)=>(b.got>0)-(a.got>0)||b.got/b.list.length-a.got/a.list.length||b.list.length-a.list.length||a.name.localeCompare(b.name));
 const started=cols.filter(c=>c.got).length;
 return`<div class="count"><span class="label" aria-live="polite">${started} of ${cols.length} ${by==='style'?'styles':by==='era'?'eras':'boroughs'} unlocked</span></div><div class="clist">${cols.map(collRow).join('')}</div><div style="height:24px"></div>`}
function vLogbook(){const vis=Data.visitedSet(),entries=[...vis].map(n=>({b:BY.get(n),v:Data.primary(n)})).filter(e=>e.b);
 const top=`<header class="top"><button class="pill city" data-act="city" aria-label="Change city, currently London">London${I('chevD')}</button><h1>Logbook</h1>${tallyCard(vis)}
 <div class="chips" role="tablist" aria-label="Group by">${[['style','Style'],['era','Era'],['area','Area'],['cards','My cards']].map(([k,l])=>`<button role="tab" data-act="lby" data-v="${k}" aria-selected="${LB.by===k}">${l}${k==='cards'?` <span>${entries.length}</span>`:''}</button>`).join('')}</div></header>`;
 if(LB.by!=='cards')return top+vIndex();
 if(!entries.length)return top+`<div class="empty"><div class="serif">No entries yet</div><p>Check in at a building, or log one you’ve already seen, and its card will be inked in here.</p><button class="btn primary" data-go="explore">Find a building</button></div>`;
 const years=[...new Set(entries.map(e=>(e.v.date||'').slice(0,4)).filter(Boolean))].sort().reverse(),styles=[...new Set(entries.map(e=>e.b.style))].sort();
 if(LB.style&&!styles.includes(LB.style))LB.style='';if(LB.year&&LB.year!=='none'&&!years.includes(LB.year))LB.year='';
 let list=entries.filter(e=>(!LB.style||e.b.style===LB.style)&&(!LB.year||(LB.year==='none'?!e.v.date:(e.v.date||'').startsWith(LB.year))));
 const k=e=>e.v.date||'';list.sort(LB.sort==='recent'?(a,b)=>k(b).localeCompare(k(a))||b.v.created-a.v.created:LB.sort==='oldest'?(a,b)=>(k(a)||'9').localeCompare(k(b)||'9'):LB.sort==='no'?(a,b)=>a.b.n-b.b.n:(a,b)=>a.b.name.localeCompare(b.b.name));

 return top+`<div class="pad" style="margin-top:14px"><div class="row"><div class="seg" role="group" aria-label="View" style="width:132px"><button data-act="lview" data-v="grid" aria-pressed="${LB.view==='grid'}" aria-label="Cards">${I('grid')}</button><button data-act="lview" data-v="list" aria-pressed="${LB.view==='list'}" aria-label="List">${I('list')}</button></div><span class="grow"></span><select class="sel" id="lsort" aria-label="Sort entries" style="max-width:none">${[['recent','Latest visit'],['oldest','Earliest visit'],['no','Catalogue no.'],['az','A to Z']].map(([v,l])=>`<option value="${v}" ${LB.sort===v?'selected':''}>${l}</option>`).join('')}</select></div>
 <div class="row" style="margin-top:10px"><select class="field grow" id="lstyle" aria-label="Filter by style"><option value="">All styles</option>${styles.map(s=>`<option ${LB.style===s?'selected':''}>${esc(s)}</option>`).join('')}</select><select class="field grow" id="lyear" aria-label="Filter by year visited"><option value="">Any year</option>${years.map(y=>`<option ${LB.year===y?'selected':''}>${y}</option>`).join('')}<option value="none" ${LB.year==='none'?'selected':''}>Undated</option></select></div></div>
 <div class="count"><span class="label" aria-live="polite">${list.length} of ${entries.length} ${entries.length===1?'entry':'entries'}</span></div>
 ${!list.length?`<div class="empty" style="padding-top:20px"><div class="serif">No entries match</div><p>Nothing in your logbook fits these filters.</p><button class="btn soft" data-act="lclear">Clear filters</button></div>`:LB.view==='grid'?`<div class="grid">${list.map(e=>mini(e.b,e.v)).join('')}</div>`:`<div class="list">${list.map(e=>item(e.b,vis,(e.v.verified?'Verified · ':'From memory · ')+fmtDate(e.v))).join('')}</div>`}<div style="height:24px"></div>`}
const CV={only:'all'};
function vCollection(c){const vis=Data.visitedSet(),list=c.list.filter(b=>CV.only==='all'||(CV.only==='got')===vis.has(b.n)).map(b=>({b,v:vis.has(b.n),d:dist(b)})).sort((x,y)=>y.v-x.v||x.d-y.d).map(x=>x.b);
 return`<header class="top"><div class="row"><button class="round" data-act="back" aria-label="Back">${I('back')}</button></div><div class="eyebrow" style="margin-top:16px;${c.city?'':'color:var(--blue)'}">${c.city?'City':BY_LABEL[c.by]+(c.dates?' · '+esc(c.dates):'')} · ${c.list.length} buildings</div><h1>${esc(c.name)}</h1>${c.city?progress('Collected',c.got,c.list.length):(()=>{const t=tier(c.got,c.list.length),nl=nearestLocked(c);return`<div class="prog"><div class="row"><b>${c.got?esc(t.now?t.now+' medal':'Collected'):'Locked'}</b><span class="num">${c.got} / ${c.list.length}</span></div>${ticks(c.got,c.list.length)}<div class="ladder">${tiers(c.list.length).map(x=>`<span class="${c.got>=x.n?'won':''}">${medalSVG(x.t,c.got<x.n)}<b>${MEDAL[x.t].name}</b><small>${c.got>=x.n?'Won':x.n+' buildings'}</small></span>`).join('')}</div><div class="tierline">${esc(c.got?t.next:'Visit any 1 to unlock')}${nl&&c.got<c.list.length?` · nearest: ${esc(nl.b.name)}${Data.loc().pending?'':', '+fmtDist(nl.d)}`:''}</div></div>`})()}
 <div class="seg" style="margin-top:16px" role="group" aria-label="Show">${[['all','All'],['got','Collected'],['todo','To find']].map(([k,l])=>`<button data-act="cview" data-v="${k}" aria-pressed="${CV.only===k}">${l}</button>`).join('')}</div></header>
 ${list.length?`<div class="grid">${list.map(b=>mini(b,vis.has(b.n)?Data.primary(b.n):null)).join('')}</div>`:`<div class="empty"><div class="serif">${CV.only==='got'?'None collected yet':'All collected'}</div><p>${CV.only==='got'?'Visit a building in this set and its slot will ink in.':'You’ve found every building in this set.'}</p></div>`}<div style="height:24px"></div>`}

/* ---------- Profile ---------- */

/* ---------- Levels & points ---------- */
const PTS={site:25,mem:10,inside:10,first:15};
const medalPts=(t,n,tot)=>t===1?30:t===2?10*n:20*tot;
const LEVELS=[
 {n:1,at:0,name:'Passer-by',d:'Everyone starts here, walking past.'},
 {n:2,at:50,name:'Looker-up',d:'You’ve started looking above the shopfronts.'},
 {n:3,at:200,name:'Flâneur',d:'French for someone who strolls a city just to observe it.'},
 {n:4,at:500,name:'Sketcher',d:'You notice the details other people miss.'},
 {n:5,at:1000,name:'Surveyor',d:'You’re measuring the city street by street.'},
 {n:6,at:2000,name:'Clerk of Works',d:'On a building site, the person who checks the work is done properly.'},
 {n:7,at:4000,name:'Master Builder',d:'You know how the city was put together.'},
 {n:8,at:8000,name:'City Architect',d:'Horace Jones was City Architect when he proposed Tower Bridge in 1884.'},
 {n:9,at:16000,name:'Surveyor of the Fabric',d:'The architect in charge of Westminster Abbey. Wren was appointed in 1698.'},
 {n:10,at:30000,name:'Freeman of the City',d:'After the Freedom of the City of London, believed to date from 1237.'}];
const num=n=>n.toLocaleString('en-GB');
function score(){const vs=Data.s.visits,set=Data.visitedSet(),ver=new Set(vs.filter(v=>v.verified).map(v=>v.b)),ins=new Set(vs.filter(v=>v.inside).map(v=>v.b));
 let site=0,mem=0,inside=0;const bs=[];set.forEach(n=>{const b=BY.get(n);if(!b)return;bs.push(b);ver.has(n)?site++:mem++;if(ins.has(n))inside++});
 const firsts=new Set(bs.map(b=>b.style)).size+new Set(bs.map(b=>b.era)).size+new Set(bs.map(b=>b.boro)).size;
 let medals=0,mc=0;for(const by of ['style','era','area'])for(const c of collections(by))for(const x of tiers(c.list.length))if(c.got>=x.n){medals+=medalPts(x.t,x.n,c.list.length);mc++}
 const rows=[['On-site check-ins',site+' × '+PTS.site,site*PTS.site],['Logged from memory',mem+' × '+PTS.mem,mem*PTS.mem],['Been inside',inside+' × '+PTS.inside,inside*PTS.inside],['New styles, eras and boroughs',firsts+' × '+PTS.first,firsts*PTS.first],['Medals',mc+(mc===1?' medal':' medals'),medals]];
 return{total:rows.reduce((s,r)=>s+r[2],0),rows,buildings:bs.length,styles:new Set(bs.map(b=>b.style)).size,eras:new Set(bs.map(b=>b.era)).size,boros:new Set(bs.map(b=>b.boro)).size}}
function levelOf(p){let i=0;LEVELS.forEach((l,k)=>{if(p>=l.at)i=k});const cur=LEVELS[i],next=LEVELS[i+1]||null;return{cur,next,pct:next?(p-cur.at)/(next.at-cur.at):1,toGo:next?next.at-p:0}}
function ring(pct,inner,size=104){const r=44,c=2*Math.PI*r,p=Math.max(0,Math.min(1,pct));return`<span class="ring" style="width:${size}px;height:${size}px"><svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="${r}" fill="none" stroke="var(--line)" stroke-width="8"/>${p>0?`<circle cx="50" cy="50" r="${r}" fill="none" stroke="var(--brick)" stroke-width="8" stroke-linecap="round" stroke-dasharray="${(c*p).toFixed(1)} ${c.toFixed(1)}" transform="rotate(-90 50 50)"/>`:''}</svg><span class="in">${inner}</span></span>`}
function openLevels(){const sc=score(),lv=levelOf(sc.total);openSheet('Levels',()=>`<div class="body"><div class="note-box" style="font-size:13.5px;line-height:1.5;margin-bottom:14px">You have <b>${num(sc.total)} points</b>. ${lv.next?`${num(lv.toGo)} more to reach Level ${lv.next.n}, ${esc(lv.next.name)}.`:'You’ve reached the top level.'}</div>
 <div class="lvlist">${LEVELS.map(l=>{const st=l.n<lv.cur.n?'done':l.n===lv.cur.n?'now':'todo';return`<div class="lv ${st}"><span class="ln" aria-hidden="true">${l.n}</span><span class="grow"><b>${esc(l.name)}${st==='now'?' <em>You are here</em>':''}</b><small>${esc(l.d)}</small></span><span class="lp">${l.at?num(l.at):'0'}<i> pts</i></span></div>`}).join('')}</div>
 <span class="label" style="display:block;margin:20px 0 8px">How you score</span>
 <div class="ptable">${[['Check in on site','within '+RADIUS+' m of the building',PTS.site],['Log from memory','somewhere you’ve already been',PTS.mem],['Been inside','added to either kind of visit','+'+PTS.inside],['First of a new style, era or borough','each one counts separately','+'+PTS.first],['Bronze medal','3 buildings in a set','+30'],['Silver medal','10 points for each building it took','+10 each'],['Gold medal','20 points for each building in the set','+20 each']].map(r=>`<div><span class="grow"><b>${r[0]}</b><small>${r[1]}</small></span><span class="lp">${r[2]}</span></div>`).join('')}</div>
 <p class="muted" style="font-size:12.5px;line-height:1.5;margin:14px 0 8px">Each building counts once, however many visits you log. Points are worked out from your logbook, so they go down if you delete a visit.</p></div>`,{cancel:'Close'})}
function yearChart(){const y=new Date().getFullYear(),cnt=Array(12).fill(0);let undated=0,total=0;
 Data.s.visits.forEach(v=>{if(!v.date||!v.date.startsWith(y+''))return;total++;if(v.precision==='year'){undated++;return}cnt[+v.date.slice(5,7)-1]++});
 if(!total)return`<div class="sec"><span class="label">This year</span><div class="note-box" style="font-size:13.5px">No visits logged in ${y} yet.</div></div>`;
 const max=Math.max(3,...cnt),H=64,sum=`${total} ${total===1?'visit':'visits'} logged in ${y}${undated?' ('+undated+' without a month)':''}`;
 return`<div class="sec"><span class="label">This year</span><div class="ychart"><div class="yread" id="yread" aria-live="polite" data-sum="${esc(sum)}">${esc(sum)}</div><div class="ybars" role="group" aria-label="Visits by month, ${y}">${cnt.map((c,i)=>`<button data-act="ybar" data-t="${MON[i]} ${y}: ${c} ${c===1?'visit':'visits'}" aria-label="${MON[i]} ${y}: ${c} ${c===1?'visit':'visits'}"><i style="height:${c?Math.max(6,c/max*H):0}px"></i><span>${MON[i][0]}</span></button>`).join('')}</div></div></div>`}
function medalCabinet(){const won=Object.values(medalMap()).sort((x,y)=>y.t-x.t||x.c.name.localeCompare(y.c.name)),cat={style:'Style',era:'Era',area:'Area'};if(!won.length)return'';
 const rows=[];for(let i=0;i<won.length;i+=4)rows.push(won.slice(i,i+4));
 return`<div class="sec"><span class="label">Medals won · ${won.length}</span><div class="cab">${rows.map(r=>`<div class="shelf">${r.map(x=>`<button class="mcell won" data-go="c-${x.c.id}" aria-label="${esc(x.c.name)} ${MEDAL[x.t].name}, won">${medalSVG(x.t)}<b>${esc(x.c.name)}</b><small>${cat[x.c.by]}</small></button>`).join('')}</div>`).join('')}</div></div>`}
function vProfile(){const s=Data.s.settings,loc=Data.loc(),sc=score(),lv=levelOf(sc.total),near=closestMedals(3),pl=(n,w)=>n+' '+w+(n===1?'':'s');
 return`<header class="top"><div class="eyebrow">Profile</div>
 <button class="lvl" data-act="levels" aria-label="Level ${lv.cur.n}, ${esc(lv.cur.name)}. ${num(sc.total)} points. ${lv.next?num(lv.toGo)+' points to Level '+lv.next.n+', '+esc(lv.next.name)+'.':''} See all levels">${ring(lv.pct,`<b>${num(sc.total)}</b><small>points</small>`)}<span class="grow"><span class="label" style="color:var(--brick)">Level ${lv.cur.n} of ${LEVELS.length}</span><h1>${esc(lv.cur.name)}</h1><small>${lv.next?`${num(lv.toGo)} points to Level ${lv.next.n}, ${esc(lv.next.name)}`:'Top level reached'}</small></span>${I('chevR')}</button>
 <p class="muted" style="font-size:13.5px;line-height:1.5;margin:14px 0 0">${sc.buildings?`${pl(sc.buildings,'building')} across ${pl(sc.styles,'style')}, ${pl(sc.eras,'era')} and ${pl(sc.boros,'borough')}.`:'Log your first building to start scoring.'}</p></header>
 ${near.length?`<div class="sec"><span class="label">Closest medals</span>${near.map(x=>{const tot=x.c.list.length,n=x.c.got+x.rem;return`<button class="setrow near" data-go="c-${x.c.id}" aria-label="${esc(x.c.name)} ${MEDAL[x.t].name}, ${x.rem} to go, worth ${medalPts(x.t,n,tot)} points">${medalSVG(x.t,true)}<span class="grow"><b>${esc(x.c.name)} ${MEDAL[x.t].name}</b><small>${x.rem} to go${x.d<1e8&&!Data.loc().pending?' · nearest '+fmtDist(x.d):''}</small></span><span class="lp">+${medalPts(x.t,n,tot)}</span></button>`}).join('')}</div>`:''}
 <div class="sec"><span class="label">Your points</span><div class="ptable">${sc.rows.map(r=>`<div><span class="grow"><b>${r[0]}</b><small>${r[1]}</small></span><span class="lp">${num(r[2])}</span></div>`).join('')}<div class="tot"><span class="grow"><b>Total</b></span><span class="lp">${num(sc.total)}</span></div></div><button class="btn soft wide" data-act="levels" style="margin-top:10px">How levels work</button></div>
 ${yearChart()}${medalCabinet()}
 <div class="sec"><span class="label">Settings</span>
 <div class="setrow"><span class="grow"><b id="celeb">Celebrations</b><small>Show a full-screen moment when you level up or win a medal.</small></span><button class="toggle" role="switch" aria-labelledby="celeb" aria-checked="${s.celebrate}" data-act="celebrate"></button></div>
 <div class="setrow"><span class="grow"><b>Distances</b><small>Shown on cards, lists and the map.</small></span><div class="seg" style="width:120px" role="group" aria-label="Distance units"><button data-act="units" data-v="km" aria-pressed="${s.units==='km'}">km</button><button data-act="units" data-v="mi" aria-pressed="${s.units==='mi'}">mi</button></div></div>
 <button class="setrow" data-act="loc"><span class="grow"><b>Location${loc.demo?' (demo)':''}</b><small>${esc(loc.label)}. Check-in unlocks within ${RADIUS} m of a building.</small></span>${I('chevR')}</button></div>
 <div class="sec"><span class="label">Your data</span><div class="note-box" style="margin-bottom:10px;font-size:13.5px;line-height:1.5">${Data.persist?'Your logbook is saved in this browser on this device only. There is no account and nothing syncs to other devices.':'This browser is blocking storage, so changes will be lost when you close the page.'}</div>
 ${NATIVE?'':`<button class="setrow" data-act="reset"><span class="grow"><b>Reset demo data</b><small>Restore the 12 sample visits and 7 saved buildings.</small></span>${I('chevR')}</button>`}
 <button class="setrow" data-act="wipe"><span class="grow"><b style="color:var(--brick)">Clear logbook</b><small>Start empty: removes every visit, photo and saved building.</small></span>${I('chevR')}</button></div>
 <div class="sec"><span class="label">About this build</span><p class="muted" style="font-size:13px">${B.length} London buildings with fact-checked text and verified pins. Drawings are stylised impressions. ${G.state==='ready'?'The map is Google Maps with a custom style':'The map is a schematic'}, and sharing copies text to your clipboard. ${NATIVE?'':'Demo entries are sample content, not real visits.'}</p></div><div style="height:16px"></div>`}
function gpsBanner(){const st=GPS.state,t=st==='asking'?['Finding you…','Waiting for your phone’s location.']:st==='denied'?['Location is turned off','Allow it for this app in Settings, then tap here to try again.']:st==='error'?['Couldn’t find you','Tap to try again. It works best outdoors.']:['Turn on location','See what’s near you and check in when you’re at a building.'];
 return`<div class="pad" style="padding-bottom:12px"><button class="here" data-act="gps"><span class="dot">${I('target')}</span><span class="grow"><b>${t[0]}</b><span>${t[1]}</span></span>${I('chevR')}</button></div>`}
function softRender(first){if(first){mapV=null;G.view=null}const ae=document.activeElement;if(sheetEl||$('.full')||$('.dlg')||(ae&&/^(INPUT|TEXTAREA|SELECT)$/.test(ae.tagName)))return;if(!first&&$('.mapwrap')){if(G.me&&GPS.fix)G.me.setPosition({lat:GPS.fix.lat,lng:GPS.fix.lng});return}render(true)}
function startGPS(){if(!navigator.geolocation){GPS.state='error';return softRender()}if(GPS.watch!=null)navigator.geolocation.clearWatch(GPS.watch);GPS.state=GPS.fix?'ok':'asking';if(!Data.s.settings.gpsAsked){Data.s.settings.gpsAsked=true;Data.save()}
 GPS.watch=navigator.geolocation.watchPosition(p=>{const f={lat:p.coords.latitude,lng:p.coords.longitude,label:'Your location',demo:false},first=!GPS.fix,R=6371000,r=Math.PI/180,moved=first||2*R*Math.asin(Math.sqrt(Math.sin((f.lat-GPS.fix.lat)*r/2)**2+Math.cos(f.lat*r)*Math.cos(GPS.fix.lat*r)*Math.sin((f.lng-GPS.fix.lng)*r/2)**2))>30;if(!moved)return;GPS.fix=f;GPS.state='ok';softRender(first)},
  e=>{GPS.state=e&&e.code===1?'denied':'error';if(!GPS.fix)softRender()},{enableHighAccuracy:true,maximumAge:10000,timeout:20000});softRender()}
function openLoc(){if(NATIVE){openSheet('Your location',()=>`<div class="body"><div class="note-box" style="font-size:13.5px;line-height:1.5;margin-bottom:14px">${GPS.fix?'Using your phone’s location.':GPS.state==='denied'?'Location is turned off for this app. Allow it in Settings, then try again.':'Location is off.'} Check-ins need you to be within ${RADIUS} m of a building.</div>${GPS.fix?'':`<button class="btn dark wide" data-act="gps">${I('target')}Turn on location</button>`}<p class="muted" style="font-size:12.5px;line-height:1.5;margin:14px 0 8px">Your location stays on this phone. It’s only used to show distances and to confirm check-ins.</p></div>`,{cancel:'Done'});return}
 let msg='';const presets=[[BARB,'Barbican, Silk Street'],[find("St Paul's Cathedral")],[find('National Theatre'),'South Bank, National Theatre'],[find('Coal Drops Yard'),"King's Cross, Coal Drops Yard"],[find('Old Royal Naval College'),'Greenwich, Old Royal Naval College'],[find('Palm House'),'Kew Gardens, Palm House']].filter(p=>p[0]);
 const el=openSheet('Your location',()=>{const loc=Data.loc();return`<div class="body"><div class="note-box" style="font-size:13.5px;line-height:1.5;margin-bottom:14px">Check-ins need you to be within ${RADIUS} m of a building. This preview usually can’t read your phone’s location, so pick a demo spot to test with.</div>
 <button class="btn soft wide" data-p="real">${I('target')}Try my real location</button>${msg?`<div class="err" role="alert">${esc(msg)}</div>`:''}
 <div class="flabel" style="margin-top:20px"><span class="label">Demo spots</span></div>${presets.map((p,i)=>{const l=p[1]||p[0].name,on=loc.demo&&loc.label===l;return`<button class="setrow" data-p="${i}" aria-pressed="${on}"><span class="grow"><b>${esc(l)}</b><small>About 40 m from No. ${no4(p[0].n)}</small></span>${on?`<span class="state-s">${I('check')}</span>`:''}</button>`}).join('')}</div>`},{cancel:'Done'});
 el.addEventListener('click',e=>{const t=e.target.closest('[data-p]');if(!t)return;
  if(t.dataset.p==='real'){if(!navigator.geolocation){msg='Location isn’t available in this browser. Keeping the demo spot.';return el.rerender()}t.disabled=true;t.textContent='Asking your phone…';
   try{navigator.geolocation.getCurrentPosition(p=>{setLoc({lat:p.coords.latitude,lng:p.coords.longitude,label:'Your location',demo:false});closeSheet();toast('Using your real location')},()=>{msg='Location was blocked or unavailable here. Keeping the demo spot.';if(sheetEl===el)el.rerender()},{timeout:8000,maximumAge:60000})}catch(x){msg='Location isn’t available in this preview. Keeping the demo spot.';el.rerender()}return}
  const p=presets[+t.dataset.p];setLoc(near(p[0],p[1]));closeSheet();toast('Demo location: '+(p[1]||p[0].name))})}
function openDirections(n){const b=BY.get(n);if(!b)return;const dest=b.lat+','+b.lng,g=m=>`https://www.google.com/maps/dir/?api=1&destination=${dest}&travelmode=${m}`,apple=/iPhone|iPad|iPod|Macintosh/.test(navigator.userAgent),loc=Data.loc();
 openSheet('Get directions',()=>`<div class="body"><div class="note-box" style="margin-bottom:14px"><b style="font-weight:600;display:block">${esc(b.name)}</b><span class="muted" style="font-size:13px">${esc(b.street)}, ${esc(b.boro)}${away(dist(b))?' · '+away(dist(b)):''}</span></div>
 ${[['walking','Walk'],['transit','Public transport'],['bicycling','Cycle'],['driving','Drive']].map(([m,l])=>`<a class="setrow" href="${g(m)}" target="_blank" rel="noopener"><span class="grow"><b>${l}</b><small>Opens Google Maps</small></span>${I('chevR')}</a>`).join('')}
 ${apple?`<a class="setrow" href="https://maps.apple.com/?daddr=${dest}&dirflg=w" target="_blank" rel="noopener"><span class="grow"><b>Apple Maps</b><small>Walking directions</small></span>${I('chevR')}</a>`:''}
 <p class="muted" style="font-size:12.5px;line-height:1.5;margin:6px 0 8px">Directions lead to the building’s checked map pin and start from your phone’s own location${loc.demo?', not the demo spot':''}.</p></div>`,{cancel:'Close'})}
function openCity(){openSheet('Choose a city',()=>`<div class="body"><button class="setrow" data-close aria-pressed="true"><span class="grow"><b>London</b><small>${B.length} buildings · ${Data.visitedSet().size} collected</small></span><span class="state-s">${I('check')}</span></button>
 <div class="soon" style="margin-top:6px"><b>More cities coming soon</b><span>London is the first city in the logbook. New cities will appear here as their buildings are researched, fact-checked and drawn.</span></div><div style="height:10px"></div></div>`,{cancel:'Done'})}
function setLoc(l){Data.s.settings.loc=l;Data.save();mapV=null;G.view=null;render(true)}

/* ---------- events ---------- */
function afterRender(r){if(r==='explore'){drawResults()}if(r==='saved'&&SV.view==='map'){const vis=Object.keys(Data.s.saves).map(n=>BY.get(+n)).filter(b=>b&&(!SV.boro||b.boro===SV.boro));initMap(vis)}}
let qT;
document.addEventListener('input',e=>{if(e.target.id==='q'){F.q=e.target.value;F.shown=30;$('[data-act="clearq"]').hidden=!F.q;clearTimeout(qT);qT=setTimeout(drawResults,120)}});
document.addEventListener('change',e=>{const t=e.target;if(t.id==='sort'){F.sort=t.value;F.shown=30;drawResults()}else if(t.id==='sboro'){SV.boro=t.value;render(true)}else if(t.id==='lsort'){LB.sort=t.value;render(true)}else if(t.id==='lstyle'){LB.style=t.value;render(true)}else if(t.id==='lyear'){LB.year=t.value;render(true)}});
document.addEventListener('click',async e=>{const g=e.target.closest('[data-go]');if(g){if(sheetEl)closeSheet();go(g.dataset.go);return}
 const t=e.target.closest('[data-act]');if(!t)return;const a=t.dataset.act,n=+t.dataset.n;
 if(a==='back')back();
 else if(a==='view'){F.view=t.dataset.v;render(true)}else if(a==='style'){const s=t.dataset.s;F.styles.has(s)?F.styles.delete(s):F.styles.add(s);F.shown=30;t.setAttribute('aria-pressed',F.styles.has(s));const fb=$('[data-act="filters"]');const fc=filterCount();fb.innerHTML=I('filter')+'Filters'+(fc?`<span class="badge">${fc}</span>`:'');drawResults()}
 else if(a==='filters')openFilters();else if(a==='clearq'){F.q='';F.shown=30;render();$('#q').focus()}else if(a==='clearall'){F.q='';F.styles.clear();F.eras.clear();F.boro='';F.status='all';F.shown=30;render()}
 else if(a==='more'){F.shown+=30;drawResults()}
 else if(a==='loc')openLoc();else if(a==='city')openCity();else if(a==='levels')openLevels();else if(a==='gps'){closeSheet();startGPS()}else if(a==='dir')openDirections(+t.dataset.n);else if(a==='ybar'){const r=$('#yread');if(r){const on=t.classList.contains('on');$$('.ybars button').forEach(b=>b.classList.remove('on'));if(on)r.textContent=r.dataset.sum;else{t.classList.add('on');r.textContent=t.dataset.t}}}
 else if(a==='save'){const on=Data.toggleSave(n);render(true);toast(on?'Saved to Want to visit':'Removed from Want to visit')}
 else if(a==='share'){const b=BY.get(n);shareText(`${b.name}, ${byline(b)}. ${b.sum}`,'Building details copied',location.href.split('#')[0]+'#b-'+b.n)}
 else if(a==='checkin'){if(inRange(BY.get(n)))openLog(n,'site');else{toast('You’re no longer within '+RADIUS+' m');render(true)}}
 else if(a==='past')openLog(n,'past');else if(a==='editvisit'){const v=Data.s.visits.find(x=>x.id===t.dataset.id);if(v)openLog(v.b,v.verified?'site':'past',v.id)}
 else if(a==='standhere'){setLoc(near(BY.get(n)));toast('Demo location moved here')}
 else if(a==='photo'){const v=Data.s.visits.find(x=>x.id===t.dataset.id);if(v){const el=overlay('lightbox',`<img src="${v.photos[+t.dataset.i]}" alt="Visit photo"><button class="round" aria-label="Close photo">${I('close')}</button>`);el.addEventListener('click',()=>el.remove());$('button',el).focus()}}
 else if(a==='sview'){SV.view=t.dataset.v;render(true)}else if(a==='lview'){LB.view=t.dataset.v;render(true)}else if(a==='lclear'){LB.style='';LB.year='';render(true)}else if(a==='cview'){CV.only=t.dataset.v;render(true)}else if(a==='lby'){LB.by=t.dataset.v;$('#view').scrollTop=0;render(true)}
 else if(a==='celebrate'){Data.s.settings.celebrate=!Data.s.settings.celebrate;Data.save();render(true)}else if(a==='units'){Data.s.settings.units=t.dataset.v;Data.save();render(true)}
 else if(a==='reset'){if(await confirmDlg('Reset demo data?','Your visits, photos and saved buildings will be replaced with the sample set.','Reset',true)){Data.reset(false);Data.s.settings.loc=null;Data.save();mapV=null;render();toast('Demo data restored')}}
 else if(a==='wipe'){if(await confirmDlg('Clear your logbook?','Every visit, photo and saved building will be removed. This can’t be undone.','Clear everything',true)){Data.reset(true);render();toast('Logbook cleared')}}
});
/* ---------- boot ---------- */
Data.load();
if(NATIVE){document.documentElement.classList.add('native');if(Data.s.settings.gpsAsked)setTimeout(startGPS,300)}
if(location.hash.length>1){const h=location.hash.slice(1);stack=TABS.some(t=>t[0]===h)?[h]:['explore',h]}
render();
