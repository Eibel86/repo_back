const { verifyJWT } = require("../utils/JWT")

/**
 * Valida si en el header se está enviando un token valido, si es el caso lo almacena en el requerimiento.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const validateJWT = async (req, res, next) => {
    const authorization = req.header('authorization');
    if (!authorization) {
        return res.status(404).json({
            ok: false,
            msg: "no contiene autorización"
        });
    }
    const token = authorization.split(" ")[1];
    verifyJWT(token)
        .then(resp => {
            req.tokenEmail = resp.email;
            req.role = resp.role;
            next();
        })
        .catch(err => {
            return res.status(404).json({
                ok: false,
                msg: err
            });
        })
}


module.exports = {
    validateJWT
}