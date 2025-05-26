document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const messageDiv = document.getElementById('form-message');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        form.reset();
        messageDiv.classList.add("active")
    });
});