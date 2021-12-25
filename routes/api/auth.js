const express = require('express');
const router = express.Router();

//1route Get api/auth
//2description Test route
//3access Public
router.get('/', (req, res)=> res.send('Auth route'));

module.exports = router;