const { queryDB } = require('../utils/DBquery');
const queries = require('../queries/favourite.queries');

const findFavouriteByUserFilmIds = async (user_id, film_id) => {
    try {
        const result = await queryDB(queries.getFavouriteByUserFilmIds, [user_id, film_id]);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

const insertFavourite = async (user_id, film_id) => {
    try {
        const result = await queryDB(queries.insertFavourite, [user_id, film_id]);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};


const getAllFavouriteFilmsByUserId = async (user_id) => {
    try {
        const result = await queryDB(queries.getFavouritesByUserId, [user_id]);
        return result.rows;
    } catch (error) {
        throw error;
    }
}


module.exports = {
    findFavouriteByUserFilmIds,
    insertFavourite,
    getAllFavouriteFilmsByUserId
}