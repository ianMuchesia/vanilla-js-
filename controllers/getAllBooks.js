const { BadRequestError, NotFoundError } = require('../errors')
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

const getSingleBook = async(req, res)=>{

    const {id} = req.params
    const book = await Book.findOne({_id: id})
    if(!book){
        throw new NotFoundError(`Book with id:${id} not found`)
    }
    res.status(StatusCodes.OK).json({book})

}


module.exports = {getAllBooks , getSingleBook}