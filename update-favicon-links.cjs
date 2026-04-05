const fs = require('fs');
const path = require('path');

// List of all HTML files
const htmlFiles = [
  'index.html',
  'about.html',
  'before-after.html',
  'videos.html',
  'services.html',
  'casted-crown.html',
  'childrens-teeth.html',
  'cosmetic-fillings.html',
  'dental-implants.html',
  'gum-depigmentation.html',
  'hollywood-smile.html',
  'orthodontics.html',
  'root-canal.html',
  'teeth-whitening.html',
  'veneers.html',
  'services/casted-crown.html',
  'services/childrens-teeth.html',
  'services/code.html',
  'services/cosmetic-fillings.html',
  'services/dental-implants.html',
  'services/gum-depigmentation.html',
  'services/hollywood-smile.html',
  'services/orthodontics.html',
  'services/root-canal.html',
  'services/teeth-whitening.html',
  'services/veneers.html',
];

let updatedCount = 0;

htmlFiles.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File not found: ${file}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf-8');

  // Replace SVG favicon link with PNG favicon link
  const oldLink = '<link rel="icon" href="/favicon.svg" type="image/svg+xml">';
  const newLink = '<link rel="icon" href="/favicon.png" type="image/png">';
  
  if (content.includes(oldLink)) {
    content = content.replace(oldLink, newLink);
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ Updated favicon link to PNG: ${file}`);
    updatedCount++;
  } else {
    console.log(`⏭️  No SVG favicon link found: ${file}`);
  }
});

console.log(`\n📊 Summary: Updated ${updatedCount} files`);
