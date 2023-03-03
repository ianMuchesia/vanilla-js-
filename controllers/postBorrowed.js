const Borrow = require("../models/Borrow")
const Student = require("../models/Student")




const postBorrowed = async(req, res)=>{
    
    const {student, returnDate, book } = req.body

    

     try {
        const borrowedBook = await Borrow.create({
            student,
            book,
            returnDate: new Date(Date.parse(returnDate))
        })
        res.status(201).json(borrowedBook)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    } 
}


module.exports = postBorrowed