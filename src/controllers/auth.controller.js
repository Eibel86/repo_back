const bcrypt = require("bcryptjs")
const { queryDB } = require("../utils/DBquery")
const login = async (req, res) => { }
/**
 * Controlador para registrar un nuevo usuario
 * 
 * 1.Verifica si el usuario con ese email ya existe.
 * 2. Si no existe, hashea la contraseña e inserta el usuario en la base de datos.
 * 
 * @async
 * @function registry
 * @param {*} req - Objeto de solicitud HTTP de Express.
 * @param {*} res - Objeto de respuesta HTTP de Express.
 * @returns No retorna valor directamente, responde al cliente con JSON.
 * 
 * @example
 * // Request body esperado
 * {
 *  "name": "Juan",
 *  "email": "juan@email.com",
 *  "password": "123456"
 * }
 */
const registry = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        //Verificar si el usuario ya existe
        const userExists = await queryDB(
            `SELECT * FROM users WHERE email = $1`, //EL $1 es un placeholder que se cambiará por [email] en este caso
            [email]
        );

        if (userExists.rows.length > 0) {
            return res.status(409).json({
                error: "El usuario ya existe"
            });
        }

        //Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        //Insertar el nuevo usuario
        const newUser = await queryDB(
            `INSERT INTO users (name, email, password, role)
            VALUES ($1, $2, $3, $4)
            RETURNING user_id, name, email, role`,
            [name, email, hashedPassword, 'user']
        );

        //Enviar respuesta
        res.status(201).json({
            message: "Usuario registrado correctamente",
            user: newUser.rows[0]
        });
    } catch (error) {
        console.log("Error en registro:", error);
        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
};
const renewToken = async (req, res) => { }
const validateRole = async (req, res) => { }

module.exports = {
    login,
    registry,
    renewToken,
    validateRole
}