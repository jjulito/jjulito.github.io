document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".carousel-track");
  const btnLeft = document.querySelector(".carousel-btn.left");
  const btnRight = document.querySelector(".carousel-btn.right");

  const cards = Array.from(track.children);
  const cardWidth = cards[0].getBoundingClientRect().width + 20;

  const clonesBefore = cards.slice(-2).map(card => card.cloneNode(true));
  const clonesAfter = cards.slice(0, 2).map(card => card.cloneNode(true));

  clonesBefore.forEach(clone => track.insertBefore(clone, track.firstChild));
  clonesAfter.forEach(clone => track.appendChild(clone));

  let index = 2;
  track.style.transform = `translateX(-${cardWidth * index}px)`;

  function moveToIndex(newIndex) {
    track.style.transition = "transform 0.5s ease";
    index = newIndex;
    track.style.transform = `translateX(-${cardWidth * index}px)`;
  }

  btnRight.addEventListener("click", () => {
    moveToIndex(index + 1);
  });

  btnLeft.addEventListener("click", () => {
    moveToIndex(index - 1);
  });

  track.addEventListener("transitionend", () => {
    const cardsInTrack = Array.from(track.children);

    if (index >= cardsInTrack.length - 2) {
      track.style.transition = "none";
      index = 2;
      track.style.transform = `translateX(-${cardWidth * index}px)`;
    }

    if (index < 2) {
      track.style.transition = "none";
      index = cardsInTrack.length - 4;
      track.style.transform = `translateX(-${cardWidth * index}px)`;
    }
  });

  window.addEventListener("resize", () => {
    track.style.transition = "none";
    const newCardWidth = cards[0].getBoundingClientRect().width + 20;
    track.style.transform = `translateX(-${newCardWidth * index}px)`;
  });
});
