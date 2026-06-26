# Bot de WhatsApp para Ventas 🤖

Este proyecto automatiza el envío diario de mensajes promocionales (con texto e imágenes) a grupos de WhatsApp específicos. Está diseñado para correr de fondo todos los días a las 12:00 PM sin interrumpir el trabajo normal y capaz de despertar el PC si está suspendido.

## 📋 Requisitos Previos (Para instalar en un nuevo PC)

Si deseas instalar este bot en tu casa o en otra computadora, necesitas tener instalado lo siguiente:
1. **[Node.js](https://nodejs.org/es/)** (Descarga la versión recomendada e instálala).
2. **Google Chrome** (Debe estar instalado en la ruta por defecto del sistema).
3. **Git** (Opcional, si prefieres clonar el repositorio usando comandos, si no, simplemente puedes descargar el ZIP desde GitHub).
4. **WhatsApp** en tu teléfono celular para escanear el código QR por primera vez.

---

## 🚀 Guía de Instalación en Casa (Paso a Paso)

Sigue estos pasos para dejar el sistema funcionando desde cero en tu computadora:

### Paso 1: Descargar el Código
1. Descarga este repositorio desde GitHub como un archivo ZIP y extráelo. (Se recomienda dejar la carpeta extraída en el Escritorio con el nombre `WhatsAppBot`).
2. Asegúrate de copiar la foto que deseas enviar dentro de esta carpeta y que se llame exactamente **`imagen.jpeg`**.

### Paso 2: Instalar las Librerías
El proyecto usa una versión especial de la librería de WhatsApp para evitar bloqueos recientes de la aplicación.
1. Abre la carpeta del bot.
2. Haz clic en la **barra de direcciones de la carpeta** (arriba del todo, donde sale la ruta), borra lo que dice, escribe la palabra `cmd` y presiona **Enter**. Se abrirá una consola negra.
3. En la consola, copia, pega y ejecuta este comando para instalar lo necesario:
   ```cmd
   npm install github:pedroslopez/whatsapp-web.js#main qrcode-terminal
   ```

### Paso 3: Vincular tu WhatsApp (Solo se hace una vez)
1. En la misma consola negra que abriste en el Paso 2, escribe el siguiente comando y presiona **Enter**:
   ```cmd
   node index.js
   ```
2. Espera unos segundos a que la consola dibuje un **Código QR**.
3. Abre WhatsApp en tu celular ve a **Dispositivos vinculados > Vincular un dispositivo**.
4. Escanea el código QR de la pantalla de tu computadora.
5. El sistema enviará el primer mensaje y luego de unos segundos se cerrará automáticamente. La sesión quedará guardada de forma segura en una carpeta oculta dentro de tu PC, por lo que no tendrás que volver a escanearlo mañana.

### Paso 4: Activar el Envío Automático Diario
Para que la computadora trabaje sola todos los días a las **12:00 PM**:
1. En la carpeta del bot, ubica el archivo **`crear_tarea.ps1`**.
2. Haz **clic derecho** sobre él y selecciona **"Ejecutar con PowerShell"**.
3. ¡Listo! El "Programador de Tareas" de Windows ha sido configurado con éxito.

*(Nota: Esta tarea de Windows está configurada con la opción especial "WakeToRun", lo que significa que despertará a tu computadora en caso de que esté en modo reposo a las 12 del día).*

---

## ⚙️ Modificar el Mensaje o los Grupos a Futuro
Si más adelante quieres cambiar el mensaje, la foto o agregar nuevos grupos:
1. Reemplaza el archivo `imagen.jpeg` por tu nueva foto.
2. Abre el archivo `index.js` usando el Bloc de Notas (Click derecho > Abrir con > Bloc de Notas). 
3. Justo en la parte superior verás la sección **CONFIGURACIÓN**, donde podrás editar el texto (`TEXT_MESSAGE`) y actualizar los nombres en la lista de grupos (`GROUP_NAMES`).
