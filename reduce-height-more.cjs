const fs = require('fs');

const filePath = 'before-after.html';
let content = fs.readFileSync(filePath, 'utf8');

// Current: 400:291 (already 3% reduction)
// Need 5% more reduction from original 4:3
// Total reduction: 8% from original
// Original height: 3, New height: 3 * 0.92 = 2.76
// New ratio: 4:2.76 = 400:276
content = content.replace(/aspect-\[400\/291\]/g, 'aspect-[400/276]');

fs.writeFileSync(filePath, content, 'utf8');
console.log('✅ Reduced frame height by additional 5% (changed from 400:291 to 400:276, total 8% reduction)');
