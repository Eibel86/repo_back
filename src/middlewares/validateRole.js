


// MIDDLEWARE: validación de rol
/**
 * Middleware que valida si el rol del usuario está autorizado.
 * 
 * Crea un middleware personalizado para verificar si el rol del usuario (disponible en `req.role`)
 * coincide con alguno de los roles permitidos definidos como argumento.
 *
 * @param {...string} roles - Lista de roles permitidos (por ejemplo, "Admin", "Editor", etc.).
 * @returns {Function} Middleware de Express configurado para validar los roles especificados.
 *
 * @example
 * // Solo permite acceso a usuarios con rol "Admin"
 * app.get('/admin', validateRole("Admin"), (req, res) => { ... });
 *
 * @param {Object} req - Objeto de solicitud de Express. Debe contener `req.role` (asignado previamente, por ejemplo, por un middleware de autenticación).
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {Function} next - Función que llama al siguiente middleware si el rol es válido.
 */
const validateRole = (...roles) => {
    return (req, res, next) => {
        if (roles.includes(req.role)) {
            next();
        } else {
            return res.status(404).json({
                ok: false,
                msg: "incorrect roles"
            });
        }
    }

}


// EXPORTS
module.exports = validateRole;
