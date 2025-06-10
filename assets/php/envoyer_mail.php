<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $nom = isset($_POST["name"]) ? htmlspecialchars(trim($_POST["name"])) : '';
    $email = isset($_POST["email"]) ? filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL) : '';
    $message = isset($_POST["message"]) ? htmlspecialchars(trim($_POST["message"])) : '';

    if (!empty($nom) && filter_var($email, FILTER_VALIDATE_EMAIL) && !empty($message)) {

        $to = "afractal.mailing@gmail.com";
        $subject = "Nouveau message de $nom via le formulaire de contact";

        $body = "Nom: $nom\n";
        $body .= "Email: $email\n\n";
        $body .= "Message:\n$message";
        $headers = "From: afractal.mailing@gmail.com\r\n";
        $headers .= "Reply-To: $email\r\n";

        if (mail($to, $subject, $body, $headers)) {
            echo "<p class= succes-message>✅ Votre message a été envoyé avec succès.</p>";
        } else {
            echo "<p class= error-message>❌ Une erreur est survenue lors de l'envoi du message.</p>";
        }
    } else {
        echo "<p class= error-message>❗ Veuillez remplir tous les champs correctement.</p>";
    }
} else {
    echo "<p class= error-message>❌ Requête invalide.</p>";
}
