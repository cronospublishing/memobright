let seconds = 2 * 60 * 60 + 14 * 60 + 56;

const timerEl = document.getElementById("timer");

setInterval(() => {
  if (seconds <= 0) return;

  seconds--;

  const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");

  timerEl.textContent = `${h}:${m}:${s}`;
}, 1000);
