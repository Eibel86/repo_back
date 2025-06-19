const { queryDB } = require("./DBquery");
const bcrypt = require("bcryptjs");

const initDB = async () => {
    try {
        // 1. Borrar tablas (orden importa por las FK)
        await queryDB(`DROP TABLE IF EXISTS favourites`);
        await queryDB(`DROP TABLE IF EXISTS films`);
        await queryDB(`DROP TABLE IF EXISTS directors`);
        await queryDB(`DROP TABLE IF EXISTS genres`);
        await queryDB(`DROP TABLE IF EXISTS users`);

        // 2. Crear tablas (igual que tu archivo DBcreate.js)
        await queryDB(`
            CREATE TABLE IF NOT EXISTS users (
                user_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                name VARCHAR(120) NOT NULL,
                email VARCHAR(120) UNIQUE NOT NULL,
                password VARCHAR(200) NOT NULL,
                role VARCHAR(60) DEFAULT 'user'
            );

            CREATE TABLE IF NOT EXISTS directors (
                director_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                name VARCHAR(120) NOT NULL
            );

            CREATE TABLE IF NOT EXISTS genres (
                genre_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                name VARCHAR(120) NOT NULL
            );

            CREATE TABLE IF NOT EXISTS films (
                film_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                director_id INTEGER REFERENCES directors(director_id) ON DELETE CASCADE,
                genre_id  INTEGER REFERENCES genres(genre_id) ON DELETE CASCADE,
                full_title VARCHAR(200) NOT NULL,
                image_url VARCHAR(300) NOT NULL,
                release_date DATE NOT NULL,
                duration INTERGER NOT NULL,
                synopsis VARCHAR(600)
            );

            CREATE TABLE IF NOT EXISTS favourites (
                favourite_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
                film_id INTEGER REFERENCES films(film_id) ON DELETE CASCADE
            );
        `);

        // 3. Hashear contraseñas
        const password1 = await bcrypt.hash("password123", 10);
        const password2 = await bcrypt.hash("admin456", 10);

        // 4. Insertar datos ficticios
        await queryDB(`INSERT INTO users (name, email, password, role)
                       VALUES 
                       ('Alice', 'alice@email.com', $1, 'user'),
                       ('Bob', 'bob@email.com', $2, 'admin')`,
            [password1, password2]
        );

        await queryDB(`INSERT INTO directors (name)
                       VALUES ('Lana Wachowski'), ('Christopher Nolan')`);

        await queryDB(`INSERT INTO genres (name)
                       VALUES ('Sci-Fi'), ('Action')`);

        await queryDB(`INSERT INTO films (full_title, director_id, genre_id, image_url, release_date, duration, synopsis)
                       VALUES 
                       ('The Matrix', 1, 1, 'https://example.com/matrix.jpg', '1999-03-31', '02:16:00', 'A hacker discovers reality is a simulation.'),
                       ('Inception', 2, 2, 'https://example.com/inception.jpg', '2010-07-16', '02:28:00', 'Dreams within dreams.')`);

        await queryDB(`INSERT INTO favourites (user_id, film_id)
                       VALUES (1, 1), (2, 2)`);

        console.log("Base de datos reiniciada con éxito");

    } catch (error) {
        console.log("Error al inicializar la base de datos:", error);
    }
};

initDB();