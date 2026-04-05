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

const faviconLink = '<link rel="icon" href="/favicon.svg" type="image/svg+xml">';

let updatedCount = 0;
let skippedCount = 0;

htmlFiles.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File not found: ${file}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf-8');

  // Check if favicon link already exists
  if (content.includes('rel="icon"')) {
    console.log(`⏭️  Already has favicon: ${file}`);
    skippedCount++;
    return;
  }

  // Find the closing </head> tag and insert favicon link before it
  const headCloseIndex = content.indexOf('</head>');
  if (headCloseIndex === -1) {
    console.log(`❌ No </head> tag found in: ${file}`);
    return;
  }

  // Insert favicon link before </head>
  const newContent = content.slice(0, headCloseIndex) + faviconLink + '\n' + content.slice(headCloseIndex);
  
  fs.writeFileSync(filePath, newContent, 'utf-8');
  console.log(`✅ Added favicon to: ${file}`);
  updatedCount++;
});

console.log(`\n📊 Summary:`);
console.log(`✅ Updated: ${updatedCount} files`);
console.log(`⏭️  Skipped: ${skippedCount} files`);
