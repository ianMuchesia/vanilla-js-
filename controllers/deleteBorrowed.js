const { StatusCodes } = require("http-status-codes")
const Borrow = require("../models/Borrow")
const { NotFoundError } = require("../errors")


const deleteBorrowed = async(req, res)=>{
 const {id } = req.params
 

   const deleted = await Borrow.findOneAndDelete(id)
   if(!deleted){
    throw new NotFoundError( `Details matching borrowed data with id:${id} not found`)
   }
  res.status(StatusCodes.OK).json({msg:"success"})
}

module.exports = deleteBorrowed