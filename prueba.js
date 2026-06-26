const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');

// Número de teléfono para la prueba (con código de país 56 y el sufijo de WhatsApp @c.us)
const TEST_NUMBER = "56975739157@c.us"; 

// Mensaje de texto a enviar
const TEXT_MESSAGE = `🚨 ¿Tu hogar y tus bienes están realmente protegidos? 🚨

No dejes la tranquilidad de tu familia al azar. Ofrecemos servicio profesional de instalación de sistemas de seguridad, alarmas y cámaras para que tengas el control total de lo que pasa en tu casa, estés donde estés. 📹🔒

✅ Protege tu hogar 24/7.
✅ Equipos de alta calidad.
✅ Instalación rápida y limpia.

🎁 ¡ATENCIÓN VECINOS! 

Tenemos COTIZACIÓN GRATUITA exclusiva para domicilios dentro del sector Parque Los Suspiros.

📲 Escríbenos o llámanos hoy mismo al: +56 9 7573 9157

👉 Haz clic aquí para hablar por WhatsApp: wa.me/56975739157`;

// Ruta de la imagen
const IMAGE_PATH = "./imagen.jpeg";

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        headless: true,
        args: [
            '--no-sandbox', 
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--disable-gpu'
        ]
    },
    webVersionCache: {
        type: 'remote',
        remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html'
    }
});

client.on('qr', (qr) => {
    console.log('\n=========================================================');
    console.log('ESCANEA ESTE CÓDIGO QR CON LA APP DE WHATSAPP EN TU TELÉFONO');
    console.log('=========================================================\n');
    qrcode.generate(qr, {small: true});
});

client.on('ready', async () => {
    console.log('\n✅ Cliente WhatsApp está listo y conectado!');
    
    let media = null;
    if (fs.existsSync(IMAGE_PATH)) {
        media = MessageMedia.fromFilePath(IMAGE_PATH);
    } else {
        console.warn(`[ADVERTENCIA] No se encontró la imagen en: ${IMAGE_PATH}. Asegúrate de haberla guardado en la carpeta.`);
    }

    try {
        console.log(`➡️ Enviando mensaje de prueba a tu número (+56 9 7573 9157)...`);
        
        // Enviar texto
        await client.sendMessage(TEST_NUMBER, TEXT_MESSAGE);
        
        // Enviar imagen
        if (media) {
            await client.sendMessage(TEST_NUMBER, media);
        }
        
        console.log(`\n✅ ¡Mensaje de prueba enviado exitosamente! Revisa tu WhatsApp.`);
    } catch (error) {
        console.error('\n❌ Error al enviar mensaje:', error);
    } finally {
        setTimeout(() => {
            console.log('Cerrando sesión de prueba...');
            client.destroy();
            process.exit(0);
        }, 5000);
    }
});

console.log('Iniciando prueba de WhatsApp Bot...');
client.initialize();
