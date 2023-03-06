const { NotFoundError } = require("../errors");
const Book = require("../models/Books");
const Borrow = require("../models/Borrow");

const postReturn = async (req, res) => {
  const { admissionNumber, bookID, damaged } = req.body;

  const returnBook = await Borrow.findOne()
    .where("admissionNumber")
    .equals(admissionNumber)
    .where("bookID")
    .equals(bookID)

    if (!returnBook) {
      throw new NotFoundError(`no borrowed book matches the details`)
    }

   if(returnBook.damaged === false && returnBook.defaulted === false){
    console.log("i am here")
      await Book.findOneAndUpdate({bookID:bookID},{copies: copies+1},{
        runValidators: true
    })
   
     /*  await Borrow.findOneAndRemove({_id:returnBook._id}) */
      
   }
    res.status(200).json({returnBook})
};

module.exports = postReturn;
