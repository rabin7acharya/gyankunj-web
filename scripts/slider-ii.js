let defTransform = 0;
let cardWidth = 0; // Initialize slide width

function updateWidth() {
  const slides = document.getElementById("slides");
  const firstCard = slides.querySelector("div");
  const secondCard = slides.querySelector("div + div");
  if (firstCard && secondCard) {
    cardWidth = secondCard.offsetLeft - firstCard.offsetLeft;
  }
}

function goForward() {
  defTransform -= cardWidth;
  const slides = document.getElementById("slides");
  if (defTransform < -(slides.scrollWidth - slides.clientWidth)) {
    defTransform = 0;
  }
  slides.style.transform = "translateX(" + defTransform + "px)";
}

function goPrevious() {
  defTransform += cardWidth;
  const slides = document.getElementById("slides");
  if (defTransform > 0) {
    defTransform = -(slides.scrollWidth - slides.clientWidth);
  }
  slides.style.transform = "translateX(" + defTransform + "px)";
}

const forward = document.getElementById("forward");
forward.addEventListener("click", goForward);

const backward = document.getElementById("backward");
backward.addEventListener("click", goPrevious);

// Update the slide width when the window is resized
window.addEventListener("resize", updateWidth);
updateWidth();
