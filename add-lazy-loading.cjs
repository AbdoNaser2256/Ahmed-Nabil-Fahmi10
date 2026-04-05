const fs = require('fs');

// Read the file
let html = fs.readFileSync('before-after.html', 'utf8');

// Add loading="lazy" to all image-after and image-before images
html = html.replace(
  /<img (alt="[^"]*" class="image-(?:after|before)")/g,
  '<img loading="lazy" $1'
);

// Write back
fs.writeFileSync('before-after.html', html, 'utf8');

console.log('Added lazy loading to all images!');
