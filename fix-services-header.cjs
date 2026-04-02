const fs = require('fs');

// Read index.html to get the working header
const indexContent = fs.readFileSync('index.html', 'utf8');

// Extract COMPLETE header from index.html
const headerStart = indexContent.indexOf('<!-- Global Header');
const headerEnd = indexContent.indexOf('</script>', indexContent.indexOf('// Mobile menu toggle')) + 9;
const workingHeader = indexContent.substring(headerStart, headerEnd);

console.log('Working header extracted from index.html\n');

// Services pages
const servicesFiles = [
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

servicesFiles.forEach(file => {
  try {
    let content = fs.readFileSync(file, 'utf8');
    
    // Find old header
    const start = content.indexOf('<!-- Global Header');
    const end = content.indexOf('</nav>', start) + 6;
    
    // Find old script if exists
    let scriptEnd = content.indexOf('</script>', end);
    if (scriptEnd > end && scriptEnd < end + 500) {
      scriptEnd += 9;
    } else {
      scriptEnd = end;
    }
    
    if (start !== -1) {
      content = content.substring(0, start) + workingHeader + content.substring(scriptEnd);
      fs.writeFileSync(file, content, 'utf8');
      console.log(`✓ ${file}`);
    } else {
      console.log(`✗ No header found in ${file}`);
    }
  } catch (err) {
    console.error(`✗ Error: ${file} - ${err.message}`);
  }
});

console.log('\nDone!');
