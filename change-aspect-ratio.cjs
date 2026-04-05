const fs = require('fs');

const filePath = 'before-after.html';
let content = fs.readFileSync(filePath, 'utf8');

// Replace all aspect-[4/3] with aspect-square
content = content.replace(/aspect-\[4\/3\]/g, 'aspect-square');

fs.writeFileSync(filePath, content, 'utf8');
console.log('✅ Changed all card containers from aspect-[4/3] to aspect-square');
