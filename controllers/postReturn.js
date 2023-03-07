const { NotFoundError, BadRequestError } = require("../errors");
const Book = require("../models/Books");
const Borrow = require("../models/Borrow");

const postReturn = async (req, res) => {
  const { admissionNumber, bookID, damaged, damagedReason } = req.body;

  const returnBook = await Borrow.findOne()
    .where("admissionNumber")
    .equals(admissionNumber)
    .where("bookID")
    .equals(bookID);

  if (!returnBook) {
    throw new NotFoundError(`no borrowed book matches the details`);
  }

  const updateBook = await Book.findOne({ bookID: bookID });

  if (!updateBook) {
    throw new NotFoundError(`no book matches the details`);
  }

  if (damaged && !damagedReason) {
    throw new BadRequestError(`no damaged reason provided`);
  }
  if (damaged === true && damagedReason) {
    returnBook.damaged = true;
    returnBook.damagedReason = damagedReason;
    await returnBook.save();

    res.status(200).json({ returnBook });
  }
  if (returnBook.defaulted) {
    res.status(200).json({ msg: "Added to default list" });
  }
  if (returnBook.damaged === false && returnBook.defaulted === false) {
    updateBook.copies += 1;
    await updateBook.save();
    await Borrow.findOneAndDelete({ _id: returnBook._id });
    res.status(200).json({ msg: "SUCCESS!" });
  }
};

module.exports = postReturn;
