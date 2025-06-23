// IMPORTS -------------------------
const express = require("express"); //Importa el framework
require("dotenv").config(); //Carga las variables de entorno

const { authRoutes, publicRoutes } = require("./routes/index.routes") //Importa las rutas de autenticación y rutas públicas
const app = express(); //Instancia de una app de Express
const cors = require("cors"); //Md de CORS para preser

const port = process.env.PORT || 5000; 




// MIDDLEWARES ----------------------
// MD: Parseo
app.use(express.urlencoded({ extended: true })); //Parsear datos URL-encoded (formularios HTML)
app.use(express.json()); //Parsear JSON en las peticiones 

// MD: Configuración de las CORS 
const frontUrl = process.env.FRONT_URL || "http://localhost:4000"
const whiteList = [frontUrl]
app.use(cors({
    origin: whiteList //Peticiones desde dominios de la lista
}))

// MD: Loguear peticiones entrantes
app.use((req, res, next) => {
    console.log(`➡️ ${req.method} ${req.originalUrl}`);
    next();
});

// MD: Servir archivos estáticos
app.use("/uploads", express.static("uploads")); //Esto permite acceder a imágenes o archivos subidos desde el navegador





// RUTAS  -----------------------------------
app.use("/auth", authRoutes); //Rutas relacionadas con la autenticación (login, registro, etc.)
app.use("/api/v1", publicRoutes); //Rutas públicas de la API (ej: películas, favoritos, etc.)





// INICIO DEL SERVIDOR ----------------------
// Inicia el servidor y muestra un mensaje en consola
app.listen(port, () => {
    console.log(`server run on port: ${port}`)
})
