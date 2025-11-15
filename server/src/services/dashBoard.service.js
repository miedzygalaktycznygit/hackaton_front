const pool = require('../database/db');
dotenv = require('dotenv').config();

async function addImg(user_id, imgUrl) {
    try{
        imgUrl = process.env.url+`/uploads/${imgUrl}`;
        const result = await pool.query('INSERT INTO images (user_id, imgUrl) VALUES ($1, $2) RETURNING *;', [user_id, imgUrl]);
        return result.rows[0];
    }catch(err){
        throw err;
    }
}

async function addSharedImg(user_id, imgUrl) {
    try{
        imgUrl = process.env.url+`/uploads/${imgUrl}`;
        const result = await pool.query('INSERT INTO shared_images (user_id, imgUrl) VALUES ($1, $2) RETURNING *;', [user_id, imgUrl]);
        return result.rows[0];
    }catch(err){
        throw err;
    }
}



async function getImagesByUserId(user_id) {
    try {
        const result = await pool.query('SELECT * FROM images WHERE user_id = $1;', [user_id]);
        return result.rows;
    }catch(err) {
        throw err;
    }
}



module.exports = { addImg, getImagesByUserId };