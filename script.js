document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".carousel-track");
  const btnLeft = document.querySelector(".carousel-btn.left");
  const btnRight = document.querySelector(".carousel-btn.right");
  const carousel = document.querySelector(".carousel");

  let cards = Array.from(track.children);
  const originalCardsCount = cards.length;

  const clonesBefore = cards.map(card => card.cloneNode(true));
  const clonesAfter = cards.map(card => card.cloneNode(true));
  
  clonesBefore.forEach(clone => track.appendChild(clone));
  clonesAfter.forEach(clone => track.insertBefore(clone, track.firstChild));

  cards = Array.from(track.children);
  
  let currentIndex = originalCardsCount; 
  let cardWidth = cards[0].getBoundingClientRect().width + 20; 
  
  updateCarousel();

  function updateCarousel() {
    track.style.transition = "transform 0.5s ease";
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
  }

  function moveToNext() {
    currentIndex++;
    updateCarousel();
  }

  function moveToPrev() {
    currentIndex--;
    updateCarousel();
  }

  btnRight.addEventListener("click", moveToNext);
  btnLeft.addEventListener("click", moveToPrev);

  track.addEventListener("transitionend", () => {
    if (currentIndex >= originalCardsCount * 2) {
      track.style.transition = "none";
      currentIndex = originalCardsCount;
      track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }
    if (currentIndex < originalCardsCount) {
      track.style.transition = "none";
      currentIndex = originalCardsCount * 2 - 1;
      track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }
  });

  window.addEventListener("resize", () => {
    cardWidth = cards[0].getBoundingClientRect().width + 20;
    track.style.transition = "none";
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    
    void track.offsetWidth;
  });
  
  let startX = 0;
  let currentX = 0;
  let isDragging = false;

  track.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    currentX = startX;
    isDragging = true;
    track.style.transition = "none";
  });

  track.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    currentX = e.touches[0].clientX;
    const diff = startX - currentX;
    track.style.transform = `translateX(calc(-${currentIndex * cardWidth}px - ${diff}px))`;
  });

  track.addEventListener("touchend", () => {
    if (!isDragging) return;
    isDragging = false;
    
    const diff = startX - currentX;
    const threshold = 50; 
    
    if (diff > threshold) {
      moveToNext();
    } else if (diff < -threshold) {
      moveToPrev();
    } else {
      updateCarousel();
    }
  });
});
