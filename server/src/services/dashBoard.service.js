const multer = require('multer');
const upload = multer();
const pool = require('../database/db');

async function addImg(user_id, imgUrl) {
    try{
        const result = await pool.query('INSERT INTO images (user_id, imgUrl) VALUES ($1, $2) RETURNING *;', [user_id, imgUrl]);
        return result.rows[0];
    }catch(err){
        throw err;
    }
}



module.exports = { addImg };