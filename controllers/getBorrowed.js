const Borrow = require('../models/Borrow')
const Student = require('../models/Student')



const getBorrowedBooks = async(req, res)=>{
    try {
        const borrowedBooks = await Borrow.find({})
        res.json(borrowedBooks)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}


module.exports = getBorrowedBooks
