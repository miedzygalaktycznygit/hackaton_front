const express = require('express');
const cors = require('cors');
const app = express();
const pool = require('./database/db');

app.use(express.json());



const corsOptions = {
    origin: 'http://localhost:5173', 
}

app.use(cors(corsOptions));




app.listen(3000, () => {
    console.log("Server is running on port 30000");
})