const { verifyJWT } = require("../utils/JWTveryfy")

/**
 * Middleware para validar tokens JWT en las solicitudes HTTP.
 * Verifica la presencia y validez del token en el header 'Authorization'.
 * Si es válido, adjunta el email y rol del usuario al objeto 'req' para su uso posterior.
 * Si no es válido, devuelve una respuesta de error.
 * @param {*} req Objeto de solicitud.
 * @param {*} res Objeto de respuesta.
 * @param {*} next Función para pasar al siguiente middleware.
 * @returns {Object|void} Retorna una respuesta JSON con errores o pasa al siguiente middleware.
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


module.exports = validateJWT