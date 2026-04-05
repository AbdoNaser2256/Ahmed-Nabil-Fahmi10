const fs = require('fs');
const path = require('path');

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
    return;
  }

  let content = fs.readFileSync(filePath, 'utf-8');

  // Find and replace the Snapchat icon with Google Photos URL
  const oldPattern = /<a class="w-10 h-10 rounded-full flex items-center justify-center bg-teal-800 hover:bg-teal-700 transition-all shadow-sm overflow-hidden" href="#" title="Snapchat">\s*<img[^>]*src="https:\/\/lh3\.googleusercontent\.com[^"]*"[^>]*>\s*<\/a>/gs;
  
  const newSnapchatIcon = `<a class="w-10 h-10 rounded-full flex items-center justify-center bg-teal-800 hover:bg-teal-700 transition-all shadow-sm overflow-hidden" href="#" title="Snapchat">
<img src="/assets/images/snapchat-icon.png?v=2" alt="Snapchat" class="w-full h-full object-cover object-center"/>
</a>`;

  if (oldPattern.test(content)) {
    content = content.replace(oldPattern, newSnapchatIcon);
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ Fixed Snapchat icon in: ${file}`);
    updatedCount++;
  } else {
    console.log(`⏭️  No Snapchat icon found or already fixed: ${file}`);
  }
});

console.log(`\n✅ Updated ${updatedCount} files`);
