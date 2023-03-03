const express = require('express')
const { getAllBooks, postBorrowed, createBook,  getBorrowedBooks, getStudents } = require('../controllers')

const router = express.Router()


router.get('/books', getAllBooks)
router.get('/students', getStudents)
router.post('/borrowed', postBorrowed)
router.post('/books', createBook)
router.get('/borrowed', getBorrowedBooks)


module.exports = router