  const track = document.querySelector('.carousel-track');
  const btnLeft = document.querySelector('.carousel-btn.left');
  const btnRight = document.querySelector('.carousel-btn.right');

  let index = 0;
  const cardWidth = 320; // ancho + margin
  const totalCards = document.querySelectorAll('.card').length;

  btnRight.addEventListener('click', () => {
    if (index < totalCards - 1) {
      index++;
      track.style.transform = `translateX(-${index * cardWidth}px)`;
    }
  });

  btnLeft.addEventListener('click', () => {
    if (index > 0) {
      index--;
      track.style.transform = `translateX(-${index * cardWidth}px)`;
    }
  });
