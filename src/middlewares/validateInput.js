const { validationResult } = require('express-validator');
/**
 * Middleware que valida los resultados almacenados.
 * Si hay errores, devuelve una respuesta (404) con los errores.
 * Si no hay errores, pasa al siguiente funcion.
 * @param {*} req Objeto de solicitud 
 * @param {*} res Objeto de respuesta
 * @param {*} next Función para pasar al siguiente middleware
 * @returns {Object|void} Retorna una respuesta JSON con errores o pasa al siguiente middleware.
 */
const validateInput = (req, res, next) => {
    const errores = validationResult(req)

    if (!errores.isEmpty()) {
        return res.status(404).json({
            ok: false,
            errores: errores.mapped()
        });
    }
    next();
}

module.exports = validateInput;
