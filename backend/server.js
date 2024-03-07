const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const session = require('express-session')
require('dotenv').config()
const passport = require('passport')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'))
app.use(cors())
app.use(session({secret:process.env.SEC,resave:true,saveUninitialized:true}))
// app.use(session({secret:process.env.SEC,resave:true,saveUninitialized:true, cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 }}))


app.use(passport.initialize());
app.use(passport.session());


// app.use('/cus/auth',(req,res,next)=>{
//     !req.isAuthenticated() ? res.json({error:'you must logIn first'}) : next()
//     res.locals
// })


app.use('/cus/auth',passport.authenticate('jwt',{session:false,failureRedirect:'/fail'}))


app.get('/',(req,res)=>{
    res.status(200).json({data:'welcome home'})
    
})



app.get('/fail',(req,res)=>{
    res.status(200).json({error:'signIn fails'})
})

app.get('/logout',(req,res)=>{
    req.session.destroy(err =>{
        if(err) console.log('logout::',err.message)
    })
    res.clearCookie(req.session.id)
    
})

app.use('/general',require('./routes/general'))
app.use('/cus',require('./routes/auth'))


app.listen(5000, console.log('listening on port 5000 !'))