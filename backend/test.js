// const collection = require('monk')("localhost:27017").get('shCut')
// const yup = require('yup')
// const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const {users,books} = require('./DB/connect')



// const url = "test"
// const shCut = "test"
// collection.insert({url,shCut}).then(res=>{console.log(res)})

// const shema = yup.object().shape({
//     url: yup.string().url("tkhawarti").required(),
//     shCut: yup.string().required()
// })



async function  f(){
    // const res = await users.find({username:"ayoub"})
    // console.log(bcrypt.compareSync("12345",obj.password))
    // console.log(crypto.randomBytes(64).toString('base64'))

    // const book = new users({username:"test",email:"test@gmail.com",password:"12345678"})
    // const res =await book.save(book)

    // const res = await users.deleteOne({_id:"65c3e95c671cf1fec3951176"})
    // const r = await books.find({$text:{$search:"phisique"}})


    // const x = 'the'
    // const regex = new RegExp(`^${x}`)
    // const r = await books.find({name:{$regex:regex}}).limit(8).sort({name:-1})

    const r = await books.find()
    console.log(r)
}

f()