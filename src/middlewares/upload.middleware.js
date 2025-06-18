const multer = require("multer");
const path = require("path");

/**
 * Configuración de almacenamiento para Multer.
 * Define la carpeta de destino y el formato del nombre del archivo.
 */
const storage = multer.diskStorage({
    /**
     * Carpeta donde se almacenarán los archivos subidos.
     * @param {*} req - Objeto de solicitud (no utilizado aquí).
     * @param {*} file - Objeto del archivo subido.
     * @param {*} cb - Callback para continuar el flujo.
     */
    destination: 'uploads/',

    /**
     * Define el nombre del archivo subido.
     * @param {*} req - Objeto de solicitud.
     * @param {*} file - Objeto del archivo subido.
     * @param {*} cb - Callback para devolver el nombre del archivo.
     */
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});

/**
 * Filtro para aceptar solo archivos con formato de imagen.
 * @param {*} req - Objeto de solicitud.
 * @param {*} file - Objeto del archivo subido.
 * @param {*} cb - Callback que permite o rechaza el archivo.
 */
const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if ([".png", ".jpg", ".jpeg", ".gif"].includes(ext)) {
        cb(null, true);
    } else {
        cb(new Error("Solo se permiten imágenes"));
    }
};

/**
 * Configuración final de Multer con almacenamiento, filtro de archivos y límite de tamaño.
 */
const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // Límite de 5MB
});

module.exports = upload;
