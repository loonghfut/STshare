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
  function updateToggleButton(theme) {
    const toggleBtn = document.querySelector('.theme-toggle');
    if (toggleBtn) {
      if (theme === 'dark') {
        toggleBtn.innerHTML = '<span>☀️</span><span>浅色模式</span>';
      } else {
        toggleBtn.innerHTML = '<span>🌙</span><span>深色模式</span>';
      }
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
