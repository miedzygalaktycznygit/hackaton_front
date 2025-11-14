const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth.middleware');

router.get('/', authenticateToken, (req, res) => {
    res.status(200).json({ message: `Welcome to the dashboard, ${req.user.email}!` });
});
    
module.exports = router;

