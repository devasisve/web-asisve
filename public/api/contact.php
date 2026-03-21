<?php
/**
 * Senior Full Stack: Handler de Contacto Seguro e Inteligente.
 * MODO: Solo Email (Base de Datos en TODO)
 */

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// 1. Cargar dependencias y configuración centralizada
require_once __DIR__ . '/Config.php';
require_once __DIR__ . '/Response.php';

// Cargar PHPMailer (ajusta la ruta si es necesario)
require __DIR__ . '/PHPMailer/src/Exception.php';
require __DIR__ . '/PHPMailer/src/PHPMailer.php';
require __DIR__ . '/PHPMailer/src/SMTP.php';

// 2. Solo permitir POST (Seguridad)
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    Response::error('Método no permitido', 405);
}

// 3. Extraer e identificar datos (JSON o FormData)
$input_raw = file_get_contents('php://input');
$input = json_decode($input_raw, true);

// Fallback a $_POST si no es JSON (compatibilidad extra)
if (is_null($input)) {
    $input = $_POST;
}

// 4. Validación y Sanitización (Principios de Seguridad)
$nombre   = filter_var($input['nombre'] ?? '', FILTER_SANITIZE_SPECIAL_CHARS);
$email    = filter_var($input['email'] ?? '', FILTER_VALIDATE_EMAIL);
$asunto   = filter_var($input['Asunto'] ?? '', FILTER_SANITIZE_SPECIAL_CHARS);
$mensaje  = filter_var($input['Mensaje'] ?? '', FILTER_SANITIZE_SPECIAL_CHARS);
$phone    = filter_var($input['phone'] ?? '', FILTER_SANITIZE_SPECIAL_CHARS);
$cp       = filter_var($input['codigopostal'] ?? '', FILTER_SANITIZE_SPECIAL_CHARS);

// Validaciones básicas antes de proceder
if (empty($nombre) || !$email || empty($mensaje)) {
    Response::error('Por favor, rellena todos los campos obligatorios correctamente.');
}

// -------------------------------------------------------------------------
// TODO: PRÓXIMA IMPLEMENTACIÓN - GUARDAR EN BASE DE DATOS
// Descomenta este bloque cuando crees la tabla 'contact_messages'
// -------------------------------------------------------------------------
/*
try {
    require_once 'Database.php';
    $db = Database::getInstance();
    $stmt = $db->prepare("INSERT INTO contact_messages (nombre, email, phone, asunto, mensaje, codigopostal, created_at) 
                          VALUES (?, ?, ?, ?, ?, ?, NOW())");
    $stmt->execute([$nombre, $email, $phone, $asunto, $mensaje, $cp]);
} catch (Exception $e) {
    error_log("Database Insert Error: " . $e->getMessage());
    // No bloqueamos el envío del email si falla la DB
}
*/
// -------------------------------------------------------------------------

// 5. Envío mediante PHPMailer
$mail = new PHPMailer(true);

try {
    // Configuración del servidor SMTP
    $mail->isSMTP();
    $mail->Host       = Config::SMTP_HOST;
    $mail->SMTPAuth   = true;
    $mail->Username   = Config::SMTP_USER;
    $mail->Password   = Config::getSmtpPass();
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = Config::SMTP_PORT;
    $mail->CharSet    = 'UTF-8';

    // Configuración del mensaje
    $mail->setFrom(Config::SMTP_FROM, Config::SMTP_NAME);
    $mail->addAddress(Config::SMTP_USER); // El destinatario es la propia empresa
    $mail->addReplyTo($email, $nombre);  // Responder al remitente

    // Contenido
    $mail->isHTML(true);
    $mail->Subject = "[Web Contacto] " . $asunto;
    
    // Cuerpo del mensaje con diseño profesional
    $mail->Body = "
        <div style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>
            <h2 style='color: #004687; border-bottom: 2px solid #004687; padding-bottom: 10px;'>Nuevo Mensaje desde la Web</h2>
            <p><strong>Remitente:</strong> $nombre</p>
            <p><strong>Email:</strong> <a href='mailto:$email'>$email</a></p>
            <p><strong>Teléfono:</strong> " . ($phone ?: 'No proporcionado') . "</p>
            <p><strong>C.P.:</strong> " . ($cp ?: 'No proporcionado') . "</p>
            <p><strong>Asunto:</strong> $asunto</p>
            <div style='background: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 10px;'>
                <strong>Mensaje:</strong><br/>
                " . nl2br($mensaje) . "
            </div>
            <hr style='margin-top: 20px;' />
            <p style='font-size: 12px; color: #777;'>Mensaje enviado automáticamente desde el formulario de contacto web.</p>
        </div>
    ";
    
    // Versión en texto plano para clientes que no soporten HTML
    $mail->AltBody = "Nuevo mensaje de contacto:\n\nNombre: $nombre\nEmail: $email\nAsunto: $asunto\nMensaje: $mensaje";

    $mail->send();
    
    // Respuesta exitosa
    Response::json(true, '¡Mensaje enviado correctamente! Nos pondremos en contacto contigo pronto.');

} catch (Exception $e) {
    // Error en el envío (Loggear en producción, no mostrar detalles sensibles innecesarios)
    error_log("PHPMailer Error: " . $mail->ErrorInfo);
    Response::error('Lo sentimos, no se pudo enviar el mensaje en este momento. Inténtalo más tarde.', 500);
}
