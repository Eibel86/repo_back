const { Router } = require("express");

const router = new Router();

const {
    getAllFilms,
    getFilmByTitle,
    getFilmById,
    createFilm,
    updateFilmById,
    deleteFilmById
} = require("../controllers/public.controller");



// GET ALL FILMS todo: hacer todas las rutas bien
//GET: http://localhost:5000/api/v1/films
router.get("/films", getAllFilms);

// GET FILM BY Title
router.get("/films/:title", getFilmByTitle);

// GET FILM BY ID
//GET: http://localhost:5000/api/v1/film/<id>
router.get("/film/:id", getFilmById);

//CREATE FILM
//POST: http://localhost:5000/api/v1/films
router.post("/films", createFilm);

//UPDATE FILM BY ID
//PUT: http://localhost:5000/api/v1/films
router.put("/films", updateFilmById);

//DELETE FILM BY ID
//DELETE: http://localhost:5000/api/v1/films/<id>
router.delete("/films/:id", deleteFilmById);



module.exports = router;