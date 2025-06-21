// IMPORTS
const { queryDB } = require('../utils/DBquery');
const queries = require('../queries/film.queries');


const findGenreByName = async (name) => {
  const result = await queryDB(queries.findGenreByName, [name]);
  return result.rows[0] || null;
};

const insertGenre = async (name) => {
  const result = await queryDB(queries.insertGenre, [name]);
  return result.rows[0]; // Devuelve el objeto completo si quieres más que el ID
};


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

