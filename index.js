const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');

// ================= CONFIGURACIÓN =================
// Nombres exactos de los 5 grupos de WhatsApp
// ¡IMPORTANTE! Escríbelos exactamente igual que en WhatsApp (respetando mayúsculas/minúsculas y emojis si los tienen)
const GROUP_NAMES = [
    "Ventas san Bernardo 😎😎",
    "Ventas San Bernardo II😎😎",
    "Emprendedores Vista Parques",
    "Ventas C.Casas del P. VII"
];

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

// Ruta a la imagen que se enviará (usa barras dobles \\ o barra simple / en la ruta)
// Puedes poner la imagen en la misma carpeta y poner solo su nombre.
const IMAGE_PATH = "./imagen.jpeg";
// =================================================

const client = new Client({
    authStrategy: new LocalAuth(), // Esto guarda la sesión para no escanear el QR cada vez
    puppeteer: {
        // Modo invisible
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        headless: true,
        args: [
            '--no-sandbox', 
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--disable-gpu'
        ]
    }
});

client.on('qr', (qr) => {
    console.log('\n=========================================================');
    console.log('ESCANEA ESTE CÓDIGO QR CON LA APP DE WHATSAPP EN TU TELÉFONO');
    console.log('=========================================================\n');
    qrcode.generate(qr, {small: true});
});

client.on('ready', async () => {
    console.log('✅ Cliente WhatsApp está listo y conectado!');
    
    let media = null;
    if (fs.existsSync(IMAGE_PATH)) {
        media = MessageMedia.fromFilePath(IMAGE_PATH);
    } else {
        console.warn(`[ADVERTENCIA] No se encontró la imagen en: ${IMAGE_PATH}. Solo se enviará texto.`);
    }

    try {
        const chats = await client.getChats();
        
        for (const targetGroupName of GROUP_NAMES) {
            const groupChat = chats.find(chat => chat.isGroup && chat.name === targetGroupName);
            
            if (groupChat) {
                console.log(`➡️ Enviando mensajes a: ${targetGroupName}`);
                
                // 1. Enviar texto
                await groupChat.sendMessage(TEXT_MESSAGE);
                
                // 2. Enviar imagen
                if (media) {
                    await groupChat.sendMessage(media);
                }
                
                console.log(`✅ Mensajes enviados a ${targetGroupName}`);
            } else {
                console.error(`[ERROR] No se pudo encontrar el grupo: "${targetGroupName}". Asegúrate de que el nombre sea exacto.`);
            }
        }
        
        console.log('\n🎉 Todas las tareas completadas. Cerrando el cliente...');
    } catch (error) {
        console.error('❌ Error al enviar mensajes:', error);
    } finally {
        // Esperamos unos segundos antes de cerrar para asegurar que los mensajes salieron por la red
        setTimeout(() => {
            client.destroy();
            process.exit(0);
        }, 5000);
    }
});

console.log('Iniciando WhatsApp Bot...');
client.initialize();
