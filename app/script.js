const noBtn = document.getElementById("no-btn");
const yesBtn = document.getElementById("yes-btn");
const message = document.getElementById("no-message");

let noCount = 0;
let canEscape = false;

// YES -> va a yes.html
yesBtn.addEventListener("click", () => {
  window.location.href = "yes.html";
});

// NO -> cambia mensajes + crece YES + se hace pequeño NO
noBtn.addEventListener("click", () => {
  noCount++;

  if (noCount === 1) message.textContent = "Are you sure? 🥺";
  else if (noCount === 2) message.textContent = "Cachorrito, please?";
  else if (noCount === 3) message.textContent = "I'll be sad... 😔";
  else if (noCount === 4) message.textContent = "PLISSSSS 💔";
  else {
    message.textContent = "You can't catch me 😈";
    canEscape = true;
    moveButton(); // en el 6to click se mueve una vez
  }

  growYes();
  shrinkNo(); // ✅ NO se hace más pequeño en cada intento
});

// Después del 6to intento, se escapa al pasar el mouse
noBtn.addEventListener("mouseover", () => {
  if (canEscape) moveButton();
});

// (Opcional para móviles) después del 6to, se escapa al tocar
noBtn.addEventListener("touchstart", () => {
  if (canEscape) moveButton();
});

function growYes() {
  const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize);
  yesBtn.style.fontSize = (currentSize + 8) + "px";
}

function shrinkNo() {
  const currentSize = parseFloat(window.getComputedStyle(noBtn).fontSize);
  const newSize = Math.max(10, currentSize - 2); // mínimo 10px
  noBtn.style.fontSize = newSize + "px";

  // también reduce padding un poco (para que realmente se vea más pequeño)
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