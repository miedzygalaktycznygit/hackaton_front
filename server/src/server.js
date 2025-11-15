const express = require('express');
const cors = require('cors');
const app = express();
const pool = require('./database/db');
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashBoard.router');
dotenv = require('dotenv').config();

const corsOptions = {
    origin: 'http://localhost:5173', 
    credentials: true
}

app.use(cors(corsOptions));

const initDb = require('./database/initDb');

initDb();

app.use(express.json());
app.use('/dashboard',dashboardRoutes);
app.use('/auth',authRoutes);




app.listen(parseInt(process.env.backend_port), () => {
    console.log("Server is running on port ", process.env.backend_port);
})