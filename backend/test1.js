const express = require('express')
const morgan = require('morgan')

const app = express()
app.use(morgan('dev'))

app.get('/',(req,res)=>{
    const {token} = req.query
    console.log('token is::::::::',token)
    res.status(200).send('great..')
})

app.listen(4000,console.log('listening on port 4000...'))