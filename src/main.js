import { clinicConfig } from './config.js';
import { ar } from './translations/ar.js';
import { en } from './translations/en.js';

const translations = { ar, en };

export async function initClinic() {
  console.log(`Initializing ${clinicConfig.name.en} Website...`);
  
  // Inject the global header into any page with #site-header
  await injectHeader();
  
  // Implementation of language toggle and dynamic UI updates
  const currentLang = localStorage.getItem('clinic_lang') || 'en';
  applyTranslations(currentLang);
}

async function injectHeader() {
  const headerContainer = document.getElementById('site-header');
  if (!headerContainer) return;

  try {
    // Attempt to fetch /global_header first (Cloudflare clean URLs), fallback to .html
    let response = await fetch('/global_header');
    if (!response.ok) {
        response = await fetch('/global_header.html');
    }
    if (!response.ok) throw new Error('Header not found');
    const html = await response.text();
    headerContainer.innerHTML = html;
    console.log('Global Header injected successfully.');
  } catch (error) {
    console.error('Error loading global header:', error);
  }
}

function applyTranslations(lang) {
  const t = translations[lang];
  // Logic to update DOM elements based on translations
  document.querySelectorAll('[data-t]').forEach(el => {
    const key = el.getAttribute('data-t');
    const keys = key.split('.');
    let value = t;
    keys.forEach(k => { value = value ? value[k] : null; });
    if (value) el.textContent = value;
  });
}

// Global initialization
window.addEventListener('DOMContentLoaded', initClinic);
