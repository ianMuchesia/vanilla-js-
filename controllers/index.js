const {getAllBooks , getSingleBook} = require('./getAllBooks')
const createBook = require('./createBook')
const postBorrowed = require('./postBorrowed')
const getBorrowedBooks = require('./getBorrowed')
const getStudents = require('./getStudents')
const {register, login} = require('./auth')
const postReturn = require('./postReturn')
const deleteBorrowed = require('./deleteBorrowed')
const getStudentsBorrow = require('./getStudentsBorrow')
const createStudent = require('./createStudent')
const getDamagedBooks = require('./getDamagedBooks')
const getDefaultedBooks = require('./getDefaulted')

module.exports = {
    getAllBooks,
    createBook,
    postBorrowed,
    getBorrowedBooks,
    getStudents,
    register, 
    login,
    postReturn,
    deleteBorrowed,
    getStudentsBorrow,
    createStudent,
    getSingleBook,
    getDamagedBooks,
    getDefaultedBooks,
}