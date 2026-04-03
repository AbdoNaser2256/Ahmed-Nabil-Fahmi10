// Generate all 87 cards (12-97) as a single string
let allCards = '';

for (let i = 12; i <= 97; i++) {
  allCards += `
<!-- Case ${i} -->
<div class="group bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-outline-variant/10">
<div class="relative aspect-[4/3] bg-surface-container">
<div class="comparison-slider" data-id="${i}">
<img alt="After Result" class="image-after" src="assets/images/placeholder.webp"/>
<img alt="Before Result" class="image-before" src="assets/images/placeholder.webp"/>
<div class="slider-handle"></div>
<input class="slider-input absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-40" max="100" min="0" oninput="this.parentElement.querySelector('.image-before').style.clipPath = \`inset(0 \${100 - this.value}% 0 0)\`; this.parentElement.querySelector('.slider-handle').style.left = \`\${this.value}%\`" type="range" value="50"/>
<span class="absolute top-4 left-4 px-2 py-1 bg-black/60 text-white text-[10px] rounded uppercase font-bold z-20">Before</span>
<span class="absolute top-4 right-4 px-2 py-1 bg-primary/80 text-white text-[10px] rounded uppercase font-bold z-20">After</span>
</div>
</div>
<div class="p-8">
<h3 class="font-headline font-bold text-xl mb-3">Case ${i} - Title Placeholder</h3>
<p class="text-on-surface-variant text-sm leading-relaxed mb-6">Description placeholder.</p>
<div class="flex items-center gap-3 pt-6 border-t border-surface-container">
<div class="w-8 h-8 rounded-full bg-tertiary-fixed flex items-center justify-center">
<span class="material-symbols-outlined text-sm text-on-tertiary-fixed">format_quote</span>
</div>
<p class="text-xs italic text-on-surface-variant font-medium">"Quote placeholder."</p>
</div>
</div>
</div>`;
}

console.log(allCards);
