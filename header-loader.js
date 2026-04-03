(function() {
  'use strict';
  
  // Function to load and inject the header
  function loadHeader() {
    fetch('/global_header.html')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load header: ' + response.status);
        }
        return response.text();
      })
      .then(html => {
        const container = document.getElementById('header-container');
        if (container) {
          container.innerHTML = html;
          console.log('✅ Header loaded successfully');
        } else {
          console.error('❌ Header container not found');
        }
      })
      .catch(error => {
        console.error('❌ Error loading header:', error);
        // Fallback: show a basic message
        const container = document.getElementById('header-container');
        if (container) {
          container.innerHTML = '<div style="padding: 1rem; background: #fee; color: #c00;">Header failed to load. Please refresh the page.</div>';
        }
      });
  }
  
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadHeader);
  } else {
    loadHeader();
  }
})();
