const fs = require('fs');

// Find all HTML files
const files = [
  'index.html',
  'about.html',
  'before-after.html',
  'videos.html',
  'services.html',
  'dental-implants.html',
  'hollywood-smile.html',
  'veneers.html',
  'root-canal.html',
  'childrens-teeth.html',
  'gum-depigmentation.html',
  'cosmetic-fillings.html',
  'orthodontics.html',
  'teeth-whitening.html',
  'casted-crown.html',
  'services/dental-implants.html',
  'services/hollywood-smile.html',
  'services/veneers.html',
  'services/root-canal.html',
  'services/childrens-teeth.html',
  'services/gum-depigmentation.html',
  'services/cosmetic-fillings.html',
  'services/orthodontics.html',
  'services/teeth-whitening.html',
  'services/casted-crown.html'
];

console.log(`🔧 Fixing main padding on ${files.length} files\n`);

let fixed = 0;

files.forEach(file => {
  try {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace pt-20 with pt-16 sm:pt-20 on main elements
    const newContent = content.replace(
      /<main class="pt-20/g,
      '<main class="pt-16 sm:pt-20'
    );
    
    if (newContent !== content) {
      fs.writeFileSync(file, newContent, 'utf8');
      console.log(`✅ Fixed: ${file}`);
      fixed++;
    } else {
      console.log(`⏭️  Skipped: ${file} (no pt-20 found)`);
    }
  } catch (err) {
    console.log(`❌ Error: ${file} - ${err.message}`);
  }
});

console.log(`\n✨ Done! Fixed ${fixed} files`);
