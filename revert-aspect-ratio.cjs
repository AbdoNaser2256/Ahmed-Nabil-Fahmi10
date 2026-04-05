const fs = require('fs');

const filePath = 'before-after.html';
let content = fs.readFileSync(filePath, 'utf8');

// Replace all instances of aspect-[400/276] with aspect-[4/3]
content = content.replace(/aspect-\[400\/276\]/g, 'aspect-[4/3]');

fs.writeFileSync(filePath, content, 'utf8');
console.log('✓ Reverted aspect ratio to original aspect-[4/3]');
