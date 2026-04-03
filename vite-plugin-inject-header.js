import fs from 'fs';
import path from 'path';

export default function injectHeaderPlugin() {
  let headerHTML = '';
  
  return {
    name: 'inject-header',
    
    // Load the header HTML once during build
    buildStart() {
      const headerPath = path.resolve(process.cwd(), 'public/global_header.html');
      if (fs.existsSync(headerPath)) {
        headerHTML = fs.readFileSync(headerPath, 'utf-8');
        console.log('✅ Loaded global_header.html for injection');
      } else {
        console.warn('⚠️  global_header.html not found');
      }
    },
    
    // Transform HTML files during build
    transformIndexHtml(html) {
      if (!headerHTML) return html;
      
      // Replace the header container with actual header HTML
      return html.replace(
        '<div id="header-container"></div>',
        headerHTML
      );
    }
  };
}
