document.addEventListener("DOMContentLoaded", function () {
  const burgerBtn = document.getElementById("burger-btn");
  const mobileNav = document.getElementById("mobile-nav");
  const dropdownToggle = document.querySelector(".mobile-dropdown-toggle");
  const mobileDropdown = document.querySelector(".mobile-dropdown");

  burgerBtn.addEventListener("click", function () {
    mobileNav.classList.toggle("active");
  });

  dropdownToggle.addEventListener("click", function () {
    mobileDropdown.classList.toggle("active");
  });

  const modalContainer = document.querySelector(".modal-container");
  const modalTriggers = document.querySelectorAll(".modal-trigger");

  modalTriggers.forEach((trigger) =>
    trigger.addEventListener("click", toggleModal)
  );

  function toggleModal() {
    modalContainer.classList.toggle("active");
    mobileNav.classList.remove("active");
    pannel.classList.toggle("active");
    hideBtn.disabled = "true";
  }

  const hideBtn = document.querySelector(".hide-show");
  const optionsContainer = document.querySelector(".options-container");
  const pannel = document.querySelector(".pannel");

  hideBtn.addEventListener("click", function () {
    optionsContainer.classList.toggle("active");
    pannel.classList.toggle("active");
    if (optionsContainer.classList.contains("active")) {
      hideBtn.innerText = "Show";
    } else {
      hideBtn.innerText = "Hide";
    }
  });
});
