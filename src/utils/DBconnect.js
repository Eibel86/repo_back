// IMPORTS
const { Pool } = require('pg');//importa el Pool de PostgreSQL para gestionar conexiones
require('dotenv').config(); //variables de entorno



// Verifica si el entorno es de producción
const isProduction = process.env.NODE_ENV === 'production';

// UTIL: Instancia de Pool para conectarse a Postgress
/**
 * Crea una instancia de Pool para conectarse a PostgreSQL.
 * Utiliza variables de entorno para la configuración.
 * Aplica conexión segura (SSL) solo si está en producción.
 */
const pool = new Pool({
    user: process.env.DB_USER,         // Usuario de la base de datos
    password: process.env.DB_PASSWORD, // Contraseña del usuario
    host: process.env.DB_HOST,         // Host de la base de datos
    port: process.env.DB_PORT,         // Puerto de conexión
    database: process.env.DB_NAME,     // Nombre de la base de datos

    // En producción activa SSL con certificado no verificado
    ssl: isProduction ? { rejectUnauthorized: false } : false
});




// EXPORTS
module.exports = pool;