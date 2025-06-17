
// Valida si tiene una longitud entre 2 y 18 carácteres y solo contenga letras y números.
const BASIC_REGEX = /^[\p{L}\p{N}]{2,18}$/u
// La password debe de tener una longitud entre 6 y 12 carácteres y debe tener minusculas, mayusculuas y numeros.
const PASS_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,12}$/
// Valida si tiene una longitud entre 1 y 80 carácteres y solo contenga letras y números. 
const LONG_BASIC_REGEX = /^[\p{L}\p{N} _-]{1,80}$/u
// Valida si tiene una longitud entre 5 y 1000 carácteres y solo contenga letras y números.
const TEXT_BASIC_REGEX = /^[\p{L}\p{N}]{5,1000}$/u
// valida si tiene un longitud entre 1 y 5 carácteres y solo contenga números.
const NUMBER_REGEX = /^[\d]{1,5}$/
//
const URL_REGEX = /^https?:\/\/[\w\-\.]+(\/[\w\-\.~]+)*\/[\w\-\.~]+\.(jpg|jpeg|png|gif|webp|svg|bmp|ico)$/i



// EXPORTACIONES
module.exports = {
    BASIC_REGEX,
    PASS_REGEX,
    LONG_BASIC_REGEX,
    TEXT_BASIC_REGEX,
    NUMBER_REGEX,
    URL_REGEX
}

// PROPUESTA 
// function isValidImageURL(url) {
//   try {
//     const parsed = new URL(url); // valida que sea URL válida
//     // Comprobar extensión válida
//     return /\.(jpg|jpeg|png|gif|webp|svg|bmp|ico)$/i.test(parsed.pathname);
//   } catch {
//     return false; // si no es URL válida lanza error
//   }
// }