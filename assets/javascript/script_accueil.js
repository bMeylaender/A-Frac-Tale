let scroll = 0;
let lastTouchY = null;

function handleScroll(deltaY) {
  const hero = document.querySelector("#hero");
  const wave = document.querySelector(".wave");
  const header = document.querySelector("#header");
  const outils = document.querySelector("#outils");
  const fadeIn = document.querySelectorAll(".fade-in-up");
  const footer = document.querySelector("#footer");

  scroll += deltaY;
  if (scroll < 0) scroll = 0;
  if (scroll > 1200) scroll = 1200;
  console.log(scroll);

  if (scroll > 0) {
    hero.classList.add("scrolled");
    wave.classList.add("scrolled");
    setTimeout(() => {
      header.classList.add("active");
    }, 200);
    setTimeout(() => {
      fadeIn.forEach((element) => element.classList.add("in-view"));
    }, 600);
    if (scroll > 600) {
      outils.classList.add("scrolled");
    } else {
      outils.classList.remove("scrolled");
    }
    if (scroll > 900) {
      footer.classList.add("active");
    } else {
      footer.classList.remove("active");
    }
  } else {
    hero.classList.remove("scrolled");
    wave.classList.remove("scrolled");
    header.classList.remove("active");
    fadeIn.forEach((element) => element.classList.remove("in-view"));
  }
}

document.addEventListener("wheel", function (e) {
  handleScroll(e.deltaY);
});

document.addEventListener("touchstart", function (e) {
  if (e.touches.length === 1) {
    lastTouchY = e.touches[0].clientY;
  }
});

document.addEventListener("touchmove", function (e) {
  if (e.touches.length === 1 && lastTouchY !== null) {
    const currentY = e.touches[0].clientY;
    const deltaY = lastTouchY - currentY;
    handleScroll(deltaY);
    lastTouchY = currentY;
  }
});

document.addEventListener("touchend", function () {
  lastTouchY = null;
});

const cardsContainer = document.querySelector("#grid");

fetch("db.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    const cards = data.cards;
    let html = "";
    cards.forEach(function (post) {
      html += `
      <div class="flip-card-container">
        <div class="flip-card">
            <div class="card-front">
                <figure>
                    <div class="img-bg"></div>
                    <img src="${post.image.src}" alt="${post.image.alt}">
                    <figcaption>${post.title}</figcaption>
                </figure>
            </div>
            <div class="card-back">
                <p class="card-desc">${post.description}</p>
                <a href="${post.link.href}" class="create">Créer</a>  
            </div>
        </div>
    </div>
      `;
    });
    cardsContainer.innerHTML = html;
  });
