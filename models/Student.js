const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const studentSchema = new Schema({
  name: {
    type: String,
    required: [true, "Student name must be included"],
  },
  admissionNumber: {
    type: String,
    required: [true, "Student admission number must be included"],
    unique: true,
  },
  course: {
    type: String,
    required: [true, "Student course must be included"],
  },
  booksBorrowed: [{ type: mongoose.Schema.Types.ObjectId, ref: "Borrow" }],
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
