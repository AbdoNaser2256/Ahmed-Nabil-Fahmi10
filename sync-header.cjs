const fs = require('fs');

// Read index.html to get the working header
const indexContent = fs.readFileSync('index.html', 'utf8');

// Extract header from index.html (from <!-- Global Header to </nav> and script)
const headerStart = indexContent.indexOf('<!-- Global Header');
const scriptEnd = indexContent.indexOf('</script>', indexContent.indexOf('// Mobile menu toggle')) + 9;
const workingHeader = indexContent.substring(headerStart, scriptEnd);

console.log('Extracted header from index.html');

// List of all HTML files to update
const files = [
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
  'videos.html'
];

files.forEach(file => {
  try {
    let content = fs.readFileSync(file, 'utf8');
    
    // Find and replace the header section
    const start = content.indexOf('<!-- Global Header');
    const end = content.indexOf('</script>', content.indexOf('// Mobile menu toggle', start)) + 9;
    
    if (start !== -1 && end !== -1) {
      content = content.substring(0, start) + workingHeader + content.substring(end);
      fs.writeFileSync(file, content, 'utf8');
      console.log(`✓ Updated ${file}`);
    } else {
      console.log(`✗ Could not find header in ${file}`);
    }
  } catch (err) {
    console.error(`✗ Error updating ${file}:`, err.message);
  }
});

console.log('\nAll files synced with index.html header!');
