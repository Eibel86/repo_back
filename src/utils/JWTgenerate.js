var jwt = require('jsonwebtoken');

const generateJWT = ({ uid, email, role }) => {
    return new Promise((resolve, reject) => {
        const privateKey = process.env.PRIVATE_KEY_JWB;
        const playLoad = { uid, email, role };
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