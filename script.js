const track = document.querySelector('.carousel-track');
const btnLeft = document.querySelector('.carousel-btn.left');
const btnRight = document.querySelector('.carousel-btn.right');
const cards = Array.from(track.children);

let index = 0;

function updateCarousel() {
  const cardWidth = cards[0].getBoundingClientRect().width + 20; 
  track.style.transform = `translateX(-${index * cardWidth}px)`;
}

btnRight.addEventListener('click', () => {
  const visibleCards = Math.floor(track.parentElement.offsetWidth / (cards[0].getBoundingClientRect().width + 20));
  if (index < cards.length - visibleCards) {
    index++;
    updateCarousel();
  }
});

btnLeft.addEventListener('click', () => {
  if (index > 0) {
    index--;
    updateCarousel();
  }
});

window.addEventListener('resize', updateCarousel);
updateCarousel();
