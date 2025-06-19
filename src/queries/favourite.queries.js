

const favouriteQueries = {
    insertFavourite:
        `INSERT INTO favourites 
        (user_id, film_id)
        VALUES 
        ($1, $2)
        RETURNING *`,
    getFavouriteByUserFilmIds:
        `SELECT films.full_title
        FROM favourites
        INNER JOIN films ON films.film_id = favourites.film_id
        WHERE favourites.user_id = $1 AND favourites.film_id = $2`,
    getFavouritesByUserId:
        `SELECT films.full_title
        FROM favourites
        INNER JOIN films ON films.film_id = favourites.film_id
        WHERE favourites.user_id = $1`,
}

module.exports = favouriteQueries;