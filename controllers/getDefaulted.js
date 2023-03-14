const { StatusCodes } = require('http-status-codes');
const Borrow = require('../models/Borrow')
const Student = require('../models/Student')



const getDefaultedBooks = async(req, res)=>{
    const defaultedBooks = await Borrow.find({})
    .populate({
        path: 'student',
        select: 'name course admissionNumber',
      })
      .populate({
        path: 'book',
        select: 'title bookID',
      })
      .where('defaulted').equals(true)
      .sort("createdAt");

      res.status(StatusCodes.OK).json(defaultedBooks)
}


module.exports = getDefaultedBooks
