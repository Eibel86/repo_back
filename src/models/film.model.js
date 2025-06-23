// IMPORTS
const { queryDB } = require('../utils/DBquery');
const queries = require('../queries/film.queries');




// MODEL: obtener todas las películas
/**
 * Obtiene todas las películas de la base de datos.
 *
 * @async
 * @function getAll
 * @returns {Promise <Array <Object> >} Lista de todas las películas.
 */
const getAll = async () => {
  const result = await queryDB(queries.getAllFilms);
  return result.rows;
};
    
// MODEL: Buscar películas por título
/**
 * Busca películas cuyo título contenga una coincidencia parcial.
 *
 * @async
 * @function findByTitleAll
 * @param {string} title - Título (o parte del título) de la película.
 * @returns {Promise <Array <Object> >} Array de películas que coinciden (puede estar vacío).
 */
const findByTitleAll = async (title) => {
  const result = await queryDB(
    queries.findByTitleAll,
    [`%${title}%`] // coincidencia parcial
    //Separar la lógica de búsqueda del texto de la estructura de la query, y así mantener la consulta reutilizable y segura.
  );
  return result.rows; // Devuelve array (vacío si no hay coincidencias)
};

// MODEL: Buscar película por título (devuelve 1)
/**
 * Busca una película por su título y devuelve la primera coincidencia. 
 *
 * @async
 * @function findByTitleOne
 * @param {string} title - Título exacto de la película.
 * @returns {Promise<Object|null>} Objeto de la película o null si no se encuentra.
 */
const findByTitleOne = async (title) => {
  const result = await queryDB(
    queries.findByTitleOne,
    [title]                 
  );
  return result.rows[0];
};

// FUNCION: Buscar película por id
/**
 * Busca una película por su ID.
 *
 * @async
 * @function findById
 * @param {number} id - ID de la película.
 * @returns {Promise <Object | null>} Película encontrada o null si no existe.
 */
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
/**
 * Actualiza una película por su ID.
 *
 * @async
 * @function updateById
 * @param {Object} filmData - Datos actualizados de la película.
 * @param {number} filmData.film_id - ID de la película a actualizar.
 * @param {number} filmData.director_id - Nuevo ID de director.
 * @param {number} filmData.genre_id - Nuevo ID de género.
 * @param {string} filmData.full_title - Nuevo título.
 * @param {string} filmData.image_url - Nueva URL de imagen.
 * @param {string} filmData.release_date - Nueva fecha de estreno.
 * @param {number} filmData.duration - Nueva duración.
 * @param {string} filmData.synopsis - Nueva sinopsis.
 * @returns {Promise <Object | null>} Película actualizada o null si no se encontró.
 */
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
/**
 * Elimina una película por su ID.
 *
 * @async
 * @function deleteById
 * @param {number} film_id - ID de la película a eliminar.
 * @returns {Promise <Object>} Objeto de la película eliminada (según devuelve la base de datos).
 */
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