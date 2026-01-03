const videoCarousel = document.getElementById("videoCarousel");
const videos = Array.from(videoCarousel.children);
let currentVideo = 0;

// Helper function to play or pause a video
function togglePlayPause(video) {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

// Auto-play the first video when the section comes into view
function autoPlayFirstVideo() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          videos[currentVideo].play(); // Auto-play the first video
          observer.disconnect(); // Stop observing after the first play
        }
      });
    },
    { threshold: 0.5 } // Trigger when 50% of the section is visible
  );
  observer.observe(document.querySelector(".video-section"));
}

// Add click listeners to toggle play/pause on videos
videos.forEach((video, index) => {
  video.addEventListener("click", () => {
    togglePlayPause(video);
  });
});

// Update the carousel when navigating
function updateCarousel() {
  const offset = currentVideo * 100; // Calculate the position based on video width
  videoCarousel.style.transform = `translateX(-${offset}%)`;
}

// Move to the next video
function nextVideo() {
  videos[currentVideo].pause(); // Pause the current video
  currentVideo = (currentVideo + 1) % videos.length; // Move to the next video
  videos[currentVideo].play(); // Play the new video
  updateCarousel();
}

// Move to the previous video
function previousVideo() {
  videos[currentVideo].pause(); // Pause the current video
  currentVideo = (currentVideo - 1 + videos.length) % videos.length; // Move to the previous video
  videos[currentVideo].play(); // Play the new video
  updateCarousel();
}

// Initialize auto-play behavior
autoPlayFirstVideo();
