const { queryDB } = require("../utils/DBquery")
const login = async (req, res) => { }
const registry = async (req, res) => { }

/**
 * Genera un nuevo token, en su validación correspondiente deberia de comprobarse que el requirimiento ya contiene un token válido.
 * @param {*} req 
 * @param {*} res 
 */
const renewToken = async (req, res) => {
    generateJWT({ email: req.tokenEmail, role: req.email })
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

const validateRole = async (req, res) => { }

module.exports = {
    login,
    registry,
    renewToken,
    validateRole
}