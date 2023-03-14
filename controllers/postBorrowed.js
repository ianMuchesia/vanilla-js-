const Book = require("../models/Books");
const Borrow = require("../models/Borrow");
const Student = require("../models/Student");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../errors");

const postBorrowed = async (req, res) => {
  const { studentAdmNo, book_Id } = req.body;
  console.log(book_Id)

  const book = await Book.findOne({ bookID: book_Id });
  if (!book) {
    throw new NotFoundError(`no book found with id: ${book_Id}`);
  }

  const student = await Student.findOne({ admissionNumber: studentAdmNo });
  if (!student) {
    throw new NotFoundError(
      `no students found with Admission Number: ${studentAdmNo}`
    );
  }

  const alreadyExist = await Borrow.findOne()
    .where("student")
    .equals(student._id)
    .where("book")
    .equals(book._id);

    

  if (alreadyExist) {
    throw new BadRequestError("student has already borrowed the book");
  }
  const borrowBook = await Borrow.create({
    student: student._id,
    book: book._id,
  });

  res.status(StatusCodes.CREATED).json({msg: "Success!!"}); 
};

module.exports = postBorrowed;
