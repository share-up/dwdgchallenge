document.addEventListener("DOMContentLoaded", () => {
  const hamburgerIcon = document.getElementById("hamburger-icon");
  const navbarLinks = document.getElementById("navbar-links");
  const navOverlay = document.getElementById("nav-overlay");

  if (!hamburgerIcon || !navbarLinks || !navOverlay) {
    console.error("DWDG: Mobile menu elements missing from DOM!", {
      hamburgerIcon: !!hamburgerIcon,
      navbarLinks: !!navbarLinks,
      navOverlay: !!navOverlay
    });
    return;
  }

  function toggleMenu() {
    const isVisible = navbarLinks.classList.toggle("visible");
    navOverlay.classList.toggle("visible");

    // Prevent scrolling when menu is open
    document.body.style.overflow = isVisible ? "hidden" : "";
  }

  hamburgerIcon.addEventListener("click", toggleMenu);
  navOverlay.addEventListener("click", toggleMenu);

  // Close menu when a link is clicked
  navbarLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");

      // Close menu first
      if (navbarLinks.classList.contains("visible")) {
        toggleMenu();
      }

      // If it's an anchor link, handle manual scroll
      if (href && href.startsWith("#")) {
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          e.preventDefault();
          const headerOffset = 80; // Adjusted for better mobile view
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }
    });
  });
});
