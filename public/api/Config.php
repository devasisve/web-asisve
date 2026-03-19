<?php
/**
 * Configuración centralizada de la API
 */
class Config {
    // Database credentials
    const DB_HOST = 'qald438.asisve.org';
    const DB_NAME = 'qald438';
    const DB_USER = 'qald438';
    const DB_PASS = 'Asisve01**';

    // SMTP configuration
    const SMTP_HOST = 'smtp.buzondecorreo.com';
    const SMTP_USER = 'contacto@asisve.org';
    const SMTP_PASS = 'Asisve$77';
    const SMTP_PORT = 587;
    const SMTP_FROM = 'contacto@asisve.org';
    const SMTP_NAME = 'Web Asisve';
    
    // CORS configuration (optional but good for security)
    const ALLOWED_ORIGIN = '*'; // Consider specifying your domain later
}
