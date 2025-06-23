
// QUERIES FAVORITOS:
/**
 * Consultas relacionadas con la tabla "favourites" (favoritos).
 */
const favouriteQueries = {
    // Inserta una relación de favorito entre un usuario y una película.
    insertFavourite:
        `INSERT INTO favourites 
        (user_id, film_id)
        VALUES 
        ($1, $2)
        RETURNING *`,

    // Obtiene el título de una peli fav, por un user específico.
    getFavouriteByUserFilmIds:
        `SELECT films.full_title
        FROM favourites
        INNER JOIN films ON films.film_id = favourites.film_id
        WHERE favourites.user_id = $1 AND favourites.film_id = $2`,

    //  Obtiene todas las pelis favs de un user y sus datos
    getFavouritesByUserId:
        `SELECT *
        FROM favourites
        INNER JOIN films ON films.film_id = favourites.film_id
        WHERE favourites.user_id = $1`,

    // Elimina un fav a partir del ID de user y peli, y devuelve la fila eliminada
    deleteByUserIdAndFilmId: `
        DELETE FROM favourites 
        WHERE user_id = $1 AND film_id = $2
        RETURNING *;`,
}




// EXPORTS
module.exports = favouriteQueries;