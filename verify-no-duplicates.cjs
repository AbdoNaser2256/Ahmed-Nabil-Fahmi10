const fs = require('fs');

// Read the HTML file
const html = fs.readFileSync('before-after.html', 'utf8');

// Extract all case titles
const titleRegex = /<h3 class="font-headline font-bold text-xl mb-3">([^<]+)<\/h3>/g;
const titles = [];
let match;

while ((match = titleRegex.exec(html)) !== null) {
  titles.push(match[1]);
}

console.log(`Total cases found: ${titles.length}`);
console.log('');

// Count occurrences of each title
const titleCounts = {};
titles.forEach((title, index) => {
  if (!titleCounts[title]) {
    titleCounts[title] = [];
  }
  titleCounts[title].push(index + 1); // Case numbers are 1-indexed
});

// Find duplicates
const duplicates = Object.entries(titleCounts).filter(([title, cases]) => cases.length > 1);

if (duplicates.length === 0) {
  console.log('✓ SUCCESS: All titles are unique!');
  console.log('✓ No duplicates found across all 97 cases');
} else {
  console.log(`✗ FOUND ${duplicates.length} DUPLICATE TITLES:\n`);
  duplicates.forEach(([title, cases]) => {
    console.log(`  "${title}"`);
    console.log(`    Appears ${cases.length} times in cases: ${cases.join(', ')}`);
    console.log('');
  });
}

// List all titles for verification
console.log('\n--- ALL TITLES (for manual verification) ---');
titles.forEach((title, index) => {
  console.log(`Case ${index + 1}: ${title}`);
});
