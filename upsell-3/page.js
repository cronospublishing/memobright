(function () {
  const timerEl = document.getElementById("timer");

  let totalSeconds = 9 * 60;

  function updateTimer() {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    timerEl.textContent =
      String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");

    if (totalSeconds > 0) {
      totalSeconds--;
    } else {
      clearInterval(timerInterval);
      timerEl.textContent = "00:00";
    }
  }

  updateTimer();
  const timerInterval = setInterval(updateTimer, 1000);
})();
