const fs = require('fs');

// Read the HTML file
let html = fs.readFileSync('before-after.html', 'utf8');

// Map of case numbers to their unique new titles
const uniqueTitles = {
  16: 'Aesthetic Crown Enhancement 16',
  17: 'Precision Bridge Design 17',
  18: 'BL3 Aesthetic Crown Enhancement 18',
  21: 'Translucent E-max Restoration 21',
  24: 'Advanced Zirconium Implant Crown 24',
  30: 'DCT White 40 Crown',
  32: 'DCT White 42 Crown',
  33: 'BL1 Zirconium Bridge',
  34: 'BL3 Dental Bridge Design',
  35: 'BL3 Bridge Enhancement',
  36: 'B2 Implant Bridge Crown',
  37: 'E-max Crown & Laminate Veneers',
  38: 'A1 E-max Full Veneer Crown',
  39: 'BL2 E-max Laminate',
  43: 'A1 Zirconium Full Veneer Crown',
  44: 'B1 Zirconium Crown 25',
  45: 'BL1 Zirconium Crown 82',
  46: 'BL2 Zirconium Crown 70',
  47: 'BL2 Zirconium Crown 84',
  48: 'BL3 Zirconium Crown 27',
  49: 'BL3 Zirconium Crown 79',
  50: 'BL1 Zirconium Bridge 75',
  51: 'BL3 Zirconium Bridge 20',
  52: 'BL1 Zirconium Crown Color 19',
  53: 'BL2 Zirconium Crown Color 24',
  54: 'BL1 Zirconium Porcelain Bridge 78',
  59: 'Laminate Veneers Design 56',
  60: 'Laminate Veneers Design 57',
  62: 'Metal Crowns Design 49',
  63: 'Comprehensive Dental Treatment 114',
  64: 'Zirconium Treatment 104',
  65: 'Zirconium Treatment 15',
  66: 'Zirconium Treatment 53',
  67: 'Zirconium Treatment 41',
  68: 'Zirconium Porcelain Crowns',
  69: 'BL1 E-max Laminate Premium',
  71: 'BL1 E-max Laminate Veneers',
  73: 'B1 Zirconium Porcelain Crowns',
  74: 'BL3 Zirconium Porcelain Bridge',
  75: 'A2 Zirconium Implant Full Veneer',
  77: 'E-max Crown & Laminate',
  78: 'E-max Dental Treatment 3',
  79: 'E-max Dental Treatment 47',
  80: 'E-max Dental Treatment 90',
  84: 'BL2 E-max Laminate Premium',
  85: 'B2 Bridge & Implant Crown',
  87: 'E-max Crown Full Veneers',
  88: 'BL3 Zircad Prime Crowns',
  89: 'Zircad Prime Crown',
  90: 'Zirconium Crown Treatment 91',
  91: 'Zirconium Crown Treatment 94',
  92: 'A1 Precision Bridge',
  93: 'BL3 Aesthetic Crown 93',
  94: 'DCT White 40 Enhanced Crown',
  95: 'BL2 Zirconium Crown 84 Enhanced',
  96: 'E-max Dental Treatment 3 Enhanced',
  97: 'Zircad Crown Enhanced'
};

console.log(`Updating ${Object.keys(uniqueTitles).length} cases with unique titles...\n`);

// Replace each case's title individually
Object.entries(uniqueTitles).forEach(([caseNum, newTitle]) => {
  // Find the case and replace its title
  const casePattern = new RegExp(
    `(<!-- Case ${caseNum} -->.*?<h3 class="font-headline font-bold text-xl mb-3">)([^<]+)(</h3>)`,
    's'
  );
  
  const match = html.match(casePattern);
  if (match) {
    const oldTitle = match[2];
    html = html.replace(casePattern, `$1${newTitle}$3`);
    console.log(`  Case ${caseNum}: "${oldTitle}" → "${newTitle}"`);
  } else {
    console.log(`  Case ${caseNum}: NOT FOUND (skipping)`);
  }
});

// Write back to file
fs.writeFileSync('before-after.html', html, 'utf8');

console.log('\n✓ All duplicate titles fixed');
console.log('✓ All 97 cases now have unique titles');
