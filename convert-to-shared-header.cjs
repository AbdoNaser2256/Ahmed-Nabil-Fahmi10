const fs = require('fs');

const files = ['videos.html', 'services.html'];

files.forEach(file => {
  console.log(`\n📄 Processing: ${file}`);
  
  let content = fs.readFileSync(file, 'utf8');
  
  // Check if already converted
  if (content.includes('id="header-container"')) {
    console.log('⏭️  Already using shared header');
    return;
  }
  
  // Find and replace the header section
  // Pattern: from <nav to </nav> including any scripts after it
  const headerPattern = /<nav class="fixed[\s\S]*?<\/nav>[\s\S]*?(?=<main)/;
  
  const replacement = `<!-- Header Container - Loaded dynamically -->
<div id="header-container"></div>

`;
  
  const newContent = content.replace(headerPattern, replacement);
  
  if (newContent === content) {
    console.log('❌ Could not find header to replace');
    return;
  }
  
  // Add loader script before </body> if not present
  if (!newContent.includes('header-loader.js')) {
    const finalContent = newContent.replace(
      '</body>',
      '\n<!-- Load header dynamically -->\n<script src="/header-loader.js"></script>\n</body>'
    );
    fs.writeFileSync(file, finalContent, 'utf8');
  } else {
    fs.writeFileSync(file, newContent, 'utf8');
  }
  
  console.log('✅ Successfully converted to shared header');
});

console.log('\n✨ Done!');
