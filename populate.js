require('dotenv').config()

const Book = require('./models/Books')

const booksJSON = require('./books.json')
const studentJSON = require('./student.json')
const connectDB = require('./database/connectDB')
const Student = require('./models/Student')


const start = async()=>{
    try{
        await connectDB(process.env.MONGO_URI)
        await Book.deleteMany()
        await Student.deleteMany()
        await Book.create(booksJSON)
        await Student.create(studentJSON)
        console.log('success')
        process.exit(0)
    }catch(err){
        console.log(err)
        process.exit(1)
    }
}

start()