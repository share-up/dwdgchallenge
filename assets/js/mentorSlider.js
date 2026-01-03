document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('mentorTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    // Configuration
    const cardWidth = 220; // 200px width + 20px padding/border approx
    const gap = 20;
    const itemWidth = 240; // Total width of one item including gap
    let currentPosition = 0;

    // Initial check
    if (!track || !prevBtn || !nextBtn) return;

    // Update button states
    function updateButtons() {
        const containerWidth = track.parentElement.clientWidth;
        const trackWidth = track.scrollWidth;
        const maxScroll = -(trackWidth - containerWidth);

        // Disable Prev if at start
        if (currentPosition >= 0) {
            prevBtn.disabled = true;
            prevBtn.style.opacity = "0.5";
        } else {
            prevBtn.disabled = false;
            prevBtn.style.opacity = "1";
        }

        // Disable Next if at end
        if (currentPosition <= maxScroll) {
            nextBtn.disabled = true;
            nextBtn.style.opacity = "0.5";
        } else {
            nextBtn.disabled = false;
            nextBtn.style.opacity = "1";
        }
    }

    // Move Slide Function
    function moveSlide(direction) {
        const containerWidth = track.parentElement.clientWidth;
        const trackWidth = track.scrollWidth;
        const maxScroll = -(trackWidth - containerWidth);

        // Calculate how many items fit in view to slide by page or single item
        // Let's slide by approx one container width or 3 items
        const slideAmount = itemWidth * 4;

        if (direction === 'next') {
            currentPosition -= slideAmount;
            if (currentPosition < maxScroll) currentPosition = maxScroll;
        } else {
            currentPosition += slideAmount;
            if (currentPosition > 0) currentPosition = 0;
        }

        track.style.transform = `translateX(${currentPosition}px)`;
        updateButtons();
    }

    // Event Listeners
    prevBtn.addEventListener('click', () => moveSlide('prev'));
    nextBtn.addEventListener('click', () => moveSlide('next'));

    // Handle Window Resize
    window.addEventListener('resize', () => {
        // Reset or adjust position on resize to avoid gaps
        currentPosition = 0;
        track.style.transform = `translateX(0px)`;
        updateButtons();
    });

    // Initial setup
    updateButtons();
});
