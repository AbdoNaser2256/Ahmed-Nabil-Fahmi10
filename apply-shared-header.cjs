const fs = require('fs');

/**
 * This script converts HTML pages to use the shared header system
 * It replaces the entire header HTML with a placeholder div and adds the loader script
 */

function applySharedHeader(filePath) {
  console.log(`\n📄 Processing: ${filePath}`);
  
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Check if already converted
  if (content.includes('id="header-container"') && content.includes('header-loader.js')) {
    console.log('⏭️  Already using shared header, skipping');
    return false;
  }
  
  // Find the header section - it starts with <nav and ends with the closing </div> of the mobile menu drawer
  // The pattern: <nav ... > ... </nav> ... mobile-menu-backdrop ... mobile-menu-drawer
  
  // Strategy: Find from <nav to the last </div> before <main or before </body if no main
  const navStartMatch = content.match(/<nav\s+class="fixed top-0/);
  
  if (!navStartMatch) {
    console.log('❌ Could not find header nav element');
    return false;
  }
  
  const navStartIndex = navStartMatch.index;
  
  // Find the mobile menu drawer closing div (it's the last part of the header)
  // Look for the closing </div> that comes after "mobile-menu-drawer"
  const drawerMatch = content.match(/<div id="mobile-menu-drawer"[^>]*>[\s\S]*?<\/div>\s*<\/div>/);
  
  if (!drawerMatch) {
    console.log('❌ Could not find mobile menu drawer closing tag');
    return false;
  }
  
  const headerEndIndex = drawerMatch.index + drawerMatch[0].length;
  
  // Extract the header HTML
  const headerHTML = content.substring(navStartIndex, headerEndIndex);
  
  console.log(`📏 Header length: ${headerHTML.length} characters`);
  
  // Replace the header with the placeholder
  const beforeHeader = content.substring(0, navStartIndex);
  const afterHeader = content.substring(headerEndIndex);
  
  // Build the new content
  const newContent = beforeHeader + 
    '<!-- Header Container - Loaded dynamically -->\n<div id="header-container"></div>\n\n' +
    afterHeader;
  
  // Check if the loader script is already present
  if (!newContent.includes('header-loader.js')) {
    // Add the loader script before </body>
    const finalContent = newContent.replace(
      '</body>',
      '\n<!-- Load header dynamically -->\n<script src="/header-loader.js"></script>\n</body>'
    );
    
    fs.writeFileSync(filePath, finalContent, 'utf8');
    console.log('✅ Successfully converted to shared header');
    return true;
  } else {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log('✅ Successfully converted to shared header (script already present)');
    return true;
  }
}

// Process files passed as arguments
const files = process.argv.slice(2);

if (files.length === 0) {
  console.log('Usage: node apply-shared-header.cjs <file1.html> <file2.html> ...');
  process.exit(1);
}

console.log(`🚀 Converting ${files.length} file(s) to use shared header\n`);

let successCount = 0;
let skipCount = 0;
let errorCount = 0;

files.forEach(file => {
  try {
    const result = applySharedHeader(file);
    if (result) {
      successCount++;
    } else {
      skipCount++;
    }
  } catch (err) {
    console.log(`❌ Error: ${err.message}`);
    errorCount++;
  }
});

console.log(`\n✨ Done! Converted: ${successCount}, Skipped: ${skipCount}, Errors: ${errorCount}`);
