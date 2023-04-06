const { StatusCodes } = require("http-status-codes");
const Borrow = require("../models/Borrow");
const Student = require("../models/Student");

const getDefaultedBooks = async (req, res) => {
  const allBorrowedBooks = await Borrow.find({})
    .populate({
      path: "student",
      select: "name course admissionNumber",
    })
    .populate({
      path: "book",
      select: "title bookID",
    })
    .sort("createdAt");
 let defaultedBooks = []

 /* for(const book of allBorrowedBooks){
  if(book.returnDate < Date.now() && !book.defaulted){
    defaultedBooks = [...defaultedBooks, book]
    await Borrow.findOneAndUpdate({_id:book._id},{defaulted:true})
  
  } */
  
 const updatePromises = allBorrowedBooks.map(async (book) => {
  const currentDate = new Date()
 
    if (currentDate>book.returnDate && !book.defaulted) {
      await Borrow.findOneAndUpdate({ _id: book._id }, { defaulted: true });
      defaultedBooks.push(book);
     
    }
    if(book.defaulted){
      defaultedBooks.push(book);
    }
  });

  // Wait for all the update promises to resolve
  await Promise.all(updatePromises); 



  res.status(StatusCodes.OK).json(defaultedBooks);
};

module.exports = getDefaultedBooks;






/* However, as mentioned earlier, using await inside a loop with findOneAndUpdate could lead to unexpected behavior due to the asynchronous nature of the operation. It's recommended to use Promise.all along with Array.map to create an array of promises for each update operation and then wait for all the promises to resolve before proceeding to the next steps. Here's an updated version of your code: */
