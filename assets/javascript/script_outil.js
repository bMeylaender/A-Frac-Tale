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
  }
});
