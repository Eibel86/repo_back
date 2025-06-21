// IMPORTS
const { queryDB } = require('../utils/DBquery');
const queries = require('../queries/film.queries');


const findDirectorByName = async (name) => {
  const result = await queryDB(queries.findDirectorByName, [name]);
  return result.rows[0];
};

const insertDirector = async (name) => {
  const result = await queryDB(queries.insertDirector, [name]);
  return result.rows[0];
};

const insertDirectorIfNotExists = async (name) => {
  const existing = await findDirectorByName(name);
  if (existing) return existing.director_id;

  const inserted = await insertDirector(name);
  return inserted.director_id;
};


// EXPORTS
module.exports = {
    insertDirectorIfNotExists,
};