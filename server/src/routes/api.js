const express = require('express')
const dbconnect = require('../config/db')
const router = express.Router()
dbconnect();

router.get('/',(req,res)=>{
    res.send('Hello from API')
})


module.exports = router
