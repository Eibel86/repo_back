// IMPORTS
const { queryDB } = require('../utils/DBquery');
const queries = require('../queries/film.queries');




/* MODELO DE PELÍCULAS
    Contiene funciones para interactuar con la base de datos relacionadas con películas, directores y géneros.*/

// FUNCIÓN: Conseguir todas las películas
const getAll = async () => {
  const result = await queryDB(queries.getAllFilms);
  return result.rows;
};
    
// FUNCION: Buscar película por título
/**
 * Busca una película por su título completo.
 * Si la encuentra, devuelve el objeto de la película. Si no, devuelve null.
 * 
 * @param {string} title - El título completo de la película.
 * @returns {Promise <Object | null>} Película encontrada o null si no existe.
 */
const findByTitleAll = async (title) => {
  const result = await queryDB(
    queries.findByTitleAll,
    [`%${title}%`] // coincidencia parcial
    //Separar la lógica de búsqueda del texto de la estructura de la query, y así mantener la consulta reutilizable y segura.
  );
  return result.rows; // Devuelve array (vacío si no hay coincidencias)
};

const findByTitleOne = async (title) => {
  const result = await queryDB(
    queries.findByTitleOne,
    [title]                 
  );
  return result.rows[0];
};

// FUNCION: Buscar película por id
const findById = async (id) => {
  const result = await queryDB(queries.findById, [id]);
  return result.rows[0] || null;
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

// FUNCION: Actualizar película por id
const updateById = async ({
    film_id, director_id,
    genre_id, full_title,
    image_url, release_date,
    duration, synopsis
  }) => {
    const result = await queryDB(queries.updateById, [
      director_id, genre_id,
      full_title, image_url,
      release_date, duration,
      synopsis, film_id // al final porque es WHERE film_id = $8
    ]);
    return result.rows[0] || null;
  };

// FUNCIÓN: Borrar por id
const deleteById = async (film_id) => {
  const result = await queryDB(queries.deleteById, [film_id]);
  return result.rows[0];
};



// EXPORTS
module.exports = {
  getAll,
  findByTitleAll,
  findByTitleOne,
  findById,
  insertFilm,
  updateById,
  deleteById
};