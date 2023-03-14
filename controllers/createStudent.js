const {StatusCodes } = require('http-status-codes')
const Student = require('../models/Student')
const {BadRequestError} = require('../errors')
const createStudent = async(req, res)=>{
    const {admissionNumber} = req.body
    const studentExist = await Student.findOne({admissionNumber:admissionNumber})

    if(studentExist){
        console.log(studentExist)
        throw new BadRequestError("student already exist")
    }
    

   const student = await Student.create(req.body)
   res.status(StatusCodes.OK).json({msg:"success"})
 
}


module.exports = createStudent