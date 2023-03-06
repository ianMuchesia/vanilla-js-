const Admini = require("../models/Admini");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
  const admini = await Admini.create({ ...req.body });
  const token = admini.createJWT()
  res.status(StatusCodes.CREATED).json({admini:{name:admini.name}, token });
};

const login = async (req, res) => {
    const {email, password } = req.body
    if(!email || !password ){
        throw new BadRequestError('please provide email and password')
    }
   
   const admini = await Admini.findOne({email})
    if(!admini){
        throw new UnauthenticatedError('invalid credentials')
    }
    const isPaswordCorrect = await admini.comparePassword(password)
 
    if(!isPaswordCorrect){
        throw new UnauthenticatedError('invalid credentials')
    }
 
    const token = admini.createJWT();
   
     
    res.status(StatusCodes.OK).json({
        admini:{name:admini.name},
        token,
    })

};

module.exports = {
  register,
  login,
};
