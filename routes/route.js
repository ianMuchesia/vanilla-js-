const express = require('express')
const { getAllBooks, postBorrowed, createBook,  getBorrowedBooks, getStudents, postReturn } = require('../controllers')
const authenticateUser = require("../middleware/authentication")
const router = express.Router()


router.get('/books',authenticateUser, getAllBooks)
router.get('/students',authenticateUser, getStudents)
router.post('/borrowed',authenticateUser, postBorrowed)
router.post('/return',authenticateUser, postReturn)
router.post('/books',authenticateUser, createBook)
router.get('/borrowed',authenticateUser, getBorrowedBooks)


module.exports = router