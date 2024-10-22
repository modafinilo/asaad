const form = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

form.addEventListener('submit', function (e) {
    e.preventDefault(); 

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const topic = document.getElementById('topic').value;
    const message = document.getElementById('message').value.trim();

    
    if (!name || !email || !phone || !topic || !message) {
        formMessage.textContent = 'Por favor, completa todos los campos.';
        formMessage.style.color = 'red';
        return;
    }

    formMessage.textContent = '¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.';
    formMessage.style.color = 'green';

    form.reset();
});