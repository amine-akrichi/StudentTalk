const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const api = require('./src/routes/api')
const PORT = 3000
const app=express()
app.use(cors())
app.use(bodyparser.json())
app.use('/api', api)


app.get('/',(req,res)=>{
    res.send('Hello from server')
})

app.listen(PORT ,()=>{
    console.log('Server on localhost : '+PORT);
})

