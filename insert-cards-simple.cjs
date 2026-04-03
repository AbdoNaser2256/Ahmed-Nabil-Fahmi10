const fs = require('fs');

// Read files
const html = fs.readFileSync('before-after.html', 'utf-8');
const cards = fs.readFileSync('cards-12-97.txt', 'utf-8');

// Find where to insert - right before the 3 closing divs and section
const marker = '</div>\n</div>\n</section>';
const index = html.lastIndexOf(marker);

if (index === -1) {
  console.error('Could not find marker');
  process.exit(1);
}

// Insert cards
const result = html.slice(0, index) + cards + '\n' + html.slice(index);

// Write
fs.writeFileSync('before-after.html', result, 'utf-8');

console.log('✅ Added 86 cards!');

