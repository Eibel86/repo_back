// IMPORTS
const bcrypt = require("bcryptjs")
const userModel = require("../models/user.model");
const { generateJWT } = require("../utils/JWTgenerate")



// FUNCION login
/**
 * Controlador para iniciar sesión de un usuario.
 *
 * - Verifica si el usuario existe por su email.
 * - Compara la contraseña enviada con la almacenada.
 * - Si es correcta, genera un token JWT y lo envía al cliente.
 *
 * @async
 * @function login
 * @param req - Objeto de solicitud HTTP con `email` y `password` en el body.
 * @param res - Objeto de respuesta HTTP.
 * @returns {Promise} Devuelve una respuesta JSON con un token o un mensaje de error.
 */
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        //1. Buscar al usuario por email
        const user = await userModel.findByEmail(email);

        //2. Si no existe el usuario
        if (!user) {
            return res.status(404).json({
                error: "Usuario no encontrado"
            });
        }

        //3. Si sí existe comparar contraseña con bcrypt
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                error: "Contraseña incorrecta"
            });
        }

        //4. Si todo coincide generar token JWT
        const token = await generateJWT({
            uid: user.user_id,
            email: user.email,
            role: user.role
        });

        //5. Respuesta exitosa
        return res.status(200).json({
            message: "Login exitoso"
            // token
        });

    } catch (error) {
        console.log("Error en login:", error);
        return res.status(500).json({
            error: "Errores interno del servidor"
        });
    }
};


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
 * @param req - Objeto de solicitud HTTP con los datos del usuario en `req.body`.
 * @param res - Objeto de respuesta HTTP.
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



// FUNCION de renovar token
/**
 * Controlador para renovar el token JWT de un usuario autenticado.
 *
 * Esta función asume que el middleware anterior ha validado un token existente
 * y ha inyectado en `req` las propiedades `tokenEmail` y `role`.
 *
 * Genera un nuevo token JWT con esos datos y lo devuelve al cliente.
 *
 * @async
 * @function renewToken
 * @param req - Objeto de solicitud de Express, con `tokenEmail` y `role` añadidos por middleware.
 * @param res - Objeto de respuesta de Express.
 * @returns {Promise} Responde al cliente con un nuevo token o un mensaje de error.
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