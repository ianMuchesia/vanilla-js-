const { StatusCodes } = require("http-status-codes");
const Borrow = require("../models/Borrow");


const getDamaged = async(req, res)=>{
    const damagedBooks = await Borrow.find({})
    .populate({
      path: 'student',
      select: 'name course admissionNumber',
    })
    .populate({
      path: 'book',
      select: 'title bookID',
    })
    .where('damaged')
    .equals(true)
    .sort("createdAt");

  res.status(StatusCodes.OK).json(damagedBooks);
}


module.exports = getDamaged