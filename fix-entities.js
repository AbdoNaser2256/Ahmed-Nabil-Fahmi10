import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Find all HTML files
const htmlFiles = glob.sync('**/*.html', {
  ignore: ['node_modules/**', 'dist/**', '.git/**']
});

htmlFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  let changed = false;

  // Fix Before &amp; After
  if (content.includes('Before &amp; After')) {
    content = content.replace(/Before &amp; After/g, 'Before & After');
    changed = true;
  }

  // Fix font URLs
  if (content.includes('&amp;display=swap')) {
    content = content.replace(/&amp;display=swap/g, '&display=swap');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ Fixed entities: ${file}`);
  }
});

console.log('✨ Entity fix complete!');
