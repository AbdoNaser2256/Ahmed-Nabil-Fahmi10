const fs = require('fs');

const filePath = 'before-after.html';
let content = fs.readFileSync(filePath, 'utf8');

// Current: 400:276 (8% reduction)
// Need 10% more reduction from original
// Total reduction: 18% from original 4:3
// Original height: 3, New height: 3 * 0.82 = 2.46
// New ratio: 4:2.46 = 400:246
content = content.replace(/aspect-\[400\/276\]/g, 'aspect-[400/246]');

fs.writeFileSync(filePath, content, 'utf8');
console.log('✅ Reduced frame height by additional 10% (changed from 400:276 to 400:246, total 18% reduction)');
