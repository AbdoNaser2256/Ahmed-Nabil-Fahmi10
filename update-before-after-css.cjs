const fs = require('fs');

// Read before-after.html
let content = fs.readFileSync('before-after.html', 'utf8');

// The working CSS from index.html
const workingCSS = `<style>
      /* Hide nav until Tailwind loads to prevent ANY layout shift */
      nav {
        visibility: hidden;
      }
      body.tailwind-loaded nav {
        visibility: visible;
      }
      
      /* Inline SVG dropdown arrow styling */
      .dropdown-arrow {
        display: inline-block;
        margin-left: 0.25rem;
        opacity: 0.6;
      }
      
      /* CSS-only hamburger menu icon */
      .hamburger-icon {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 24px;
        height: 18px;
      }
      .hamburger-icon span {
        display: block;
        height: 2px;
        background-color: currentColor;
        border-radius: 2px;
      }
      
      /* Mobile menu slide-in animation */
      .mobile-menu-backdrop {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 999999 !important;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease;
      }
      .mobile-menu-backdrop.active {
        opacity: 1;
        pointer-events: auto;
      }
      
      .mobile-menu-drawer {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        width: 85%;
        max-width: 400px;
        background: white;
        z-index: 9999999 !important;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        overflow-y: auto;
        box-shadow: -4px 0 20px rgba(0, 0, 0, 0.15);
      }
      .mobile-menu-drawer.active {
        transform: translateX(0);
      }
      
      .material-symbols-outlined {
        font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
      }
      .glass-nav {
        background: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(20px);
      }
      .asymmetric-gradient {
        background: linear-gradient(135deg, #006a71 0%, #D4AF37 100%);
      }
      .arabesque-pattern {
        background-color: #fdfcf9;
        background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l5.89 19.11L55.03 15 40.89 30l14.14 15-19.14-4.11L30 60l-5.89-19.11L5 45l14.14-15L5 15l19.11 4.11z' fill='%23d4af37' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E");
      }
      .gold-border {
        border-color: #D4AF37;
      }
      .text-gold {
        color: #D4AF37;
      }
      .nav-dropdown:hover .nav-dropdown-content {
        display: block;
      }
    </style>`;

const workingScript = `<script>
      // Show nav only after Tailwind is loaded
      (function() {
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
        
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', checkTailwind);
        } else {
          checkTailwind();
        }
      })();
    </script>`;

// Find and replace the old <style> tag
const styleStart = content.indexOf('<style>');
const styleEnd = content.indexOf('</style>') + 8;
const oldStyle = content.substring(styleStart, styleEnd);

content = content.replace(oldStyle, workingCSS);

// Find and replace the old script (the one after </style>)
const scriptPattern = /<script>\s*\/\/ Show icons once fonts.*?<\/script>/s;
content = content.replace(scriptPattern, workingScript);

// Write the updated file
fs.writeFileSync('before-after.html', content, 'utf8');

console.log('Updated before-after.html CSS and script!');
