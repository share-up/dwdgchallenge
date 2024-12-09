const hamburgerIcon = document.getElementById("hamburger-icon");
const navbarLinks = document.getElementById("navbar-links");
hamburgerIcon.addEventListener("click", () => {
  if (navbarLinks.classList.contains("hidden")) {
    navbarLinks.classList.remove("hidden");
    navbarLinks.classList.add("visible");
  } else {
    navbarLinks.classList.remove("visible");
    navbarLinks.classList.add("hidden");
  }
});
