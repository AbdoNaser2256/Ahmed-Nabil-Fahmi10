const fs = require('fs');

// Read the working header from global_header.html
const workingHeader = fs.readFileSync('global_header.html', 'utf8');

// Read before-after.html
let beforeAfterContent = fs.readFileSync('before-after.html', 'utf8');

// Find where the old header starts (after <body>)
const bodyStart = beforeAfterContent.indexOf('<body');
const bodyTagEnd = beforeAfterContent.indexOf('>', bodyStart) + 1;

// Find where the old header ends (find the WhatsApp SVG which comes after the old nav)
const whatsappSvgStart = beforeAfterContent.indexOf('<svg fill="currentColor" height="32"');

// Replace the old header with the working header
const before = beforeAfterContent.substring(0, bodyTagEnd);
const after = beforeAfterContent.substring(whatsappSvgStart);

const newContent = before + '\n' + workingHeader + '\n\n' + after;

// Write the updated file
fs.writeFileSync('before-after.html', newContent, 'utf8');

console.log('Updated before-after.html with working header!');
