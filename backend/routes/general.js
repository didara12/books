const express = require('express')
const passport = require('passport')
const conf = require('../config')
const { users } = require('../DB/connect')
const bcrypt = require('bcryptjs')
const Yup = require('yup')

const generalRoute = express.Router()

conf(passport)

// const validShema = Yup.validShema({
//     username: Yup.string().max(10).required(),
//     email: Yup.string().email().required(),
//     password: Yup.string().min(8).required(),
    
// })



generalRoute.post('/signUp', async (req,res)=>{
    try{
        // await validShema.validate(req.body)

        const {username,email,password} = req.body
        const user =await users.findOne({email})
        
        if(user) throw new Error('user alredy existe')

        const hash = bcrypt.hashSync(password)
        const obj = {username,email,password:hash,photo:null,type:'normel'}
        const u = new users(obj)
        await u.save(u)
        res.status(200).json({sec:true})
    }catch(e){
        console.error('/signUp::',e.message)
        res.json({error:e.message})
    }
})




//localPassport

// generalRoute.post('/signIn', passport.authenticate('local',{failureRedirect:'/fail'}),async(req,res)=>{
//     try{
//         console.log('/signIn',req.user.id)
//         const user =await users.findOne({_id:req.user},{password:0})  //how can i access the info in other endpiont
//         if(user){
//             res.status(200).json({user})
//         } 
//     } catch(e){
//         console.error('/signIn::',e.message)
//         res.json({error:"signIn failed"})
//     }   
    
// })


//jwt

generalRoute.post('/signIn', passport.authenticate('local',{session:false,failureRedirect:'/fail'}),async(req,res)=>{
    try{
        
        if(req.user){
            res.status(200).json(req.user)
        } 
    } catch(e){
        console.error('/signIn::',e.message)
        res.json({error:"signIn failed"})
    }   
    
})



// generalRoute.post('/signIn',(req,res,next)=>{
//     passport.authenticate('local',async (err,id,info)=>{
//         try{
//             if(err) throw new Error(err.message)
//             if(!id) return res.json(info)
                
//             const user =await  users.findOne({_id:id},{password:0})
//             if(user){
//                 // console.log('id::',res.header('set-cookie'))
//                 console.log('/signIn-req.session::',req.session)
//                 console.log('/signIn-req.session.id::',req.session.id)
//                 console.log('/signIn-req.user::',req.user)
//                 console.log('/signIn-req.session.passport::',req.session.passport)
//                 res.status(200).json({user})
//             } 
//         } catch(e){
//             console.error('/signIn::',e)
//             res.json({error:"signIn failed"})
//         }  
    

//     })(req,res,next) //how can i access the (err,obj,info) in /fail
// })


generalRoute.get('/signInUpG', passport.authenticate('google', { scope: ['profile', 'email'] }));

generalRoute.post('/google/callback', passport.authenticate('google',{failureRedirect:'/fail'}),(req,res)=>{
    try{
        const user = users.findOne({_id:req.user},{password:0})
        // if(user) res.status(200).json({user})
        res.cookie('id',user)
        res.redirect('http://localhast:5173/')

    } catch(e){
        console.error('/google/callback::',e.message)
        res.json({error:"login failed"})
    }
})





module.exports = generalRoute