const Book = require("../models/Books")
const {StatusCodes} = require('http-status-codes')



const createBook = async(req, res)=>{
   try {
    const book = await Book.create(req.body)
    res.json({data: book, user:req.admini})
  
   } catch (error) {
    console.log(error)
    res.status(StatusCodes.BAD_REQUEST).json(error)
   }
}


module.exports = createBook