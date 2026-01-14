import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'user_management',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export const testConnection = async (): Promise<void> => {
    try {
        const connection = await pool.getConnection();
        console.log('Conexion exitosa a la base de datos');
        connection.release();
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        process.exit(1);
    }
};
