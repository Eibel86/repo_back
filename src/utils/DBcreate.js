const { queryDB } = require("./DBquery")
const createQuery = `
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
    duration INTEGER NOT NULL,
    synopsis VARCHAR(600)
);

CREATE TABLE IF NOT EXISTS favourites (
    favourite_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    film_id INTEGER REFERENCES films(film_id) ON DELETE CASCADE
);
`

const createDB = async () => {
    try {
        const result = await queryDB(createQuery);
        return result;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createDB
}