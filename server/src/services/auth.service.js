const pool = require('../database/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
dotenv = require('dotenv').config();

async function registerUser(email, password) {
    
    try{
        const SALT_ROUND = parseInt(process.env.SALT_ROUND) || 10;

        const hashedPassword = await bcrypt.hash(password, SALT_ROUND);

        const result = await pool.query("INSERT INTO users (email, password) VALUES ($1, $2);", [email, hashedPassword]);
        return result.rows[0];
        
        
    }catch(err){
        console.error("Error during sign up:", err);
        throw new Error("Internal server error");
    }
}


async function LoginUser(email, password){
    try{
        const userResult = await pool.query(
            "SELECT * FROM users WHERE email = $1;", [email]);

            const user = userResult.rows[0];

            if(userResult.rows.Length === 0){
                return null;
            }

            if(!await bcrypt.compare(password, user.password)){
                throw new Error("Invalid password");
            }

            const token = jwt.sign({id: user.id, email: user.email}, 
                process.env.JWT_SECRET, {expiresIn: '1h'});

        
            return token;
    }catch(err){
        console.error("Error during sign in:", err);
        throw new Error("Login failed");
    }
}

module.exports = { registerUser, LoginUser };