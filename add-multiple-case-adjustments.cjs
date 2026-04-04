const fs = require('fs');

// Read the HTML file
let html = fs.readFileSync('before-after.html', 'utf8');

// Cases to adjust (all with same values)
const cases = [50, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 65, 66, 67, 84, 96];

// Find where to insert (before .slider-handle)
const insertPoint = html.indexOf('      .slider-handle {');

if (insertPoint === -1) {
  console.error('Could not find insertion point');
  process.exit(1);
}

// Generate CSS for all cases
let cssToAdd = '';
cases.forEach(caseNum => {
  cssToAdd += `      .comparison-slider[data-id="${caseNum}"] .image-before {
        transform: scaleY(1.10); /* 5% more stretch for before image */
      }
      
      .comparison-slider[data-id="${caseNum}"] .image-after {
        transform: scaleY(1.12); /* 7% more stretch for after image */
        top: -103.5%; /* Adjusted to hide top white space with extra stretch */
      }
      
`;
});

// Insert the CSS
html = html.slice(0, insertPoint) + cssToAdd + html.slice(insertPoint);

// Write back to file
fs.writeFileSync('before-after.html', html, 'utf8');

console.log(`✓ Added CSS adjustments for ${cases.length} cases:`);
console.log(`  Cases: ${cases.join(', ')}`);
console.log('✓ All cases now have 5% increase for before and 7% for after images');
