// Theme toggle functionality
(function() {
  'use strict';

  // Get theme from localStorage or system preference
  function getInitialTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    return 'light';
  }

  // Apply theme to document
  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    localStorage.setItem('theme', theme);
  }

  // Toggle between light and dark themes
  function toggleTheme() {
    const currentTheme = localStorage.getItem('theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    updateToggleButton(newTheme);
  }

  // Update toggle button text/icon
  function ensureToggleSpans(btn) {
    let icon = btn.querySelector('.theme-toggle-icon');
    let label = btn.querySelector('.theme-toggle-label');

    if (!icon) {
      icon = document.createElement('span');
      icon.className = 'theme-toggle-icon';
      btn.appendChild(icon);
    }

    if (!label) {
      label = document.createElement('span');
      label.className = 'theme-toggle-label';
      btn.appendChild(label);
    }

    return { icon, label };
  }

  function updateToggleButton(theme) {
    const toggleBtn = document.querySelector('.theme-toggle');
    if (!toggleBtn) return;

    const { icon, label } = ensureToggleSpans(toggleBtn);

    if (theme === 'dark') {
      icon.textContent = '日';
      label.textContent = '晨读';
    } else {
      icon.textContent = '☽';
      label.textContent = '夜读';
    }
  }

  // Initialize theme on page load
  function initTheme() {
    const theme = getInitialTheme();
    applyTheme(theme);
    updateToggleButton(theme);

    // Add event listener to toggle button
    const toggleBtn = document.querySelector('.theme-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', toggleTheme);
    }
  }

  // Run on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
  } else {
    initTheme();
  }

  // Listen for system theme changes
  if (window.matchMedia) {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    darkModeQuery.addEventListener('change', function(e) {
      if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        applyTheme(newTheme);
        updateToggleButton(newTheme);
      }
    });
  }
})();
