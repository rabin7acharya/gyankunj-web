let defaultTransform = 0;
let slideWidth = 0; // Initialize slide width

function updateSlideWidth() {
  const slider = document.getElementById("slider");
  const firstSlide = slider.querySelector("div");
  const secondSlide = slider.querySelector("div + div");
  if (firstSlide && secondSlide) {
    slideWidth = secondSlide.offsetLeft - firstSlide.offsetLeft;
  }
}

function goNext() {
  defaultTransform -= slideWidth;
  const slider = document.getElementById("slider");
  if (defaultTransform < -(slider.scrollWidth - slider.clientWidth)) {
    defaultTransform = 0;
  }
  slider.style.transform = "translateX(" + defaultTransform + "px)";
}

function goPrev() {
  defaultTransform += slideWidth;
  const slider = document.getElementById("slider");
  if (defaultTransform > 0) {
    defaultTransform = -(slider.scrollWidth - slider.clientWidth);
  }
  slider.style.transform = "translateX(" + defaultTransform + "px)";
}

const next = document.getElementById("next");
next.addEventListener("click", goNext);

const prev = document.getElementById("prev");
prev.addEventListener("click", goPrev);

// Update the slide width when the window is resized
window.addEventListener("resize", updateSlideWidth);
updateSlideWidth();
