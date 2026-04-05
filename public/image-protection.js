// Image Protection Script
// Prevents casual users from downloading images

(function() {
    'use strict';

    // Disable right-click on images
    document.addEventListener('contextmenu', function(e) {
        if (e.target.tagName === 'IMG' || e.target.classList.contains('protected-image')) {
            e.preventDefault();
            return false;
        }
    });

    // Disable dragging of images
    document.addEventListener('dragstart', function(e) {
        if (e.target.tagName === 'IMG' || e.target.classList.contains('protected-image')) {
            e.preventDefault();
            return false;
        }
    });

    // Disable common keyboard shortcuts for saving
    document.addEventListener('keydown', function(e) {
        // Ctrl+S or Cmd+S (Save)
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            return false;
        }
        // Ctrl+Shift+I or Cmd+Option+I (Inspect)
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'I') {
            e.preventDefault();
            return false;
        }
        // F12 (Developer Tools)
        if (e.key === 'F12') {
            e.preventDefault();
            return false;
        }
    });

    // Add transparent overlay to all images when page loads
    function addImageOverlays() {
        const images = document.querySelectorAll('img, .protected-image');
        images.forEach(function(img) {
            // Skip if already has overlay
            if (img.parentElement.classList.contains('image-protection-wrapper')) {
                return;
            }

            // Create wrapper
            const wrapper = document.createElement('div');
            wrapper.className = 'image-protection-wrapper';
            wrapper.style.position = 'relative';
            wrapper.style.display = 'inline-block';
            wrapper.style.width = '100%';
            wrapper.style.height = '100%';

            // Create overlay
            const overlay = document.createElement('div');
            overlay.className = 'image-protection-overlay';
            overlay.style.position = 'absolute';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.zIndex = '10';
            overlay.style.cursor = 'default';

            // Wrap image
            if (img.parentNode) {
                img.parentNode.insertBefore(wrapper, img);
                wrapper.appendChild(img);
                wrapper.appendChild(overlay);
            }
        });
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', addImageOverlays);
    } else {
        addImageOverlays();
    }

    // Also run after a short delay to catch dynamically loaded images
    setTimeout(addImageOverlays, 1000);
})();
