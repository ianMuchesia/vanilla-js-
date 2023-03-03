const Book = require("../models/Books")
const {StatusCodes} = require('http-status-codes')



const createBook = async(req, res)=>{
   try {
    const book = await Book.create(req.body)
    res.json(book)
  
   } catch (error) {
    console.log(error)
    res.status(StatusCodes.BAD_REQUEST).json(error)
   }
}


module.exports = createBook