document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    fetch("assets/php/envoyer_mail.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((result) => {
        document.getElementById("form-message").innerHTML = `${result}`;
        form.reset();
      })
      .catch((error) => {
        document.getElementById("form-message").innerHTML =
          "<p>Erreur lors de l'envoi du message.</p>";
      });
  });
