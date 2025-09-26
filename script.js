document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".carousel-track");
  const btnLeft = document.querySelector(".carousel-btn.left");
  const btnRight = document.querySelector(".carousel-btn.right");

  const cards = Array.from(track.children);
  let index = 0;
  let cardWidth = cards[0].getBoundingClientRect().width + 20;

  function updateCarousel() {
    track.style.transform = `translateX(-${index * cardWidth}px)`;
  }

  btnRight.addEventListener("click", () => {
    if (index < cards.length - 1) {
      index++;
    } else {
      index = 0; 
    }
    updateCarousel();
  });

  btnLeft.addEventListener("click", () => {
    if (index > 0) {
      index--;
    } else {
      index = cards.length - 1; 
    }
    updateCarousel();
  });

  window.addEventListener("resize", () => {
    cardWidth = cards[0].getBoundingClientRect().width + 20;
    updateCarousel();
  });

  updateCarousel();
});
