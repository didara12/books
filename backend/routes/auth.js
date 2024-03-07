const express = require('express')
const {books, users} = require('../DB/connect')
const { object } = require('yup')

const authRoute = express.Router()



authRoute.post('/auth/find',async (req,res)=>{
    try{

        const s = req.body
        console.log(s)
        if(s.type === "_id") return res.status(200).json(await books.findOne({_id:s.id}))
        if(s.type === "uid") return res.status(200).json(await books.find({uid:s.id}))
        if(s.type === "null" || undefined) return res.status(200).json(await books.find())
        if(s.type === "name")return res.status(200).json(await books.find({$text:{$search:s.name}}))
        if(s.type === "type") return res.status(200).json(await books.find({type:s.data}))
        if(s.type === 'search'){
            const regex = new RegExp(`^${s.search}`)
            return res.status(200).json(await books.find({name:{$regex:regex}}).limit(8).sort({name:-1}) )
        }
    }catch(e){
        console.log('/find::',e.message)
        res.json({error:'operation faild'})
    }

})

authRoute.post('/auth/findUser',async(req,res)=>{
    try {
        const {id} = req.body
        res.status(200).json(await users.findOne({_id:id},{password:0,__v:0}))
    } catch (error) {
        console.log('/findUser::',error.message)
        res.json({error:'operation failed'})

    }
})
 

authRoute.post('/auth/add', async (req,res)=>{  // just a test until i fix the cookie problem , then i change it to /auth/add

    try{

        const obj = req.body
        const book = new books(obj)
        await book.save(book)
        res.status(200).json({suc:'book has been added seccesfuly'})
    }catch(e){
        console.error(e.message)
        res.json({error:'operation faild'})
    }
})



authRoute.post('/auth/delete',async (req,res)=>{
    try{
        const {type,id} = req.body
        let inf = null
        if(type === "_id") inf = await books.deleteOne({_id:id})
        if(type === "uid") inf = await books.deleteMany({uid:id})
        
        if(inf.deletedCount === 0)return  res.status(404).json({ error: "No book found with the given ID" })

        res.status(200).json({sec:"the book has been deleted"})
    }catch(e){
        console.error('delete::', e.message)
        res.json({error:'operation failed'})
    }
})

 

authRoute.post('/auth/update',async (req,res)=>{
    try {
        const upbook = req.body
        const inf = await books.updateOne({_id:upbook._id},{$set:upbook})
        if(inf.deletedCount === 0)return  res.status(404).json({ error: "No book found with the given ID" })

        res.status(200).json({sec:"the book has been updated"})
    } catch (e) {
        console.error('update::',e.message)
        res.json({error:"operation failed"})
    }
})


module.exports = authRoute