# Before/After Comparison Slider - Image Alignment Solution

## THE PROBLEM

The before/after comparison slider uses source images where BOTH photos are in a SINGLE image file, stacked VERTICALLY:

```
┌─────────────────┐
│  [white space]  │
│  BEFORE PHOTO   │  ← Top half
│  [white space]  │
├─────────────────┤
│  [white space]  │
│  AFTER PHOTO    │  ← Bottom half
│  [white space]  │
└─────────────────┘
```

**Challenge:** Show the top half (before) on the LEFT side and bottom half (after) on the RIGHT side of the slider, WITHOUT showing the white space padding.

## THE SOLUTION (WORKING CSS)

```css
/* Applied to BOTH images */
.image-after,
.image-before {
  position: absolute;
  left: 0;
  width: 100%;
  height: 200%;              /* Double height to show full stacked image */
  object-fit: cover;
  object-position: center center;
  transform: scaleY(1.05);   /* Stretch vertically 5% to crop white space */
  transform-origin: center center;
}

/* BEFORE image (LEFT side) - Shows TOP half */
.image-before {
  top: 0;                    /* Anchor to top */
  clip-path: inset(0 50% 0 0); /* Show only left half */
}

/* AFTER image (RIGHT side) - Shows BOTTOM half */
.image-after {
  top: -101.5%;              /* Shift UP to show bottom half + hide white space */
}
```

## WHY IT WORKS

### Before Image (LEFT side):
- `top: 0` → Anchors to top of container
- `height: 200%` → Shows the full stacked image
- `clip-path: inset(0 50% 0 0)` → Crops to show only LEFT half
- `scaleY(1.05)` → Stretches vertically to crop white space at edges
- **Result:** Shows the TOP photo (before) with minimal white space ✓

### After Image (RIGHT side):
- `top: -101.5%` → Does TWO things:
  1. `-100%` shifts image UP by its full height to show BOTTOM half
  2. Extra `-1.5%` hides the white space at top of after photo
- `height: 200%` → Shows the full stacked image
- No clip-path → Shows full width (right side of slider)
- `scaleY(1.05)` → Stretches vertically to crop white space
- **Result:** Shows the BOTTOM photo (after) with NO white space ✓

## COMMON MISTAKES TO AVOID

1. ❌ **Using `bottom: 0` for after image** → Creates gap at bottom when using transforms
2. ❌ **Using `object-position` percentages** → Doesn't work reliably with white space
3. ❌ **Using `transform: translateY()` with `bottom: 0`** → Creates gap at bottom
4. ❌ **Trying to scale only one dimension** → Breaks aspect ratio
5. ❌ **Using `top: -100%` exactly** → Doesn't account for white space at top of after photo

## THE KEY INSIGHT

The solution is SIMPLE positioning:
- Before: `top: 0` (show top)
- After: `top: -100%` (show bottom) + small adjustment for white space

Don't overcomplicate it with complex transforms or object-position tricks!

## FILE LOCATION

This CSS is in: `before-after.html` (lines ~130-150 in the `<style>` section)

## TESTING

To verify it's working:
1. Before image (left) should show teeth with NO white gaps
2. After image (right) should show teeth with NO white gaps at top or bottom
3. Slider should move smoothly between them
4. Both halves should be at the same vertical level (teeth align horizontally)

## IF IT BREAKS

Check these in order:
1. Is `height: 200%` still applied to both images?
2. Is `scaleY(1.05)` still applied to both images?
3. Is before image using `top: 0`?
4. Is after image using `top: -101.5%` (or close to that)?
5. Is the container aspect ratio still `aspect-[4/3]`?

## ADJUSTMENT GUIDE

If white space appears:
- **Top of before image:** Increase `scaleY()` value (try 1.06, 1.07, etc.)
- **Top of after image:** Make `top` more negative (try -102%, -103%, etc.)
- **Bottom of after image:** Make `top` less negative (try -101%, -100.5%, etc.)

Start with small adjustments (0.5% at a time) and test on live site.
