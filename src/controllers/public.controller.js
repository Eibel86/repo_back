// IMPORTS
const filmModel = require('../models/film.model');
const directorModel = require('../models/director.model');
const genreModel = require('../models/genre.model');
const favouriteModel = require("../models/favourite.model")

const { getAll, findByTitleAll, findByTitleOne, findById, updateById, deleteById } = require("../models/film.model");




// CONTROLADOR: get all films
/**
 * Controlador para obtener todas las películas.
 * Llama a la función getAll del modelo para recuperar todas las películas de la base de datos.
 * Envía la respuesta con status 200 y el array de películas si todo va bien.
 * Si hay error, responde con status 500 y mensaje de error.
 * 
 * @async
 * @function getAllFilms
 * @param req - Objeto de la solicitud HTTP (no usa parámetros).
 * @param res - Objeto de la respuesta HTTP.
 * @returns {Promise} No retorna valor, responde con JSON.
 */
const getAllFilms = async (req, res) => {
    try {
        const films = await getAll(); //Llamada al modelo para obtener todas las películas

        res.status(200).json({ //200 OK: solicitud exitosa, respuesta satisfactoria
            ok: true,
            data: films,
        });
    } catch (error) {
        console.error("Error en getAllFilms:", error);
        res.status(500).json({ //500 INTERNAL SERVER ERROR 
            ok: false,
            error: "Error al obtener las películas",
        });
    }
};

// CONTROLADOR: get film by title
/**
 * Controlador para buscar películas por título (puede devolver varias).
 * Obtiene el parámetro `title` de la URL y busca todas las películas cuyo título coincida.
 * Si no encuentra ninguna película, responde con status 404 y mensaje.
 * Si hay error en la búsqueda, responde con status 500.
 * 
 * @async
 * @function getFilmByTitle
 * @param req - Objeto de la solicitud HTTP, con `params.title`.
 * @param res - Objeto de la respuesta HTTP.
 * @returns {Promise} No retorna valor, responde con JSON.
 */
const getFilmByTitle = async (req, res) => {
    try {
        const { title } = req.params; //Obtiene el título de la URL
        const films = await findByTitleAll(title); //Busca todas las películas que coincidan parcialmentecon el título

        if (!films || films.length === 0) { //Si no hay pelis
            return res.status(404).json({ //404 NOT FOUND: el servidor no pudo encontrar el recurso solicitado por el cliente(navegador)
                ok: false,
                error: 'No se encontraron películas con ese título.',
            });
        }
        res.status(200).json({ //200 OK: solicitud y respuesta exitosas
            ok: true,
            data: films,
        });


    } catch (error) {
        console.error('Error en getFilmByTitle:', error);
        res.status(500).json({ //500 INTERNAL SERVER ERROR
            ok: false,
            error: 'Error interno al buscar las películas.',
        });
    }
};

// CONTROLADOR: get film by id
/**
 * Controlador para obtener una película por su ID.
 * Recibe el `film_id` por parámetros de la ruta, lo convierte a número y busca la película.
 * Si no encuentra la película, responde con status 404.
 * En caso de error interno, responde con status 500.
 * 
 * @async
 * @function getFilmById
 * @param req - Objeto de solicitud HTTP, con `params.film_id`.
 * @param res - Objeto de respuesta HTTP.
 * @returns {Promise} No retorna valor, responde con JSON.
 */
const getFilmById = async (req, res) => {
    try {
        const { film_id } = req.params;
        const film = await findById(Number(film_id)); //Asegúra la conversión a número por si fuese necesario

        if (!film) {
            return res.status(404).json({ //404 NOT FOUND
                ok: false,
                error: 'Película no encontrada.',
            });
        }

        res.status(200).json({ //200 OK: respuesta exitosa
            ok: true,
            data: film,
        });

    } catch (error) {
        console.error('Error en getFilmById:', error);
        res.status(500).json({ //500 INTERNAL SERVER ERROR
            ok: false,
            error: 'Error interno al buscar la película.',
        });
    }
};

// CONTROLADOR: create film
/**
 * Controlador para crear una nueva película.
 * 
 * - Verifica si ya existe una película con ese título.
 * - Inserta el director y al género si aún no existen en la base de datos.
 * - Inserta la película asociándola con el director y el género correspondientes.
 *
 * @param {Object} req - Objeto de solicitud HTTP (Express).
 * @param {Object} req.body - Cuerpo de la solicitud con los datos de la película.
 * @param {Object} res - Objeto de respuesta HTTP (Express).
 * 
 * @returns {JSON} - Devuelve un mensaje de éxito o error.
 */
const createFilm = async (req, res) => {
    const { //Desestructura los datos recibidos del cuerpo-body de la solicitud
        full_title,
        director_name,
        genre_name,
        image,
        release_date,
        duration,
        synopsis,
    } = req.body;

    const image_url = req.file.path;

    try {
        // Verificar si la película ya existe
        const existingFilm = await findByTitleOne(full_title);
        if (existingFilm) {
            return res.status(409).json({
                ok: false,
                msg: 'La película ya existe', //404 CONFLICT
            });
        }

        // Insertar director si no existe y obtener su id
        const director_id = await directorModel.insertDirectorIfNotExists(director_name); //Busca el director por nombre y lo inserta si no lo encuentra

        // Insertar género si no existe y obtener su id
        const genre_id = await genreModel.insertGenreIfNotExists(genre_name); //Busca el genero por nombre y lo inserta si no existe

        // Insertar la película. Crea el objeto con todos los datos. 
        const newFilm = await filmModel.insertFilm({
            full_title,
            director_id,
            genre_id,
            image_url,
            release_date,
            duration,
            synopsis,
        });

        //Devuelve una respuesta exitosa con los datos de la peli recién creada
        return res.status(201).json({ //201 CREATED 
            ok: true,
            msg: 'Película creada con éxito',
            film: newFilm,
        });

    } catch (error) {
        console.error('Error en createFilm:', error);
        return res.status(500).json({ //500 INTERNAL SERVER ERROR
            ok: false,
            msg: 'Error interno del servidor',
        });
    }
};

// CONTROLADOR: film by id
/**
 * Controlador para actualizar una película por su ID.
 * 
 * Recibe el `film_id` por parámetros y los datos a actualizar en el body,
 * incluyendo título, director, género, imagen, fecha, duración y sinopsis.
 * Usa modelos para insertar director y género si no existen y obtener sus IDs.
 * Luego actualiza la película en la base de datos.
 * 
 * Responde con status 200 y la película actualizada si todo va bien.
 * Responde con status 404 si no encuentra la película para actualizar.
 * Responde con status 500 si ocurre un error interno.
 * 
 * @async
 * @function updateFilmById
 * @param req - Objeto de solicitud HTTP, con `params.film_id` y body con datos a actualizar.
 * @param res - Objeto de respuesta HTTP.
 * @returns {Promise} No retorna valor, responde con JSON.
 */
const updateFilmById = async (req, res) => {
    try {
        const { film_id } = req.params; //Extrae ese parámetro de la URL (req.params)
        const { //Extrae del body los datos que pueden actualizarse
            full_title, director_name,
            genre_name, image_url,
            release_date, duration,
            synopsis
        } = req.body;

        const director_id = await directorModel.insertDirectorIfNotExists(director_name); //Inserta el director si no existe y se obtiene su id
        const genre_id = await genreModel.insertGenreIfNotExists(genre_name); //Inserta el género si no existe y se obtiene su id

        const updatedFilm = await updateById({// Llama a la función que actualiza la película en la BBDD pasando todos los datos
            film_id: Number(film_id), // Convierte a número para evitar errores de tipo
            director_id, genre_id,
            full_title, image_url,
            release_date, duration,
            synopsis,
        });

        if (!updatedFilm) { // Si no se ha actualiza ninguna peli:
            return res.status(404).json({
                ok: false,
                error: "Película no encontrada o no actualizada",
            });
        }

        res.status(200).json({
            ok: true,
            data: updatedFilm,
        });

    } catch (error) {
        console.error("Error en updateFilmById:", error);
        res.status(500).json({
            ok: false,
            error: "Error interno al actualizar la película.",
        });
    }
};

// CONTROLADOR: delete film by id
/**
 * Controlador para eliminar una película por su ID.
 * Recibe el ID de la película por parámetro en la URL y la elimina de la base de datos.
 * Responde con un mensaje de éxito o error dependiendo del resultado.
 * 
 * @async
 * @function deleteFilmById
 * @param {Object} req - Objeto de la petición HTTP.
 * @param {Object} req.params - Parámetros de la URL.
 * @param {string} req.params.film_id - ID de la película a eliminar (como string).
 * @param {Object} res - Objeto de la respuesta HTTP.
 * @returns {Promise} Envía una respuesta JSON con el resultado de la operación.
 */
const deleteFilmById = async (req, res) => {
    const { film_id } = req.params; //Extrae el parámetro de la URL (req.params)

    try {
        // Llama a la función del modelo que elimina la película por su ID
        const deleted = await filmModel.deleteById(Number(film_id)); //Convierte a número para evitar errores de tipo

        if (!deleted) { //Si no se elimina ninguna peli
            return res.status(404).json({
                ok: false,
                msg: 'Película no encontrada',
            });
        }

        return res.status(200).json({
            ok: true,
            msg: 'Película eliminada correctamente',
        });

    } catch (error) {
        console.error('Error al eliminar la película:', error);
        return res.status(500).json({
            ok: false,
            msg: 'Error interno al eliminar la película',
        });
    }
};


const createFavourite = async (req, res) => {
    const { userId, filmId } = req.body;
    try {
        let favourite = await favouriteModel.findFavouriteByUserFilmIds(userId, filmId);
        if (favourite) {
            return res.status(404).json({
                ok: false,
                msg: "ya existe el favorito"
            })
        }
        favourite = await favouriteModel.insertFavourite(userId, filmId)
        return res.status(202).json({
            ok: true,
            favourite
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: error
        })
    }
}


const getFavouritesOfUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const favourites = await favouriteModel.getAllFavouriteFilmsByUserId(userId)
        return res.status(202).json({
            ok: true,
            favourites
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: error
        })
    }
}

// EXPORTS
module.exports = {
    getAllFilms,
    getFilmByTitle,
    getFilmById,
    createFilm,
    updateFilmById,
    deleteFilmById,
    createFavourite,
    getFavouritesOfUser
}