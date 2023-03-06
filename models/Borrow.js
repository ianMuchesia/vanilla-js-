const mongoose = require('mongoose');
const Book = require('./Books');
const { NotFoundError } = require('../errors');

const Schema = mongoose.Schema

const borrowSchema = new Schema({
  admissionNumber: {
    type: String,
    required: true,
    ref: 'Student',
  },
      bookID: {
        type: String,
        required: true,
        ref: 'Book',
      },
      borrowDate: {
        type: Date,
        default: Date.now
      },
      returned:{
        type: Boolean,
        default: false

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
          if(this.returned === false && this.returnDate <= Date.now()){
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
    const book = await Book.findOne({bookID:this.bookID});
    if (!book) {
      throw new NotFoundError('Book not found');
    }
    if (book.copies <= 0) {
      throw new NotFoundError('Book not available as of now');
    }
    book.copies -= 1;
    await book.save();
  });
  


const Borrow = mongoose.model('Borrow', borrowSchema)

module.exports = Borrow