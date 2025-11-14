const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const { SignUp, SignIn } = require('../controllers/auth.controller');

router.post('/signup',SignUp);
router.post('/signin', SignIn);

module.exports = router;