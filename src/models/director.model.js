// IMPORTS
const { queryDB } = require('../utils/DBquery');
const queries = require('../queries/film.queries');




// MODEL: buscar director por nombre
/**
 * Busca un director por su nombre en la base de datos.
 *
 * @async
 * @function findDirectorByName
 * @param {string} name - Nombre del director a buscar.
 * @returns {Promise  <Object | undefined>} El primer director encontrado o `undefined` si no existe.
 */
const findDirectorByName = async (name) => {
  const result = await queryDB(queries.findDirectorByName, [name]);
  return result.rows[0];
};

// MODEL: buscar insertar nuevo director en bbdd
/**
 * Inserta un nuevo director en la base de datos.
 *
 * @async
 * @function insertDirector
 * @param {string} name - Nombre del director a insertar.
 * @returns {Promise <Object>} El director insertado (incluyendo su ID y demás campos retornados).
 */
const insertDirector = async (name) => {
  const result = await queryDB(queries.insertDirector, [name]);
  return result.rows[0];
};

// MODEL: insertar nuevo director si no existe
/**
 * Inserta un director si no existe previamente.
 *
 * Busca primero si el director ya está en la base de datos. Si existe, devuelve su ID.
 * Si no existe, lo inserta y devuelve el ID del nuevo director.
 *
 * @async
 * @function insertDirectorIfNotExists
 * @param {string} name - Nombre del director a verificar o insertar.
 * @returns {Promise<number>} ID del director (existente o recién insertado).
 */
const insertDirectorIfNotExists = async (name) => {
  const existing = await findDirectorByName(name);
  if (existing) return existing.director_id;

  const inserted = await insertDirector(name);
  return inserted.director_id;
};




// EXPORTS
module.exports = {
    insertDirectorIfNotExists
};