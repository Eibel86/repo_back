// GET ALL PRODUCTS
const getAllFilms = async (req, res) => {
    res.status(200).json({
        ok: true
    })
}

// GET PRODUCT BY GENRE
const getFilmByTitle = async (req, res) => { }

// GET PRODUCT BY ID
const getFilmById = async (req, res) => { }

// CREATE FILM
const createFilm = async (req, res) => { }

//UPDATE PRODUCT BY ID
const updateFilmById = async (req, res) => { }

//DELETE PRODUCT BY ID
const deleteFilmById = async (req, res) => { }


module.exports = {
    getAllFilms,
    getFilmByTitle,
    getFilmById,
    createFilm,
    updateFilmById,
    deleteFilmById
}