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
  if (scroll > 400) scroll = 400;
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

    if (scroll > 300) {
      outils.classList.add("scrolled");
      if (!flipCardsAnimated) {
        const flipCards = document.querySelectorAll(".flip-card");
        flipCards.forEach((card, i) => {
          setTimeout(() => {
            card.classList.add("hovered");
            setTimeout(() => {
              card.classList.remove("hovered");
            }, 2000);
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

document.addEventListener(
  "wheel",
  function (e) {
    const scrollSections = document.querySelectorAll(".scroll-section");
    let inSection = false;

    scrollSections.forEach((section) => {
      if (section.contains(e.target)) {
        inSection = true;
        const atTop = section.scrollTop === 0;
        const atBottom =
          section.scrollTop + section.clientHeight >= section.scrollHeight - 1;
        if ((e.deltaY < 0 && atTop) || (e.deltaY > 0 && atBottom)) {
          e.preventDefault();
          handleScroll(e.deltaY);
        }

        return;
      }
    });

    if (!inSection) {
      e.preventDefault();
      handleScroll(e.deltaY);
    }
  },
  { passive: false }
);

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
                    <figcaption><h3>${post.title}</h3></figcaption>
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

let circle1 = document.querySelector(".circle1");
let circle2 = document.querySelector(".circle2");

for (let i = 0; i <= 80; i++) {
  let span1 = document.createElement("span");
  span1.style.setProperty("--i", i);
  circle1.appendChild(span1);

  let span2 = document.createElement("span");
  span2.style.setProperty("--i", i);
  circle2.appendChild(span2);
}
