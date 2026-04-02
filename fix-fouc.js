import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const foucFix = `
  <script>
    // Show body once Tailwind is ready
    (function() {
      // Wait for Tailwind to process styles
      function checkTailwind() {
        const testEl = document.createElement('div');
        testEl.className = 'hidden';
        document.body.appendChild(testEl);
        const isHidden = window.getComputedStyle(testEl).display === 'none';
        document.body.removeChild(testEl);
        
        if (isHidden) {
          document.body.classList.add('loaded');
        } else {
          setTimeout(checkTailwind, 50);
        }
      }
      
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', checkTailwind);
      } else {
        checkTailwind();
      }
    })();
  </script>`;

const cssAddition = `      /* Prevent FOUC (Flash of Unstyled Content) */
      body {
        visibility: hidden;
      }
      body.loaded {
        visibility: visible;
      }
      
`;

const htmlFiles = [
  'about.html',
  'services.html',
  'before-after.html',
  'videos.html',
  'services/veneers.html',
  'services/childrens-teeth.html',
  'services/gum-depigmentation.html',
  'services/orthodontics.html',
  'services/cosmetic-fillings.html',
  'services/casted-crown.html',
  'services/teeth-whitening.html',
  'services/dental-implants.html',
  'services/hollywood-smile.html',
  'services/root-canal.html'
];

htmlFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File not found: ${file}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf-8');

  // Replace old script with new one
  if (content.includes('body.classList.add')) {
    content = content.replace(
      /<script>\s*\/\/ Show body once page is loaded[\s\S]*?<\/script>/,
      foucFix
    );
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ Updated FOUC fix: ${file}`);
  } else {
    console.log(`⚠️  Script not found in: ${file}`);
  }
});

console.log('✨ FOUC fix update complete!');
