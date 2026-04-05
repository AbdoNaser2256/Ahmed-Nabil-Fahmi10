const fs = require('fs');

const filePath = 'before-after.html';
let content = fs.readFileSync(filePath, 'utf8');

// Calculate new aspect ratio: 4:3 reduced by 3% in height
// Original: 4:3 = 4/3 = 1.333...
// New height = 3 * 0.97 = 2.91
// New ratio: 4:2.91 = 400:291
content = content.replace(/aspect-\[4\/3\]/g, 'aspect-[400/291]');

fs.writeFileSync(filePath, content, 'utf8');
console.log('✅ Reduced frame height by 3% (changed from 4:3 to 400:291)');
