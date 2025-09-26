document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".carousel-track");
  const btnLeft = document.querySelector(".carousel-btn.left");
  const btnRight = document.querySelector(".carousel-btn.right");

  let cards = Array.from(track.children);

  function updateCardWidth() {
    return cards[0].getBoundingClientRect().width + parseInt(getComputedStyle(cards[0]).marginRight);
  }

  let cardWidth = updateCardWidth();

  const clonesBefore = cards.map(card => card.cloneNode(true));
  const clonesAfter = cards.map(card => card.cloneNode(true));

  clonesBefore.forEach(clone => track.insertBefore(clone, track.firstChild));
  clonesAfter.forEach(clone => track.appendChild(clone));

  cards = Array.from(track.children); 
  let originalCardsCount = cards.length / 3; 
  let index = originalCardsCount; 

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
    if (index >= originalCardsCount * 2) {
      track.style.transition = "none";
      index = originalCardsCount;
      track.style.transform = `translateX(-${cardWidth * index}px)`;
    }
    if (index < originalCardsCount) {
      track.style.transition = "none";
      index = originalCardsCount * 2 - 1;
      track.style.transform = `translateX(-${cardWidth * index}px)`;
    }
  });

  window.addEventListener("resize", () => {
    cardWidth = updateCardWidth();
    track.style.transition = "none";
    track.style.transform = `translateX(-${cardWidth * index}px)`;
  });
});
