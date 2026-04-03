const fs = require('fs');

console.log('📝 Reading files...');

// Read the HTML file
const html = fs.readFileSync('before-after.html', 'utf-8');

// Read all the generated cards
const allCards = fs.readFileSync('cards-12-97.txt', 'utf-8');

console.log('🔍 Finding insertion point...');

// Find where to insert - right after Case 11 closes
const searchText = '<p class="text-xs italic text-on-surface-variant font-medium">"Quote placeholder."</p>\n</div>\n</div>\n</div>\n</div>\n</div>\n</div>\n</section>';

const insertIndex = html.indexOf(searchText);

if (insertIndex === -1) {
  console.error('❌ Could not find insertion point');
  process.exit(1);
}

// Calculate where to insert (after Case 11's closing </div>)
const case11End = html.indexOf('</div>\n</div>\n</div>\n</div>\n</section>', insertIndex);

console.log('✂️  Inserting 86 cards...');

// Insert all cards before the closing tags
const before = html.slice(0, case11End);
const after = html.slice(case11End);
const updated = before + allCards + '\n' + after;

// Write back
fs.writeFileSync('before-after.html', updated, 'utf-8');

console.log('✅ Successfully added 86 cards (Cases 12-97)!');
console.log('📊 Total cards: 97');
