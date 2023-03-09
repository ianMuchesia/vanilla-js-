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

  if (damaged && !damagedReason) {
    throw new BadRequestError(`no damaged reason provided`);
  }

  const returnBorrowed = await Borrow.findOne()
    .where("student")
    .equals((returnStudent._id).toString())
    .where("book")
    .equals((returnBook._id).toString());
 
  if(!returnBorrowed){
    throw new NotFoundError(`no borrowed book matches the details`);
  }

  if (damaged === true && damagedReason) {
    returnBorrowed.damaged = true;
    returnBorrowed.damagedReason = damagedReason;
    await returnBorrowed.save(); 

    res.status(200).json({ returnBorrowed });
  }
  if (returnBorrowed.defaulted) {
    res.status(200).json({ msg: "Added to default list" });
  }
  if (returnBorrowed.damaged === false && returnBorrowed.defaulted === false) {
    returnBook.copies += 1;
    await returnBook.save();
    await Borrow.findOneAndDelete({ _id: returnBorrowed._id });
    res.status(200).json({ msg: "SUCCESS!" });
  }
};

module.exports = postReturn;
