const pool = require("./DBconnect")
const queryDB = async (query, params = []) => {
    try {
        const result = await pool.query(query, params);
        return result;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    queryDB
}
