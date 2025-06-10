<?php

$file = 'newsletter_emails.txt';

if (isset($_POST['email'])) {
    $email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
    if ($email) {

        $emails = file_exists($file) ? file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) : [];

        if (in_array($email, $emails)) {
            echo "<p class= error-message>Cet email est déjà inscrit à la newsletter.</p>";
        } else {
            file_put_contents($file, $email . PHP_EOL, FILE_APPEND);

            if (mail($email, "Inscription Newsletter", "Merci de votre abonnement à notre newsletter")) {
                echo "<p class= success-message>Merci pour votre inscription ! Un email de confirmation a été envoyé.</p>";
            } else {
                echo "Merci pour votre inscription ! (Erreur lors de l'envoi de l'email de confirmation.)";
            }
        }
    } else {
        echo "<p class= error-message>Adresse email invalide.</p>";
    }
} else {
    echo "<p class= error-message>❗ Veuillez remplir tous les champs correctement.</p>";
}
