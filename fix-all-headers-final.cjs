const fs = require('fs');

// Read index.html
const indexContent = fs.readFileSync('index.html', 'utf8');

// Extract the complete working header (from <!-- Global Header to </script> after mobile menu)
const headerStart = indexContent.indexOf('<!-- Global Header');
const headerEnd = indexContent.indexOf('</script>', indexContent.indexOf('// Mobile menu toggle')) + 9;
const workingHeader = indexContent.substring(headerStart, headerEnd);

console.log('✓ Extracted working header from index.html\n');

// All pages to update
const allPages = [
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

allPages.forEach(file => {
  try {
    let content = fs.readFileSync(file, 'utf8');
    
    // Find and replace header
    const start = content.indexOf('<!-- Global Header');
    let end = content.indexOf('</nav>', start);
    
    // Find script end if exists
    const scriptStart = content.indexOf('<script>', end);
    const scriptEnd = content.indexOf('</script>', scriptStart);
    if (scriptStart > end && scriptStart < end + 500 && scriptEnd > scriptStart) {
      end = scriptEnd + 9;
    } else {
      end = end + 6;
    }
    
    if (start !== -1) {
      content = content.substring(0, start) + workingHeader + content.substring(end);
      fs.writeFileSync(file, content, 'utf8');
      console.log(`✓ ${file}`);
    } else {
      console.log(`✗ No header in ${file}`);
    }
  } catch (err) {
    console.error(`✗ ${file}: ${err.message}`);
  }
});

console.log('\n✓ All pages updated!');
