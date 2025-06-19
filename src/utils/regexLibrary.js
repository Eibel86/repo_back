
// La password debe de tener una longitud entre 6 y 12 carácteres y debe tener minusculas, mayusculuas y numeros.
const PASS_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,12}$/


// EXPORTACIONES
module.exports = {
    PASS_REGEX
}
