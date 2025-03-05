document.addEventListener('DOMContentLoaded', function () {
    // Configurar a data de destino
    const targetDate = new Date("2025-03-06T23:59:59").getTime();
  
    // Atualizar o contador a cada segundo
    const countdownInterval = setInterval(function () {
        const now = new Date().getTime();
        const timeLeft = targetDate - now;
  
        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            document.getElementById("days").innerHTML = 0;
            document.getElementById("hours").innerHTML = 0;
            document.getElementById("minutes").innerHTML = 0;
            document.getElementById("seconds").innerHTML = 0;
            return;
        }
  
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
  
        document.getElementById("days").innerHTML = days;
        document.getElementById("hours").innerHTML = hours;
        document.getElementById("minutes").innerHTML = minutes;
        document.getElementById("seconds").innerHTML = seconds;
    }, 1000);
});
