// QUERIES (consultas a bbdd)


/**
 * Consultas SQL relacionadas con la gestión de películas,
 * directores y géneros en la base de datos.
 */
const filmQueries = {
    //Consulta para obtener películas por su título relativo.
    findByTitleAll: 
        `SELECT * 
        FROM films 
        WHERE full_title ILIKE $1`, 
        //Como LIKE, pero ignora mayúsculas y minúsculas.
        //% ignifica “cualquier cosa (0 o más caracteres)” antes o después del término.

    //Consulta para obtener 1 película por su título concreto insensible a mayus-minusculas
    findByTitleOne: 
        `SELECT * 
        FROM films 
        WHERE full_title ILIKE $1`, 

    //Consulta para encontrar la peli por id. 
    findById: 
        `SELECT * 
        FROM films 
        WHERE film_id = $1`,    
        
    //Consulta para obtener todas las películas. 
    getAllFilms: 
        `SELECT * 
        FROM films`,

    //Consulta para insertar una nueva peli en la bbdd. Devuelve la peli insertada. 
    insertFilm: 
        `INSERT INTO films 
        (full_title, director_id, genre_id, image_url, release_date, duration, synopsis)
        VALUES 
        ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *`,

    //Consulta para buscar el id de un director por su nombre
    findDirectorByName: 
        `SELECT director_id 
        FROM directors 
        WHERE name = $1`,

    //Consulta para insertar un nuevo director y devolver su id
    insertDirector: 
        `INSERT INTO directors (name) 
        VALUES ($1) 
        RETURNING director_id`,

    //Consulta para buscar el id de un género por su nombre
    findGenreByName: 
        `SELECT genre_id 
        FROM genres 
        WHERE name = $1`,

    //Consulta para insertar un nuevo género y devolver su id
    insertGenre: 
        `INSERT INTO genres (name) 
        VALUES ($1) 
        RETURNING genre_id`,

    //Consulta para editar una película
    updateById: `
        UPDATE films
        SET 
            director_id = $1,
            genre_id = $2,
            full_title = $3,
            image_url = $4,
            release_date = $5,
            duration = $6,
            synopsis = $7
        WHERE film_id = $8
        RETURNING *;
    `,
};




// EXPORTS
module.exports = filmQueries;