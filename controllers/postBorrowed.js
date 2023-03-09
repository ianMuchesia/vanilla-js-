const Book = require("../models/Books");
const Borrow = require("../models/Borrow");
const Student = require("../models/Student");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../errors");

const postBorrowed = async (req, res) => {
  const { student_id, book_id } = req.body;

  const book = await Book.findOne({ _id: book_id });
  if (!book) {
    throw new NotFoundError(`no book found with id: ${book_id}`);
  }

  const student = await Student.findOne({ _id: student_id });
  if (!student) {
    throw new NotFoundError(
      `no students found with Admission Number: ${student_id}`
    );
  }

  const alreadyExist = await Borrow.findOne()
    .where("student")
    .equals(student_id)
    .where("book")
    .equals(book_id);

    console.log(alreadyExist)

  if (alreadyExist) {
    throw new BadRequestError("student has already borrowed the book");
  }
  const borrowBook = await Borrow.create({
    student: student_id,
    book: book_id,
  });

  res.status(StatusCodes.CREATED).json({ borrowBook });
};

module.exports = postBorrowed;
