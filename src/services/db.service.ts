import mysql from 'mysql2/promise';

/**
 * Singleton Database Service
 * Manages a connection pool for scalable and efficient MySQL interaction.
 */
class DatabaseService {
  private static instance: DatabaseService;
  private pool: mysql.Pool | null = null;

  private constructor() { }

  private getPool(): mysql.Pool {
    if (!this.pool) {
      this.pool = mysql.createPool({
        host: import.meta.env.DB_HOST,
        user: import.meta.env.DB_USER,
        password: import.meta.env.DB_PASS,
        database: import.meta.env.DB_NAME,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        enableKeepAlive: true,
        keepAliveInitialDelay: 0,
      });
    }
    return this.pool;
  }

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  /**
   * Execute a query with prepared statements for security.
   * @param sql The SQL query string
   * @param params Parameters for the prepared statement
   */
  async query<T>(sql: string, params?: any[]): Promise<T[]> {
    try {
      const pool = this.getPool();
      const [rows] = await pool.execute(sql, params);
      return rows as T[];
    } catch (error) {
      console.error('[DatabaseService Error]:', error);
      throw new Error('Ha ocurrido un error en la base de datos.');
    }
  }

  /**
   * Cleanly shut down the pool (useful for specialized tasks/testing)
   */
  async end() {
    if (this.pool) {
      await this.pool.end();
      this.pool = null;
    }
  }
}

export const db = DatabaseService.getInstance();
