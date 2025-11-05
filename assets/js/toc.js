// Table of Contents (TOC) generator and interactions
(function() {
  'use strict';

  function $(sel, ctx=document) { return ctx.querySelector(sel); }
  function $all(sel, ctx=document) { return Array.from(ctx.querySelectorAll(sel)); }

  const articleBody = $('.article-body');
  const tocContent = document.getElementById('toc-content');
  const tocWrapper = document.querySelector('.toc-wrapper');
  const postContentEl = document.querySelector('.post-content');
  const tocToggle = document.querySelector('.toc-toggle');
  const tocIcon = document.querySelector('.toc-toggle-icon');

  if (!articleBody || !tocContent) return;

  const headings = $all('h1,h2,h3,h4,h5,h6', articleBody);
  if (headings.length === 0) {
    if (tocWrapper) tocWrapper.style.display = 'none';
    if (postContentEl) postContentEl.classList.add('toc-collapsed');
    return;
  }

  // Helper: ensure an element has an id (preserve existing ids)
  function ensureId(el, idx) {
    if (el.id) return el.id;
    const base = el.textContent.trim().toLowerCase().replace(/[^a-z0-9\u0000-\u007F]+/g,'-').replace(/^-+|-+$/g,'');
    const id = base || `heading-${idx}`;
    let unique = id;
    let i = 1;
    while (document.getElementById(unique)) { unique = `${id}-${i++}`; }
    el.id = unique;
    return unique;
  }

  // Build nested list using a stack
  function buildToc(items) {
    const root = document.createElement('ul');
    let stack = [{level: parseInt(items[0].tagName.substring(1)), el: root}];

    items.forEach((h, idx) => {
      const level = parseInt(h.tagName.substring(1));
      const id = ensureId(h, idx);

      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = `#${id}`;
      a.textContent = h.textContent;
      a.setAttribute('data-target', id);
      a.className = 'toc-link';
      li.appendChild(a);

      // find parent in stack
      if (level > stack[stack.length-1].level) {
        const ul = document.createElement('ul');
        stack[stack.length-1].el.appendChild(ul);
        stack.push({level, el: ul});
        stack[stack.length-1].el.appendChild(li);
      } else {
        while (stack.length && level < stack[stack.length-1].level) stack.pop();
        stack[stack.length-1].el.appendChild(li);
        if (level > stack[stack.length-1].level) {
          // push if deeper (edge-case)
          stack.push({level, el: li});
        }
      }
    });

    return root;
  }

  const toc = buildToc(headings);
  tocContent.innerHTML = '';
  tocContent.appendChild(toc);

  // Smooth scroll for TOC links
  $all('.toc-link', tocContent).forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const id = link.getAttribute('data-target');
      const target = document.getElementById(id);
      if (target) target.scrollIntoView({behavior:'smooth', block:'start'});
      // update hash without jump
      history.replaceState && history.replaceState(null, '', `#${id}`);
    });
  });

  // Collapse/expand behavior with persisted state
  const saved = localStorage.getItem('toc-collapsed') === 'true';
  if (tocToggle) {
    tocToggle.setAttribute('aria-expanded', saved ? 'false' : 'true');
    tocToggle.title = saved ? '展开目录' : '折叠目录';
    if (saved) {
      tocContent.classList.add('collapsed');
      if (postContentEl) postContentEl.classList.add('toc-collapsed');
      tocIcon && (tocIcon.textContent = '▶');
      if (headings.length > 0) createRestoreButton();
    }

    tocToggle.addEventListener('click', () => {
      const isCollapsed = tocContent.classList.toggle('collapsed');
      if (isCollapsed) {
        postContentEl && postContentEl.classList.add('toc-collapsed');
        tocIcon && (tocIcon.textContent = '▶');
        tocToggle.setAttribute('aria-expanded', 'false');
        tocToggle.title = '展开目录';
        localStorage.setItem('toc-collapsed', 'true');
        if (headings.length > 0) createRestoreButton();
      } else {
        postContentEl && postContentEl.classList.remove('toc-collapsed');
        tocIcon && (tocIcon.textContent = '▼');
        tocToggle.setAttribute('aria-expanded', 'true');
        tocToggle.title = '折叠目录';
        localStorage.setItem('toc-collapsed', 'false');
        removeRestoreButton();
      }
    });
  }

  // Restore button when TOC is collapsed
  function createRestoreButton() {
    if (document.getElementById('toc-restore-btn')) return;
    const btn = document.createElement('button');
    btn.id = 'toc-restore-btn';
    btn.className = 'toc-restore-btn';
    btn.title = '显示目录';
    btn.setAttribute('aria-label', 'Show table of contents');
    btn.textContent = '📑';
    btn.addEventListener('click', () => {
      tocContent.classList.remove('collapsed');
      postContentEl && postContentEl.classList.remove('toc-collapsed');
      tocIcon && (tocIcon.textContent = '▼');
      tocToggle && tocToggle.setAttribute('aria-expanded', 'true');
      tocToggle && (tocToggle.title = '折叠目录');
      localStorage.setItem('toc-collapsed', 'false');
      removeRestoreButton();
    });
    document.body.appendChild(btn);
  }
  function removeRestoreButton() { const b = document.getElementById('toc-restore-btn'); if (b) b.remove(); }

  // Highlight current section in TOC using IntersectionObserver
  (function highlightOnScroll() {
    const links = $all('.toc-link', tocContent);
    if (!('IntersectionObserver' in window) || links.length === 0) return;
    const idToLink = {};
    links.forEach(l => idToLink[l.getAttribute('data-target')] = l);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(ent => {
        const id = ent.target.id;
        const link = idToLink[id];
        if (!link) return;
        if (ent.isIntersecting) {
          links.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }
      });
    }, { rootMargin: '0px 0px -60% 0px', threshold: 0 });

    headings.forEach(h => observer.observe(h));
  })();

})();

/* End of toc.js */
