const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');

// ================= CONFIGURACIÓN =================
// Nombres exactos de los 5 grupos de WhatsApp
// ¡IMPORTANTE! Escríbelos exactamente igual que en WhatsApp (respetando mayúsculas/minúsculas y emojis si los tienen)
const GROUP_NAMES = [
    "Nombre Del Grupo 1",
    "Nombre Del Grupo 2",
    "Nombre Del Grupo 3",
    "Nombre Del Grupo 4",
    "Nombre Del Grupo 5"
];

// Mensaje de texto a enviar
const TEXT_MESSAGE = "Hola grupo, este es el mensaje programado del día.";

// Ruta a la imagen que se enviará (usa barras dobles \\ o barra simple / en la ruta)
// Puedes poner la imagen en la misma carpeta y poner solo su nombre.
const IMAGE_PATH = "./imagen.jpg";
// =================================================

const client = new Client({
    authStrategy: new LocalAuth(), // Esto guarda la sesión para no escanear el QR cada vez
    puppeteer: {
        // Modo invisible
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
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
