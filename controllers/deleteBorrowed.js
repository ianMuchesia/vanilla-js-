const { StatusCodes } = require("http-status-codes")
const Borrow = require("../models/Borrow")


const deleteBorrowed = async(req, res)=>{
 const {id } = req.params
 
console.log(id)
  /* const deleted = await Borrow.findByIdAndDelete(id)
  res.status(StatusCodes.OK).json(deleted) */
}

module.exports = deleteBorrowed