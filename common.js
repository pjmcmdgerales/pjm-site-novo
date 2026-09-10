(function(){
  const nav=document.querySelector('.nav'),toggle=document.querySelector('.menu-toggle');
  if(toggle&&nav){
    toggle.addEventListener('click',()=>{
      const open=nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded',String(open));
    });
    nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
  }

  const path=location.pathname.toLowerCase();
  const hash=location.hash.toLowerCase();
  let page='inicio';
  if(path.includes('projeto.html')) page='projeto';
  else if(path.includes('unidades.html')) page='unidades';
  else if(path.includes('formacao.html')) page='formacao';
  else if(path.includes('como-participar.html')) page='como';
  else if(path.includes('noticias.html')) page='noticias';
  else if(path.includes('galeria.html')) page='galeria';
  else if(path.includes('instituicoes.html')) page='instituicoes';
  else if(path.includes('contato.html')) page='contato';
  else if(path.includes('inscricao.html')) page='inscricao';
  else if(hash==='#contato') page='contato';

  document.querySelectorAll('.nav a').forEach(a=>{
    const dataPage=(a.dataset.page||'').toLowerCase();
    const href=(a.getAttribute('href')||'').toLowerCase();
    const hrefPage=href.split('/').pop().split('#')[0].replace('.html','');
    let target=dataPage;
    if(!target){
      if(hrefPage==='index'||hrefPage==='') target='inicio';
      else target=hrefPage;
    }
    a.classList.toggle('active',target===page);
  });
})();
