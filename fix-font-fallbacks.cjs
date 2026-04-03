const fs = require('fs');
const path = require('path');

// List of HTML files to update (manually specified)
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
  'videos.html',
  'services/casted-crown.html',
  'services/childrens-teeth.html',
  'services/cosmetic-fillings.html',
  'services/dental-implants.html',
  'services/gum-depigmentation.html',
  'services/hollywood-smile.html',
  'services/orthodontics.html',
  'services/root-canal.html',
  'services/teeth-whitening.html',
  'services/veneers.html'
];

console.log(`Updating ${htmlFiles.length} HTML files\n`);

// The old font config (without fallbacks)
const oldFontConfig = 'fontFamily: {headline: ["Manrope"], body: ["Manrope"], label: ["Manrope"], display: "Manrope"}';

// The new font config (with fallbacks)
const newFontConfig = 'fontFamily: {headline: ["Manrope", "system-ui", "sans-serif"], body: ["Manrope", "system-ui", "sans-serif"], label: ["Manrope", "system-ui", "sans-serif"], display: ["Manrope", "system-ui", "sans-serif"]}';

let updatedCount = 0;
let skippedCount = 0;

htmlFiles.forEach(file => {
  try {
    const content = fs.readFileSync(file, 'utf8');
    
    // Check if file has the old config
    if (content.includes(oldFontConfig)) {
      const newContent = content.replace(new RegExp(oldFontConfig.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newFontConfig);
      fs.writeFileSync(file, newContent, 'utf8');
      console.log(`✅ Updated: ${file}`);
      updatedCount++;
    } else if (content.includes('fontFamily') && content.includes('Manrope')) {
      console.log(`⏭️  Skipped (already has fallbacks): ${file}`);
      skippedCount++;
    } else {
      console.log(`⏭️  Skipped (no Manrope font config): ${file}`);
      skippedCount++;
    }
  } catch (err) {
    console.log(`❌ Error reading ${file}: ${err.message}`);
  }
});

console.log(`\n✨ Done! Updated ${updatedCount} files, skipped ${skippedCount} files`);

