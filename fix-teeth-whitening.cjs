const fs = require('fs');

let content = fs.readFileSync('teeth-whitening.html', 'utf8');

// Replace from <nav to the script after </nav>
const pattern = /<nav class="fixed[\s\S]*?<\/script>\s*\n\s*\n\s*\n/;

content = content.replace(pattern, `<!-- Header Container - Loaded dynamically -->
<div id="header-container"></div>

`);

fs.writeFileSync('teeth-whitening.html', content, 'utf8');
console.log('✅ Fixed teeth-whitening.html');
