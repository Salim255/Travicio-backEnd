const express = require('express');
const router = express.Router();

//1route Get api/users
//2description Test route
//3access Public

router.get('/', (req,res)=>res.send('User route'));

module.exports = router;