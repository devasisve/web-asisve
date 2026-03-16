/**
 * Entity definitions for the ASISVE database.
 */

export interface Usuario {
  id_usuario?: number;
  nombre: string;
  apellido1: string;
  apellido2?: string;
  correo: string;
  password?: string;
  telefono?: string;
  direccion?: string;
  tipo_usuario: 'ADMIN' | 'VOLUNTARIO' | 'USUARIO';
  createdAt?: Date;
}

export interface DatabaseResponse {
  affectedRows: number;
  insertId: number;
}
