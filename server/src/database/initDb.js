const pool = require('../database/db');

async function initDb() {
    try{
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(72) NOT NULL);`);
        await pool.query(`CREATE TABLE IF NOT EXISTS shared_images (
            id SERIAL PRIMARY KEY, 
            user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
            imgUrl VARCHAR(255) NOT NULL);`)
    }catch(err){
        console.error("Error initializing database:", err);
    }
}

module.exports = initDb;