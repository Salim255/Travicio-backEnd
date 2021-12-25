const express = require('express');
const router = express.Router();

//1route Get api/profile
//2description Test route
//3access Public
router.get('/', (req, res)=> res.send('Profile route'));

module.exports = router;