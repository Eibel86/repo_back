

const favouriteQueries = {
    insertFavourite:
        `INSERT INTO favourites 
        (favourite_id, user_id, film_id)
        VALUES 
        ($1, $2, $3)
        RETURNING *`,
    getFavouriteByUserFilmIds:
        `SELECT films.full_title
        FROM favourites
        INNER JOIN films ON films.film_id = favourites.film_id
        WHERE favourites.user_id = $1 AND favourites.film_id = $2`,
    getFavouritesByUserEmail:
        `SELECT films.full_title
        FROM favourites
        INNER JOIN users ON users.user_id = favourites.user_id
        INNER JOIN films ON films.film_id = favourites.film_id
        WHERE users.email = $1`,
}

module.exports = favouriteQueries;