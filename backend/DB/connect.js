const mongoose = require('mongoose')
require("dotenv").config()

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
const url = `mongodb+srv://didara:${process.env.MONGDB}@cluster0.fkiaij8.mongodb.net/books`
// const url = "mongodb://localhost:27017/books"


mongoose.connect(url,clientOptions)

const bookShema = mongoose.Schema({
    name:"String",
    type:"String",
    description:"String",
    price:"String",
    images:[],
    phone:"String",
    uid:"String",
})


const user = mongoose.Schema({
    username:"String",
    email:"String",
    password:"String",
    photo:"String",
    type:"String", // google , normel
})

// bookShema.index({name:"text" })


const books = mongoose.model('book',bookShema)
const users = mongoose.model('users',user)

module.exports = {books,users}