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

async function addSharedImgByEmail(email, image_id) {
    try {
        const userResult = await pool.query(
            'SELECT id FROM users WHERE email = $1;',
            [email]
        );

        if (userResult.rows.length === 0) {
            throw new Error('User not found');
        }

        const shared_to_user_id = userResult.rows[0].id;

        const result = await pool.query(
            'INSERT INTO shared_images (shared_to_user_id, image_id) VALUES ($1, $2) RETURNING *;',
            [shared_to_user_id, image_id]
        );

        return result.rows[0];
    } catch (err) {
        throw err;
    }
}

async function getSharedImagesByUserId(shared_to_user_id) {
    try {
        const result = await pool.query(`
            SELECT images.id, images.user_id, images.imgUrl
            FROM shared_images
            JOIN images ON shared_images.image_id = images.id
            WHERE shared_images.shared_to_user_id = $1;`, 
            [shared_to_user_id]);

        return result.rows;
    } catch (err) {
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



module.exports = { addImg, getImagesByUserId, getSharedImagesByUserId, addSharedImgByEmail};