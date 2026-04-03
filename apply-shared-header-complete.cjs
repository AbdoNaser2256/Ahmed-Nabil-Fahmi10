const fs = require('fs');

// Mobile menu CSS that needs to be added to each page
const MOBILE_MENU_CSS = `
      /* CSS-only hamburger menu icon */
      .hamburger-icon {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 24px;
        height: 18px;
      }
      .hamburger-icon span {
        display: block;
        height: 2px;
        background-color: currentColor;
        border-radius: 2px;
      }
      
      /* Mobile menu slide-in animation */
      .mobile-menu-backdrop {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 999999 !important;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease;
      }
      .mobile-menu-backdrop.active {
        opacity: 1;
        pointer-events: auto;
      }
      
      .mobile-menu-drawer {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        width: 85%;
        max-width: 400px;
        background: white;
        z-index: 9999999 !important;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        overflow-y: auto;
        box-shadow: -4px 0 20px rgba(0, 0, 0, 0.15);
      }
      .mobile-menu-drawer.active {
        transform: translateX(0);
      }
      
      /* Lock body scroll when menu is open */
      body.menu-open {
        overflow: hidden;
      }
      
      /* Custom scrollbar for mobile menu drawer */
      .mobile-menu-drawer::-webkit-scrollbar {
        width: 6px;
      }
      .mobile-menu-drawer::-webkit-scrollbar-track {
        background: transparent;
      }
      .mobile-menu-drawer::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.2);
        border-radius: 3px;
      }
      .mobile-menu-drawer::-webkit-scrollbar-thumb:hover {
        background: rgba(0, 0, 0, 0.3);
      }`;

function applySharedHeader(file) {
  console.log(`\n📄 Processing: ${file}`);
  
  let content = fs.readFileSync(file, 'utf8');
  
  // Check if already converted
  if (content.includes('id="header-container"')) {
    console.log('⏭️  Already has header container');
    
    // But check if CSS is missing
    if (!content.includes('hamburger-icon')) {
      console.log('   ⚠️  Missing mobile menu CSS, adding it...');
      
      // Find the last </style> tag and add CSS before it
      const styleEndPattern = /(\s*)<\/style>/;
      const match = content.match(styleEndPattern);
      
      if (match) {
        content = content.replace(styleEndPattern, `${MOBILE_MENU_CSS}\n$1</style>`);
        fs.writeFileSync(file, content, 'utf8');
        console.log('   ✅ Added mobile menu CSS');
      } else {
        console.log('   ❌ Could not find </style> tag');
      }
    } else {
      console.log('   ✅ Already has mobile menu CSS');
    }
    
    return;
  }
  
  // Step 1: Replace header HTML with placeholder
  const headerPattern = /<nav class="fixed[\s\S]*?<\/nav>[\s\S]*?(?=<main)/;
  content = content.replace(headerPattern, `<!-- Header Container - Loaded dynamically -->
<div id="header-container"></div>

`);
  
  if (!content.includes('id="header-container"')) {
    console.log('❌ Could not replace header');
    return;
  }
  
  console.log('✅ Replaced header with placeholder');
  
  // Step 2: Add mobile menu CSS if not present
  if (!content.includes('hamburger-icon')) {
    // Find the last </style> tag and add CSS before it
    const styleEndPattern = /(\s*)<\/style>/;
    const match = content.match(styleEndPattern);
    
    if (match) {
      content = content.replace(styleEndPattern, `${MOBILE_MENU_CSS}\n$1</style>`);
      console.log('✅ Added mobile menu CSS');
    } else {
      console.log('⚠️  Could not find </style> tag to add CSS');
    }
  }
  
  // Step 3: Add loader script in <head> with defer if not present
  if (!content.includes('header-loader.js')) {
    // Add script in head with defer attribute
    content = content.replace(
      '</head>',
      '  <script src="/header-loader.js" defer></script>\n</head>'
    );
    console.log('✅ Added header loader script in <head> with defer');
  }
  
  fs.writeFileSync(file, content, 'utf8');
  console.log('✅ Successfully converted to shared header');
}

// Get files from command line arguments
const files = process.argv.slice(2);

if (files.length === 0) {
  console.log('Usage: node apply-shared-header-complete.cjs <file1.html> <file2.html> ...');
  console.log('\nThis script will:');
  console.log('1. Replace header HTML with placeholder div');
  console.log('2. Add mobile menu CSS to the page');
  console.log('3. Add header-loader.js script');
  process.exit(1);
}

console.log(`🚀 Converting ${files.length} file(s) to use shared header\n`);

files.forEach(file => {
  try {
    applySharedHeader(file);
  } catch (err) {
    console.log(`❌ Error processing ${file}: ${err.message}`);
  }
});

console.log('\n✨ Done!');
