# Requiere ejecutarse como Administrador para crear tareas programadas

$action = New-ScheduledTaskAction -Execute "C:\Users\ac17157\Desktop\WhatsAppBot\enviar_diario.bat"
$trigger = New-ScheduledTaskTrigger -Daily -At 12:00PM
# Configuración clave: WakeToRun despierta el PC
$settings = New-ScheduledTaskSettingsSet -WakeToRun -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable
# Ejecutar como el usuario actual interactivamente
$principal = New-ScheduledTaskPrincipal -UserId "$env:USERDOMAIN\$env:USERNAME" -LogonType Interactive

Register-ScheduledTask -Action $action -Trigger $trigger -Settings $settings -Principal $principal -TaskName "BotWhatsAppDiario" -Description "Envio diario de mensajes a grupos de WhatsApp a las 12 PM" -Force

Write-Host "La tarea programada 'BotWhatsAppDiario' ha sido creada exitosamente."
Write-Host "Revisa el Programador de Tareas (Task Scheduler) en Windows para confirmar."
