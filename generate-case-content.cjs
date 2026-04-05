const fs = require('fs');

// Treatment type mappings based on filename keywords
const treatments = {
  'composite-bonding': {
    titles: [
      'Natural Composite Bonding Enhancement',
      'Seamless Composite Restoration',
      'Advanced Composite Smile Design',
      'Precision Composite Bonding',
      'Conservative Composite Enhancement'
    ],
    descriptions: [
      'Expert composite bonding to restore natural tooth structure and enhance smile aesthetics with minimal intervention.',
      'Advanced composite resin application for seamless tooth restoration and color matching.',
      'Precision composite bonding technique to correct minor imperfections and create a harmonious smile.',
      'Conservative approach using high-quality composite materials for lasting aesthetic results.',
      'Skillful composite layering to achieve natural translucency and optimal tooth contour.'
    ],
    quotes: [
      'The results look so natural, nobody can tell which teeth were treated.',
      'I love how my smile looks now - it\'s exactly what I wanted.',
      'The procedure was quick and the results exceeded my expectations.',
      'My confidence has improved dramatically since the treatment.',
      'I\'m amazed at how natural and beautiful my teeth look now.'
    ]
  },
  'emax': {
    titles: [
      'E-max Porcelain Excellence',
      'Premium E-max Veneer Transformation',
      'Translucent E-max Restoration',
      'High-Strength E-max Crowns',
      'Aesthetic E-max Smile Design'
    ],
    descriptions: [
      'Ultra-thin E-max porcelain veneers providing exceptional strength and natural translucency for a flawless smile.',
      'Premium E-max ceramic restorations combining durability with lifelike aesthetics.',
      'Advanced E-max technology for minimal-prep veneers that preserve natural tooth structure.',
      'High-strength lithium disilicate E-max crowns for long-lasting aesthetic results.',
      'Precision-crafted E-max restorations with superior light transmission and color stability.'
    ],
    quotes: [
      'The E-max veneers look incredibly natural and feel comfortable.',
      'I can\'t believe how strong yet natural-looking these restorations are.',
      'The translucency is perfect - they blend seamlessly with my natural teeth.',
      'Best investment I\'ve made in my smile. The quality is outstanding.',
      'These veneers have transformed my confidence completely.'
    ]
  },
  'laminate': {
    titles: [
      'Ultra-Thin Laminate Veneers',
      'Precision Laminate Smile Makeover',
      'Minimal-Prep Laminate Transformation',
      'Custom Laminate Veneer Design',
      'Aesthetic Laminate Enhancement'
    ],
    descriptions: [
      'Ultra-thin porcelain laminates crafted for minimal tooth preparation and maximum aesthetic impact.',
      'Custom-designed laminate veneers to correct shape, color, and alignment with conservative approach.',
      'Precision-fitted laminate veneers providing natural translucency and lasting beauty.',
      'Advanced laminate technology for reversible smile enhancement with minimal intervention.',
      'Expertly crafted porcelain laminates for a Hollywood-quality smile transformation.'
    ],
    quotes: [
      'The laminates are so thin yet incredibly strong and natural-looking.',
      'I love that minimal tooth structure was removed for such amazing results.',
      'My smile looks perfect now - exactly what I envisioned.',
      'The attention to detail in crafting these veneers is remarkable.',
      'I smile with confidence now, thanks to these beautiful laminates.'
    ]
  },
  'zirconium': {
    titles: [
      'High-Strength Zirconium Crowns',
      'Durable Zirconium Restoration',
      'Premium Zirconium Bridge',
      'Metal-Free Zirconium Excellence',
      'Advanced Zirconium Implant Crown'
    ],
    descriptions: [
      'Superior-strength zirconium crowns combining exceptional durability with natural aesthetics.',
      'Metal-free zirconium restorations providing biocompatibility and long-term stability.',
      'High-performance zirconium bridges engineered for strength and aesthetic excellence.',
      'Advanced zirconium oxide technology for crowns that resist wear and staining.',
      'Precision-milled zirconium restorations with optimal fit and natural appearance.'
    ],
    quotes: [
      'These zirconium crowns are incredibly strong yet look completely natural.',
      'I appreciate the metal-free option that still provides exceptional durability.',
      'The fit and feel are perfect - I forget they\'re not my natural teeth.',
      'Outstanding quality and craftsmanship in these restorations.',
      'My smile looks natural and I have complete confidence in the strength.'
    ]
  },
  'implant': {
    titles: [
      'Permanent Dental Implant Solution',
      'Advanced Implant Restoration',
      'Precision Implant Crown Placement',
      'Full-Arch Implant Reconstruction',
      'Seamless Implant Integration'
    ],
    descriptions: [
      'State-of-the-art dental implants providing permanent tooth replacement with natural function and aesthetics.',
      'Precision-placed implants with custom crowns for seamless integration and lasting results.',
      'Advanced implant technology restoring both function and confidence with biocompatible materials.',
      'Comprehensive implant solution combining surgical excellence with aesthetic crown design.',
      'Permanent implant-supported restorations engineered for optimal stability and natural appearance.'
    ],
    quotes: [
      'The implants feel just like my natural teeth - I forget they\'re there.',
      'Life-changing procedure that restored my ability to eat and smile confidently.',
      'The stability and natural feel of these implants is remarkable.',
      'I wish I had done this sooner - the results are incredible.',
      'Finally, a permanent solution that looks and functions perfectly.'
    ]
  },
  'denture': {
    titles: [
      'Premium Cosmetic Denture',
      'Natural-Looking Denture Solution',
      'Advanced Denture Aesthetics',
      'Custom Cosmetic Denture Design',
      'Comfortable Aesthetic Denture'
    ],
    descriptions: [
      'Expertly crafted cosmetic dentures providing natural aesthetics and comfortable fit for confident smiling.',
      'Premium denture design with attention to gum color, tooth shape, and facial harmony.',
      'Advanced denture technology combining comfort, function, and lifelike appearance.',
      'Custom-designed dentures with natural tooth arrangement and optimal facial support.',
      'High-quality cosmetic dentures engineered for stability and aesthetic excellence.'
    ],
    quotes: [
      'These dentures look so natural, people are surprised when I tell them.',
      'The comfort and fit are exceptional - I can eat and speak normally.',
      'My confidence has returned thanks to these beautiful dentures.',
      'The attention to detail in creating a natural smile is impressive.',
      'I feel like myself again with these comfortable, natural-looking dentures.'
    ]
  },
  'whitening': {
    titles: [
      'Professional Teeth Whitening',
      'Advanced Whitening Treatment',
      'Brilliant Smile Whitening',
      'Clinical Whitening Excellence',
      'Safe Professional Whitening'
    ],
    descriptions: [
      'Professional-grade whitening treatment delivering dramatic results while protecting enamel health.',
      'Advanced whitening protocol removing deep stains for a brilliantly white smile.',
      'Clinical whitening system providing safe, effective results in a single session.',
      'Expert whitening treatment customized to achieve your desired shade safely.',
      'Professional whitening technology for long-lasting brightness and confidence.'
    ],
    quotes: [
      'My teeth are several shades whiter and the results look natural.',
      'The whitening was comfortable and the results are amazing.',
      'I can\'t stop smiling - my teeth have never looked this bright.',
      'Professional whitening made such a difference in my appearance.',
      'The results exceeded my expectations - my smile is radiant now.'
    ]
  },
  'hollywood': {
    titles: [
      'Complete Hollywood Smile Makeover',
      'Luxury Hollywood Smile Design',
      'Full Smile Transformation',
      'Celebrity-Style Smile Makeover',
      'Comprehensive Aesthetic Smile Design'
    ],
    descriptions: [
      'Complete smile transformation combining multiple procedures for a stunning Hollywood-quality result.',
      'Comprehensive smile design addressing color, shape, and alignment for red-carpet-ready aesthetics.',
      'Full-mouth aesthetic reconstruction creating a harmonious, camera-ready smile.',
      'Luxury smile makeover with meticulous attention to facial proportions and dental aesthetics.',
      'Complete transformation using advanced techniques for a perfectly balanced, radiant smile.'
    ],
    quotes: [
      'This smile makeover has completely transformed my life and confidence.',
      'I finally have the smile I\'ve always dreamed of - it\'s perfect.',
      'The comprehensive approach created results beyond my expectations.',
      'Every detail was considered - my smile looks natural yet stunning.',
      'I feel like a new person with this beautiful, confident smile.'
    ]
  },
  'all-on': {
    titles: [
      'All-on-4 Full Arch Restoration',
      'Complete All-on-4 Transformation',
      'Fixed All-on-4 Implant Solution',
      'Permanent All-on-4 Reconstruction',
      'Advanced All-on-4 Rehabilitation'
    ],
    descriptions: [
      'Revolutionary All-on-4 technique providing a complete fixed arch on just four implants for immediate function.',
      'Full-arch restoration using All-on-4 technology for permanent, natural-looking teeth in one procedure.',
      'Advanced All-on-4 solution combining surgical precision with aesthetic excellence for life-changing results.',
      'Complete mouth rehabilitation with All-on-4 implants offering stability and natural aesthetics.',
      'Innovative All-on-4 approach restoring full dental function with minimal implants and maximum results.'
    ],
    quotes: [
      'The All-on-4 procedure gave me back my life - I can eat anything now.',
      'I can\'t believe I have a full set of permanent teeth again.',
      'The stability and natural feel of these implants is life-changing.',
      'Best decision I ever made - my quality of life has improved dramatically.',
      'I smile without hesitation now thanks to this amazing procedure.'
    ]
  },
  'bridge': {
    titles: [
      'Fixed Dental Bridge Restoration',
      'Seamless Bridge Reconstruction',
      'Aesthetic Dental Bridge',
      'Precision Bridge Design',
      'Natural-Looking Bridge Solution'
    ],
    descriptions: [
      'Fixed dental bridge providing seamless tooth replacement with natural aesthetics and function.',
      'Precision-crafted bridge restoration for gap closure with optimal fit and appearance.',
      'Advanced bridge design combining strength and aesthetics for lasting results.',
      'Custom dental bridge engineered for natural integration and comfortable function.',
      'Expert bridge fabrication restoring smile continuity with biocompatible materials.'
    ],
    quotes: [
      'The bridge looks and feels completely natural - perfect integration.',
      'I can eat and smile confidently again thanks to this bridge.',
      'The color match is perfect - nobody can tell it\'s not my natural teeth.',
      'Excellent craftsmanship and attention to detail in this restoration.',
      'My smile is complete again and I couldn\'t be happier.'
    ]
  },
  'crown': {
    titles: [
      'Premium Dental Crown Restoration',
      'Natural Ceramic Crown',
      'Precision Crown Design',
      'Aesthetic Crown Enhancement',
      'Durable Crown Solution'
    ],
    descriptions: [
      'High-quality dental crown providing strength and natural aesthetics for long-term tooth protection.',
      'Precision-fitted crown restoration with optimal color matching and functional design.',
      'Advanced ceramic crown technology combining durability with lifelike translucency.',
      'Custom-crafted crown designed for perfect fit, function, and aesthetic integration.',
      'Expert crown fabrication using premium materials for lasting beauty and protection.'
    ],
    quotes: [
      'The crown looks exactly like my natural tooth - perfect match.',
      'I\'m impressed by the quality and natural appearance of this crown.',
      'The fit is perfect and it feels completely natural.',
      'Excellent work - the crown blends seamlessly with my other teeth.',
      'I have full confidence in both the strength and appearance.'
    ]
  },
  'veneer': {
    titles: [
      'Porcelain Veneer Transformation',
      'Custom Veneer Smile Design',
      'Aesthetic Veneer Enhancement',
      'Precision Veneer Application',
      'Natural Veneer Restoration'
    ],
    descriptions: [
      'Custom porcelain veneers crafted for optimal aesthetics and natural smile enhancement.',
      'Precision veneer application correcting shape, color, and alignment for a flawless smile.',
      'Advanced veneer technology providing minimal-prep transformation with maximum impact.',
      'Expert veneer design considering facial proportions and natural tooth characteristics.',
      'High-quality porcelain veneers engineered for lasting beauty and confident smiling.'
    ],
    quotes: [
      'These veneers have given me the smile I\'ve always wanted.',
      'The natural look and feel of these veneers is incredible.',
      'I smile constantly now - the transformation is amazing.',
      'Perfect color, shape, and fit - I couldn\'t ask for better results.',
      'My confidence has soared since getting these beautiful veneers.'
    ]
  }
};

function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function determineTreatmentType(filename) {
  const lower = filename.toLowerCase();
  
  if (lower.includes('all-on')) return 'all-on';
  if (lower.includes('composite-bonding') || lower.includes('composite bonding')) return 'composite-bonding';
  if (lower.includes('emax') || lower.includes('e.max')) return 'emax';
  if (lower.includes('laminate')) return 'laminate';
  if (lower.includes('zirconium') || lower.includes('zir.crown') || lower.includes('zircad')) return 'zirconium';
  if (lower.includes('implant')) return 'implant';
  if (lower.includes('denture')) return 'denture';
  if (lower.includes('whitening')) return 'whitening';
  if (lower.includes('hollywood')) return 'hollywood';
  if (lower.includes('bridge')) return 'bridge';
  if (lower.includes('crown')) return 'crown';
  if (lower.includes('veneer')) return 'veneer';
  
  // Default to crown if no match
  return 'crown';
}

function generateContent(filename) {
  const treatmentType = determineTreatmentType(filename);
  const treatment = treatments[treatmentType];
  
  return {
    title: getRandomItem(treatment.titles),
    description: getRandomItem(treatment.descriptions),
    quote: getRandomItem(treatment.quotes)
  };
}

// Read the HTML file
let html = fs.readFileSync('before-after.html', 'utf8');

// Find all cases with placeholders and their images
const caseRegex = /<div class="comparison-slider" data-id="(\d+)">\s*<img[^>]*src="([^"]+)"[^>]*>/g;
let match;
const cases = [];

while ((match = caseRegex.exec(html)) !== null) {
  const caseNum = parseInt(match[1]);
  const imagePath = match[2];
  const filename = imagePath.split('/').pop();
  
  if (caseNum >= 11) { // Only process cases 11-97
    cases.push({ caseNum, filename });
  }
}

console.log(`Found ${cases.length} cases to update`);

// Generate and replace content for each case
cases.forEach(({ caseNum, filename }) => {
  const content = generateContent(filename);
  
  // Replace title
  const titleRegex = new RegExp(`(<h3[^>]*>)Case ${caseNum} - Title Placeholder(</h3>)`, 'g');
  html = html.replace(titleRegex, `$1${content.title}$2`);
  
  // Replace description
  const descRegex = new RegExp(`(Case ${caseNum}[^<]*</h3>\\s*<p[^>]*>)Description placeholder\\.(<)`, 'g');
  html = html.replace(descRegex, `$1${content.description}$2`);
  
  // Replace quote
  const quoteRegex = new RegExp(`(data-id="${caseNum}"[\\s\\S]*?<p class="text-xs italic[^>]*>)"Quote placeholder\\."`, 'g');
  html = html.replace(quoteRegex, `$1"${content.quote}"`);
  
  console.log(`Updated Case ${caseNum}: ${content.title.substring(0, 30)}...`);
});

// Write back
fs.writeFileSync('before-after.html', html, 'utf8');

console.log('\nAll cases updated successfully!');
