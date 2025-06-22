// IMPORTS
const { Router } = require("express");
const { check } = require('express-validator');

const {
    validateInput,
    validateJWT,
    validateRole
} = require("../middlewares/index.middlewares")

const {
    login,
    registry,
    renewToken
} = require("../controllers/auth.controller");

const { PASS_REGEX } = require("../utils/regexLibrary")
const router = new Router();




// RUTA: login
router.post("/login", [
    check("email", "invalid email").notEmpty()
        .withMessage('El email no puede estar vacío')
        .isEmail()
        .withMessage('El formato del email no es correcto')
        .isLength({ min: 3, max: 100 })
        .withMessage('Debe tener entre 3 y 100 caracteres'),
    check("password", "invalid password").matches(PASS_REGEX),
    validateInput
], login)


// RUTA: registry
router.post("/registry", [
    check("email", "invalid email").notEmpty()
        .withMessage('El email no puede estar vacío')
        .isEmail()
        .withMessage('El formato del email no es correcto')
        .isLength({ min: 3, max: 100 })
        .withMessage('Debe tener entre 3 y 100 caracteres'),
    check("password", "invalid password").matches(PASS_REGEX),
    check("name", "invalid name").notEmpty()
        .withMessage('El usuario no puede estar vacío')
        .isLength({ min: 2, max: 100 })
        .withMessage('El usuario debe tener entre 2 y 100 caracteres'),
    validateInput
], registry)


//RUTA: renewtoken
router.get("/renewToken", [
    validateJWT
], renewToken)


// RUTA: validate admin role
router.get("/validateAdminRole", [
    validateJWT,
    validateRole("Admin")
], login)





// EXPORTS
module.exports = router;