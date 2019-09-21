if(!process.env.NODE_ENV || process.env.DEV == 'development'){
    const env = require('dotenv').config()
}

const cors = require('cors')
const express = require('express')
const app = express()
const routes = require('./routes/')
const port = process.env.PORT || 3000
 
app.use(express.urlencoded({ limit: '50mb', extended: false }))
app.use(express.json({ limit: '50mb' }))
app.use(cors()) 
app.use('/',routes)
 
app.use(function (err, req, res, next) {
    console.log(err)
    res.status(500).send({message : 'Internal Server Error' })
})
 
app.listen(port,()=>{
    console.log('listening to port ',port);
})