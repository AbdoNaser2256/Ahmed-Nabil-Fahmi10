import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const foucFix = `
  <script>
    // Show body once page is loaded
    window.addEventListener('DOMContentLoaded', function() {
      document.body.classList.add('loaded');
    });
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
  'services/teeth-whitening.html'
];

htmlFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File not found: ${file}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf-8');

  // Add CSS fix if not already present
  if (!content.includes('body.loaded')) {
    content = content.replace(
      /<style>\s*\.material-symbols-outlined/,
      `<style>\n${cssAddition}      .material-symbols-outlined`
    );
  }

  // Add script fix if not already present
  if (!content.includes('body.classList.add')) {
    content = content.replace(
      /<\/head>/,
      `${foucFix}\n</head>`
    );
  }

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`✅ FOUC fix applied: ${file}`);
});

console.log('✨ FOUC fix complete!');
