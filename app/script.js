const noBtn = document.getElementById("no-btn");
const yesBtn = document.getElementById("yes-btn");
const message = document.getElementById("no-message");

// ✅ Música
const music = document.getElementById("bg-music");
const musicToggle = document.getElementById("music-toggle");

let musicStarted = false;

function tryStartMusic() {
  if (!music || musicStarted) return;

  music.volume = 0.6;
  music.play()
    .then(() => {
      musicStarted = true;
      localStorage.setItem("musicAllowed", "1"); // para yes.html
      if (musicToggle) musicToggle.textContent = "🔊";
    })
    .catch(() => {
      // Si el navegador lo bloquea, no pasa nada; se activará en otro click
    });
}

// ✅ primer gesto del usuario = música
["click", "touchstart", "keydown"].forEach(evt => {
  window.addEventListener(evt, tryStartMusic, { once: true });
});

// ✅ botón para pausar/activar
if (musicToggle) {
  musicToggle.addEventListener("click", (e) => {
    e.stopPropagation(); // para no disparar otras cosas
    if (!music) return;

    if (music.paused) {
      music.play().then(() => {
        musicStarted = true;
        localStorage.setItem("musicAllowed", "1");
        musicToggle.textContent = "🔊";
      }).catch(() => {});
    } else {
      music.pause();
      musicToggle.textContent = "🔇";
    }
  });
}

let noCount = 0;
let canEscape = false;

// YES -> intenta música + va a yes.html
yesBtn.addEventListener("click", () => {
  tryStartMusic();
  window.location.href = "yes.html";
});

// NO -> (tu lógica)
noBtn.addEventListener("click", () => {
  tryStartMusic();

  noCount++;

  if (noCount === 1) message.textContent = "Are you sure? 🥺";
  else if (noCount === 2) message.textContent = "Cachorrito, please?";
  else if (noCount === 3) message.textContent = "I'll be sad... 😔";
  else if (noCount === 4) message.textContent = "PLISSSSS 💔";
  else {
    message.textContent = "You can't catch me 😈";
    canEscape = true;
    moveButton();
  }

  growYes();
  shrinkNo();
});

noBtn.addEventListener("mouseover", () => {
  if (canEscape) moveButton();
});

noBtn.addEventListener("touchstart", () => {
  if (canEscape) moveButton();
});

function growYes() {
  const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize);
  yesBtn.style.fontSize = (currentSize + 8) + "px";
}

function shrinkNo() {
  const currentSize = parseFloat(window.getComputedStyle(noBtn).fontSize);
  const newSize = Math.max(10, currentSize - 2);
  noBtn.style.fontSize = newSize + "px";

  const padY = Math.max(6, 15 - noCount);
  const padX = Math.max(10, 30 - noCount * 2);
  noBtn.style.padding = `${padY}px ${padX}px`;
}

function moveButton() {
  noBtn.style.position = "absolute";

  const padding = 10;
  const btnW = noBtn.offsetWidth;
  const btnH = noBtn.offsetHeight;

  const maxX = window.innerWidth - btnW - padding;
  const maxY = window.innerHeight - btnH - padding;

  const x = Math.max(padding, Math.random() * maxX);
  const y = Math.max(padding, Math.random() * maxY);

  noBtn.style.left = x + "px";
  noBtn.style.top = y + "px";
}