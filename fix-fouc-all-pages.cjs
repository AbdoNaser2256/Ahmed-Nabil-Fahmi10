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

const newCSS = `      /* Critical header styles to prevent layout shift before Tailwind loads */
      nav {
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 50;
        background-color: rgba(248, 250, 251, 0.8);
        backdrop-filter: blur(20px);
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
      }
      nav > div {
        max-width: 80rem;
        margin: 0 auto;
        padding: 0 2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 5rem;
      }
      /* Lock logo size to prevent font loading shift - match Tailwind responsive sizes */
      nav > div > div:first-child {
        font-size: 1.25rem; /* text-xl */
        font-weight: 700;
        font-family: system-ui, -apple-system, sans-serif;
        color: #134e4a;
        letter-spacing: -0.05em;
      }
      @media (min-width: 640px) {
        nav > div > div:first-child {
          font-size: 1.5rem; /* text-2xl */
        }
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
const oldArrow = `<img src="/assets/images/dropdown-arrow.svg" alt="" class="dropdown-arrow" />`;
const newArrow = `<svg class="dropdown-arrow" width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 1L6 6L11 1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

// Replace language icon
const oldLanguageIcon = `<img src="/assets/images/language-icon.svg" alt="Language" class="w-5 h-5" />`;
const newLanguageIcon = `<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
<path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="currentColor" stroke-width="2"/>
</svg>`;

// Replace font display
const oldFontDisplay = `display=swap`;
const newFontDisplay = `display=optional`;

// Replace mobile menu icon
const oldMobileIcon = `<span class="material-symbols-outlined text-2xl text-teal-900">menu</span>`;
const newMobileIcon = `<div class="hamburger-icon text-teal-900">
<span></span>
<span></span>
<span></span>
</div>`;

// Replace mobile menu script
const oldMobileScript = `      const icon = this.querySelector('.material-symbols-outlined');
      icon.textContent = mobileMenu.classList.contains('hidden') ? 'menu' : 'close';`;
const newMobileScript = ``;

htmlFiles.forEach(file => {
  try {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace CSS
    content = content.replace(oldCSS, newCSS);
    
    // Replace Script (remove it)
    content = content.replace(oldScript, newScript);
    
    // Replace dropdown arrows
    content = content.replaceAll(oldArrow, newArrow);
    
    // Replace language icon
    content = content.replace(oldLanguageIcon, newLanguageIcon);
    
    // Replace font display
    content = content.replace(oldFontDisplay, newFontDisplay);
    
    // Replace mobile menu icon
    content = content.replace(oldMobileIcon, newMobileIcon);
    
    // Replace mobile menu script
    content = content.replace(oldMobileScript, newMobileScript);
    
    fs.writeFileSync(file, content, 'utf8');
    console.log(`✓ Fixed ${file}`);
  } catch (err) {
    console.error(`✗ Error fixing ${file}:`, err.message);
  }
});

console.log('\nAll files fixed!');
