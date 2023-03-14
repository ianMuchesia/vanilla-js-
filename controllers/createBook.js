const { BadRequestError } = require("../errors")
const Book = require("../models/Books")
const {StatusCodes} = require('http-status-codes')




const createBook = async(req, res)=>{
   const {bookID} = req.body
    const bookExist = await Book.findOne({bookID:bookID})

    if(bookExist){
        console.log(bookExist)
        throw new BadRequestError("book already exist")
    }
    

   const book = await Book.create(req.body)
   res.status(StatusCodes.OK).json({msg:"success"})
}


module.exports = createBook