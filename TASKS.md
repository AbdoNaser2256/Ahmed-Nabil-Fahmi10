# Shared Header Implementation Tasks

## Phase 1: Preparation ⏳

### Task 1.1: Verify global_header.html
- [ ] Read `global_header.html` to confirm it has complete header
- [ ] Verify it includes mobile menu backdrop and drawer
- [ ] Verify onclick handlers are present
- [ ] Verify all navigation links are correct

### Task 1.2: Create header-loader.js
- [ ] Create new file `header-loader.js`
- [ ] Implement fetch logic to load `global_header.html`
- [ ] Implement injection into `#header-container`
- [ ] Add error handling (console.error if fetch fails)
- [ ] Add Tailwind loading check integration
- [ ] Test script in browser console

### Task 1.3: Document the approach
- [ ] Create IMPLEMENTATION_PLAN.md ✅
- [ ] Create TASKS.md ✅

---

## Phase 2: Single Page Test ⏳

### Task 2.1: Prepare about.html
- [ ] Backup current about.html (git will handle this)
- [ ] Replace header HTML with `<div id="header-container"></div>`
- [ ] Add `<script src="/header-loader.js"></script>` before `</body>`
- [ ] Keep all CSS in `<head>` (mobile menu styles)
- [ ] Keep Tailwind loading script in `<head>`

### Task 2.2: Test about.html locally
- [ ] Open about.html in browser
- [ ] Check browser console for errors
- [ ] Test desktop navigation (all links work)
- [ ] Test mobile menu (opens/closes)
- [ ] Test dropdown menus
- [ ] Verify no FOUC

### Task 2.3: Deploy and test live
- [ ] Commit changes to about.html and header-loader.js
- [ ] Push to GitHub
- [ ] Wait for Cloudflare Pages deployment
- [ ] Test live site
- [ ] Get user approval ⚠️ STOP HERE UNTIL APPROVED

---

## Phase 3: Rollout to More Pages ⏳

### Task 3.1: Apply to videos.html
- [ ] Replace header HTML with `<div id="header-container"></div>`
- [ ] Add loader script
- [ ] Test locally
- [ ] Commit and push
- [ ] Test live
- [ ] Get user approval ⚠️

### Task 3.2: Apply to services.html
- [ ] Replace header HTML with placeholder
- [ ] Add loader script
- [ ] Test locally
- [ ] Commit and push
- [ ] Test live
- [ ] Get user approval ⚠️

### Task 3.3: Apply to remaining pages (batch 1)
Pages: index.html, before-after.html, dental-implants.html, hollywood-smile.html
- [ ] Replace headers in all 4 pages
- [ ] Test each page locally
- [ ] Commit and push
- [ ] Test all pages live
- [ ] Get user approval ⚠️

### Task 3.4: Apply to remaining pages (batch 2)
Pages: veneers.html, root-canal.html, childrens-teeth.html, gum-depigmentation.html
- [ ] Replace headers in all 4 pages
- [ ] Test each page locally
- [ ] Commit and push
- [ ] Test all pages live
- [ ] Get user approval ⚠️

### Task 3.5: Apply to remaining pages (batch 3)
Pages: cosmetic-fillings.html, orthodontics.html, teeth-whitening.html, casted-crown.html
- [ ] Replace headers in all 4 pages
- [ ] Test each page locally
- [ ] Commit and push
- [ ] Test all pages live
- [ ] Get user approval ⚠️

### Task 3.6: Apply to service pages in /services/ folder
Pages: All files in /services/ directory
- [ ] List all service pages
- [ ] Replace headers in all pages
- [ ] Test sample pages locally
- [ ] Commit and push
- [ ] Test sample pages live
- [ ] Get user approval ⚠️

---

## Phase 4: Cleanup ⏳

### Task 4.1: Remove old scripts
- [ ] Check if `load-header.js` is still used
- [ ] Check if `inject-footer.js` is still used
- [ ] Delete unused scripts
- [ ] Remove references from HTML files

### Task 4.2: Update documentation
- [ ] Update README.md with new header system
- [ ] Document how to modify the header
- [ ] Document the file structure

### Task 4.3: Final verification
- [ ] Test all pages one more time
- [ ] Check for console errors across all pages
- [ ] Verify mobile menu works on all pages
- [ ] Get final user approval ✅

---

## Rollback Procedure (If Needed)

### If something breaks:
1. [ ] Identify the breaking commit: `git log`
2. [ ] Revert the commit: `git revert <commit-hash>`
3. [ ] Push the revert: `git push`
4. [ ] Wait for Cloudflare Pages to deploy
5. [ ] Verify site is working again
6. [ ] Analyze what went wrong
7. [ ] Fix the issue
8. [ ] Try again

---

## Notes
- ⚠️ = STOP and get user approval before proceeding
- Test EVERY change before moving to the next task
- Commit frequently (after each successful task)
- Don't rush - better to be slow and correct than fast and broken
