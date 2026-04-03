const fs = require('fs');

// Read about.html
let html = fs.readFileSync('about.html', 'utf8');

// Find the start of the header (after <body tag)
const bodyStart = html.indexOf('<body');
const bodyEnd = html.indexOf('>', bodyStart) + 1;

// Find the start of <main
const mainStart = html.indexOf('<main');

// Replace everything between body tag and main tag with the header container
const before = html.substring(0, bodyEnd);
const after = html.substring(mainStart);

const newHtml = before + '\n<!-- Header Container - Loaded dynamically -->\n<div id="header-container"></div>\n\n' + after;

// Find the closing </body> tag and add the loader script before it
const bodyCloseIndex = newHtml.lastIndexOf('</body>');
const finalHtml = newHtml.substring(0, bodyCloseIndex) + '\n<!-- Load header dynamically -->\n<script src="/header-loader.js"></script>\n' + newHtml.substring(bodyCloseIndex);

// Write the file
fs.writeFileSync('about.html', finalHtml, 'utf8');

console.log('✅ about.html updated with header loader');
