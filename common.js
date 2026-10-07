/* Utilitários comuns às páginas de análise (dados embutidos em dados.js; sem rede). */
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const fi=n=>Math.round(n).toLocaleString('pt-BR');
const fs=n=>(n>0?'+':n<0?'−':'')+Math.abs(Math.round(n)).toLocaleString('pt-BR');
const fd=(n,d=1)=>n.toLocaleString('pt-BR',{minimumFractionDigits:d,maximumFractionDigits:d});
const fp=(x,d=1)=>fd(x*100,d)+'%';
const fpp=(x,d=1)=>(x>0?'+':x<0?'−':'')+fd(Math.abs(x)*100,d);
const fm=(n,d=2)=>fd(n/1e6,d)+' mi';
const R=window.D26, UFS=Object.keys(R.ufs).filter(u=>u!=='zz'), ALL=UFS.concat('zz');
const IL=R.cands.findIndex(c=>c[0]==='13'), IF=R.cands.findIndex(c=>c[0]==='22');
const OTH=R.cands.map((c,i)=>i).filter(i=>i!==IL&&i!==IF);
const sum=a=>a.reduce((x,y)=>x+y,0);
const U=u=>R.ufs[u], vv=u=>sum(U(u).v), up=u=>u.toUpperCase();
const pool=u=>vv(u)-U(u).v[IL]-U(u).v[IF];
const NAT=(()=>{const t={sec:0,vb:0,vn:0,comp:0,el:0,v:R.cands.map(()=>0)};for(const u of ALL){const o=U(u);t.sec+=o.sec;t.vb+=o.vb;t.vn+=o.vn;t.comp+=o.comp;t.el+=o.el;o.v.forEach((x,i)=>t.v[i]+=x)}t.vv=sum(t.v);t.pool=t.vv-t.v[IL]-t.v[IF];t.ab=t.el-t.comp;return t})();
function corr(a,b){const n=a.length,ma=sum(a)/n,mb=sum(b)/n;let sa=0,sb=0,sab=0;for(let i=0;i<n;i++){sa+=(a[i]-ma)**2;sb+=(b[i]-mb)**2;sab+=(a[i]-ma)*(b[i]-mb)}return sab/Math.sqrt(sa*sb)}
/* tooltip */
(function(){const t=document.createElement('div');t.className='tip';t.style.display='none';document.addEventListener('DOMContentLoaded',()=>document.body.appendChild(t));
document.addEventListener('mousemove',e=>{const el=e.target.closest&&e.target.closest('[data-tip]');if(!el){t.style.display='none';return}t.innerHTML=el.getAttribute('data-tip');t.style.display='block';const w=t.offsetWidth,h=t.offsetHeight;let x=e.clientX+14,y=e.clientY+14;if(x+w>innerWidth-8)x=e.clientX-w-14;if(y+h>innerHeight-8)y=e.clientY-h-14;t.style.left=Math.max(4,x)+'px';t.style.top=Math.max(4,y)+'px'});
document.addEventListener('touchstart',e=>{const el=e.target.closest&&e.target.closest('[data-tip]');if(!el){t.style.display='none';return}const r=el.getBoundingClientRect();t.innerHTML=el.getAttribute('data-tip');t.style.display='block';t.style.left=Math.min(innerWidth-t.offsetWidth-8,Math.max(4,r.left))+'px';t.style.top=(r.bottom+8)+'px'},{passive:true})})();
/* gráfico de barras verticais */
function barsV(rows,o){o=Object.assign({w:860,h:340,l:46,r:12,t:26,b:40,ymax:null,ref:null,reflab:'',fmt:v=>fd(v,1)+'%',grid:5},o);
 const {w,h,l,r,t,b}=o,pw=w-l-r,ph=h-t-b,n=rows.length,bw=pw/n;let ymax=o.ymax||Math.ceil(Math.max(...rows.map(x=>x.v))/o.grid)*o.grid;
 const y=v=>t+ph*(1-v/ymax);let s=`<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(o.aria||'')}">`;
 for(let g=0;g<=ymax+1e-9;g+=ymax/ (o.gridn||5)){s+=`<line x1="${l}" x2="${w-r}" y1="${y(g)}" y2="${y(g)}" class="gl"/><text x="${l-6}" y="${y(g)+4}" text-anchor="end" class="ax">${esc(o.fmt(g))}</text>`}
 rows.forEach((x,i)=>{const bx=l+i*bw+bw*.14;s+=`<rect x="${bx.toFixed(1)}" y="${y(x.v).toFixed(1)}" width="${(bw*.72).toFixed(1)}" height="${Math.max(0,t+ph-y(x.v)).toFixed(1)}" class="${x.c||'f1'}" data-tip="${esc(x.tip||x.k+': '+o.fmt(x.v))}"/>`;
  s+=`<text x="${(bx+bw*.36).toFixed(1)}" y="${h-b+14}" text-anchor="middle" class="ax">${esc(x.k)}</text>`;if(x.lab)s+=`<text x="${(bx+bw*.36).toFixed(1)}" y="${y(x.v)-5}" text-anchor="middle" class="lab">${esc(x.lab)}</text>`});
 if(o.ref!=null)s+=`<line x1="${l}" x2="${w-r}" y1="${y(o.ref)}" y2="${y(o.ref)}" class="ref"/><text x="${w-r}" y="${y(o.ref)-5}" text-anchor="end" class="axr">${esc(o.reflab)}</text>`;
 return s+'</svg>'}
/* barras horizontais divergentes: valor pode ser negativo */
function barsDiv(rows,o){o=Object.assign({w:860,rh:20,l:50,r:20,fmt:v=>fd(v,1)},o);const n=rows.length,h=n*o.rh+30,pw=o.w-o.l-o.r;const m=o.max||Math.max(...rows.map(x=>Math.abs(x.v)));const x0=o.l+pw/2,sc=(pw/2-62)/m;
 let s=`<svg viewBox="0 0 ${o.w} ${h}" role="img" aria-label="${esc(o.aria||'')}"><line x1="${x0}" x2="${x0}" y1="14" y2="${h-6}" class="gl2"/>`;
 rows.forEach((x,i)=>{const y=18+i*o.rh,bw=Math.abs(x.v)*sc;s+=`<text x="${o.l-8}" y="${y+o.rh*.62}" text-anchor="end" class="ax2">${esc(x.k)}</text><rect x="${x.v>=0?x0:x0-bw}" y="${y+2}" width="${bw}" height="${o.rh-5}" class="${x.v>=0?(o.cp||'f2'):(o.cn||'f1')}" data-tip="${esc(x.tip||x.k+': '+o.fmt(x.v))}"/><text x="${x.v>=0?x0+bw+5:x0-bw-5}" y="${y+o.rh*.62}" text-anchor="${x.v>=0?'start':'end'}" class="ax">${esc(o.fmt(x.v))}</text>`});return s+'</svg>'}
/* dispersão com bolhas */
function scatter(pts,o){o=Object.assign({w:760,h:440,l:52,r:16,t:16,b:44,xmin:0,xmax:100,ymin:0,ymax:100,xl:'',yl:'',diag:false,fx:v=>v+'%',fy:v=>v+'%',rmax:20},o);
 const pw=o.w-o.l-o.r,ph=o.h-o.t-o.b,X=v=>o.l+(v-o.xmin)/(o.xmax-o.xmin)*pw,Y=v=>o.t+ph*(1-(v-o.ymin)/(o.ymax-o.ymin));let s=`<svg viewBox="0 0 ${o.w} ${o.h}" role="img" aria-label="${esc(o.aria||'')}">`;
 const sx=o.sx||(o.xmax-o.xmin)/5,sy=o.sy||(o.ymax-o.ymin)/5;
 for(let g=o.xmin;g<=o.xmax+1e-9;g+=sx)s+=`<line x1="${X(g)}" x2="${X(g)}" y1="${o.t}" y2="${o.t+ph}" class="gl"/><text x="${X(g)}" y="${o.h-o.b+16}" text-anchor="middle" class="ax">${esc(o.fx(+g.toFixed(4)))}</text>`;
 for(let g=o.ymin;g<=o.ymax+1e-9;g+=sy)s+=`<line x1="${o.l}" x2="${o.l+pw}" y1="${Y(g)}" y2="${Y(g)}" class="gl"/><text x="${o.l-6}" y="${Y(g)+4}" text-anchor="end" class="ax">${esc(o.fy(+g.toFixed(4)))}</text>`;
 if(o.diag){const a=Math.max(o.xmin,o.ymin),b=Math.min(o.xmax,o.ymax);s+=`<line x1="${X(a)}" y1="${Y(a)}" x2="${X(b)}" y2="${Y(b)}" class="ref"/>`}
 if(o.fit){s+=`<line x1="${X(o.xmin)}" y1="${Y(o.fit[0]+o.fit[1]*o.xmin)}" x2="${X(o.xmax)}" y2="${Y(o.fit[0]+o.fit[1]*o.xmax)}" class="fit"/>`}
 const mx=Math.max(...pts.map(p=>p.z||1));
 pts.forEach(p=>{const rr=p.z?3+Math.sqrt(p.z/mx)*(o.rmax-3):5;s+=`<circle cx="${X(p.x).toFixed(1)}" cy="${Y(p.y).toFixed(1)}" r="${rr.toFixed(1)}" class="${p.c||'f1'} bub" data-tip="${esc(p.tip||'')}"/>`;if(p.k)s+=`<text x="${X(p.x).toFixed(1)}" y="${(Y(p.y)+3).toFixed(1)}" text-anchor="middle" class="bl">${esc(p.k)}</text>`});
 s+=`<text x="${o.l+pw/2}" y="${o.h-6}" text-anchor="middle" class="axt">${esc(o.xl)}</text><text transform="translate(12 ${o.t+ph/2}) rotate(-90)" text-anchor="middle" class="axt">${esc(o.yl)}</text>`;return s+'</svg>'}
/* barras empilhadas horizontais 100% */
function stack100(rows,keys,o){o=Object.assign({w:860,rh:18,l:40,r:10},o);const n=rows.length,h=n*o.rh+24,pw=o.w-o.l-o.r;let s=`<svg viewBox="0 0 ${o.w} ${h}" role="img" aria-label="${esc(o.aria||'')}">`;
 for(let g=0;g<=100;g+=25)s+=`<line x1="${o.l+pw*g/100}" x2="${o.l+pw*g/100}" y1="12" y2="${h-6}" class="gl"/><text x="${o.l+pw*g/100}" y="9" text-anchor="middle" class="ax">${g}%</text>`;
 rows.forEach((x,i)=>{const y=16+i*o.rh;s+=`<text x="${o.l-6}" y="${y+o.rh*.68}" text-anchor="end" class="ax2">${esc(x.k)}</text>`;let c=0;keys.forEach(k=>{const v=x.v[k.id]||0,wd=v*pw;if(wd>0){s+=`<rect x="${(o.l+c).toFixed(1)}" y="${y+1}" width="${wd.toFixed(1)}" height="${o.rh-3}" style="fill:${k.col}" data-tip="${esc(x.k+' · '+k.nm+': '+fp(v))}"/>`;c+=wd}})});return s+'</svg>'}
function pager(){} 
