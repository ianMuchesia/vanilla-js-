const Book = require("../models/Books");
const Borrow = require("../models/Borrow");
const Student = require("../models/Student");
const { StatusCodes } = require("http-status-codes");

const getStudentsBorrow = async (req, res) => {
  const borrowedBooks = await Borrow.find({}).where("defaulted").equals(false);
    
  let students = await Student.find({})
  const books = await Book.find({})

 const studentBorrowed = borrowedBooks.map(book=>{
    return students.filter(student=>{
        if(book.admissionNumber === student.admissionNumber ){
            return {
                bookId: book.bookID,
                name: student.name,
                admissionNumber: student.admissionNumber,
                course: student.course
            }
            
        }else{
            return false;
        }
    })
 })
  res.status(StatusCodes.OK).json(studentBorrowed);
};


module.exports = getStudentsBorrow