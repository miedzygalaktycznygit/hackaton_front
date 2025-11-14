const express = require('express');
const cors = require('cors');
const app = express();
const pool = require('./database/db');
const authRoutes = require('./routes/auth');

const initDb = require('./database/initDb');

initDb();

app.use(express.json());
app.use('/auth',authRoutes);


const corsOptions = {
    origin: 'http://localhost:5173', 
}

app.use(cors(corsOptions));




app.listen(3000, () => {
    console.log("Server is running on port 30000");
})