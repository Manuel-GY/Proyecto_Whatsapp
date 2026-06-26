@echo off
cd /d "C:\Users\ac17157\Desktop\WhatsAppBot"
echo Ejecutando Bot de WhatsApp a las %TIME% el %DATE% >> ejecucion.log
cmd /c node index.js >> ejecucion.log 2>&1
echo Fin de ejecucion. >> ejecucion.log
