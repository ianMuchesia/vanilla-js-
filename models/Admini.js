const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Schema = mongoose.Schema


const AdminiSchema = new Schema({
    name:{
        type:String,
        required:[true, 'please provide a name'],
        minlength: 3,
        maxlength: 50,
    },
    email:{
        type:String,
        required:[true, 'please provide email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "please provie valid email",
          ],
        unique:true,
    },
    password:{
        type:String,
        required:[true, 'please provide password'],
        minlength: 6,
      
    },
})

AdminiSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})
AdminiSchema.methods.createJWT = function(){
    return  jwt.sign(
        { adminiId: this._id, name: this.name },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_LIFETIME }
      );
}

AdminiSchema.methods.comparePassword = async function(candidate){
    const isMatch = await bcrypt.compare(candidate, this.password)
    return isMatch
}





const Admini = mongoose.model('Admini', AdminiSchema)

module.exports = Admini