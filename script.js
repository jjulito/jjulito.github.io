const track = document.querySelector('.carousel-track');
const btnLeft = document.querySelector('.carousel-btn.left');
const btnRight = document.querySelector('.carousel-btn.right');

let index = 0;
const cards = Array.from(track.children);

cards.forEach(card => {
  const cloneFirst = card.cloneNode(true);
  const cloneLast = card.cloneNode(true);
  track.appendChild(cloneFirst);
  track.insertBefore(cloneLast, track.firstChild);
});

const allCards = Array.from(track.children);
let cardWidth = cards[0].getBoundingClientRect().width + 20;

function updateCarousel() {
  track.style.transition = "transform 0.5s ease";
  track.style.transform = `translateX(-${(index + 1) * cardWidth}px)`;
}

btnRight.addEventListener('click', () => {
  if (index >= cards.length) {
    index = 0;
    track.style.transition = "none";
    track.style.transform = `translateX(-${cardWidth}px)`;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        track.style.transition = "transform 0.5s ease";
        index++;
        updateCarousel();
      });
    });
  } else {
    index++;
    updateCarousel();
  }
});

btnLeft.addEventListener('click', () => {
  if (index <= -1) {
    index = cards.length - 1;
    track.style.transition = "none";
    track.style.transform = `translateX(-${cards.length * cardWidth}px)`;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        track.style.transition = "transform 0.5s ease";
        index--;
        updateCarousel();
      });
    });
  } else {
    index--;
    updateCarousel();
  }
});

window.addEventListener('resize', () => {
  cardWidth = cards[0].getBoundingClientRect().width + 20;
  updateCarousel();
});

updateCarousel();
