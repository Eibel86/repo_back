var jwt = require('jsonwebtoken');

const verifyJWT = (token) => {
    return new Promise((resolve, reject) => {
        const privateKey = process.env.PRIVATE_KEY_JWB;
        jwt.verify(token, privateKey, (err, decoded) => {
            if (decoded) {
                resolve(decoded);
            }
            else {
                reject(err)
            }
        })
    })
}

module.exports = {
    verifyJWT
}