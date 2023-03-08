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
} = require("../controllers");
const authenticateUser = require("../middleware/authentication");
const router = express.Router();

router.get("/books", authenticateUser, getAllBooks);
router.get("/students", authenticateUser, getStudents);
router.post("/borrowed", authenticateUser, postBorrowed);
router.post("/return", authenticateUser, postReturn);
router.post("/books", authenticateUser, createBook);
router.get("/borrowed", authenticateUser, getBorrowedBooks);
router.get("/StudentBorrowed", authenticateUser, getStudentsBorrow);
router.delete("/borrowed/:id", authenticateUser, deleteBorrowed);



module.exports = router;
