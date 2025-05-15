let scroll = 0;

document.addEventListener("wheel", function (e) {
  const hero = document.querySelector("#hero");
  const wave = document.querySelector(".wave");
  const header = document.querySelector("#header");
  const outils = document.querySelector("#outils");
  const fadeIn = document.querySelectorAll(".fade-in-up");

  scroll += e.deltaY;
  if (scroll < 0) {
    scroll = 0;
  }
  if (scroll > 1200) {
    scroll = 1200;
  }
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
  } else {
    hero.classList.remove("scrolled");
    wave.classList.remove("scrolled");
    header.classList.remove("active");
    fadeIn.forEach((element) => element.classList.remove("in-view"));
  }
});
