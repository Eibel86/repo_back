// IMPORTS
const bcrypt = require("bcryptjs")
const userModel = require("../models/user.model");
const { generateJWT } = require("../utils/JWTgenerate")

// FUNCION login
const login = async (req, res) => {

}

// FUNCION de registro
/**
 * Controlador para registrar un nuevo usuario.
 *
 * - Verifica si el email ya está en uso.
 * - Si no existe, hashea la contraseña y crea el usuario en la base de datos.
 * - Devuelve un mensaje de éxito y los datos básicos del usuario creado.
 *
 * @async
 * @function registry
 * @param {import('express').Request} req - Objeto de solicitud HTTP con los datos del usuario en `req.body`.
 * @param {import('express').Response} res - Objeto de respuesta HTTP.
 * @returns {Promise} Responde al cliente con un JSON (usuario creado o error). Sólo ejecuta la lógica y termina. 
 */
const registry = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        //Verificar si el usuario ya existe
        const existingUser = await userModel.findByEmail(email);
        if (existingUser) {
            return res.status(409).json({ //409 CONFLICT, la solicitud no puede ser completada porque entra en conflicto con el estado actual del recurso de destino.
                error: "El usuario ya existe"
            });
        }

        //Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await userModel.insertUser({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            message: "Usuario registrado con éxito",
            user: {
                id: newUser.user_id,
                name: newUser.name,
                email: newUser.email
            }
        });

    } catch (error) {
        console.log("Error en registro:", error);
        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
};

/**
 * Genera un nuevo token, en su validación correspondiente deberia de comprobarse que el requirimiento ya contiene un token válido.
 * @param {*} req 
 * @param {*} res 
 */
const renewToken = async (req, res) => {
    generateJWT({ email: req.tokenEmail, role: req.role })
        .then(resp => {
            return res.status(202).json({
                ok: true,
                token: resp
            })
        })
        .catch(err => {
            return res.status(403).json({
                ok: false,
                msg: err
            })
        })

}

// FUNCION validar role
const validateRole = async (req, res) => { }





// EXPORTS
module.exports = {
    login,
    registry,
    renewToken,
    validateRole
}