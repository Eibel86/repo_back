// IMPORTS
const { queryDB } = require('../utils/DBquery');
const queries = require('../queries/film.queries');


// MODEL: buscar género por su nombre
/**
 * Busca un género por su nombre.
 *
 * @async
 * @function findGenreByName
 * @param {string} name - Nombre del género a buscar.
 * @returns {Promise<Object|null>} Género encontrado o null si no existe.
 */
const findGenreByName = async (name) => {
  const result = await queryDB(queries.findGenreByName, [name]);
  return result.rows[0] || null;
};

// MODEL: insertar nuevo género
/**
 * Inserta un nuevo género en la base de datos.
 *
 * @async
 * @function insertGenre
 * @param {string} name - Nombre del género a insertar.
 * @returns {Promise<Object>} Objeto del género insertado (incluye su ID).
 */
const insertGenre = async (name) => {
  const result = await queryDB(queries.insertGenre, [name]);
  return result.rows[0]; // Devuelve el objeto completo si quieres más que el ID
};

// MODEL: insertar nuevo género si no existe
/**
 * Inserta un género solo si no existe previamente.
 * Si el género ya existe, devuelve su ID. Si no existe, lo crea y devuelve el ID nuevo.
 *
 * @async
 * @function insertGenreIfNotExists
 * @param {string} name - Nombre del género.
 * @returns {Promise<number>} ID del género existente o insertado.
 */
const insertGenreIfNotExists = async (name) => {
  const genre = await findGenreByName(name);
  if (genre) return genre.genre_id;

  const newGenre = await insertGenre(name);
  return newGenre.genre_id;
};



// EXPORTS
module.exports = {
  insertGenreIfNotExists,
};

