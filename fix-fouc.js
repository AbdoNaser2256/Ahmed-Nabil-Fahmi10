import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const newScript = `
  <script>
    // Show body immediately after a tiny delay to ensure styles are parsed
    setTimeout(function() {
      document.body.classList.add('loaded');
    }, 100);
  </script>`;

const newCSS = `      /* Prevent FOUC (Flash of Unstyled Content) */
      body {
        opacity: 0;
        transition: opacity 0.3s ease-in;
      }
      body.loaded {
        opacity: 1;
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

  // Replace CSS
  content = content.replace(
    /\/\* Prevent FOUC[\s\S]*?body\.loaded \{\s*visibility: visible;\s*\}/,
    newCSS.trim() + '\n      body.loaded {\n        opacity: 1;\n      }'
  );

  // Replace script
  content = content.replace(
    /<script>\s*\/\/ Show body[\s\S]*?<\/script>/,
    newScript
  );

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`✅ Simplified FOUC fix: ${file}`);
});

console.log('✨ FOUC simplification complete!');
