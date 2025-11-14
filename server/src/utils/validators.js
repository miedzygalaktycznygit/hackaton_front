const express = require('express');
const pool = require('../database/db');


async function isEmailTaken(email) {
    const result = await pool.query("SELECT * FROM users WHERE email = $1;",[email]);
    return result.rows.length > 0;
    
}


module.exports = { isEmailTaken };