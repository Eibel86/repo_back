# Back-end API

## Descripción
Este proyecto implementa la capa de servidor para una aplicación de gestión de películas. Ofrece un API RESTful con:

- Registro, login y renovación de sesión con JWT  
- CRUD de películas (incluye subida de imágenes)  
- Gestión de favoritos por usuario  
- Roles de usuario (admin / user)  

---

## Tecnologías
- **Node.js** ≥ v14  
- **Express**  
- **PostgreSQL** (vía `pg`)  
- **JWT** (`jsonwebtoken`)  
- **bcryptjs**  
- **Multer** (subida de imágenes)  
- **express-validator**  
- **dotenv**, **cors**  

---

## Requisitos Previos
- Node.js y npm instalados  
- PostgreSQL en funcionamiento  

---

## Instalación
```bash
git clone <URL_DEL_REPOSITORIO_BACK>
cd repo_back
npm install
```

## Configuración
1. Duplica el archivo de ejemplo:
```bash
cp .env.template .env
```
2. Edita `.env` con tus credenciales:
```env
PORT=5000
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_HOST=localhost
DB_PORT=5432
DB_NAME=nombre_de_la_bd
PRIVATE_KEY_JWB=clave_privada_para_JWT
NODE_ENV=development
FRONT_URL=http://localhost:4000
```

## Scripts disponibles

- `npm run start`
Inicia el servidor (archivo `src/app.js`).

- `npm run dev`
Modo desarrollo con nodemon.

- `npm run db-init`
Crea las tablas y datos de ejemplo en la base de datos

- `npm run docs`
Genera la documentación.

## Estructura de carpetas

repo_back/
├── src/
│   ├── controllers/    # Lógica de negocio (auth, películas, favoritos)
│   ├── middlewares/    # Validaciones, JWT, subida de archivos
│   ├── models/         # Consultas a la base de datos
│   ├── routes/         # Rutas Express (/auth, /api/v1)
│   └── utils/          # Conexión a DB, JWT, init BD
├── uploads/            # Imágenes subidas
├── .env.template
└── package.json

## Endpoints

### Autenticación

| Ruta                     | Método | Descripción                      |
|--------------------------|:------:|----------------------------------|
| `/auth/registry`         | POST   | Registrar nuevo usuario          |
| `/auth/login`            | POST   | Iniciar sesión                   |
| `/auth/renewToken`       | GET    | Renovar token JWT                |
| `/auth/validateAdminRole`| GET    | Validar rol de administrador     |

### Películas (`/api/v1`)

| Ruta                         | Método | Descripción                                  |
|------------------------------|:------:|----------------------------------------------|
| `/getAllFilms`               | GET    | Listar todas las películas                   |
| `/getFilmByTitle/:title`     | GET    | Buscar película por título                   |
| `/getFilmById/:id`           | GET    | Obtener detalles de una película por ID      |
| `/createFilm`                | POST   | Crear película (multipart/form-data)         |
| `/updateFilm/:id`            | PUT    | Actualizar película                          |
| `/deleteFilm/:id`            | DELETE | Eliminar película                            |

### Favoritos (`/api/v1`)

| Ruta                                      | Método | Descripción                     |
|-------------------------------------------|:------:|---------------------------------|
| `/createFavourite`                        | POST   | Añadir película a favoritos     |
| `/deleteFavourite/:userId/:filmId`        | DELETE | Quitar película de favoritos    |
| `/getFavourites/:userId`                  | GET    | Listar favoritos de un usuario  |

> **Protección:** todas las rutas excepto `/auth/*` usan los middlewares `validateJWT` y `validateRole("admin","user")`.  
> **Subida de imágenes:** utiliza `upload.middleware`.  

## Uso
1. Asegúrate de que PostgreSQL está corriendo y configurado en .env.

2. Inicializa la base de datos:

```bash
npm run db-init
```
3. Inicia el servidor:

```bash
npm run dev
```
4. La API escuchará en `http://localhost:5000`.