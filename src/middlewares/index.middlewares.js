// VALIDACIONES

module.exports = {
    validateInput: require("./validateInput.js"),   //De campo
    validateJWT: require("./validateJWT.js"),       //De token
    validateRole: require("./validateRole.js"),     //De rol
    upload: require("./upload.middleware.js")       //Manejo de subidas de archivos (Multer)
}