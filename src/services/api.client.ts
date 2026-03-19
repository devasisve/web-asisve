/**
 * Cliente API Tipado para comunicación con PHP.
 */

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  ts: number;
}

export class ApiClient {
  private static BASE_URL = '/api';

  /**
   * Realiza una petición POST a un endpoint PHP.
   */
  static async post<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // Manejo de errores HTTP (4xx, 5xx)
      if (!response.ok) {
        try {
          const errorData = await response.json();
          throw new Error(errorData.message || `Error ${response.status} en la petición`);
        } catch (e) {
          throw new Error(`Error ${response.status}: El servidor no respondió correctamente.`);
        }
      }

      return await response.json();
    } catch (error) {
      console.error('[ApiClient Error]:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Error de conexión con el servidor',
        ts: Date.now()
      };
    }
  }
}
