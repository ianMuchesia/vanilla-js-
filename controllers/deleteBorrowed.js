const { StatusCodes } = require("http-status-codes")
const Borrow = require("../models/Borrow")


const deleteBorrowed = async(req, res)=>{
 const {id } = req.params
 
  const deleted = await Borrow.findByIdAndDelete(id)
  res.status(StatusCodes.OK).json(deleted)
}

module.exports = deleteBorrowed