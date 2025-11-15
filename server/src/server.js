const express = require('express');
const cors = require('cors');
const app = express();
const pool = require('./database/db');
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashBoard.router');

const corsOptions = {
    origin: 'http://localhost:5173', 
    credentials: true
}

const initDb = require('./database/initDb');

initDb();

app.use(express.json());
app.use('/dashboard',dashboardRoutes);
app.use('/auth',authRoutes);


app.use(cors(corsOptions));




app.listen(3000, () => {
    console.log("Server is running on port 3000");
})