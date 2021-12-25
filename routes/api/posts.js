const express = require('express');
const router = express.Router();

//1route Get api/posts
//2description Test route
//3access Public
router.get('/', (req, res)=> res.send('Posts route'));

module.exports = router;