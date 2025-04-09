document.addEventListener('DOMContentLoaded', () => {
    const optionsContainer = document.getElementById('options-container');
    const chatOutput = document.getElementById('chat-output');

    const responses = {
        "hotel-info": [
            { text: "Check-in/Check-out", response: "En RH Bayren Parc, es habitual que tengamos lista la habitación pronto (13:00-14:00), ¡y a veces incluso mucho antes! Sin embargo, en días de alta ocupación, es posible que necesitemos algo de tiempo adicional para asegurar que todo esté perfectamente preparado para su llegada. Agradecemos su comprensión y paciencia." },
            { text: "WiFi", response: "El wifi es gratuito y está disponible en todas las inmediaciones del hotel. Para conectarse al wifi, debe acceder a la red BAYRENPARC e introducir la contraseña 'wifihotel'. Cuando pulse en conectar, le pedirá autentificarse con el email entregado en el check-in y el número de habitación." },
            { text: "Directorio de Servicios", link: "https://fotos.hotelesrh.com/94.pdf" }
        ]
    };

    // Función para mostrar subopciones
    const showSuboptions = (options) => {
        optionsContainer.innerHTML = '';
        options.forEach(option => {
            const button = document.createElement('button');
            button.className = 'option';
            button.textContent = option.text;
            if (option.link) {
                button.addEventListener('click', () => window.open(option.link, '_blank'));
            } else if (option.response) {
                button.addEventListener('click', () => addMessage(option.response, 'bot'));
            }
            optionsContainer.appendChild(button);
        });

        const backButton = document.createElement('button');
        backButton.className = 'back-button';
        backButton.textContent = 'Volver al menú principal';
        backButton.addEventListener('click', () => {
            rebuildMainMenu();
            addInitialMessage();
        });
        optionsContainer.appendChild(backButton);
    };

    // Función para reconstruir el menú principal
    const rebuildMainMenu = () => {
        optionsContainer.innerHTML = `
            <button class="option" data-option="hotel-info">Información del Hotel</button>
            <button class="option" data-link="https://www.lasprovincias.es/planes/playas/valencia-valencia/nord-0000317.html">Información Bandera de Playa Hoy</button>
            <button class="option" data-link="https://g.page/r/CYwQCiqTRq0HEAE/review">Escribir una Reseña en Google</button>
            <button class="option" data-link="https://visitgandia.com/gnd/web_php/index.php">Intereses en Gandía</button>
            <button class="option" data-link="https://www.visitgandia.com/pag/4488/rutas-y-excursiones.html">Senderismo Local</button>
            <button class="option" data-link="https://blog.hotelesrh.com/category/responsabilidad-social-corporativa/">Responsabilidad Social</button>
            <button class="option" onclick="window.open('https://www.hotelrhbayrenparc.com/?gad_source=1&gclid=CjwKCAjwtdi_BhACEiwA97y8BPoJEmPMiAqloR33gyfdtqxtF2AFOnxadBVBFJE9mp0fMqp_1aN2yhoCEJ8QAvD_BwE', '_blank')">
                Quiero realizar una nueva reserva
            </button>
        `;
    };

    // Función para agregar mensaje inicial al chat
    const addInitialMessage = () => {
        chatOutput.innerHTML = `
            <div class="chat-message bot">
                ¡Hola! Soy el asistente virtual de RH Bayren Parc. ¿En qué puedo ayudarte? Selecciona una opción:
            </div>
        `;
    };

    // Función para agregar un mensaje al chat
    const addMessage = (message, sender) => {
        chatOutput.innerHTML = `
            <div class="chat-message ${sender}">
                ${message}
            </div>
        `;
    };

    // Manejar clic en las opciones principales
    optionsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('option')) {
            const option = e.target.dataset.option;
            const link = e.target.dataset.link;

            if (link) {
                window.open(link, '_blank');
            } else if (responses[option]) {
                showSuboptions(responses[option]);
            }
        }
    });

    // Inicializa el menú principal y el mensaje inicial
    rebuildMainMenu();
    addInitialMessage();
});