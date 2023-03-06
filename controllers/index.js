const getAllBooks = require('./getAllBooks')
const createBook = require('./createBook')
const postBorrowed = require('./postBorrowed')
const getBorrowedBooks = require('./getBorrowed')
const getStudents = require('./getStudents')
const {register, login} = require('./auth')
const postReturn = require('./postReturn')


module.exports = {
    getAllBooks,
    createBook,
    postBorrowed,
    getBorrowedBooks,
    getStudents,
    register, 
    login,
    postReturn
}