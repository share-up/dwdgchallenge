document.addEventListener('DOMContentLoaded', function () {
  console.log("JavaScript carregado corretamente!");

  const background = document.querySelector('.background');
  const redSection = document.getElementById('redSection');

  if (!background || !redSection) {
    console.error("Erro: Elementos não encontrados no DOM!");
    return;
  }

  // Scroll
  window.addEventListener('scroll', function () {
    const backgroundHeight = background.offsetHeight;
    console.log("ScrollY:", window.scrollY, "Background Height:", backgroundHeight);

      redSection.style.display = 'block';
  });
});
