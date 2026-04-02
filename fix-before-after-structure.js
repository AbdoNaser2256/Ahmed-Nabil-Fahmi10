import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, 'before-after.html');
let content = fs.readFileSync(filePath, 'utf-8');

// Find the nav start (where body content actually begins)
const navStartIndex = content.indexOf('<!-- Global Header Copied Directly -->');

// Extract the misplaced head content (between </head> and the nav comment)
const headEndIndex = content.indexOf('</head>');
const bodyStartIndex = content.indexOf('<body');
const bodyTagEndIndex = content.indexOf('>', bodyStartIndex);

// Get the misplaced content (the ```html block and meta/script/style tags)
const misplacedStart = headEndIndex + 7; // after </head>
const misplacedEnd = navStartIndex;
const misplacedContent = content.substring(misplacedStart, misplacedEnd);

// Extract meta, script, and style tags from misplaced content
const metaCharset = misplacedContent.match(/<meta charset[^>]*>/);
const metaViewport = misplacedContent.match(/<meta[^>]*viewport[^>]*>/);
const tailwindScript = misplacedContent.match(/<script src="https:\/\/cdn\.tailwindcss\.com[^>]*><\/script>/);
const googleFontsLink = misplacedContent.match(/<link href="https:\/\/fonts\.googleapis\.com[^>]*>/);
const materialSymbolsLink = misplacedContent.match(/<link href="https:\/\/fonts\.googleapis\.com\/css2\?family=Material[^>]*>/);
const tailwindConfigScript = misplacedContent.match(/<script id="tailwind-config">[^<]*<\/script>/s);
const styleTag = misplacedContent.match(/<style>[\s\S]*?<\/style>/);

// Build the proper head content
let properHeadContent = '';
if (metaCharset) properHeadContent += metaCharset[0] + '\n';
if (metaViewport) properHeadContent += metaViewport[0] + '\n';
if (tailwindScript) properHeadContent += tailwindScript[0] + '\n';
if (googleFontsLink) properHeadContent += googleFontsLink[0] + '\n';
if (materialSymbolsLink) properHeadContent += materialSymbolsLink[0] + '\n';
if (tailwindConfigScript) properHeadContent += tailwindConfigScript[0] + '\n';
if (styleTag) properHeadContent += styleTag[0] + '\n';

// Find where to insert the proper head content (after the existing head content but before </head>)
const existingHeadContent = content.substring(content.indexOf('<head>') + 6, headEndIndex);

// Reconstruct the file
const beforeHead = content.substring(0, content.indexOf('<head>') + 6);
const afterHead = content.substring(headEndIndex);

// Remove the misplaced content from body
const bodyContent = content.substring(bodyTagEndIndex + 1, navStartIndex) + content.substring(navStartIndex);
const cleanBodyContent = bodyContent.replace(misplacedContent, '').trim();

// Build the new content
const newContent = beforeHead + 
  existingHeadContent + 
  '\n' + properHeadContent + 
  '</head>' + 
  cleanBodyContent;

fs.writeFileSync(filePath, newContent, 'utf-8');
console.log('✓ Fixed before-after.html structure - moved meta/script/style tags from body to head');
