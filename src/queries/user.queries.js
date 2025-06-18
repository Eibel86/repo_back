// QUERIES (consultas a bbdd)

/**
 * Consultas SQL relacionadas con la tabla "users".
 *
 * Estas consultas se utilizan para buscar usuarios por email
 * o insertar nuevos registros en la base de datos.
 *
 * Los placeholders ($1, $2, etc.) se sustituyen por valores
 * seguros mediante la función que ejecuta la consulta.
 *
 * @constant
 * @type {Object}
 * @property {string} findByEmail - Consulta SQL para obtener un usuario por su email.
 * @property {string} insertUser - Consulta SQL para insertar un nuevo usuario y devolverlo.
 */
const userQueries = {
  // Selecciona todo de la tabla users con un email coincidente
  findByEmail: `SELECT * FROM users WHERE email = $1`,
  // Selecciona todo de la tabla users con un id coincidente
  findByEmail: `SELECT * FROM users WHERE user_id = $1`,

  // Inserta un nuevo usuario con name, email, password y role
  // y devuelve el usuario insertado (RETURNING *)
  insertUser: `
    INSERT INTO users (name, email, password, role) 
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `
};



//EXPORTS
module.exports = userQueries;