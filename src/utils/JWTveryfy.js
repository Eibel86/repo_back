// IMPORTS
var jwt = require('jsonwebtoken');



// UTIL: para validar token
/**
 * Verifica y decodifica un JSON Web Token (JWT).
 *
 * @async
 * @function verifyJWT
 * @param {string} token - El token JWT a verificar.
 * @returns {Promise <Object>} Objeto con los datos decodificados del token (por ejemplo: uid, email, role).
 * @throws {Error} Lanza error si el token es inválido, ha expirado o la verificación falla.
 *
 * @example
 * const decoded = await verifyJWT(token);
 * console.log(decoded); // { uid: 1, email: 'usuario@mail.com', role: 'admin', iat: ..., exp: ... }
 */
const verifyJWT = async (token) => {
    try {
        const privateKey = process.env.PRIVATE_KEY_JWB;
        const decoded = jwt.verify(token, privateKey);
        return decoded;
    } catch (error) {
        throw error;
    }
};



module.exports = {
    verifyJWT
}