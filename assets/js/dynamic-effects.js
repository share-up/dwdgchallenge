document.addEventListener("DOMContentLoaded", function () {
    const towerImage = document.querySelector(".tower-image");

    if (towerImage) {
        window.addEventListener("scroll", function () {
            // Calculate scroll progress relative to viewport or a fixed range
            // We want the fade to creeping up as we scroll down.
            // Initial state: black 85%, transparent 100%
            // Target state (at some scroll point): black 30%, transparent 100%

            const scrollY = window.scrollY;
            const maxScroll = 600; // Pixel value where the effect maxes out (adjust as needed)

            // Calculate percentage decrease based on scroll
            // We start at 85% and want to go down.
            const startPercentage = 85;
            const minPercentage = 20; // Don't let it disappear completely

            // How much to reduce per pixel?
            // (85 - 20) = 65% change over 600px
            const reduction = (scrollY / maxScroll) * (startPercentage - minPercentage);

            let currentPercentage = startPercentage - reduction;

            // Clamp the value
            if (currentPercentage < minPercentage) currentPercentage = minPercentage;
            if (currentPercentage > startPercentage) currentPercentage = startPercentage;

            const maskValue = `linear-gradient(to bottom, black ${currentPercentage}%, transparent 100%)`;

            towerImage.style.maskImage = maskValue;
            towerImage.style.webkitMaskImage = maskValue;
        });
    }
});
