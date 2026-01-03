document.addEventListener('DOMContentLoaded', () => {
    const svg = document.getElementById('timeline-svg');
    const container = document.querySelector('.timeline-container');
    const items = document.querySelectorAll('.timeline-item');
    const dots = document.querySelectorAll('.timeline-icon');

    if (!svg || !container || items.length === 0) return;

    // Create the path element
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('stroke', '#00C782');
    path.setAttribute('stroke-width', '4');
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke-linecap', 'round');
    // Initialize with full dashoffset to hide it
    path.style.transition = 'stroke-dashoffset 0.1s linear';
    svg.appendChild(path);

    function updatePath() {
        const containerRect = container.getBoundingClientRect();
        const dotsPositions = Array.from(dots).map(dot => {
            const rect = dot.getBoundingClientRect();
            const item = dot.closest('.timeline-item');
            let translateX = 0;
            if (item) {
                const style = window.getComputedStyle(item);
                const transform = style.transform || style.webkitTransform;
                if (transform && transform !== 'none') {
                    const matrix = transform.match(/matrix\((.+)\)/);
                    if (matrix) {
                        translateX = parseFloat(matrix[1].split(', ')[4]);
                    }
                }
            }
            return {
                x: rect.left - containerRect.left + rect.width / 2 - translateX,
                y: rect.top - containerRect.top + rect.height / 2
            };
        });

        if (dotsPositions.length < 2) return;

        // Construct path "d" attribute
        // Start at top center or first dot? Let's start a bit above the first dot.
        let d = `M ${dotsPositions[0].x} ${dotsPositions[0].y}`;

        for (let i = 0; i < dotsPositions.length - 1; i++) {
            const current = dotsPositions[i];
            const next = dotsPositions[i + 1];

            // Simple straight line or curve? Let's use curves for "snake" effect
            // Bezier curve control points
            const cp1X = current.x;
            const cp1Y = current.y + (next.y - current.y) / 2;
            const cp2X = next.x;
            const cp2Y = current.y + (next.y - current.y) / 2;

            d += ` C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${next.x} ${next.y}`;
        }

        path.setAttribute('d', d);

        // Total length for drawing animation
        const length = path.getTotalLength();
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;

        return length;
    }

    // Initial update to set path geometry
    let totalLength = updatePath();

    // Handle Scroll to draw line and show items
    window.addEventListener('scroll', () => {
        // Recalculate if needed (e.g. resize) - optimally on resize event only, but...

        // Calculate how far we've scrolled past the container start
        const containerRect = container.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // Start drawing when container enters viewport (e.g. 1/3 in)
        const startOffset = viewportHeight * 0.7;

        // We want the line to be drawn as we scroll down the container
        // Line draws from top (0) to bottom (totalLength)
        // Map scroll position relative to container height

        // Distance from top of viewport to top of container
        // If rect.top is viewportHeight, we are just reaching it.
        // If rect.top is 0, we are at the top.

        // Let's say we want to draw as the "center" of viewport passes through?
        // Or just fill smoothly.

        const scrolled = window.scrollY + viewportHeight * 0.6; // Point of drawing "pen"
        const containerTopAbs = container.offsetTop;

        // This logic needs to be relative to the path generation which is relative to container
        // Let's rely on individual item visibility for clarity or just fill based on container progress?

        // Better approach: Calculate progression based on window scroll relative to container height
        const scrollPercentage = (window.scrollY + viewportHeight / 2 - container.offsetTop) / container.offsetHeight;

        // Clamp
        let drawLength = totalLength * (scrollPercentage * 1.5); // 1.5 multiplier to finish before end
        if (drawLength < 0) drawLength = 0;
        if (drawLength > totalLength) drawLength = totalLength;

        path.style.strokeDashoffset = totalLength - drawLength;

        // Reveal items and Glow
        items.forEach((item, index) => {
            const itemRect = item.getBoundingClientRect();
            // Reveal effect
            if (itemRect.top < viewportHeight * 0.85) {
                item.classList.add('visible');
            }

            // Glow effect
            // Check if the "drawing point" (scrolled) has passed the icon
            // Icon position relative to viewport: itemRect.top + offset
            // Let's use the same logic as the line drawing.

            // Re-calculate the specific point for this item on the total path?
            // Simpler: If the scroll percentage * totalLength covers this item's index position?

            // Best approximation: If item is in the "active" zone (e.g. center of viewport)
            if (itemRect.top < viewportHeight * 0.5 && itemRect.bottom > viewportHeight * 0.3) {
                item.querySelector('.timeline-content').classList.add('active-glow');
            } else {
                item.querySelector('.timeline-content').classList.remove('active-glow');
            }
        });
    });

    // Handle Resize with Debounce
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            totalLength = updatePath();
        }, 100);
    });

    // Recalculate after load to ensure layout is final
    window.addEventListener('load', () => {
        // Small delay to ensure all transitions/styles are applied
        setTimeout(() => {
            totalLength = updatePath();
        }, 100);
    });
});
