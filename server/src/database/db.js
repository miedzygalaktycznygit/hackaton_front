const {Pool} = require('pg');
doenv = require('dotenv').config();

const pool = new Pool({
    host: process.env.host, // database host
    user: process.env.user, // database user
    port: parseInt(process.env.port), // database port
    password: process.env.password, // database password
    database: process.env.database // database name
});

async function connectDb() {
    await pool.connect();
    console.log("Connected to the database");
}

if (require.main === module) {
    connectDb();
}

module.exports = pool;