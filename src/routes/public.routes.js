const { Router } = require("express");
const { check } = require('express-validator');

const router = new Router();

const {
    getAllFilms,
    getFilmByTitle,
    getFilmById,
    createFilm,
    updateFilmById,
    deleteFilmById
} = require("../controllers/public.controller");

const {
    BASIC_REGEX,
    PASS_REGEX,
    LONG_BASIC_REGEX,
    TEXT_BASIC_REGEX,
    NUMBER_REGEX,
    URL_REGEX

} = require("../utils/regexLibrary")

const {
    validateInput
} = require("../middlewares/index.middlewares")

// GET ALL FILMS
//GET: http://localhost:5000/api/v1/getallfilms
router.get("/allfilms", getAllFilms);

// GET FILM BY Title
//GET: http://localhost:5000/api/v1/film/<title>
router.get("/film/search/:title", [
    check("title", "invalid title").matches(LONG_BASIC_REGEX),
    validateInput
], getFilmByTitle);

// GET FILM BY ID
//GET: http://localhost:5000/api/v1/film/<id>
router.get("/film/searching/:film_id", [
    check("film_id", "invalid id").matches(NUMBER_REGEX),
    validateInput
], getFilmById);

//CREATE FILM (checked: ok)
// TODO: revisar los métodos de express
//POST: http://localhost:5000/api/v1/createfilm
router.post("/createfilm", [
    // check("full_title", "invalid title").matches(LONG_BASIC_REGEX),
    // check("image_url", "invalid image").matches(URL_REGEX),
    // check("release_date", "invalid relase_date").isDate(),
    // check("duration", "invalid duration").isTime(),
    // check("synopsis", "invalid synopsis").matches(TEXT_BASIC_REGEX),
    // check("director_name", "invalid name director").matches(BASIC_REGEX),
    // check("genre_name", "invalid name genre").matches(BASIC_REGEX),
    validateInput
], createFilm);


//UPDATE FILM BY ID
//PUT: http://localhost:5000/api/v1/updatefilm
router.put("/updatefilm/:film_id", [
    // check("id", "invalid id").matches(NUMBER_REGEX),
    // check("full_title", "invalid title").matches(LONG_BASIC_REGEX),
    // check("image_url", "invalid image").matches(URL_REGEX),
    // check("release_date", "invalid relase_date").isDate(),
    // check("duration", "invalid duration").isTime(),
    // check("synopsis", "invalid synopsis").matches(TEXT_BASIC_REGEX),
    // check("director_name", "invalid name director").matches(BASIC_REGEX),
    // check("genre_name", "invalid name genre").matches(BASIC_REGEX),
    validateInput
], updateFilmById);

//DELETE FILM BY ID
//DELETE: http://localhost:5000/api/v1/film/<id>
router.delete("/deletefilm/:film_id", [
    check("film_id", "invalid id").matches(NUMBER_REGEX),
    validateInput
], deleteFilmById);




// EXPORTS
module.exports = router;