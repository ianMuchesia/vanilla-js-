const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    bookID:{
        type:String,
        required: [true, 'bookID must be included'],
        unique: true
    },
    title: {
        type: String,
        required: [true , 'title of the book must be included'],
    },
    author:{
        type: String,
        required: [true, 'author of the book must be included'],
    },
    category:{
        type: String,
        required: [true, 'category of the book must be included'],
    },
    description:{
        type: String,
        required: [true, 'description of the book must be included'],
    },
    copies:{
        type: Number,
       
        default: 2,
    },
 

}, 

)
//returns true if copies is greater than zero
bookSchema.virtual('available').get(function () {
    return this.copies > 0;
  });


const Book = mongoose.model('Book', bookSchema);

module.exports = Book