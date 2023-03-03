const getAllBooks = require('./getAllBooks')
const createBook = require('./createBook')
const postBorrowed = require('./postBorrowed')
const getBorrowedBooks = require('./getBorrowed')
const getStudents = require('./getStudents')

module.exports = {
    getAllBooks,
    createBook,
    postBorrowed,
    getBorrowedBooks,
    getStudents
}