document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('photoTrack');
    const prevBtn = document.getElementById('prevPhotoBtn');
    const nextBtn = document.getElementById('nextPhotoBtn');
    const items = Array.from(document.querySelectorAll('.photo-item'));
    const carouselContainer = document.querySelector('.carousel-container');

    // Lightbox elements
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-lightbox');

    if (!track || !prevBtn || !nextBtn || !carouselContainer) return;

    let currentIndex = 0;
    let itemsToShow = 3; // Default for desktop
    const gap = 20; // Gap defined in CSS

    function getItemsToShow() {
        return window.innerWidth < 768 ? 1 : 3;
    }

    function updateCarousel() {
        itemsToShow = getItemsToShow();
        const containerWidth = carouselContainer.clientWidth;

        // Calculate width for each item: (Container - TotalGapWidth) / ItemsToShow
        // TotalGapWidth = gap * (itemsToShow - 1)
        const totalGapWidth = gap * (itemsToShow - 1);
        const itemWidth = (containerWidth - totalGapWidth) / itemsToShow;

        // Apply width to items
        items.forEach(item => {
            item.style.minWidth = `${itemWidth}px`;
            item.style.maxWidth = `${itemWidth}px`;

            // Ensure image fits nicely
            const img = item.querySelector('img');
            if (img) {
                img.style.width = '100%';
                img.style.height = '100%';
                img.style.maxHeight = '300px'; // Limit height to keep it clean
                img.style.objectFit = 'cover'; // Cover fits better for uniformity
                img.style.objectPosition = 'center';
            }
        });

        // Calculate shift distance
        // We shift by (itemWidth + gap) * currentIndex
        const shiftAmount = (itemWidth + gap) * currentIndex;

        track.style.transform = `translateX(-${shiftAmount}px)`;

        // Update active class
        items.forEach((item, index) => {
            item.classList.remove('center-focus');
            item.classList.remove('active'); // Keep if used elsewhere, though currently unused for styling

            // Logic for center focus:
            // If showing 3 items, center is currentIndex + 1
            // If showing 1 item, center is currentIndex

            let centerIndex = currentIndex;
            if (itemsToShow === 3) {
                centerIndex = currentIndex + 1;
            }

            // Boundary check: if we are at the very end of list and showing 3 items, 
            // e.g. items.length=10, maxIndex=7. currentIndex=7. Visible: 7, 8, 9. Center=8. Correct.

            if (index === centerIndex) {
                item.classList.add('center-focus');
                // Also ensure it is fully opaque/highlighted
            }
        });

        // Update buttons logic
        // We disable 'next' when we have reached the end.
        // Max index is (totalItems - itemsToShow)
        const maxIndex = Math.max(0, items.length - itemsToShow);

        prevBtn.disabled = currentIndex <= 0;
        prevBtn.style.opacity = currentIndex <= 0 ? "0.5" : "1";
        prevBtn.style.cursor = currentIndex <= 0 ? "default" : "pointer";

        nextBtn.disabled = currentIndex >= maxIndex;
        nextBtn.style.opacity = currentIndex >= maxIndex ? "0.5" : "1";
        nextBtn.style.cursor = currentIndex >= maxIndex ? "default" : "pointer";
    }

    // Navigation
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    nextBtn.addEventListener('click', () => {
        const maxIndex = Math.max(0, items.length - itemsToShow);
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateCarousel();
        }
    });

    // Lightbox Logic
    items.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (img) {
                lightbox.style.display = "flex"; // Changed to flex for centering
                lightbox.style.justifyContent = "center";
                lightbox.style.alignItems = "center";
                lightboxImg.src = img.src;
                lightboxImg.style.maxHeight = "90vh";
                lightboxImg.style.maxWidth = "90vw";
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close Lightbox
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            lightbox.style.display = "none";
            document.body.style.overflow = 'auto';
        });
    }

    // Close on click outside
    window.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = "none";
            document.body.style.overflow = 'auto';
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape" && lightbox.style.display === "flex") {
            lightbox.style.display = "none";
            document.body.style.overflow = 'auto';
        }
    });

    // Handle Window Resize
    window.addEventListener('resize', () => {
        // Reset index if out of bounds on resize (e.g. mobile to desktop)
        const newItemsToShow = getItemsToShow();
        if (newItemsToShow !== itemsToShow) {
            currentIndex = 0; // Simple reset to avoid math headaches
        }
        updateCarousel();
    });

    // Initial load
    setTimeout(updateCarousel, 100);
});
