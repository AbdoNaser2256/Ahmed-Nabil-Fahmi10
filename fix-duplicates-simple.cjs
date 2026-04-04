const fs = require('fs');

// Read the HTML file
let html = fs.readFileSync('before-after.html', 'utf8');

// Manual replacements for remaining duplicates
// We'll replace each occurrence one by one by finding the case number context

// Case 31: DCT White 41
html = html.replace(
  /<!-- Case 31 -->([\s\S]*?)<h3 class="font-headline font-bold text-xl mb-3">Premium Dental Crown Restoration<\/h3>/,
  '<!-- Case 31 -->$1<h3 class="font-headline font-bold text-xl mb-3">DCT White 41 Crown</h3>'
);

// Case 41: BL3 Metal Implant Crown 61
html = html.replace(
  /<!-- Case 41 -->([\s\S]*?)<h3 class="font-headline font-bold text-xl mb-3">Premium Dental Crown Restoration<\/h3>/,
  '<!-- Case 41 -->$1<h3 class="font-headline font-bold text-xl mb-3">BL3 Metal Implant Crown 61</h3>'
);

// Case 76: Keep as is but make unique
html = html.replace(
  /<!-- Case 76 -->([\s\S]*?)<h3 class="font-headline font-bold text-xl mb-3">Premium Dental Crown Restoration<\/h3>/,
  '<!-- Case 76 -->$1<h3 class="font-headline font-bold text-xl mb-3">Premium Crown Restoration 76</h3>'
);

// Write back
fs.writeFileSync('before-after.html', html, 'utf8');

console.log('✓ Fixed remaining duplicate titles');
