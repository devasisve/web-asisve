<?php
/**
 * Helper class for JSON standardized responses.
 */
class Response {
    /**
     * Set JSON headers and output the standardized response.
     */
    public static function json($success, $message, $data = [], $code = 200) {
        // Essential headers
        header('Content-Type: application/json; charset=utf-8');
        header('Access-Control-Allow-Origin: *'); // Consider refining for production
        header('Access-Control-Allow-Methods: POST, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type');
        
        // Handle preflight OPTIONS request
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            http_response_code(204);
            exit;
        }

        http_response_code($code);
        
        echo json_encode([
            'success' => $success,
            'message' => $message,
            'data'    => $data,
            'ts'      => time()
        ]);
        exit;
    }

    /**
     * Send an error response.
     */
    public static function error($message, $code = 400, $data = []) {
        self::json(false, $message, $data, $code);
    }
}
