<?php
/**
 * Configuración centralizada de la API - SEGURIDAD VÍA APACHE (.htaccess)
 */

class Config {
    // Database credentials
    const DB_HOST = 'qald438.asisve.org';
    const DB_NAME = 'qald438';
    const DB_USER = 'qald438';
    
    // SMTP configuration
    const SMTP_HOST = 'smtp.buzondecorreo.com';
    const SMTP_USER = 'contacto@asisve.org';
    const SMTP_PORT = 587;
    const SMTP_FROM = 'contacto@asisve.org';
    const SMTP_NAME = 'Web Asisve';
    
    // CORS configuration
    const ALLOWED_ORIGIN = '*'; 

    // Fallback credentials if environment variables are not set
    const DB_PASS = 'Asisve01**';
    const SMTP_PASS = 'Contacto22**';

    /**
     * Métodos para obtener contraseñas desde variables de entorno (.htaccess)
     */
    public static function getDbPass() {
        // En Apache, SetEnv pone las variables en $_SERVER o getenv()
        $pass = getenv('DB_PASS') ?: (isset($_SERVER['DB_PASS']) ? $_SERVER['DB_PASS'] : self::DB_PASS);
        if (!$pass) {
            throw new \Exception("Error de Seguridad: DB_PASS no configurado en el servidor.");
        }
        return $pass;
    }

    public static function getSmtpPass() {
        $pass = getenv('SMTP_PASS') ?: (isset($_SERVER['SMTP_PASS']) ? $_SERVER['SMTP_PASS'] : self::SMTP_PASS);
        if (!$pass) {
            throw new \Exception("Error de Seguridad: SMTP_PASS no configurado en el servidor.");
        }
        return $pass;
    }
}
