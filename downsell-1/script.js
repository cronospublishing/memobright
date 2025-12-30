let time = 600; // 10:00 em segundos
const timerEl = document.getElementById("timer");

function updateTimer() {
  const minutes = String(Math.floor(time / 60)).padStart(2, "0");
  const seconds = String(time % 60).padStart(2, "0");

  timerEl.textContent = `${minutes}:${seconds}`;

  if (time > 0) {
    time--;
  }
}

setInterval(updateTimer, 1000);
