const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth.middleware');
const { processFileUpload } = require('../controllers/dashBoard.controller');
const { dashBoardMiddleware } = require("../middleware/dashBoard.middleware");
const { getImages } = require('../controllers/dashBoard.controller');

router.get('/', authenticateToken, (req, res) => {
    res.status(200).json({ message: `Welcome to the dashboard, ${req.user.email}!` });
});

router.get('/images', authenticateToken, getImages);

router.post("/upload", authenticateToken, dashBoardMiddleware, processFileUpload)
    
module.exports = router;

