const express = require('express');
const {register , login} = require('../controller/authController');
const router = express.Router();

router.post('/login', login);
router.post('/register', register);

module.exports = router;