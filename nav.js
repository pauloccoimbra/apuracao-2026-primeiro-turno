/* Barra de navegação comum a todas as páginas do site. */
(function(){const P=[['index.html','Painel'],['evolucao.html','Evolução'],['atemporal.html','Atemporal'],['mapa.html','Mapa'],['perfil.html','Perfil do voto'],['participacao.html','Participação'],['segundo-turno.html','2º turno'],['governadores.html','Governadores'],['congresso.html','Congresso'],['maiorias.html','Maiorias'],['bancadas.html','Bancadas'],['assembleias.html','Assembleias']];
 const cur=(location.pathname.split('/').pop()||'index.html');
 const css=`#sitenav{background:var(--surface,#fff);border-bottom:1px solid var(--line,#d9dde4);font:500 13px/1.2 var(--sans,system-ui,sans-serif);position:relative;z-index:30}
#sitenav .in{max-width:1240px;margin:0 auto;padding:0 16px;display:flex;gap:2px;overflow-x:auto;scrollbar-width:thin;align-items:center}
#sitenav a{padding:9px 11px;color:var(--fg2,#4a5262);text-decoration:none;white-space:nowrap;border-bottom:2px solid transparent}
#sitenav a:hover{color:var(--fg,#161a22)}#sitenav a[aria-current=page]{color:var(--fg,#161a22);border-bottom-color:var(--accent,#0b5cad)}
#sitenav .sep{width:1px;height:16px;background:var(--line,#d9dde4);margin:0 6px;flex:none}`;
 const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
 const n=document.createElement('nav');n.id='sitenav';n.setAttribute('aria-label','Páginas do site');
 n.innerHTML='<div class="in">'+P.map((p,i)=>((i===4||i===8)?'<span class="sep"></span>':'')+`<a href="${p[0]}"${p[0]===cur?' aria-current="page"':''}>${p[1]}</a>`).join('')+'</div>';
 const go=()=>document.body.insertBefore(n,document.body.firstChild);document.body?go():document.addEventListener('DOMContentLoaded',go)})();
