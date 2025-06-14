const { Router } = require("express");
const router = new Router();
const {
    login,
    registry,
    renewToken,
    validateRole
} = require("../controllers/auth.controller")


router.post("/login", login)

router.post("/registry", registry)

router.get("/renewToken", renewToken)

router.get("/validateRole", validateRole)


module.exports = router;