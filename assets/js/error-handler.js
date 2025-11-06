// Global error handler and safeAction helper
(function(){
  'use strict';

  // Small toast UI for user-visible error messages
  function ensureToast() {
    let toast = document.getElementById('site-error-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'site-error-toast';
      toast.style.cssText = 'position:fixed;right:20px;bottom:20px;z-index:9999;max-width:360px;font-family:var(--font-sans, system-ui);';
      document.body.appendChild(toast);
    }
    return toast;
  }

  function showToast(message, opts){
    if (!document.body) return console.warn('DOM not ready for toast');
    const toast = ensureToast();
    const el = document.createElement('div');
    el.className = 'site-error-item';
    el.style.cssText = 'background:rgba(0,0,0,0.8);color:#fff;padding:10px 12px;margin-top:8px;border-radius:6px;box-shadow:0 6px 20px rgba(0,0,0,0.12);font-size:13px;line-height:1.3;';
    el.textContent = message;
    toast.appendChild(el);
    setTimeout(() => { el.style.opacity = '0'; el.style.transform = 'translateY(6px)'; }, opts && opts.timeout || 6000);
    setTimeout(() => { try{ toast.removeChild(el);}catch(e){} }, (opts && opts.timeout || 6000) + 350);
  }

  function reportError(err, context){
    try{
      const msg = (err && err.message) ? `${err.message}` : String(err || '未知错误');
      console.error('[SiteError]', err, context || '');
      showToast(msg, { timeout: 8000 });
    }catch(e){ console.error('Failed to report error', e); }
  }

  // safeAction: wraps sync or async functions and reports any thrown/rejected errors
  function safeAction(fn){
    if (typeof fn !== 'function') return fn;
    return function safeWrapped(){
      try{
        const res = fn.apply(this, arguments);
        if (res && typeof res.then === 'function'){
          res.catch(function(err){ reportError(err, { from: fn.name || 'anonymous-async' }); });
        }
        return res;
      }catch(err){
        reportError(err, { from: fn.name || 'anonymous' });
        // swallow to keep UI responsive; still return undefined
      }
    };
  }

  // Install global handlers
  window.addEventListener('error', function(ev){
    // ev.error may be undefined for some runtime errors; compose message
    const err = ev.error || (ev.message ? new Error(ev.message) : new Error('Unknown runtime error'));
    reportError(err, { type: 'window.error', filename: ev.filename, lineno: ev.lineno, colno: ev.colno });
  });

  window.addEventListener('unhandledrejection', function(ev){
    const reason = ev.reason || 'Unhandled promise rejection';
    reportError(reason, { type: 'unhandledrejection' });
  });

  // Expose helpers globally for simple integration
  window.safeAction = safeAction;
  window.reportSiteError = reportError;
})();
