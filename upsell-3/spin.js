const canvas = document.getElementById("wheelCanvas");
const ctx = canvas.getContext("2d");

const prizes = [
  "FREE BOX ($606)",
  "50% OFF",
  "TRY AGAIN",
  "FREE SHIPPING",
  "10% OFF",
  "$5 COUPON",
  "TRY AGAIN",
  "FREE SHIPPING",
];

const center = canvas.width / 2;
const radius = center - 24;
const arc = (2 * Math.PI) / prizes.length;

let angle = 0;
let spinning = false;

/* ===== METALLIC GRADIENTS ===== */

function goldGradient() {
  const g = ctx.createRadialGradient(
    center,
    center,
    40,
    center,
    center,
    radius
  );
  g.addColorStop(0, "#fff7cc");
  g.addColorStop(0.35, "#f5d27a");
  g.addColorStop(0.65, "#caa24d");
  g.addColorStop(1, "#8a6a16");
  return g;
}

function silverGradient() {
  const g = ctx.createRadialGradient(
    center,
    center,
    40,
    center,
    center,
    radius
  );
  g.addColorStop(0, "#ffffff");
  g.addColorStop(0.4, "#e5e7eb");
  g.addColorStop(0.7, "#9ca3af");
  g.addColorStop(1, "#6b7280");
  return g;
}

function blueMetalGradient() {
  const g = ctx.createRadialGradient(
    center,
    center,
    40,
    center,
    center,
    radius
  );
  g.addColorStop(0, "#93c5fd");
  g.addColorStop(0.4, "#1e40af");
  g.addColorStop(0.7, "#1e3a8a");
  g.addColorStop(1, "#0f172a");
  return g;
}

function rubyGradient() {
  const g = ctx.createRadialGradient(
    center,
    center,
    40,
    center,
    center,
    radius
  );
  g.addColorStop(0, "#fecaca");
  g.addColorStop(0.4, "#dc2626");
  g.addColorStop(0.7, "#991b1b");
  g.addColorStop(1, "#450a0a");
  return g;
}

function getSliceGradient(text) {
  if (text.includes("FREE BOX")) return goldGradient();
  if (text.includes("OFF")) return blueMetalGradient();
  if (text.includes("COUPON")) return rubyGradient();
  return silverGradient();
}

/* ===== DRAW DECORATIONS ===== */

function drawOuterRing() {
  ctx.beginPath();
  ctx.arc(center, center, radius + 14, 0, Math.PI * 2);
  ctx.lineWidth = 12;
  ctx.strokeStyle = goldGradient();
  ctx.stroke();
}

function drawLEDs() {
  const leds = 28;
  for (let i = 0; i < leds; i++) {
    const a = (Math.PI * 2 * i) / leds;
    const x = center + Math.cos(a) * (radius + 14);
    const y = center + Math.sin(a) * (radius + 14);

    ctx.beginPath();
    ctx.arc(x, y, 2.6, 0, Math.PI * 2);
    ctx.fillStyle = "#f5d27a";
    ctx.fill();
  }
}

function drawCenterCap() {
  const g = ctx.createRadialGradient(center, center, 6, center, center, 34);
  g.addColorStop(0, "#fff7cc");
  g.addColorStop(0.5, "#f5d27a");
  g.addColorStop(1, "#8a6a16");

  ctx.beginPath();
  ctx.arc(center, center, 34, 0, Math.PI * 2);
  ctx.fillStyle = g;
  ctx.fill();

  ctx.beginPath();
  ctx.arc(center, center, 34, 0, Math.PI * 2);
  ctx.strokeStyle = "#6b4f0f";
  ctx.lineWidth = 2;
  ctx.stroke();
}

/* ===== DRAW WHEEL ===== */

function drawWheel() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  prizes.forEach((text, i) => {
    const start = angle + i * arc;
    const end = start + arc;

    ctx.beginPath();
    ctx.moveTo(center, center);
    ctx.arc(center, center, radius, start, end);
    ctx.fillStyle = getSliceGradient(text);
    ctx.fill();

    ctx.strokeStyle = "rgba(0,0,0,.25)";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.save();
    ctx.translate(center, center);
    ctx.rotate(start + arc / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = "#111";
    ctx.font = text.includes("FREE BOX")
      ? "bold 15px 'Playfair Display'"
      : "12px 'Playfair Display'";
    ctx.fillText(text, radius - 18, 6);
    ctx.restore();
  });

  drawOuterRing();
  drawLEDs();
  drawCenterCap();
}

drawWheel();

/* ===== SPIN + REDIRECT ===== */

document.getElementById("spinBtn").onclick = () => {
  if (spinning) return;
  spinning = true;

  // força FREE BOX
  const targetIndex = 0;
  const targetAngle =
    360 * 5 + (360 - (targetIndex * arc * 180) / Math.PI) - arc * 90;

  const spinDuration = 4600;
  const start = performance.now();

  function animate(now) {
    const progress = Math.min((now - start) / spinDuration, 1);
    const easeOut = 1 - Math.pow(1 - progress, 3);

    angle = (targetAngle * easeOut * Math.PI) / 180;
    drawWheel();

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      spinning = false;
      setTimeout(() => {
        window.location.href = "page.html";
      }, 2000);
    }
  }

  requestAnimationFrame(animate);
};
