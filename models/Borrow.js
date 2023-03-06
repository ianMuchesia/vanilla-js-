const mongoose = require('mongoose');
const Book = require('./Books');

const Schema = mongoose.Schema

const borrowSchema = new Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
      },
      book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
      },
      borrowDate: {
        type: Date,
        default: Date.now
      },
      returnDate: {
        type: Date,
        default: ()=>{
          const returnDate = new Date()
          returnDate.setDate(returnDate.getDate()+ 15);
          return returnDate;
        }
      },
      defaulted: {
        type: Boolean,
        default: function () {
          if(this.returnDate && this.returnDate > new Date(this.borrowDate.getTime() +
          15 *24 *60 *100)){
            return true
          }
          return false
        }
        //If the returnDate is less than or equal to (i.e. the book was not returned within 15 days), then the condition is false, and the defaulted property is set to true.
      },
      damaged:{
        type:Boolean,
        default:false,
      },
      damagedReason:{
        type:String,
        default:null,
      },
},
{timestamps:true}
)

borrowSchema.pre('save', async function() {
    const book = await Book.findById(this.book);
    if (!book) {
      throw new Error('Book not found');
    }
    if (book.copies <= 0) {
      throw new Error('Book not available');
    }
    book.copies -= 1;
    await book.save();
  });
  


const Borrow = mongoose.model('Borrow', borrowSchema)

module.exports = Borrow