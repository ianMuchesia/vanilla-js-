const { StatusCodes } = require("http-status-codes")
const Student = require("../models/Student")

 

 const getStudents = async(req, res)=>{
 const students = await Student.find({})
 res.status(StatusCodes.OK).send(students)
 }


 module.exports = getStudents