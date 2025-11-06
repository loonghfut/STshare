// Article outline generator: scans h2–h4 and builds a nested outline with smooth scroll and active highlighting
(function(){
  'use strict';

  function $(sel, ctx=document){return ctx.querySelector(sel);} 
  function $all(sel, ctx=document){return Array.from(ctx.querySelectorAll(sel));}

  const body = document.body;
  const panel = $('.outline-panel');
  const container = $('#outline-content');
  const article = $('.article-body');
  const toggleBtn = $('.outline-toggle');

  if(!panel || !container || !article){ return; }

  // Collect headings h2–h4 only for a concise outline
  const headings = $all('h2,h3,h4', article).filter(h => h.textContent.trim().length > 0);
  if(headings.length === 0){ panel.style.display = 'none'; return; }

  // Ensure IDs
  function slugify(text){
    return text.trim()
      .toLowerCase()
      .replace(/[^a-z0-9\u4e00-\u9fa5\s-]/g,'')
      .replace(/[\s]+/g,'-')
      .replace(/-+/g,'-')
      .replace(/^-|-$/g,'');
  }
  function ensureId(el, idx){
    if(el.id) return el.id;
    const base = slugify(el.textContent) || `section-${idx+1}`;
    let id = base, i=1;
    while(document.getElementById(id)){ id = `${base}-${i++}`; }
    el.id = id;
    return id;
  }

  // Build nested list using a level stack
  function buildOutline(items){
    const root = document.createElement('ul');
    let getLevel = h => parseInt(h.tagName.substring(1), 10); // 2..4
    let stack = [{ level: getLevel(items[0]), el: root }];

    items.forEach((h, idx) => {
      const level = getLevel(h);
      const id = ensureId(h, idx);
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = `#${id}`;
      a.textContent = h.textContent.trim();
      a.dataset.target = id;
      li.appendChild(a);

      const top = stack[stack.length-1];
      if(level > top.level){
        const ul = document.createElement('ul');
        top.el.appendChild(ul);
        stack.push({level, el: ul});
        stack[stack.length-1].el.appendChild(li);
      }else{
        while(stack.length && level < stack[stack.length-1].level){ stack.pop(); }
        stack[stack.length-1].el.appendChild(li);
      }
    });

    return root;
  }

  // Render
  const outline = buildOutline(headings);
  container.innerHTML = '';
  container.appendChild(outline);

  // Scroll with offset for sticky header
  function getHeaderOffset(){
    const header = $('.site-header');
    return header ? (header.offsetHeight + 12) : 0;
  }
  function scrollToId(id){
    const target = document.getElementById(id);
    if(!target) return;
    const y = target.getBoundingClientRect().top + window.pageYOffset - getHeaderOffset();
    window.scrollTo({ top: y, behavior: 'smooth' });
    if(history.replaceState){ history.replaceState(null, '', `#${id}`); }
  }
  $all('a', container).forEach(a => {
    a.addEventListener('click', (window.safeAction && window.safeAction(function (e) {
      e.preventDefault();
      const id = a.dataset.target || a.getAttribute('href').slice(1);
      scrollToId(id);
    })) || function(e){ e.preventDefault(); const id = a.dataset.target || a.getAttribute('href').slice(1); scrollToId(id); });
  });

  // Active section highlighting
  const linkById = {};
  $all('a', container).forEach(a => { linkById[a.dataset.target] = a; });

  if('IntersectionObserver' in window){
    const observer = new IntersectionObserver((window.safeAction && window.safeAction(function (entries) {
      entries.forEach(ent => {
        const id = ent.target.id;
        const link = linkById[id];
        if(!link) return;
        if(ent.isIntersecting){
          // clear then set
          $all('.is-active', container).forEach(n => n.classList.remove('is-active'));
          link.classList.add('is-active');
          // expand parents if collapsed
          let p = link.parentElement;
          while(p && p !== container){
            if(p.tagName === 'UL'){ p.style.display = ''; }
            p = p.parentElement;
          }
        }
      });
    })) || function(entries){ entries.forEach(function(ent){ const id = ent.target.id; const link = linkById[id]; if(!link) return; if(ent.isIntersecting){ $all('.is-active', container).forEach(n => n.classList.remove('is-active')); link.classList.add('is-active'); let p = link.parentElement; while(p && p !== container){ if(p.tagName === 'UL'){ p.style.display = ''; } p = p.parentElement; } } }); } , { rootMargin: `-${Math.max(0, getHeaderOffset()-8)}px 0px -60% 0px`, threshold: 0 });

    headings.forEach(h => observer.observe(h));
  }

  // Collapse/expand panel
  function setCollapsed(collapsed){
    panel.classList.toggle('is-collapsed', !!collapsed);
    if(toggleBtn){
      toggleBtn.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
      toggleBtn.textContent = collapsed ? '展开' : '收起';
    }
    localStorage.setItem('outline-collapsed', collapsed ? '1' : '0');
  }

  const saved = localStorage.getItem('outline-collapsed');
  if(saved === '1'){ setCollapsed(true); }

  if(toggleBtn){
    toggleBtn.addEventListener('click', (window.safeAction && window.safeAction(function (){
      const willCollapse = !panel.classList.contains('is-collapsed');
      setCollapsed(willCollapse);
    })) || function(){ const willCollapse = !panel.classList.contains('is-collapsed'); setCollapsed(willCollapse); });
  }
})();
