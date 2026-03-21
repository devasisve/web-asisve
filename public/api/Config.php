<?php
/**
 * Configuración centralizada de la API - SEGURIDAD MEJORADA
 */
class Config {
    // Database credentials (usando getenv para ocultar en producción)
    const DB_HOST = 'qald438.asisve.org'; // Cambia a localhost si es el mismo servidor
    const DB_NAME = 'qald438';
    const DB_USER = 'qald438';
    
    // SMTP configuration (usando variables de entorno o constantes)
    const SMTP_HOST = 'smtp.buzondecorreo.com';
    const SMTP_USER = 'contacto@asisve.org';
    const SMTP_PORT = 587;
    const SMTP_FROM = 'contacto@asisve.org';
    const SMTP_NAME = 'Web Asisve';
    
    // CORS configuration
    const ALLOWED_ORIGIN = '*'; 

    /**
     * Métodos para obtener contraseñas de forma segura
     */
    public static function getDbPass() {
        return getenv('DB_PASS') ?: 'Asisve01**';
    }

    public static function getSmtpPass() {
        return getenv('SMTP_PASS') ?: 'Asisve$77';
    }
}
