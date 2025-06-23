// IMPORTS
const pool = require("./DBconnect") //Importa la configuración del pool de conexiones


// UTIL: ejecutar consultas SQL
/**
 * Ejecuta una consulta SQL en la base de datos PostgreSQL.
 *
 * @async
 * @function queryDB
 * @param {string} query - Consulta SQL a ejecutar. Puede contener placeholders ($1, $2, etc.).
 * @param {Array<any>} [params=[]] - Parámetros a inyectar en la consulta SQL para evitar inyecciones SQL.
 * @returns {Promise<import('pg').QueryResult>} Resultado de la consulta, incluyendo las filas devueltas (`rows`).
 * @throws {Error} Propaga cualquier error que ocurra durante la ejecución de la consulta.
 *
 * @example
 * const result = await queryDB("SELECT * FROM users WHERE user_id = $1", [1]);
 * console.log(result.rows);
 */
const queryDB = async (query, params = []) => {
    try {
        const result = await pool.query(query, params);
        return result;
    } catch (error) {
        throw error;
    }
}



// EXPORTS
module.exports = {
    queryDB
}
