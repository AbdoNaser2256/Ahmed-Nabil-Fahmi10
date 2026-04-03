const fs = require('fs');

console.log('🚀 Starting to add 87 new cards to before-after.html...\n');

// Read the current before-after.html
let html = fs.readFileSync('before-after.html', 'utf-8');

// Card template function
const createCard = (caseNumber) => `
<!-- Case ${caseNumber} -->
<div class="group bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-outline-variant/10">
<div class="relative aspect-[4/3] bg-surface-container">
<div class="comparison-slider" data-id="${caseNumber}">
<img alt="After Result" class="image-after" src="assets/images/placeholder.webp"/>
<img alt="Before Result" class="image-before" src="assets/images/placeholder.webp"/>
<div class="slider-handle"></div>
<input class="slider-input absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-40" max="100" min="0" oninput="this.parentElement.querySelector('.image-before').style.clipPath = \`inset(0 \${100 - this.value}% 0 0)\`; this.parentElement.querySelector('.slider-handle').style.left = \`\${this.value}%\`" type="range" value="50"/>
<span class="absolute top-4 left-4 px-2 py-1 bg-black/60 text-white text-[10px] rounded uppercase font-bold z-20">Before</span>
<span class="absolute top-4 right-4 px-2 py-1 bg-primary/80 text-white text-[10px] rounded uppercase font-bold z-20">After</span>
</div>
</div>
<div class="p-8">
<h3 class="font-headline font-bold text-xl mb-3">Case ${caseNumber} - Title Placeholder</h3>
<p class="text-on-surface-variant text-sm leading-relaxed mb-6">Description placeholder for case ${caseNumber}.</p>
<div class="flex items-center gap-3 pt-6 border-t border-surface-container">
<div class="w-8 h-8 rounded-full bg-tertiary-fixed flex items-center justify-center">
<span class="material-symbols-outlined text-sm text-on-tertiary-fixed">format_quote</span>
</div>
<p class="text-xs italic text-on-surface-variant font-medium">"Quote placeholder for case ${caseNumber}."</p>
</div>
</div>
</div>`;

// Generate all 87 new cards (Case 11 to Case 97)
let newCards = '';
for (let i = 11; i <= 97; i++) {
  newCards += createCard(i);
  if (i % 10 === 0) {
    console.log(`  ✓ Generated cards 11-${i}`);
  }
}
console.log(`  ✓ Generated cards 11-97\n`);

// Find the insertion point - right before the closing </div></div></div></section>
// We'll look for the pattern after Case 10
const searchPattern = '</div>\n</div>\n</div>\n</div>\n</section>';
const insertIndex = html.lastIndexOf(searchPattern);

if (insertIndex === -1) {
  console.error('❌ Error: Could not find insertion point in before-after.html');
  console.error('   Make sure the file has the expected structure with closing tags.');
  process.exit(1);
}

// Insert the new cards before the closing tags
const updatedHtml = html.slice(0, insertIndex) + newCards + '\n' + html.slice(insertIndex);

// Write the updated HTML back to the file
fs.writeFileSync('before-after.html', updatedHtml, 'utf-8');

console.log('✅ Successfully added 87 new cards to before-after.html!');
console.log('📊 Total cards now: 97 (Case 1 to Case 97)');
console.log('\n💡 Next steps:');
console.log('   1. Add CSS for the comparison slider');
console.log('   2. Replace placeholder images with actual case images');
console.log('   3. Update titles, descriptions, and quotes for each case');
