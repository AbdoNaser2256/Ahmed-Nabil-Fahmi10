const fs = require('fs');
const path = require('path');

const htmlFiles = [
  'about.html',
  'before-after.html',
  'casted-crown.html',
  'childrens-teeth.html',
  'cosmetic-fillings.html',
  'dental-implants.html',
  'gum-depigmentation.html',
  'hollywood-smile.html',
  'orthodontics.html',
  'root-canal.html',
  'services.html',
  'teeth-whitening.html',
  'veneers.html',
  'videos.html'
];

const oldCSS = `      /* Hide material icons until font loads to prevent text flash */
      .material-symbols-outlined {
        visibility: hidden;
      }
      
      /* Show icons once font is loaded */
      body.fonts-loaded .material-symbols-outlined {
        visibility: visible;
      }
      
      .material-symbols-outlined {
        font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
      }`;

const newCSS = `      /* CSS-only dropdown arrow - no font loading needed */
      .dropdown-arrow {
        display: inline-block;
        width: 0;
        height: 0;
        margin-left: 0.25rem;
        vertical-align: middle;
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-top: 5px solid currentColor;
      }
      
      .material-symbols-outlined {
        font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
      }`;

const oldScript = `      // Show icons once fonts and Tailwind are ready
      (function() {
        function checkReady() {
          // Check if Tailwind is loaded
          const testEl = document.createElement('div');
          testEl.className = 'hidden';
          document.body.appendChild(testEl);
          const isHidden = window.getComputedStyle(testEl).display === 'none';
          document.body.removeChild(testEl);
          
          if (isHidden) {
            document.body.classList.add('loaded');
            document.body.classList.add('fonts-loaded');
          } else {
            setTimeout(checkReady, 50);
          }
        }
        
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', checkReady);
        } else {
          checkReady();
        }
      })();`;

const newScript = ``;

// Replace dropdown arrows
const oldArrow = `<span class="material-symbols-outlined text-lg leading-none">keyboard_arrow_down</span>`;
const newArrow = `<span class="dropdown-arrow"></span>`;

htmlFiles.forEach(file => {
  try {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace CSS
    content = content.replace(oldCSS, newCSS);
    
    // Replace Script (remove it)
    content = content.replace(oldScript, newScript);
    
    // Replace dropdown arrows
    content = content.replaceAll(oldArrow, newArrow);
    
    fs.writeFileSync(file, content, 'utf8');
    console.log(`✓ Fixed ${file}`);
  } catch (err) {
    console.error(`✗ Error fixing ${file}:`, err.message);
  }
});

console.log('\nAll files fixed!');
