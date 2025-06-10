let scroll = 0;
let lastTouchY = null;
let flipCardsAnimated = false;

function handleScroll(deltaY) {
  const hero = document.querySelector("#hero");
  const wave = document.querySelector(".wave");
  const header = document.querySelector("#header");
  const outils = document.querySelector("#outils");
  const fadeIn = document.querySelectorAll(".fade-in-up");

  scroll += deltaY;
  if (scroll < 0) scroll = 0;
  if (scroll > 1200) scroll = 1200;
  // console.log(scroll);

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
      if (!flipCardsAnimated) {
        const flipCards = document.querySelectorAll(".flip-card");
        flipCards.forEach((card, i) => {
          setTimeout(() => {
            card.classList.add("hovered");
            setTimeout(() => {
              card.classList.remove("hovered");
            }, 1000);
          }, i * 200);
        });
        flipCardsAnimated = true;
      }
    } else {
      outils.classList.remove("scrolled");
      flipCardsAnimated = false;
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

document.addEventListener("keydown", function (e) {
  if (e.code === "Space") {
    e.preventDefault();
    handleScroll(301);
  }
  if (e.code === "ArrowDown") {
    handleScroll(100);
  }
  if (e.code === "ArrowUp") {
    handleScroll(-100);
  }
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

let maybePrevent = false;
window.addEventListener(
  "touchstart",
  function () {
    if (window.scrollY === 0) {
      maybePrevent = true;
    }
  },
  { passive: false }
);
window.addEventListener(
  "touchmove",
  function (e) {
    if (maybePrevent) {
      maybePrevent = false;
      if (e.touches[0].clientY > 0) {
        e.preventDefault();
      }
    }
  },
  { passive: false }
);

document
  .getElementById("newsletter-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    fetch("assets/php/newsletter.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        document.getElementById("form-message").innerHTML = `${result}`;
        form.reset();
      })
      .catch((error) => {
        document.getElementById("form-message").innerHTML =
          "<p>Erreur lors de l'envoi du message.</p>";
      });
  });
