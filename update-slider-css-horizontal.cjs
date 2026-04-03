const fs = require('fs');

const filePath = 'before-after.html';
let content = fs.readFileSync(filePath, 'utf8');

// Find and replace the CSS for horizontal image layout
const oldCSS = `      /* Before/After Comparison Slider Styles */
      .comparison-slider {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
      
      .image-after,
      .image-before {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 200%; /* Double height to show full stacked image */
        object-fit: cover;
      }
      
      /* Show bottom half of stacked image (after) */
      .image-after {
        object-position: center bottom;
        transform: translateY(-50%);
      }
      
      /* Show top half of stacked image (before) */
      .image-before {
        object-position: center top;
        transform: translateY(0);
        clip-path: inset(0 50% 0 0);
      }`;

const newCSS = `      /* Before/After Comparison Slider Styles */
      .comparison-slider {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
      
      .image-after,
      .image-before {
        position: absolute;
        top: 0;
        left: 0;
        width: 200%; /* Double width to show full side-by-side image */
        height: 100%;
        object-fit: cover;
      }
      
      /* Show right half of side-by-side image (after) */
      .image-after {
        object-position: right center;
        transform: translateX(-50%);
      }
      
      /* Show left half of side-by-side image (before) */
      .image-before {
        object-position: left center;
        transform: translateX(0);
        clip-path: inset(0 50% 0 0);
      }`;

content = content.replace(oldCSS, newCSS);

fs.writeFileSync(filePath, content, 'utf8');
console.log('✅ Updated CSS for horizontal image layout');
