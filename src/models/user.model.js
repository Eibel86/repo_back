// IMPORTS
const { queryDB } = require("../utils/DBquery"); // Facilita/automatiza mediante una función las consultas a la BBDD
const userQueries = require("../queries/user.queries"); // Importa la querie (consulta creada en ese directorio)



//FUNCION buscar por email
/**
 * Busca un usuario en la base de datos por su email y lo devuelve.
 *
 * @async
 * @function findByEmail
 * @param {string} email - Email del usuario que se quiere buscar.
 * @returns {Promise <Object | undefined>} El usuario encontrado o `undefined` si no existe.
 */
const findByEmail = async (email) => {
  const result = await queryDB(userQueries.findByEmail, [email]); // Ejecuta la consulta SQL con el email como parámetro
  return result.rows[0]; // Devuelve el primer usuario que coincida con el email
};

//FUNCION insertar usuario: 
/**
 * Inserta un nuevo usuario en la base de datos y devuelve el usuario recién creado.
 *
 * @async
 * @function insertUser
 * @param {Object} user - Objeto con los datos del usuario a insertar.
 * @param {string} user.name - Nombre del usuario.
 * @param {string} user.email - Email del usuario.
 * @param {string} user.password - Contraseña del usuario (sin hashear).
 * @param {string} [user.role="user"] - Rol del usuario (por defecto es "user").
 * @returns {Promise <Object>} El usuario insertado con todos sus campos (incluyendo id y fecha de registro).
 */
const insertUser = async ({ name, email, password, role = "user" }) => { 
  const result = await queryDB(userQueries.insertUser, [
    name,
    email,
    password,
    role
  ]);
  return result.rows[0];
}




// EXPORTS
module.exports = {
    findByEmail,
    insertUser
};