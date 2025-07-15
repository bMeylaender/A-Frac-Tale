document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    const messageDiv = document.getElementById("form-message");

    const email = form.querySelector('input[name="email"]');
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      messageDiv.textContent = "❗Veuillez entrer une adresse email valide.";

      return;
    }

    const name = form.querySelector('input[name="name"]');
    if (name && name.value.trim().length < 2) {
      messageDiv.textContent =
        "❗Veuillez entrer un nom valide (au moins 2 caractères).";

      return;
    }

    const message = form.querySelector('textarea[name="message"]');
    if (message && message.value.trim().length < 10) {
      messageDiv.textContent =
        "❗Le message doit contenir au moins 10 caractères.";

      return;
    }

    const rgpd = form.querySelector('input[name="rgpd"]');
    if (rgpd && !rgpd.checked) {
      messageDiv.textContent =
        "❗Vous devez accepter la politique de confidentialité.";

      return;
    }

    if (submitBtn) submitBtn.disabled = true;

    fetch("assets/php/envoyer_mail.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((result) => {
        messageDiv.classList.remove("error-message");
        messageDiv.innerHTML = result;
        form.reset();
      })
      .catch((error) => {
        messageDiv.textContent = "Erreur lors de l'envoi du message.";
        messageDiv.classList.add("error-message");
      })
      .finally(() => {
        if (submitBtn) submitBtn.disabled = false;
      });
  });
