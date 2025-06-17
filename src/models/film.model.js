// IMPORTS
const { queryDB } = require('../utils/DBquery');
const queries = require('../queries/film.queries');



/* MODELO DE PELÍCULAS
    Contiene funciones para interactuar con la base de datos relacionadas con películas, directores y géneros.*/

// FUNCION: Buscar película por título
/**
 * Busca una película por su título completo.
 * Si la encuentra, devuelve el objeto de la película. Si no, devuelve null.
 * 
 * @param {string} title - El título completo de la película.
 * @returns {Promise <Object | null>} Película encontrada o null si no existe.
 */
const findByTitle = async (title) => {
    const result = await queryDB(queries.findByTitle, [title]); //[title] es un array que se pasa como argumento para sustituir los placeholders.
    return result.rows[0] || null; //Si no encurntra película devuelve null
};

// FUNCION: Insertar nuevo director si no existe
/**
 * Inserta un nuevo director si no existe ya en la base de datos.
 * 
 * @param {string} name - Nombre del director.
 * @returns {Promise <number>} ID del director (existente o recién creado).
 */
const insertDirectorIfNotExists = async (name) => {
  let director = await queryDB(queries.findDirectorByName, [name]); //Consulta SQL. [name] es un array que se pasa como argumento para sustituir los placeholders.
  if (director.rows.length > 0) return director.rows[0].director_id; //Evita inserciones duplicadas. 

  const insertResult = await queryDB(queries.insertDirector, [name]); //Si no hay ningún director se hace la inserción

  return insertResult.rows[0].director_id; // Devuelve el id del nuevo director insertado
};

// FUNCION: Insertar género si no existe
/**
 * Inserta un nuevo género si no existe ya en la base de datos.
 * Busca un género de película por nombre en la base de datos.
 * Si ya existe, devuelve su genre_id.
 * Si no existe, lo inserta y luego devuelve el genre_id recién creado.
 * 
 * @param {string} name - Nombre del género.
 * @returns {Promise <number>} ID del género (existente o recién creado).
 */
const insertGenreIfNotExists = async (name) => {
  let genre = await queryDB(queries.findGenreByName, [name]); //Consulta SQL para saber si ya existe un género con ese nombre
  if (genre.rows.length > 0) return genre.rows[0].genre_id; //Si existe al menos un resultado (ya hay un género con ese nombre), devuelve el género

  const insertResult = await queryDB(queries.insertGenre, [name]); //Si no existe se inserta el nuevo género en la BBDD
  return insertResult.rows[0].genre_id; //Devuelve el ID del género recién insertado
};


// FUNCION: Insertar película
/**
 * Inserta una nueva película en la base de datos.
 * Ejecuta la consulta SQL para insertar una nueva película usando los datos proporcionados
 * 
 * @param {Object} filmData - Datos de la película a insertar.
 * @param {string} filmData.full_title - Título completo de la película.
 * @param {number} filmData.director_id - ID del director.
 * @param {number} filmData.genre_id - ID del género.
 * @param {string} filmData.image_url - URL de la imagen de la película.
 * @param {string} filmData.release_date - Fecha de estreno (formato YYYY-MM-DD).
 * @param {number} filmData.duration - Duración en minutos.
 * @param {string} [filmData.synopsis] - Sinopsis de la película.
 * 
 * @returns {Promise <Object>} Película insertada.
 */
const insertFilm = async (filmData) => {
  const result = await queryDB(queries.insertFilm, [  
    filmData.full_title,
    filmData.director_id,
    filmData.genre_id,
    filmData.image_url,
    filmData.release_date,
    filmData.duration,
    filmData.synopsis,
  ]); //Ejecuta la consulta SQL para insertar una nueva película usando los datos proporcionados
  return result.rows[0]; //Devuelve la primera fila del resultado (la peli recién insertada)
};





// EXPORTS
module.exports = {
  findByTitle,
  insertDirectorIfNotExists,
  insertGenreIfNotExists,
  insertFilm,
};