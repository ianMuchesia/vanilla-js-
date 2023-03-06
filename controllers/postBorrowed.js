const Book = require("../models/Books")
const Borrow = require("../models/Borrow")
const Student = require("../models/Student")
const {StatusCodes} = require('http-status-codes')
const {NotFoundError} = require('../errors')


const postBorrowed = async(req, res)=>{
    
    const {admissionNumber, bookID } = req.body
    
    const book = await Book.findOne({bookID:bookID})
    if(!book){
        throw new NotFoundError(`no book found with id: ${bookID}`)
    }

    const student = await Student.findOne({admissionNumber:admissionNumber})
    if(!student){
        throw new NotFoundError(`no students found with Admission Number: ${admissionNumber}`)
    }
   
   

     const borrowBook = await Borrow.create({
        admissionNumber,
        bookID
    })
 
    res.status(StatusCodes.CREATED).json({borrowBook}) 
 
}


module.exports = postBorrowed