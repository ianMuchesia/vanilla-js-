const express = require("express");
const {
  getAllBooks,
  postBorrowed,
  createBook,
  getBorrowedBooks,
  getStudents,
  postReturn,
  deleteBorrowed,
  getStudentsBorrow,
  createStudent,
  getSingleBook,
  getDefaultedBooks,
  getDamagedBooks,
  getSingleBorrowed,
} = require("../controllers");
const authenticateUser = require("../middleware/authentication");
const router = express.Router();



router.get("/books/:id", authenticateUser, getSingleBook);
router.get("/books", authenticateUser, getAllBooks);
router.get("/students", authenticateUser, getStudents);
router.post('/students', authenticateUser, createStudent)
router.post("/borrowed", authenticateUser, postBorrowed);
router.post("/return", authenticateUser, postReturn);
router.post("/books", authenticateUser, createBook);
router.get("/borrowed", authenticateUser, getBorrowedBooks);
router.get("/borrowed/:id", authenticateUser, getSingleBorrowed);
router.get("/defaulted", authenticateUser, getDefaultedBooks);
router.get("/damaged", authenticateUser, getDamagedBooks);
router.get("/StudentBorrowed", authenticateUser, getStudentsBorrow);
router.delete("/borrowed/:id", authenticateUser, deleteBorrowed);



module.exports = router;
