const pool = require("./DBconnect")
const queryDB = async (query) => {
    try {
        const result = await pool.query(query);
        return result;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    queryDB
}

