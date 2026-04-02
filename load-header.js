// Load global header into all pages
(function() {
  // Create placeholder for header
  const headerPlaceholder = document.createElement('div');
  headerPlaceholder.id = 'global-header';
  document.body.insertBefore(headerPlaceholder, document.body.firstChild);
  
  // Fetch and inject header
  fetch('/global_header.html')
    .then(response => response.text())
    .then(html => {
      headerPlaceholder.innerHTML = html;
      
      // Initialize mobile menu after header loads
      const mobileMenuBtn = document.getElementById('mobile-menu-btn');
      const mobileMenu = document.getElementById('mobile-menu');
      
      if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
          mobileMenu.classList.toggle('hidden');
        });
      }
      
      // Show header once Tailwind is loaded
      function checkTailwind() {
        const testEl = document.createElement('div');
        testEl.className = 'hidden';
        document.body.appendChild(testEl);
        const isHidden = window.getComputedStyle(testEl).display === 'none';
        document.body.removeChild(testEl);
        
        if (isHidden) {
          document.body.classList.add('tailwind-loaded');
        } else {
          setTimeout(checkTailwind, 10);
        }
      }
      checkTailwind();
    })
    .catch(err => console.error('Failed to load header:', err));
})();
