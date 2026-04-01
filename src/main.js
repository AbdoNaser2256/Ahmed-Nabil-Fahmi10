import './style.css';
import { clinicConfig } from './config.js';
import { ar } from './translations/ar.js';
import { en } from './translations/en.js';

const translations = { ar, en };

export async function initClinic() {
  console.log(`Initializing ${clinicConfig.name.en} Website...`);
  
  // Inject the global header into any page with #site-header
  await injectHeader();
  
  // Inject the global footer
  await injectFooter();
  
  // Implementation of language toggle and dynamic UI updates
  const currentLang = localStorage.getItem('clinic_lang') || 'en';
  applyTranslations(currentLang);

  // Highlight active link in the navigation menu
  highlightActiveNavLink();
}

function highlightActiveNavLink() {
  const currentPath = window.location.pathname;

  // Clean the path to handle Cloudflare's extensionless URLs vs local .html
  const isHome = currentPath === '/' || currentPath.endsWith('index.html') || currentPath.endsWith('index');
  const cleanCurrentPath = currentPath.replace('.html', '');

  // 1. Highlight standard nav links (Home, Before & After, Videos, About)
  document.querySelectorAll('.nav-link').forEach(link => {
    const linkPath = new URL(link.href).pathname.replace('.html', '');

    let isActive = false;

    // Check Home separately
    if (isHome && (linkPath === '/' || linkPath.endsWith('index'))) {
      isActive = true;
    }
    // Check exact matches for other pages
    else if (!isHome && linkPath !== '/' && !linkPath.endsWith('index') && cleanCurrentPath === linkPath) {
      isActive = true;
    }

    if (isActive) {
      // Apply active states
      link.classList.remove('text-slate-600', 'hover:text-teal-800');
      link.classList.add('text-teal-700', 'border-b-2', 'border-teal-600', 'pb-1');
    }
  });

  // 2. Highlight the "Services" Dropdown Button if the user is in the /services/ folder
  if (cleanCurrentPath.startsWith('/services') || cleanCurrentPath === '/services') {
    // Find the Services button (it's the button directly inside .nav-dropdown)
    const servicesBtn = document.querySelector('.nav-dropdown > button');
    if (servicesBtn) {
      servicesBtn.classList.remove('text-slate-600', 'hover:text-teal-800');
      servicesBtn.classList.add('text-teal-700', 'border-b-2', 'border-teal-600');
      // Ensure the chevron matches the text color
      const chevron = servicesBtn.querySelector('.material-symbols-outlined');
      if (chevron) chevron.classList.remove('text-slate-600');
    }
  }
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

async function injectFooter() {
  try {
    // Remove all existing footers from the page
    document.querySelectorAll('footer').forEach(footer => footer.remove());
    
    // Fetch the global footer
    let response = await fetch('/global_footer');
    if (!response.ok) {
        response = await fetch('/global_footer.html');
    }
    if (!response.ok) throw new Error('Footer not found');
    const html = await response.text();
    
    // Insert footer before closing body tag
    document.body.insertAdjacentHTML('beforeend', html);
    console.log('Global Footer injected successfully.');
  } catch (error) {
    console.error('Error loading global footer:', error);
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
