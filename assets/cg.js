/* Biblioteca do Congresso 2027: membros, classificação por espectro (editável), hemiciclo, quóruns. */
const CGD=window.CG_DATA;
const sumA=a=>a.reduce((x,y)=>x+y,0);
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const fi=n=>Math.round(n).toLocaleString('pt-BR');
const fd=(n,d=1)=>n.toLocaleString('pt-BR',{minimumFractionDigits:d,maximumFractionDigits:d});
const fpc=(x,d=1)=>fd(x*100,d)+'%';
const fsg=n=>(n>0?'+':n<0?'−':'')+fi(Math.abs(n));
const UFN={AC:'Acre',AL:'Alagoas',AP:'Amapá',AM:'Amazonas',BA:'Bahia',CE:'Ceará',DF:'Distrito Federal',ES:'Espírito Santo',GO:'Goiás',MA:'Maranhão',MT:'Mato Grosso',MS:'Mato Grosso do Sul',MG:'Minas Gerais',PA:'Pará',PB:'Paraíba',PR:'Paraná',PE:'Pernambuco',PI:'Piauí',RJ:'Rio de Janeiro',RN:'Rio Grande do Norte',RS:'Rio Grande do Sul',RO:'Rondônia',RR:'Roraima',SC:'Santa Catarina',SP:'São Paulo',SE:'Sergipe',TO:'Tocantins'};
const PNAME={PL:'Partido Liberal',PT:'Partido dos Trabalhadores','UNIÃO':'União Brasil',PSD:'Partido Social Democrático',PP:'Progressistas',REPUBLICANOS:'Republicanos',MDB:'Movimento Democrático Brasileiro',PODE:'Podemos',PSB:'Partido Socialista Brasileiro',PSOL:'Partido Socialismo e Liberdade',PCDOB:'Partido Comunista do Brasil',PSDB:'Partido da Social Democracia Brasileira',NOVO:'Partido Novo',PV:'Partido Verde',PDT:'Partido Democrático Trabalhista',AVANTE:'Avante',PRD:'Partido Renovação Democrática',SOLIDARIEDADE:'Solidariedade',REDE:'Rede Sustentabilidade','MISSÃO':'Partido Missão','S/Partido':'Sem partido',AGIR:'Agir',CIDADANIA:'Cidadania',DC:'Democracia Cristã',DEMOCRATA:'Democrata',MOBILIZA:'Mobiliza'};
const pl=p=>p==='PCDOB'?'PCdoB':p==='UNIÃO'?'União':p==='MISSÃO'?'Missão':p==='SOLIDARIEDADE'?'Solidariedade':p==='REPUBLICANOS'?'Republicanos':p==='S/Partido'?'Sem partido':p==='AGIR'?'Agir':p==='CIDADANIA'?'Cidadania':p==='DEMOCRATA'?'Democrata':p==='MOBILIZA'?'Mobiliza':p;
/* Grupos: D direita, C centro, E esquerda, X sem classificação */
const GR=[{id:'D',n:'Direita',v:'--c2'},{id:'C',n:'Centro',v:'--c3'},{id:'E',n:'Esquerda',v:'--c1'},{id:'X',n:'Sem classificação',v:'--o'}];
const GN=Object.fromEntries(GR.map(g=>[g.id,g]));
/* Classificação padrão (por partido; é uma leitura de trabalho e pode ser alterada na página) */
const SPEC0={PL:'D',PP:'D','UNIÃO':'D',REPUBLICANOS:'D',NOVO:'D',PRD:'D','MISSÃO':'D',
 PSD:'C',MDB:'C',PODE:'C',PSDB:'C',AVANTE:'C',SOLIDARIEDADE:'C',
 PT:'E',PSB:'E',PSOL:'E',PCDOB:'E',PV:'E',PDT:'E',REDE:'E','S/Partido':'X',DC:'D',AGIR:'C',CIDADANIA:'C',DEMOCRATA:'C',MOBILIZA:'C'};
/* Posição ideológica aproximada (maior = mais à direita), usada só para ordenar dentro dos blocos e para o "partido da mediana" */
const RANK={PSOL:1,PT:2,PCDOB:3,PV:4,REDE:5,PSB:6,PDT:7,PSDB:8,SOLIDARIEDADE:9,AVANTE:10,MDB:11,PODE:12,PSD:13,PRD:14,'UNIÃO':15,PP:16,REPUBLICANOS:17,PL:18,'MISSÃO':19,NOVO:20,'S/Partido':12.5,CIDADANIA:8.5,AGIR:12.2,MOBILIZA:12.4,DEMOCRATA:14.5,DC:17.5};
let SPEC=Object.assign({},SPEC0);
(function(){try{const s=JSON.parse(localStorage.getItem('ap26.cg.spec')||'null');if(s&&typeof s==='object')for(const k in s)if(k in SPEC0&&'DCEX'.includes(s[k]))SPEC[k]=s[k]}catch(e){}})();
function saveSpec(){try{localStorage.setItem('ap26.cg.spec',JSON.stringify(SPEC))}catch(e){}}
function resetSpec(){SPEC=Object.assign({},SPEC0);try{localStorage.removeItem('ap26.cg.spec')}catch(e){}}
const gOf=p=>SPEC[p]||'X';
/* Membros */
const DEP=CGD.dep.map(([n,p,u,v])=>({n,p,u,v,h:'cam',o:'2026'}));
const SEN=CGD.sen26.map(([n,p,u,v])=>({n,p,u,v,h:'sen',o:'2026'})).concat(CGD.sen22.map(([u,n,p,t,s])=>({n,p,u,v:null,h:'sen',o:'2022',tit:t==='T',sup:s})));
const HOUSE={cam:{n:'Câmara dos Deputados',tot:513,m:DEP},sen:{n:'Senado Federal',tot:81,m:SEN}};
const PARTIES=[...new Set(DEP.concat(SEN).map(m=>m.p))];
function seatsBy(h,key){const o={};HOUSE[h].m.forEach(m=>{const k=key(m);o[k]=(o[k]||0)+1});return o}
const seatsParty=h=>seatsBy(h,m=>m.p);
function seatsGroup(h){const o={D:0,C:0,E:0,X:0};HOUSE[h].m.forEach(m=>o[gOf(m.p)]++);return o}
/* Quóruns (nº de votos) */
const maj=n=>Math.floor(n/2)+1, frac=(n,a,b)=>Math.ceil(n*a/b-1e-9);
function quorums(h){const n=HOUSE[h].tot;return{tot:n,um3:frac(n,1,3),abs:maj(n),tres5:frac(n,3,5),dois3:frac(n,2,3),simplesMin:maj(maj(n))}}
/* Hemiciclo: devolve posições dos assentos ordenadas da esquerda para a direita */
function seatLayout(N,rows,W,H,r0f){const cx=W/2,cy=H-13,R1=Math.min(W/2-12,H-24),R0=R1*r0f;const radii=[];for(let i=0;i<rows;i++)radii.push(R0+(R1-R0)*(rows===1?0:i/(rows-1)));
 const tot=sumA(radii);const cnt=radii.map(r=>Math.round(N*r/tot));let diff=N-sumA(cnt);for(let i=rows-1;diff!==0;i=(i-1+rows)%rows){cnt[i]+=Math.sign(diff);diff-=Math.sign(diff)}
 const seats=[];radii.forEach((r,i)=>{const c=cnt[i];for(let j=0;j<c;j++){const a=Math.PI*(1-(c===1?.5:j/(c-1)));seats.push({a,r,x:cx+r*Math.cos(a),y:cy-r*Math.sin(a)})}});
 seats.sort((p,q)=>q.a-p.a||p.r-q.r);const gap=(R1-R0)/Math.max(1,rows-1);return{seats,gap}}
/* Lista ordenada de membros (esquerda→direita no desenho: direita, centro, esquerda), partidos mais à direita primeiro */
function orderedMembers(h){const gi=g=>GR.findIndex(x=>x.id===g);return HOUSE[h].m.slice().sort((a,b)=>gi(gOf(a.p))-gi(gOf(b.p))||(RANK[b.p]||0)-(RANK[a.p]||0)||(b.v||0)-(a.v||0)||a.n.localeCompare(b.n))}
const shade=(g,i,k)=>{const base=`var(${GN[g].v})`;if(k<=1)return base;const o=[];for(let a=0,b=k-1;a<=b;a++,b--){o.push(a);if(a!==b)o.push(b)}const f=o[i]/(k-1),t=-22+f*66;return t<0?`color-mix(in srgb,${base} ${100+t}%,#000)`:`color-mix(in srgb,${base} ${100-t}%,#fff)`};
function partyShades(h){const out={};const ALLM=HOUSE.cam.m.concat(HOUSE.sen.m);GR.forEach(g=>{const ps=[...new Set(ALLM.filter(m=>gOf(m.p)===g.id).map(m=>m.p))].sort((a,b)=>(RANK[b]||0)-(RANK[a]||0));ps.forEach((p,i)=>out[p]=shade(g.id,i,ps.length))});return out}
function hemicycle(h,mode,o){o=Object.assign({W:620,H:330,rows:h==='cam'?9:5,rr:h==='cam'?3.9:7.2,hi22:false},o);const mem=orderedMembers(h),N=mem.length;const L=seatLayout(N,o.rows,o.W,o.H,h==='cam'?.38:.34);const sh=partyShades(h);
 let s=`<svg viewBox="0 0 ${o.W} ${o.H}" role="img" aria-label="${esc(HOUSE[h].n)}: ${N} cadeiras por espectro">`;
 L.seats.forEach((p,i)=>{const m=mem[i],g=gOf(m.p);const fill=mode==='party'?sh[m.p]:`var(${GN[g].v})`;const dim=o.hi22&&m.o!=='2022';
  const tip=`<b>${esc(m.n)}</b><br>${esc(pl(m.p))} · ${m.u}${m.v?' · '+fi(m.v)+' votos':''}<br>${GN[g].n}${h==='sen'?' · mandato '+(m.o==='2022'?'até 2031 (eleito em 2022)':'2027–2035 (eleito em 2026)'):''}`;
  s+=`<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${(h==='cam'?o.rr:o.rr).toFixed(1)}" fill="${fill}" ${dim?'fill-opacity=".28"':''} data-tip="${esc(tip)}"/>`});
 return s+'</svg>'}
/* tooltip */
(function(){const t=document.createElement('div');t.className='tip';t.style.display='none';document.addEventListener('DOMContentLoaded',()=>document.body.appendChild(t));
 const show=(el,x,y)=>{t.innerHTML=el.getAttribute('data-tip');t.style.display='block';const w=t.offsetWidth,h=t.offsetHeight;let l=x+14,tp=y+14;if(l+w>innerWidth-8)l=x-w-14;if(tp+h>innerHeight-8)tp=y-h-14;t.style.left=Math.max(4,l)+'px';t.style.top=Math.max(4,tp)+'px'};
 document.addEventListener('mousemove',e=>{const el=e.target.closest&&e.target.closest('[data-tip]');if(!el){t.style.display='none';return}show(el,e.clientX,e.clientY)});
 document.addEventListener('touchstart',e=>{const el=e.target.closest&&e.target.closest('[data-tip]');if(!el){t.style.display='none';return}const r=el.getBoundingClientRect();show(el,r.left,r.top)},{passive:true})})();
/* Barra empilhada horizontal com marcadores de limiares */
function bloc(h,o){o=Object.assign({W:760,H:78,marks:true,gs:null},o);const q=quorums(h),n=q.tot,sg=o.gs||seatsGroup(h);const l=8,pw=o.W-16;let s=`<svg viewBox="0 0 ${o.W} ${o.H}" role="img" aria-label="Cadeiras por espectro e limiares">`;let c=0;
 [['D'],['C'],['E'],['X']].forEach(([g])=>{const v=sg[g]||0;if(!v)return;const w=v/n*pw;s+=`<rect x="${(l+c).toFixed(1)}" y="30" width="${w.toFixed(1)}" height="28" fill="var(${GN[g].v})" data-tip="${GN[g].n}: ${v} cadeiras (${fpc(v/n)})"/>`;if(w>34)s+=`<text x="${(l+c+w/2).toFixed(1)}" y="49" text-anchor="middle" class="bl2">${v}</text>`;c+=w});
 if(o.marks)[[q.um3,'1/3'],[q.abs,'maioria abs.'],[q.tres5,'3/5'],[q.dois3,'2/3']].forEach(([v,lab],i)=>{const x=l+v/n*pw;s+=`<line x1="${x.toFixed(1)}" x2="${x.toFixed(1)}" y1="24" y2="64" class="mk"/><text x="${x.toFixed(1)}" y="${i%2?76:18}" text-anchor="middle" class="mt">${lab} · ${v}</text>`});
 return s+'</svg>'}
