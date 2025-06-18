// IMPORTS
const { Router } = require("express");
const { check } = require('express-validator');

const router = new Router();

const {
    getAllFilms,
    getFilmByTitle,
    getFilmById,
    createFilm,
    updateFilmById,
    deleteFilmById,
    createFavourite
} = require("../controllers/public.controller");

const {
    BASIC_REGEX,
    PASS_REGEX,
    LONG_BASIC_REGEX,
    TEXT_BASIC_REGEX,
    NUMBER_REGEX,
    URL_REGEX
} = require("../utils/regexLibrary")

const { validateInput } = require("../middlewares/index.middlewares")





// GET ALL FILMS
//GET: http://localhost:5000/api/v1/getallfilms
router.get("/allfilms", getAllFilms);

// GET FILM BY Title
//GET: http://localhost:5000/api/v1/film/<title>
router.get("/film/search/:title", [
    check("title", "invalid title").notEmpty()
            .withMessage('El título no puede estar vacío')
            .isLength({ min: 2, max: 100 })
            .withMessage('El título debe tener entre 2 y 100 caracteres'),
    validateInput
], getFilmByTitle);

// GET FILM BY ID
//GET: http://localhost:5000/api/v1/film/<id>
router.get("/film/searching/:film_id", [
    check("film_id", "invalid id").notEmpty()
            .withMessage('La id es obligatoria, en formato numerico')
            .isInt({ min: 1, max: 500 })
            .withMessage('La id debe ser un número entero entre 1 y 500'),
    validateInput
], getFilmById);

//CREATE FILM (checked: ok)
// TODO: revisar los métodos de express
//POST: http://localhost:5000/api/v1/createfilm
router.post("/createfilm", [
    check("full_title", "invalid title").notEmpty()
            .withMessage('El título no puede estar vacío')
            .isLength({ min: 2, max: 100 })
            .withMessage('El título debe tener entre 2 y 100 caracteres'),
    check("release_date", "invalid relase_date").isDate()
            .withMessage('Formato fecha aaaa-mm-dd'),
    check("duration", "invalid duration").notEmpty()
            .withMessage('La duración es obligatoria, en formato numerico')
            .isInt({ min: 1, max: 500 })
            .withMessage('La duración debe ser un número entero entre 1 y 500 minutos'),
    check("synopsis", "invalid synopsis").notEmpty()
            .withMessage('La sinopsis es obligatoria')
            .isLength({ min: 5, max: 500 })
            .withMessage('La sinopsis debe tener entre 5 y 500 caracteres'),
    check("director_name", "invalid name director").notEmpty()
            .withMessage('El nombre del director no puede estar vacío')
            .isLength({ min: 2, max: 100 })
            .withMessage('El nombre del director no debe tener entre 2 y 100 caracteres'),
    check("genre_name", "invalid name genre").notEmpty()
            .withMessage('El genero de la pelicula no puede estar vacío')
            .isLength({ min: 2, max: 100 })
            .withMessage('El genero de la pelicula debe tener entre 2 y 100 caracteres'),
    validateInput
], createFilm);


//UPDATE FILM BY ID
//PUT: http://localhost:5000/api/v1/updatefilm
router.put("/updatefilm/:film_id", [
    check("film_id", "invalid id").notEmpty()
            .withMessage('La id es obligatoria, en formato numerico')
            .isInt({ min: 1, max: 500 })
            .withMessage('La id debe ser un número entero entre 1 y 500'),
    check("full_title", "invalid title").notEmpty()
            .withMessage('El título no puede estar vacío')
            .isLength({ min: 2, max: 100 })
            .withMessage('El título debe tener entre 2 y 100 caracteres'),
    check("release_date", "invalid relase_date").isDate()
            .withMessage('Formato fecha aaaa-mm-dd'),
    check("duration", "invalid duration").notEmpty()
            .withMessage('La duración es obligatoria, en formato numerico')
            .isInt({ min: 1, max: 500 })
            .withMessage('La duración debe ser un número entero entre 1 y 500 minutos'),
    check("synopsis", "invalid synopsis").notEmpty()
            .withMessage('La sinopsis es obligatoria')
            .isLength({ min: 5, max: 500 })
            .withMessage('La sinopsis debe tener entre 5 y 500 caracteres'),
    check("director_name", "invalid name director").notEmpty()
            .withMessage('El nombre del director no puede estar vacío')
            .isLength({ min: 2, max: 100 })
            .withMessage('El nombre del director no debe tener entre 2 y 100 caracteres'),
    check("genre_name", "invalid name genre").notEmpty()
            .withMessage('El genero de la pelicula no puede estar vacío')
            .isLength({ min: 2, max: 100 })
            .withMessage('El genero de la pelicula debe tener entre 2 y 100 caracteres'),
    validateInput
], updateFilmById);

//DELETE FILM BY ID
//DELETE: http://localhost:5000/api/v1/film/<id>
router.delete("/deletefilm/:film_id", [
    check("film_id", "invalid id").notEmpty()
            .withMessage('La id es obligatoria, en formato numerico')
            .isInt({ min: 1, max: 500 })
            .withMessage('La id debe ser un número entero entre 1 y 500'),
    validateInput
], deleteFilmById);



router.delete("/addFavourite", createFavourite);
// EXPORTS
module.exports = router;