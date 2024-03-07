const {users} = require('./DB/connect')
const bcrypt = require('bcryptjs')
require('dotenv').config()
const jwt = require('jsonwebtoken')


const locaStrategy = require('passport-local').Strategy
const googleStrategy = require('passport-google-oauth20').Strategy
const jwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const conf = (passport)=>{


     passport.use(new locaStrategy({usernameField: "email"}, async(email,password,done)=>{
      try{
         console.log('config',email)
         const user = await users.findOne({email})
         if(!user) return done(null, false,{error: "email dosen't exist"})
 
         const bool = bcrypt.compareSync(password,user.password)
         if(!bool) return done(null,false,{error:'incorect password'})
         
         const token = jwt.sign({id:user._id},process.env.KEY,{expiresIn:'1h'})
         
         const obj = {
            user,token
         }

         done(null,obj)
 
      }catch(e){
          done(e)
      }
     }))




     passport.use(new googleStrategy(
      {
         clientID: process.env.CLIENT_ID,
         clientSecret: process.env.CLIENT_SEC,
         callbackURL: 'http://localhost:5000/general/google/callback',
         passReqToCallback: true,
     },
     async (req,accessToken, refreshToken, profile, done)=>{
      try{
         const ruser = users.findOne({_id:profile.id})
         if(ruser) return done(null,profile.id)

         const user = new users({
            _id:profile.id,
            username:profile.displayName,
            email:profile.emails[0].value,
            photo:profile.photos[0].value
         })

         await user.save(user)
         done(null,profile.id)

      }catch(e){
          done(e)
      }

     }
     ))
     

     const jwtOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.KEY
     }

     passport.use(new jwtStrategy(jwtOptions,(pyload,done)=>{
         done(null,pyload)
     }))

   //   passport.serializeUser((id,done)=>{
   //      done(null,id)
   //   })

   //   passport.deserializeUser((id,done)=>{
   //      done(null,id)
   //   })

 


}


module.exports = conf


