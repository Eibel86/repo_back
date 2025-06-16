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


const { PASS_REGEX,
    BASIC_REGEX
} = require("../utils/regexLibrary")

const router = new Router();


//LOGIN
router.post("/login", [
    check("email", "invalid email").isEmail(),
    check("password", "invalid password").matches(PASS_REGEX),
    validateInput
], login)
//REGISTRY
router.post("/registry", [
    check("email", "invalid email").isEmail(),
    check("password", "invalid password").matches(PASS_REGEX),
    check("name", "invalid user name").matches(BASIC_REGEX),
    validateInput
], registry)
//RENEWTOKEN
router.get("/renewToken", [
    validateJWT
], renewToken)
//VALIDATE ADMIN ROLE
router.get("/validateAdminRole", [
    validateJWT,
    validateRole("Admin")
], login)


module.exports = router;