const fs = require('fs');

// Read the HTML file
let html = fs.readFileSync('before-after.html', 'utf8');

// Remove all description paragraphs (including "Description placeholder.")
html = html.replace(
  /<p class="text-on-surface-variant text-sm leading-relaxed mb-6">.*?<\/p>\s*/g,
  ''
);

// Remove all quote sections (the entire div with flex, icon, and quote text)
// This pattern matches the quote container that comes after the title
html = html.replace(
  /<div class="flex items-center gap-3 pt-6 border-t border-surface-container">\s*<div class="w-8 h-8 rounded-full bg-tertiary-fixed flex items-center justify-center">\s*<span class="material-symbols-outlined text-sm text-on-tertiary-fixed">format_quote<\/span>\s*<\/div>\s*<p class="text-xs italic text-on-surface-variant font-medium">.*?<\/p>\s*<\/div>/gs,
  ''
);

// Write back to file
fs.writeFileSync('before-after.html', html, 'utf8');

console.log('✓ Removed all remaining descriptions');
console.log('✓ Removed all remaining quotes');
console.log('✓ All cases now show only titles');
