document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".card");
  const progressDivs = document.querySelectorAll(".progress");
  const totalCards = cards.length;
  let currentIndex = 0;

  function updateProgressIndicator() {
    progressDivs.forEach((progress, index) => {
      index < currentIndex
        ? progress.classList.add("bg-indigo-600")
        : progress.classList.remove("bg-indigo-600");
    });
  }

  function slideToIndex(index) {
    gsap.to(cards, {
      x: -index * 100 + "%",
      duration: 0.5,
      onComplete: updateProgressIndicator,
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalCards;
    slideToIndex(currentIndex);
    updateProgressIndicator();
  }

  function startAutoSlide() {
    setInterval(nextSlide, 3000);
  }

  progressDivs.forEach((progress, index) => {
    progress.addEventListener("click", () => {
      currentIndex = index;
      slideToIndex(currentIndex);
      updateProgressIndicator();
    });
  });

  startAutoSlide();
});

const hamburgerButton = document.getElementById("hamburgerButton");
const lines = document.querySelectorAll(".ham-btn div");
const hamMenu = document.querySelector(".ham-menu");

const tl = gsap.timeline({ reversed: true });
const tl2 = gsap.timeline({ reversed: true });

tl.to(lines[0], { rotation: 45, y: 8, duration: 0.2, ease: "power2.inOut" })
  .to(
    lines[1],
    { rotation: -45, y: 0, duration: 0.2, ease: "power2.inOut" },
    "-=0.1"
  )
  .to(lines[2], { opacity: 0, duration: 0.2, ease: "power2.inOut" }, "-=0.3");

hamburgerButton.addEventListener("click", () => {
  tl.reversed() ? tl.play() : tl.reverse();
  hamMenu.classList.toggle("hidden");

  gsap.to(hamMenu, {
    // clipping animation from top right cornor
    clipPath: hamMenu.classList.contains("hidden")
      ? "circle(0% at 100% 0%)"
      : "circle(200% at 100% 0%)",
    duration: 1.2,
    ease: "power2.inOut",
  });
});

// Select the images and container
const images = document.querySelectorAll(".info-right img");
const container = document.querySelector(".info-right");

// Set the initial index and duration
let currentIndex = 0;
const duration = 3000;

// Function to animate the image transition
function animateImageTransition() {
  gsap.to(images[currentIndex], {
    opacity: 0,
    duration: 0.5,
    onComplete: () => {
      // Hide the current image
      images[currentIndex].style.display = "none";
      // Increment the index or reset it to 0
      currentIndex = (currentIndex + 1) % images.length;
      // Show the next image
      images[currentIndex].style.display = "block";
      // Animate the opacity of the next image
      gsap.to(images[currentIndex], {
        opacity: 1,
        duration: 1,
        delay: 0.5, // Delay for a smooth transition
        onComplete: () => {
          // Schedule the next transition
          setTimeout(animateImageTransition, duration);
        },
      });
    },
  });
}

// Start the slider by scheduling the first transition
setTimeout(animateImageTransition, duration);

function initializeTabPanel() {
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  // Add a click event listener to each tab button
  tabBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      // Remove active class from all tab buttons and contents
      tabBtns.forEach((btn) => {
        btn.classList.remove("text-indigo-600", "font-extrabold");
      });
      tabContents.forEach((content) => {
        content.style.display = "none";
      });

      // Add active class to the clicked tab button and show the corresponding content
      btn.classList.add("text-indigo-600", "font-extrabold");
      tabContents[index].style.display = "block";

      // animate tabContent using gsap
      gsap.from(tabContents[index], {
        display: "block",
        duration: 0.5,
        y: 200,
        opacity: 0,
        ease: "power2.out",
      });
    });

    // Initialize with the first tab active
    if (btn.id === "tab-btn-i") {
      btn.click();
    }
  });
}

// Initialize the tab panel when the page loads
window.addEventListener("load", initializeTabPanel);
