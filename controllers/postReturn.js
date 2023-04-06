const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../errors");
const Book = require("../models/Books");
const Borrow = require("../models/Borrow");
const Student = require("../models/Student");

const postReturn = async (req, res) => {
  const { admissionNumber, bookID, damaged, damagedReason } = req.body;
  

  const returnStudent = await Student.findOne()
    .where("admissionNumber")
    .equals(admissionNumber);

  if (!returnStudent) {
    throw new NotFoundError(`no student matches the details`);
  }
  
  const returnBook = await Book.findOne({ bookID: bookID });

  if (!returnBook) {
    throw new NotFoundError(`no borrowed book matches the details`);
  }

  if (damaged === "Yes" && !damagedReason) {
    throw new BadRequestError(`no damaged reason provided`);
  }

  
    const returnBorrowed = await Borrow.findOne({'student':returnStudent._id,
     'book':returnBook._id ,
     'returned':false})
    /* .where("student._id")
    .equals((returnStudent._id).toString())
    .where("book._id")
    .equals((returnBook._id).toString()).exec(); */
 
    
  if(!returnBorrowed){
    throw new NotFoundError(`no borrowed book matches the Student, please check again the details`);
  }

 
   if (damaged === "Yes" && damagedReason) {
    returnBorrowed.damaged = true;
    returnBorrowed.damagedReason = damagedReason;
    returnBorrowed.returnDate = new Date()
    await returnBorrowed.save(); 

    res.status(StatusCodes.OK).json({ msg: "Added to Damaged Books" });
  }
  if (returnBorrowed.defaulted) {
    res.status(StatusCodes.OK).json({ msg: "Added to default list" });
  }
  if (returnBorrowed.damaged === false && returnBorrowed.defaulted === false) {
    returnBook.copies += 1;
    await returnBook.save();
    await Borrow.findOneAndDelete({ _id: returnBorrowed._id });
    res.status(StatusCodes.OK).json({ msg: "SUCCESS!" });
  } 
  
};

module.exports = postReturn;
