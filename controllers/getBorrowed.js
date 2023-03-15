const { NotFoundError } = require("../errors");
const Borrow = require("../models/Borrow");
const Student = require("../models/Student");
const { StatusCodes } = require("http-status-codes");

const getBorrowedBooks = async (req, res) => {
 /*  const borrowedBooks = await Borrow.find({}).where("defaulted").equals(false);
  res.status(StatusCodes.OK).json(borrowedBooks);  */
/*  await Borrow.find()
  .populate("admissionNumber", "name")
  .populate("bookID", "title")
  .select("admissionNumber bookID _id")
  .exec((err, borrows) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'An error occurred.' });
    } else {
      return res.status(200).json(borrows);
    }
  }); */
  const borrowedBooks = await Borrow.find({})
  .populate({
    path: 'student',
    select: 'name course',
  })
  .populate({
    path: 'book',
    select: 'title',
  })
  .where('defaulted')
  .equals(false).sort("createdAt");
res.status(StatusCodes.OK).json(borrowedBooks);

};

//should be get single damaged to be changed soon
const getSingleBorrowed = async (req, res)=>{
     const { id } = req.params 
     const borrowed = await Borrow.findOne({_id:id})
     .populate({
      path: 'student',
      select: 'name course admissionNumber',
    })
    .populate({
      path: 'book',
      select: 'title bookID category',
    })
    .where('damaged')
    .equals(true)
     if(!borrowed){
      throw new NotFoundError(`No borrowed matxg the details with id:${id}`)
     }
     res.status(StatusCodes.OK).json(borrowed)
}

module.exports = {getBorrowedBooks, getSingleBorrowed};
