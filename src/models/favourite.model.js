// IMPORTS
const { queryDB } = require('../utils/DBquery');
const queries = require('../queries/favourite.queries');




// MODEL: busca un fav por id de user y de peli
/**
 * Busca un favorito en la base de datos por ID de usuario e ID de película.
 *
 * @async
 * @function findFavouriteByUserFilmIds
 * @param {number} user_id - ID del usuario.
 * @param {number} film_id - ID de la película.
 * @returns {Promise<Object|undefined>} Objeto con el favorito encontrado o `undefined` si no existe.
 * @throws {Error} Si ocurre un error durante la consulta a la base de datos.
 */
const findFavouriteByUserFilmIds = async (user_id, film_id) => {
    try {
        const result = await queryDB(queries.getFavouriteByUserFilmIds, [user_id, film_id]);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

// MODEL: inserta nuevo fav en bbdd
/**
 * Inserta un nuevo favorito en la base de datos.
 *
 * @async
 * @function insertFavourite
 * @param {number} user_id - ID del usuario.
 * @param {number} film_id - ID de la película.
 * @returns {Promise<Object>} El favorito insertado.
 * @throws {Error} Si ocurre un error durante la inserción.
 */
const insertFavourite = async (user_id, film_id) => {
    try {
        const result = await queryDB(queries.insertFavourite, [user_id, film_id]);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

// MODEL: eliminar fav por id de user y peli
/**
 * Elimina un favorito según el ID de usuario y de película.
 *
 * @async
 * @function deleteFavourite
 * @param {number} user_id - ID del usuario.
 * @param {number} film_id - ID de la película.
 * @returns {Promise<Object>} El favorito eliminado (o información relacionada, según el query).
 * @throws {Error} Si ocurre un error durante la eliminación.
 */
const deleteFavourite = async (user_id, film_id) => {
    try {
        const result = await queryDB(queries.deleteByUserIdAndFilmId, [user_id, film_id]);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

// MODEL: obtiene todas las pelis favs
/**
 * Obtiene todas las películas marcadas como favoritas por un usuario.
 *
 * @async
 * @function getAllFavouriteFilmsByUserId
 * @param {number} user_id - ID del usuario.
 * @returns {Promise<Array<Object>>} Lista de películas favoritas del usuario.
 * @throws {Error} Si ocurre un error al consultar la base de datos.
 */
const getAllFavouriteFilmsByUserId = async (user_id) => {
    try {
        const result = await queryDB(queries.getFavouritesByUserId, [user_id]);
        return result.rows;
    } catch (error) {
        throw error;
    }
}




// EXPORTS
module.exports = {
    findFavouriteByUserFilmIds,
    insertFavourite,
    deleteFavourite,
    getAllFavouriteFilmsByUserId
}