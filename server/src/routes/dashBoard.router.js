const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth.middleware');
const { dashBoardMiddleware } = require("../middleware/dashBoard.middleware");
const { processFileUpload, getImages, getSharedImages,postSharedImage } = require('../controllers/dashBoard.controller');

router.get('/', authenticateToken, (req, res) => {
    res.status(200).json({ message: `Welcome to the dashboard, ${req.user.email}!` });
});

router.post("/upload", authenticateToken, dashBoardMiddleware, processFileUpload);
router.get('/images', authenticateToken, getImages);
router.get('/sharedImages', authenticateToken, getSharedImages);
router.post("/upload/shared", authenticateToken, postSharedImage);

    
module.exports = router;

