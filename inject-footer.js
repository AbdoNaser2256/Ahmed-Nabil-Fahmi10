import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Read the footer content
const footerContent = fs.readFileSync(path.join(__dirname, 'global_footer.html'), 'utf-8');

// List of all HTML files that need the footer
const htmlFiles = [
  'dist/index.html',
  'dist/about.html',
  'dist/services.html',
  'dist/before-after.html',
  'dist/videos.html',
  'dist/root-canal.html',
  'dist/orthodontics.html',
  'dist/hollywood-smile.html',
  'dist/dental-implants.html',
  'dist/veneers.html',
  'dist/teeth-whitening.html',
  'dist/childrens-teeth.html',
  'dist/casted-crown.html',
  'dist/cosmetic-fillings.html',
  'dist/gum-depigmentation.html',
  'dist/services/root-canal.html',
  'dist/services/orthodontics.html',
  'dist/services/hollywood-smile.html',
  'dist/services/dental-implants.html',
  'dist/services/cosmetic-fillings.html',
  'dist/services/code.html',
  'dist/services/childrens-teeth.html',
  'dist/services/casted-crown.html',
  'dist/services/gum-depigmentation.html',
  'dist/services/teeth-whitening.html',
  'dist/services/veneers.html'
];

// Inject footer into each HTML file
htmlFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  
  // Check if file exists
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File not found: ${file}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf-8');

  // Remove existing footer if present
  content = content.replace(/<footer[\s\S]*?<\/footer>[\s\S]*?<\/a>\s*<\/body>/i, '</body>');

  // Insert footer before closing body tag
  content = content.replace('</body>', `${footerContent}\n</body>`);

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`✅ Footer injected: ${file}`);
});

console.log('✨ Footer injection complete!');
