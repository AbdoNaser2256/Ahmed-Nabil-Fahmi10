(function() {
  'use strict';
  
  console.log('🔄 Header loader script started');
  
  // Function to load and inject the header
  function loadHeader() {
    console.log('🔄 Fetching header from /global_header.html');
    
    fetch('/global_header.html')
      .then(response => {
        console.log('📡 Fetch response:', response.status, response.statusText);
        if (!response.ok) {
          throw new Error('Failed to load header: ' + response.status);
        }
        return response.text();
      })
      .then(html => {
        console.log('📄 Header HTML received, length:', html.length);
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
          container.innerHTML = '<div style="padding: 1rem; background: #fee; color: #c00; position: fixed; top: 0; width: 100%; z-index: 9999;">Header failed to load: ' + error.message + '</div>';
        }
      });
  }
  
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    console.log('⏳ Waiting for DOM...');
    document.addEventListener('DOMContentLoaded', loadHeader);
  } else {
    console.log('✅ DOM already ready');
    loadHeader();
  }
})();
