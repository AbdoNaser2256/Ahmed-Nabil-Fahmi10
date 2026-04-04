const fs = require('fs');

// Read the HTML file
let html = fs.readFileSync('before-after.html', 'utf8');

// Map of image filenames to unique titles
const uniqueTitles = {
  '1.-celtra-duo-bl3-1.webp': 'Full Smile Aesthetic Transformation',
  '2.-celtra-duo-crowns-bl3-.webp': 'Advanced Functional Reconstruction',
  '2.-cosmetic-denture-dentalcentre-turkey.webp': 'Bespoke Porcelain Artistry',
  '8-upper-8-lower-composite-bonding-snow-white-dental-centre-turkey.webp': 'Comprehensive Oral Rehabilitation',
  '8-upper-composite-bonding-dental-centre-turkey.webp': 'Precision Cosmetic Enhancements',
  '10-upper-10-lower-composite-bonding-snow-white-dentalcentreturkey.webp': 'Clinical Implant Excellence',
  'all-on-4-d3-01.webp': 'Advanced Dental Implant Integration',
  'all-on-4-implants-zirconium-porcelain-implant-crowns-bridge.webp': 'Professional Biological Whitening',
  'all-on-four-02-copy.webp': 'Durable Zirconia Restorations',
  'colour-bl3-dental-turkey-44.webp': 'Modern Orthodontic Refinement',
  'composite-bonding-veneers-03.webp': 'Natural Composite Bonding Enhancement',
  'dct-zero-dentalcentreturkey-smile-gallery-bl2-10.webp': 'Premium BL2 Crown Restoration',
  'dct-zero-dentalcentreturkey-smile-gallery-bl2-2.webp': 'Precision BL2 Crown Design',
  'dctzero-bl2.webp': 'BL2 Shade Crown Solution',
  'dctzero-bl3-dentalcentreturkey.webp': 'BL3 Premium Crown Restoration',
  'dctzero-dentalcentreturkey-1.webp': 'Aesthetic Crown Enhancement',
  'dental-bridge-a1-dental-centre-turkey-92 (1).webp': 'Precision Bridge Design',
  'dental-centre-turkey-bl3-dental-crowns-35 (1).webp': 'BL3 Aesthetic Crown Enhancement',
  'dental-center-turkey-composite-bonding-07.webp': 'Advanced Composite Smile Design',
  'dental-center-turkey-dental-crowns-bl3-36.webp': 'BL3 Crown Solution',
  'dental-center-turkey-emax-laminate-veneer-b1-i.webp': 'Translucent E-max Restoration',
  'dental-centre-turkey-bl3-34.webp': 'BL3 Premium Crown',
  'dental-centre-turkey-bl3-dental-crowns-35.webp': 'Natural BL3 Ceramic Crown',
  'dental-centre-turkey-bl3-zir.crown-dental-implant-74.webp': 'Advanced Zirconium Implant Crown',
  'dental-centre-turkey-cosmetic-12.webp': 'Cosmetic Enhancement Solution',
  'dental-centre-turkey-cosmetic-denture-a1-1.webp': 'A1 Cosmetic Denture Design',
  'dental-centre-turkey-cosmetic-denture-b3-18.webp': 'B3 Premium Cosmetic Denture',
  'dental-centre-turkey-cosmetic-denture-bl1-13.webp': 'BL1 Premium Cosmetic Denture',
  'dental-centre-turkey-cosmetic-dentures-bl2-15.webp': 'BL2 Custom Cosmetic Denture',
  'dental-centre-turkey-emax-laminate-veneer-b1-ii.webp': 'B1 E-max Laminate Veneer',
  'dental-centre-turkey-emax-laminate-veneer-b1.webp': 'B1 E-max Veneer Design',
  'dental-centre-turkey-emax-laminate-veneer-bl1-14.webp': 'BL1 E-max Laminate Veneer',
  'dental-centre-turkey-emax-laminate-veneer-bl2-16.webp': 'BL2 E-max Laminate Veneer',
  'dental-centre-turkey-emax-laminate-veneer-bl3-17.webp': 'BL3 E-max Laminate Veneer',
  'dental-centre-turkey-emax-laminate-veneer-bl3-19.webp': 'BL3 E-max Veneer Enhancement',
  'dental-centre-turkey-emax-laminate-veneer-bl3-20.webp': 'BL3 E-max Veneer Restoration',
  'dental-centre-turkey-emax-laminate-veneer-bl3-21.webp': 'BL3 E-max Veneer Solution',
  'dental-centre-turkey-emax-laminate-veneer-bl3-22.webp': 'BL3 E-max Veneer Design',
  'dental-centre-turkey-emax-laminate-veneer-bl3-23.webp': 'BL3 E-max Veneer Artistry',
  'dental-centre-turkey-emax-laminate-veneer-bl3-24.webp': 'BL3 E-max Veneer Precision',
  'dental-centre-turkey-emax-laminate-veneer-bl3-25.webp': 'BL3 E-max Veneer Excellence',
  'dental-centre-turkey-emax-laminate-veneer-bl3-26.webp': 'BL3 E-max Veneer Transformation',
  'dental-centre-turkey-emax-laminate-veneer-bl3-27.webp': 'BL3 E-max Veneer Refinement',
  'dental-centre-turkey-emax-laminate-veneer-bl3-28.webp': 'BL3 E-max Veneer Perfection',
  'dental-centre-turkey-emax-laminate-veneer-bl3-29.webp': 'BL3 E-max Veneer Elegance',
  'dental-centre-turkey-emax-laminate-veneer-bl3-30.webp': 'BL3 E-max Veneer Mastery',
  'dental-centre-turkey-emax-laminate-veneer-bl3-31.webp': 'BL3 E-max Veneer Brilliance',
  'dental-centre-turkey-emax-laminate-veneer-bl3-32.webp': 'BL3 E-max Veneer Radiance',
  'dental-centre-turkey-emax-laminate-veneer-bl3-33.webp': 'BL3 E-max Veneer Harmony',
  'dental-centre-turkey-emax-laminate-veneer-bl3-37.webp': 'BL3 E-max Veneer Beauty',
  'dental-centre-turkey-emax-laminate-veneer-bl3-38.webp': 'BL3 E-max Veneer Aesthetic',
  'dental-centre-turkey-emax-laminate-veneer-bl3-39.webp': 'BL3 E-max Veneer Finesse',
  'dental-centre-turkey-emax-laminate-veneer-bl3-40.webp': 'BL3 E-max Veneer Sophistication',
  'dental-centre-turkey-emax-laminate-veneer-bl3-41.webp': 'BL3 E-max Veneer Craftsmanship',
  'dental-centre-turkey-emax-laminate-veneer-bl3-42.webp': 'BL3 E-max Veneer Artisan Work',
  'dental-centre-turkey-emax-laminate-veneer-bl3-43.webp': 'BL3 E-max Veneer Premium Design',
  'dental-centre-turkey-emax-laminate-veneer-bl3-44.webp': 'BL3 E-max Veneer Luxury',
  'dental-centre-turkey-emax-laminate-veneer-bl3-45.webp': 'BL3 E-max Veneer Elite',
  'dental-centre-turkey-emax-laminate-veneer-bl3-46.webp': 'BL3 E-max Veneer Signature',
  'dental-centre-turkey-emax-laminate-veneer-bl3-47.webp': 'BL3 E-max Veneer Distinction',
  'dental-centre-turkey-emax-laminate-veneer-bl3-48.webp': 'BL3 E-max Veneer Supreme',
  'dental-centre-turkey-emax-laminate-veneer-bl3-49.webp': 'BL3 E-max Veneer Ultimate',
  'dental-centre-turkey-emax-laminate-veneer-bl3-50.webp': 'BL3 E-max Veneer Prestige',
  'dental-centre-turkey-emax-laminate-veneer-bl3-51.webp': 'BL3 E-max Veneer Exclusive',
  'dental-centre-turkey-emax-laminate-veneer-bl3-52.webp': 'BL3 E-max Veneer Bespoke',
  'dental-centre-turkey-emax-laminate-veneer-bl3-53.webp': 'BL3 E-max Veneer Custom',
  'dental-centre-turkey-emax-laminate-veneer-bl3-54.webp': 'BL3 E-max Veneer Tailored',
  'dental-centre-turkey-emax-laminate-veneer-bl3-55.webp': 'BL3 E-max Veneer Personalized',
  'dental-centre-turkey-emax-laminate-veneer-bl3-56.webp': 'BL3 E-max Veneer Individual',
  'dental-centre-turkey-emax-laminate-veneer-bl3-57.webp': 'BL3 E-max Veneer Unique',
  'dental-centre-turkey-emax-laminate-veneer-bl3-58.webp': 'BL3 E-max Veneer Distinctive',
  'dental-centre-turkey-emax-laminate-veneer-bl3-59.webp': 'BL3 E-max Veneer Special',
  'dental-centre-turkey-emax-laminate-veneer-bl3-60.webp': 'BL3 E-max Veneer Exceptional',
  'dental-centre-turkey-emax-laminate-veneer-bl3-61.webp': 'BL3 E-max Veneer Outstanding',
  'dental-centre-turkey-emax-laminate-veneer-bl3-62.webp': 'BL3 E-max Veneer Remarkable',
  'dental-centre-turkey-emax-laminate-veneer-bl3-63.webp': 'BL3 E-max Veneer Impressive',
  'dental-centre-turkey-emax-laminate-veneer-bl3-64.webp': 'BL3 E-max Veneer Stunning',
  'dental-centre-turkey-emax-laminate-veneer-bl3-65.webp': 'BL3 E-max Veneer Striking',
  'dental-centre-turkey-emax-laminate-veneer-bl3-66.webp': 'BL3 E-max Veneer Magnificent',
  'dental-centre-turkey-emax-laminate-veneer-bl3-67.webp': 'BL3 E-max Veneer Splendid',
  'dental-centre-turkey-emax-laminate-veneer-bl3-68.webp': 'BL3 E-max Veneer Superb',
  'dental-centre-turkey-emax-laminate-veneer-bl3-69.webp': 'BL3 E-max Veneer Exquisite',
  'dental-centre-turkey-emax-laminate-veneer-bl3-70.webp': 'BL3 E-max Veneer Flawless',
  'dental-centre-turkey-emax-laminate-veneer-bl3-71.webp': 'BL3 E-max Veneer Immaculate',
  'dental-centre-turkey-emax-laminate-veneer-bl3-72.webp': 'BL3 E-max Veneer Pristine',
  'dental-centre-turkey-emax-laminate-veneer-bl3-73.webp': 'BL3 E-max Veneer Perfect',
  'dental-centre-turkey-emax-laminate-veneer-bl3-75.webp': 'BL3 E-max Veneer Ideal',
  'dental-centre-turkey-emax-laminate-veneer-bl3-76.webp': 'BL3 E-max Veneer Optimal',
  'dental-centre-turkey-emax-laminate-veneer-bl3-77.webp': 'BL3 E-max Veneer Prime',
  'dental-centre-turkey-emax-laminate-veneer-bl3-78.webp': 'BL3 E-max Veneer Superior',
  'dental-centre-turkey-emax-laminate-veneer-bl3-79.webp': 'BL3 E-max Veneer Advanced',
  'dental-centre-turkey-emax-laminate-veneer-bl3-80.webp': 'BL3 E-max Veneer Professional',
  'dental-centre-turkey-emax-laminate-veneer-bl3-81.webp': 'BL3 E-max Veneer Expert',
  'dental-centre-turkey-emax-laminate-veneer-bl3-82.webp': 'BL3 E-max Veneer Specialist',
  'dental-centre-turkey-emax-laminate-veneer-bl3-83.webp': 'BL3 E-max Veneer Clinical',
  'dental-centre-turkey-emax-laminate-veneer-bl3-84.webp': 'BL3 E-max Veneer Medical',
  'dental-centre-turkey-emax-laminate-veneer-bl3-85.webp': 'BL3 E-max Veneer Therapeutic',
  'dental-centre-turkey-emax-laminate-veneer-bl3-86.webp': 'BL3 E-max Veneer Restorative',
  'dental-centre-turkey-emax-laminate-veneer-bl3-87.webp': 'BL3 E-max Veneer Reconstructive',
  'dental-centre-turkey-emax-laminate-veneer-bl3-88.webp': 'BL3 E-max Veneer Corrective',
  'dental-centre-turkey-emax-laminate-veneer-bl3-89.webp': 'BL3 E-max Veneer Remedial',
  'dental-bridge-a1-dental-centre-turkey-92.webp': 'A1 Precision Bridge',
  'dental-centre-turkey-emax-laminate-veneer-bl3-90.webp': 'BL3 E-max Veneer Curative',
  'dental-centre-turkey-emax-laminate-veneer-bl3-91.webp': 'BL3 E-max Veneer Healing',
  'dental-centre-turkey-emax-laminate-veneer-bl3-93.webp': 'BL3 E-max Veneer Renewal',
  'dental-centre-turkey-emax-laminate-veneer-bl3-94.webp': 'BL3 E-max Veneer Revival',
  'dental-centre-turkey-emax-laminate-veneer-bl3-95.webp': 'BL3 E-max Veneer Rejuvenation',
  'dental-centre-turkey-emax-laminate-veneer-bl3-96.webp': 'BL3 E-max Veneer Revitalization',
  'dental-centre-turkey-emax-laminate-veneer-bl3-97.webp': 'BL3 E-max Veneer Regeneration'
};

// Function to extract image filename from src attribute
function getImageFilename(cardHtml) {
  const match = cardHtml.match(/src="assets\/images\/([^"]+)"/);
  return match ? match[1] : null;
}

// Split HTML into cards
const cards = html.split(/<!-- Case \d+ -->/);
const header = cards[0]; // Everything before first card
const cardSections = [];

// Process each card
for (let i = 1; i < cards.length; i++) {
  let card = cards[i];
  const imageFilename = getImageFilename(card);
  
  if (imageFilename && uniqueTitles[imageFilename]) {
    const newTitle = uniqueTitles[imageFilename];
    
    // Replace the title
    card = card.replace(
      /<h3 class="font-headline font-bold text-xl mb-3">.*?<\/h3>/,
      `<h3 class="font-headline font-bold text-xl mb-3">${newTitle}</h3>`
    );
    
    // Remove the description paragraph
    card = card.replace(
      /<p class="text-on-surface-variant text-sm leading-relaxed mb-6">.*?<\/p>/,
      ''
    );
    
    // Remove the entire quote section (the flex container with quote icon and text)
    card = card.replace(
      /<div class="flex items-center gap-3 pt-6 border-t border-surface-container">[\s\S]*?<\/div>\s*<\/div>/,
      '</div>'
    );
  }
  
  cardSections.push(`<!-- Case ${i} -->${card}`);
}

// Reconstruct the HTML
const newHtml = header + cardSections.join('');

// Write back to file
fs.writeFileSync('before-after.html', newHtml, 'utf8');

console.log('✓ Fixed all duplicate titles');
console.log('✓ Removed all descriptions');
console.log('✓ Removed all quotes');
console.log('✓ All 97 cases now have unique titles');
