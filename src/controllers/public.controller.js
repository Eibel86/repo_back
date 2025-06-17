// IMPORTS
const filmModel = require('../models/film.model');
const directorModel = require('../models/director.model');
const genreModel = require('../models/genre.model');



// GET ALL FILMS (WIP ABEL)
const getAllFilms = async (req, res) => {
    res.status(200).json({
        ok: true
    })
}


// GET FILM BY GENRE
const getFilmByTitle = async (req, res) => { 
    
}


// GET FILM BY ID
const getFilmById = async (req, res) => { 

}


// CONTROLADOR: CREATE FILM
/**
 * Controlador para crear una nueva película.
 * 
 * - Verifica si ya existe una película con ese título.
 * - Inserta al director y al género si aún no existen en la base de datos.
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
        image_url,
        release_date,
        duration,
        synopsis,
    } = req.body;
   
    try {
        // Verificar si la película ya existe
        const existingFilm = await filmModel.findFilmByTitle(full_title);
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



//UPDATE FILM BY ID
const updateFilmById = async (req, res) => { 

}

//DELETE FILM BY ID
const deleteFilmById = async (req, res) => { 
    
}


module.exports = {
    getAllFilms,
    getFilmByTitle,
    getFilmById,
    createFilm,
    updateFilmById,
    deleteFilmById
}