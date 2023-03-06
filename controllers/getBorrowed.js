const Borrow = require('../models/Borrow')
const Student = require('../models/Student')
const {StatusCodes } = require('http-status-codes')


const getBorrowedBooks = async(req, res)=>{
    const borrowedBooks = await Borrow.find({}).where('defaulted').equals(false)
    res.status(StatusCodes.OK).json(borrowedBooks)
}


module.exports = getBorrowedBooks
