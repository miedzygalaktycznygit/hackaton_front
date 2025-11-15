const { isEmailTaken } = require('../utils/validators');
dotenv = require('dotenv').config();
const { registerUser, LoginUser} = require('../services/auth.service');

async function SignUp(req, res) {
    const { email, password } = req.body;
    try{
        if(!email || !password){
            return res.status(400).json({message: "Email and password are required"});
        }


        if(await isEmailTaken(email)){
            return res.status(400).json({message: "Email is already taken"});
        }


        const user = await registerUser(email, password);

        res.status(201).json({ message: "User registered successfully", user });
        
        
    }catch(err){
        console.error("Error during sign up:", err);
        res.status(500).json({message: "Internal server error"});
    }
}


async function SignIn(req, res){
    const { email, password } = req.body;
    try{
        if(!email || !password){
            return res.status(400).json({message: "Email and password are required"});
        }

        const token = await LoginUser(email,password);

        if(token === null){
            return res.status(400).json({message: "Invalid email or password"});
        }
       

        res.status(200).json({ message: "User logged in successfully", token });
    }catch(err){
        console.error("Error during sign in:", err);
        res.status(500).json({message: "Internal server error"});
    }

}

module.exports = { SignUp, SignIn };