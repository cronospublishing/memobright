/* ================= TIMER ================= */
let time = 10 * 60;
const timerEl = document.getElementById("timerText");

setInterval(() => {
  const m = Math.floor(time / 60);
  const s = time % 60;

  timerEl.textContent = `SPECIAL OFFER: ${m.toString().padStart(2, "0")}:${s
    .toString()
    .padStart(2, "0")}`;

  if (time > 0) time--;
}, 1000);

/* ================= CONFETTI ================= */
const confettiContainer = document.querySelector(".confetti-container");
const colors = ["gold", "silver", "blue"];

setInterval(() => {
  const c = document.createElement("div");
  c.className = `confetti ${colors[Math.floor(Math.random() * colors.length)]}`;
  c.style.left = Math.random() * 100 + "%";
  c.style.animationDuration = 3 + Math.random() * 3 + "s";
  confettiContainer.appendChild(c);

  setTimeout(() => c.remove(), 6000);
}, 180);
