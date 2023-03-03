const Student = require("../models/Student")

 

 const getStudents = async(req, res)=>{
    try {
        const students = await Student.find({})
        res.status(200).json(students)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }

 }


 module.exports = getStudents