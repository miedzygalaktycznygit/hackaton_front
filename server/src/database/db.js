const {Pool} = require('pg');
const pool = new Pool({
    host: 'localhost', // database host
    user: 'postgres', // database user
    port: 5432, // database port
    password: 'password', // database password
    database: 'Hackathon' // database name
});

pool.connect().then(() => {
    console.log("Connected to the database");
})

module.exports = pool;