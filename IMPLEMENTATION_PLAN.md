# Shared Header Implementation Plan

## Problem Statement
Currently, the header is duplicated across 24+ HTML files. Every change requires updating all files manually, leading to:
- Inconsistencies between pages
- High risk of breaking changes
- Maintenance nightmare
- Wasted time

## Solution
Implement a JavaScript-based header injection system where:
- ONE source file (`global_header.html`) contains the header
- ALL pages load this header dynamically via JavaScript
- Changes to the header apply to all pages instantly

## Technical Approach

### Architecture
```
global_header.html (source of truth)
    ↓
header-loader.js (fetches and injects)
    ↓
All HTML pages (contain placeholder + loader script)
```

### Why This Works on Cloudflare Pages
- Cloudflare Pages = static hosting (no server-side processing)
- JavaScript runs in the browser after page load
- `fetch()` API loads `global_header.html` content
- `innerHTML` injects it into the page
- All onclick handlers and CSS work immediately

### Components Involved

1. **global_header.html**
   - Contains complete header HTML
   - Includes: nav, desktop menu, mobile button, backdrop, drawer
   - Has inline onclick handlers for mobile menu

2. **header-loader.js**
   - Fetches `global_header.html`
   - Injects into `<div id="header-container"></div>`
   - Handles errors gracefully
   - Ensures Tailwind is loaded before showing header

3. **Each HTML page**
   - Keeps CSS in `<head>` (for mobile menu styles)
   - Keeps Tailwind loading script in `<head>`
   - Replaces header HTML with `<div id="header-container"></div>`
   - Loads `header-loader.js` script

## Implementation Phases

### Phase 1: Preparation (CRITICAL)
- Verify `global_header.html` has the complete working header
- Create robust `header-loader.js` with error handling
- Test loader script in isolation

### Phase 2: Single Page Test
- Apply to ONE page (about.html) first
- Test thoroughly:
  - Desktop navigation works
  - Mobile menu opens/closes
  - Dropdown menus work
  - No console errors
  - No FOUC (flash of unstyled content)
- Get user approval before proceeding

### Phase 3: Rollout Strategy
- Apply to 2-3 more pages (videos.html, services.html)
- Test again
- If successful, apply to remaining pages in batches
- Test after each batch

### Phase 4: Cleanup
- Remove old header loading scripts (load-header.js, inject-footer.js if unused)
- Update documentation
- Commit and push to GitHub

## Risk Mitigation

### Risks
1. **All pages break at once** if loader fails
2. **Mobile menu stops working** if HTML structure is wrong
3. **FOUC** if timing is off
4. **404 errors** if path to global_header.html is wrong

### Mitigation Strategies
1. **Test on one page first** - Catch issues before they spread
2. **Keep git history clean** - Easy rollback with `git revert`
3. **Error handling in loader** - Fallback to showing page even if header fails
4. **Verify paths** - Use absolute paths from root (`/global_header.html`)
5. **User approval at each phase** - Don't proceed without confirmation

## Rollback Plan
If something goes wrong:
1. `git log` to find last working commit
2. `git revert <commit-hash>` to undo changes
3. `git push` to deploy rollback
4. Cloudflare Pages auto-deploys the reverted version

## Success Criteria
- ✅ All pages load without errors
- ✅ Desktop navigation works on all pages
- ✅ Mobile menu works on all pages
- ✅ No FOUC on any page
- ✅ Header changes apply to all pages by editing one file
- ✅ User approves the implementation

## Timeline
- Phase 1: 10 minutes
- Phase 2: 15 minutes (including user testing)
- Phase 3: 30 minutes (depending on number of pages)
- Phase 4: 10 minutes
- **Total: ~1 hour** (with testing and user approval)

## Notes
- This is a ONE-TIME migration
- After this, header maintenance becomes trivial
- Future changes: edit `global_header.html` → push → done
