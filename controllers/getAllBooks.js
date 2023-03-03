const Book = require('../models/Books')
const {StatusCodes} = require('http-status-codes')
const getAllBooks = async(req, res)=>{
    
    try {
        const books =await  Book.find({available: false})
        res.status(StatusCodes.OK).json({books})
    } catch (error) {
        console.log(error)
    }
}


module.exports = getAllBooks