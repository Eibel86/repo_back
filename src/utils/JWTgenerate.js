// IMPORTS
var jwt = require('jsonwebtoken');



// UTIL: generar JWT (token) con datos de usuario
/**
 * Genera un JSON Web Token (JWT) con los datos del usuario.
 *
 * @async
 * @function generateJWT
 * @param {Object} data - Objeto con los datos del usuario.
 * @param {string|number} data.uid - ID único del usuario.
 * @param {string} data.email - Email del usuario.
 * @param {string} data.role - Rol del usuario (por ejemplo: 'admin', 'user').
 * @returns {Promise <string>} Token JWT firmado con expiración de 2 horas.
 * @throws {Error} Lanza error si falla la generación del token.
 *
 * @example
 * const token = await generateJWT({ uid: 1, email: "test@mail.com", role: "user" });
 * console.log(token); // JWT string
 */
const generateJWT = async ({ uid, email, role }) => {
    try {
        const privateKey = process.env.PRIVATE_KEY_JWB;
        const playLoad = { uid, email, role };
        var token = jwt.sign(playLoad, privateKey, { expiresIn: "2h" })
        return token;
    } catch (error) {
        throw error;
    }
}




// EXPORTS
module.exports = {
    generateJWT
}