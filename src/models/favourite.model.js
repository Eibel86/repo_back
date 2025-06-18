const { queryDB } = require('../utils/DBquery');
const queries = require('../queries/favourite.queries');

const findFavouriteByUserFilmIds = async (user_id, film_id) => {
    const result = await queryDB(queries.getFavouriteByUserFilmIds, [user_id, film_id]);
    return result.rows[0];
};

const insertFavourite = async (user_id, film_id) => {
    const result = await queryDB(queries.insertFavourite, [user_id, film_id]);
    return result.rows[0];
};


module.exports = {
    findFavouriteByUserFilmIds,
    insertFavourite
}