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

const newCSS = `      /* Image-based dropdown arrow */
      .dropdown-arrow {
        display: inline-block;
        width: 12px;
        height: 8px;
        margin-left: 0.25rem;
        filter: brightness(0) saturate(100%);
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
const oldArrow = `<span class="dropdown-arrow"></span>`;
const newArrow = `<img src="/assets/images/dropdown-arrow.svg" alt="" class="dropdown-arrow" />`;

// Replace language icon
const oldLanguageIcon = `<span class="material-symbols-outlined text-xl">language</span>`;
const newLanguageIcon = `<img src="/assets/images/language-icon.svg" alt="Language" class="w-5 h-5" />`;

// Hide Language/Call on mobile
const oldActionsDiv = `<div class="flex items-center gap-4">`;
const newActionsDiv = `<!-- Desktop Actions - Hidden on Mobile -->
<div class="hidden lg:flex items-center gap-4">`;

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
    
    // Hide actions on mobile
    content = content.replace(oldActionsDiv, newActionsDiv);
    
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
