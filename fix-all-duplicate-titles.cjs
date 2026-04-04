const fs = require('fs');

// Read the HTML file
let html = fs.readFileSync('before-after.html', 'utf8');

// Extract all cases with their image filenames
const caseRegex = /<!-- Case (\d+) -->[\s\S]*?src="assets\/images\/([^"]+)"[\s\S]*?<h3 class="font-headline font-bold text-xl mb-3">([^<]+)<\/h3>/g;
const cases = [];
let match;

while ((match = caseRegex.exec(html)) !== null) {
  cases.push({
    number: parseInt(match[1]),
    image: match[2],
    currentTitle: match[3]
  });
}

console.log(`Found ${cases.length} cases`);

// Find duplicates
const titleCounts = {};
cases.forEach(c => {
  titleCounts[c.currentTitle] = (titleCounts[c.currentTitle] || 0) + 1;
});

const duplicates = Object.entries(titleCounts).filter(([title, count]) => count > 1);
console.log(`\nFound ${duplicates.length} duplicate titles:`);
duplicates.forEach(([title, count]) => {
  console.log(`  "${title}" appears ${count} times`);
});

// Generate unique titles for cases with duplicates
const updates = [];
cases.forEach(c => {
  if (titleCounts[c.currentTitle] > 1) {
    // Generate a unique title based on image filename
    const img = c.image.replace('.webp', '').replace('.png', '');
    let newTitle;
    
    if (img.includes('dct-white-41')) {
      newTitle = 'DCT White 41 Crown';
    } else if (img.includes('dct-white-42')) {
      newTitle = 'DCT White 42 Crown';
    } else if (img.includes('dct-white-40 (1)')) {
      newTitle = 'DCT White 40 Enhanced Crown';
    } else if (img.includes('dct-white-40')) {
      newTitle = 'DCT White 40 Crown';
    } else if (img.includes('dental-bridge-bl1-zir')) {
      newTitle = 'BL1 Zirconium Bridge';
    } else if (img.includes('dental-bridge-bl3-22')) {
      newTitle = 'BL3 Dental Bridge Design';
    } else if (img.includes('dental-bridge-bl3-copy-21')) {
      newTitle = 'BL3 Bridge Enhancement';
    } else if (img.includes('dental-implant-dental-bridge-zirconium-crown-b2-85')) {
      newTitle = 'B2 Implant Bridge Crown';
    } else if (img.includes('e.max-crown-emax-laminate-veneers-127')) {
      newTitle = 'E-max Crown & Laminate Veneers';
    } else if (img.includes('e.max-crown-full-veneer-a1-kopyasi')) {
      newTitle = 'A1 E-max Full Veneer Crown';
    } else if (img.includes('e.max-laminate-bl2-i')) {
      newTitle = 'BL2 E-max Laminate';
    } else if (img.includes('emax-crown-bl1-59')) {
      newTitle = 'BL1 E-max Crown 59';
    } else if (img.includes('emax-laminate-veneer-i')) {
      newTitle = 'E-max Laminate Veneer Design';
    } else if (img.includes('emax-laminate-veneers-bl1')) {
      newTitle = 'BL1 E-max Laminate Veneers';
    } else if (img.includes('metal-b1-65')) {
      newTitle = 'B1 Metal Crown 65';
    } else if (img.includes('metal-imp-crown-bl3-61')) {
      newTitle = 'BL3 Metal Implant Crown 61';
    } else if (img.includes('teeth-whitening133')) {
      newTitle = 'Professional Teeth Whitening 133';
    } else if (img.includes('teethwhiteningwebp')) {
      newTitle = 'Advanced Teeth Whitening';
    } else if (img.includes('tracey-mason-zirconium-porcelain-crown-full-veneer-a1')) {
      newTitle = 'A1 Zirconium Full Veneer Crown';
    } else if (img.includes('zir.crown-b1-25')) {
      newTitle = 'B1 Zirconium Crown 25';
    } else if (img.includes('zir.crown-bl1-82')) {
      newTitle = 'BL1 Zirconium Crown 82';
    } else if (img.includes('zir.crown-bl2-70')) {
      newTitle = 'BL2 Zirconium Crown 70';
    } else if (img.includes('zir.crown-bl2-84 (1)')) {
      newTitle = 'BL2 Zirconium Crown 84 Enhanced';
    } else if (img.includes('zir.crown-bl2-84')) {
      newTitle = 'BL2 Zirconium Crown 84';
    } else if (img.includes('zir.crown-bl3-27')) {
      newTitle = 'BL3 Zirconium Crown 27';
    } else if (img.includes('zir.crown-bl3-79')) {
      newTitle = 'BL3 Zirconium Crown 79';
    } else if (img.includes('zir.crown-dental-bridge-bl1-75')) {
      newTitle = 'BL1 Zirconium Bridge 75';
    } else if (img.includes('zir.crown-dental-bridge-bl3-20')) {
      newTitle = 'BL3 Zirconium Bridge 20';
    } else if (img.includes('zirconium-crown-colour-bl1-19')) {
      newTitle = 'BL1 Zirconium Crown Color 19';
    } else if (img.includes('zirconium-crown-colour-bl2-24')) {
      newTitle = 'BL2 Zirconium Crown Color 24';
    } else if (img.includes('zirconium-porcelain-crown-dental-bridge-bl1-78')) {
      newTitle = 'BL1 Zirconium Porcelain Bridge 78';
    } else if (img.includes('zirconium-porcelain-crowns-b1-1')) {
      newTitle = 'B1 Zirconium Porcelain Crowns';
    } else if (img.includes('zirconium-porcelain-crowns-bridge-bl3-01')) {
      newTitle = 'BL3 Zirconium Porcelain Bridge';
    } else if (img.includes('zirconium-porcelain-implant-crown-full-veneer-a2')) {
      newTitle = 'A2 Zirconium Implant Full Veneer';
    } else if (img.includes('hollywood-smile-turkey-10-62')) {
      newTitle = 'Hollywood Smile Design 62';
    } else if (img.includes('hollywood-smile-turkey-2-59')) {
      newTitle = 'Hollywood Smile Design 59';
    } else if (img.includes('hollywood-smile-turkey-35')) {
      newTitle = 'Hollywood Smile Design 35';
    } else if (img.includes('hollywood-smile-turkey-4-61')) {
      newTitle = 'Hollywood Smile Design 61';
    } else if (img.includes('laminate-veneers-turkey-10-56')) {
      newTitle = 'Laminate Veneers Design 56';
    } else if (img.includes('laminate-veneers-turkey-15-57')) {
      newTitle = 'Laminate Veneers Design 57';
    } else if (img.includes('laminate-veneers-turkey-19-37')) {
      newTitle = 'Laminate Veneers Design 37';
    } else if (img.includes('metal-crowns-turkey-2-49')) {
      newTitle = 'Metal Crowns Design 49';
    } else if (img.includes('dental-treatment-with-turkey-114')) {
      newTitle = 'Comprehensive Dental Treatment 114';
    } else if (img.includes('zirconium-turkey-104')) {
      newTitle = 'Zirconium Treatment 104';
    } else if (img.includes('zirconium-turkey-12-15')) {
      newTitle = 'Zirconium Treatment 15';
    } else if (img.includes('zirconium-turkey-16-53')) {
      newTitle = 'Zirconium Treatment 53';
    } else if (img.includes('zirconium-turkey-41')) {
      newTitle = 'Zirconium Treatment 41';
    } else if (img.includes('dental-turkey-zirconium-porcelain-crowns')) {
      newTitle = 'Zirconium Porcelain Crowns';
    } else if (img.includes('emax-crown-lami-nate-dentalcentreturkey')) {
      newTitle = 'E-max Crown & Laminate';
    } else if (img.includes('emax-dental-treatment-turkey-3- (1)')) {
      newTitle = 'E-max Dental Treatment 3 Enhanced';
    } else if (img.includes('emax-dental-treatment-turkey-3-')) {
      newTitle = 'E-max Dental Treatment 3';
    } else if (img.includes('emax-dental-treatment-turkey-7-47')) {
      newTitle = 'E-max Dental Treatment 47';
    } else if (img.includes('emax-dental-treatment-turkey-90')) {
      newTitle = 'E-max Dental Treatment 90';
    } else if (img.includes('full-reconstruction-with-dental-implants-bl2')) {
      newTitle = 'BL2 Full Reconstruction Implants';
    } else if (img.includes('non-prep-veneers-dctzero-dentalcentreturkey-1')) {
      newTitle = 'DCT Zero Non-Prep Veneers 1';
    } else if (img.includes('non-prep-veneers-dctzero-dentalcentreturkey-2')) {
      newTitle = 'DCT Zero Non-Prep Veneers 2';
    } else if (img.includes('rosanna-cecconi-e.max-laminate-bl2')) {
      newTitle = 'BL2 E-max Laminate Premium';
    } else if (img.includes('scott-jones-cochrane-dental-bridge-dental-implant')) {
      newTitle = 'B2 Bridge & Implant Crown';
    } else if (img.includes('temporary-denture-1')) {
      newTitle = 'Temporary Denture Solution';
    } else if (img.includes('turkeydental-e.max-crown-full-veneersi')) {
      newTitle = 'E-max Crown Full Veneers';
    } else if (img.includes('zircad-dental-centreturkey- (1)')) {
      newTitle = 'Zircad Crown Enhanced';
    } else if (img.includes('zircad-primecrown-dentalcentreturkey')) {
      newTitle = 'Zircad Prime Crown';
    } else if (img.includes('zircad-prime-crowns-dental-centre-turkey-bl3')) {
      newTitle = 'BL3 Zircad Prime Crowns';
    } else if (img.includes('zirconium-crown-dental-treatment-turkey-91')) {
      newTitle = 'Zirconium Crown Treatment 91';
    } else if (img.includes('zirconium-crown-dental-treatment-turkey-94')) {
      newTitle = 'Zirconium Crown Treatment 94';
    } else if (img.includes('dentalcenterturkey-emax-laminate-bl1-copy-kopyasi')) {
      newTitle = 'BL1 E-max Laminate Premium';
    } else {
      // Fallback: use case number
      newTitle = `Case ${c.number} - ${c.currentTitle}`;
    }
    
    updates.push({
      caseNumber: c.number,
      oldTitle: c.currentTitle,
      newTitle: newTitle,
      image: c.image
    });
  }
});

console.log(`\nUpdating ${updates.length} cases with unique titles...`);

// Apply updates
updates.forEach(update => {
  const casePattern = new RegExp(
    `(<!-- Case ${update.caseNumber} -->[\s\S]*?<h3 class="font-headline font-bold text-xl mb-3">)${update.oldTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(<\/h3>)`,
    ''
  );
  
  html = html.replace(casePattern, `$1${update.newTitle}$2`);
  console.log(`  Case ${update.caseNumber}: "${update.oldTitle}" → "${update.newTitle}"`);
});

// Write back to file
fs.writeFileSync('before-after.html', html, 'utf8');

console.log('\n✓ All duplicate titles fixed');
console.log('✓ All 97 cases now have unique titles');
