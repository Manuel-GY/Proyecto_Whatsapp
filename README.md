# Bot de WhatsApp Programado 🤖

Este proyecto es un bot automatizado creado con [Node.js](https://nodejs.org/) y [whatsapp-web.js](https://wwebjs.dev/) diseñado para enviar mensajes de texto e imágenes de manera programada a grupos de WhatsApp.

## Características ✨

- **Envío Múltiple**: Envía automáticamente un mensaje de texto y una imagen a 5 grupos diferentes de WhatsApp.
- **Funcionamiento en Segundo Plano**: Opera en modo *headless*, por lo que no interfiere con el uso normal del equipo.
- **Soporte para Pantalla Bloqueada**: Al ejecutarse sobre Puppeteer en segundo plano, puede operar con éxito aunque la PC despierte de la suspensión y se encuentre en la pantalla de bloqueo de Windows.
- **Tarea Programada Automática**: Incluye un script de PowerShell para automatizar la ejecución diaria a las 12:00 PM (despertando el equipo si es necesario).

## Prerrequisitos 📋

- [Node.js](https://nodejs.org/es/)
- npm (Viene incluido con Node.js)
- WhatsApp en tu teléfono inteligente para escanear el código QR.

## Instalación ⚙️

1. Clona este repositorio o descarga la carpeta.
2. Abre la terminal o consola de comandos en la carpeta del proyecto.
3. Instala las dependencias necesarias:
   ```bash
   npm install
   ```

## Configuración 🛠️

Antes de ejecutar el bot, necesitas personalizar tus datos abriendo el archivo `index.js` en cualquier editor de texto:

1. **Nombres de Grupos**: Modifica la lista `GROUP_NAMES` con los nombres exactos de los 5 grupos de WhatsApp (respetando mayúsculas, minúsculas y emojis).
2. **Mensaje de Texto**: Modifica la variable `TEXT_MESSAGE` con el mensaje que deseas enviar.
3. **Imagen**: Coloca la imagen que quieres enviar en la carpeta raíz del proyecto y nómbrala `imagen.jpg`. (La ruta se puede cambiar en la variable `IMAGE_PATH`).

## Primer Uso (Vincular Cuenta) 📱

La primera vez que uses el bot, es necesario iniciar sesión en WhatsApp:

1. Abre la consola en la ruta del proyecto y ejecuta `node index.js`.
2. Verás en la consola un **código QR**.
3. Abre WhatsApp en tu celular > *Dispositivos vinculados* > *Vincular un dispositivo*.
4. Escanea el código QR de la pantalla.
5. ¡Listo! La sesión se guardará de forma segura en una carpeta local para usos futuros, así no tendrás que volver a escanearlo.

## Programación Diaria Automática ⏰

Para que el programa se ejecute solo todos los días a las 12:00 PM:

1. Haz clic derecho sobre el archivo `crear_tarea.ps1`.
2. Selecciona **Ejecutar con PowerShell**.

Esta tarea de Windows está configurada con la opción *WakeToRun*, lo que significa que despertará la computadora si esta se encuentra suspendida a la hora programada.
