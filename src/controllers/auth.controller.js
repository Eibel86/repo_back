const login = async (req, res) => {
    res.status(200).json({
        ok: true
    })
}
const registry = async (req, res) => { }
const renewToken = async (req, res) => { }
const validateRole = async (req, res) => { }

module.exports = {
    login,
    registry,
    renewToken,
    validateRole
}