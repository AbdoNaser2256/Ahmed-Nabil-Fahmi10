const fs = require('fs');

const html = fs.readFileSync('before-after.html', 'utf-8');
const cards = fs.readFileSync('cards-12-97.txt', 'utf-8');

const result = html.replace('<!-- CARDS_GO_HERE -->', cards);

fs.writeFileSync('before-after.html', result, 'utf-8');

console.log('✅ Added 86 cards (Cases 12-97)!');
