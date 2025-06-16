var jwt = require('jsonwebtoken');

const generateJWT = ({ email, role }) => {
    return new Promise((resolve, reject) => {
        const privateKey = process.env.PRIVATE_KEY_JWB;
        const playLoad = { email, role };
        var token = jwt.sign(playLoad, privateKey, { expiresIn: "2h" }, (err, token) => {
            if (token) {
                resolve(token);
            }
            else {
                reject(err);
            }
        });
        return token;
    })
}

module.exports = {
    generateJWT
}