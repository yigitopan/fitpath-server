const HttpError = require('../models/http-error')
const { v4: uuidv4 } = require('uuid');
const {validationResult} = require('express-validator')
const User = require('../models/user-model');
const bcryptjs = require('bcryptjs');
const JWT = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
const ObjectID = require('mongodb').ObjectID

const signup = async(req, res, next) => {
    const errors = validationResult((req));

    if(!errors.isEmpty()){
      throw new HttpError('Invalid inputs passed',422)
    }
        
    let existingUser;

    const {name, surname, email, password} = req.body;
    try {
        existingUser = await User.find({email: email});
    } 
    catch (err) {
     const error = new HttpError("Something went wrong - Fetch by userId",500);
     return next(error);
    }

    
    if(existingUser.length !==0){
     const error = new HttpError("Email already in use",400);
     return next(error); 
    }

    let hashedPassword;
    
    try {
        hashedPassword = await bcryptjs.hash(password,12);
    } catch (err) {
        const error = new HttpError("Bcryption Error",400);
        return next(error); 
    }

    const createdUser = new User({
        name,
        surname,
        email,
        password:hashedPassword,
        workouts:[]
      })

      try {
        await createdUser.save();
      } 
      catch (error) {
        const err = new HttpError('Creating user failed.', 500);    
        return next(err);
      }

      let token;
      try {
        token = JWT.sign({userId: createdUser._id.toString()},"bebelak");
      }    
       catch (error) {
        const err = new HttpError('Creating user failed. - JWT', 500);    
        return next(err);
      }
      res.status(201).json({userId:createdUser._id.toString(), token:token});
}

const login = async (req, res, next) => {
    const {email, password} = req.body;
    let existingUser;

    try {
        existingUser = await User.findOne({email: email});
    } 
    catch (err) {
     const error = new HttpError("Something went wrong - Fetch by userId",500);
     return next(error);
    }

    if(!existingUser) {
        const error = new HttpError("Kullanıcı bulunamadı.",400);
        return next(error);
    }
    
    let isValidPass = false;
    isValidPass = await bcryptjs.compare(password,existingUser.password)

    if(isValidPass) {
        console.log(existingUser._id);
    }
    else {
        const error = new HttpError("Şifreniz yanlış.",400);
        return next(error); 
    }

    let token;
    try {
        token = JWT.sign({userId: existingUser._id.toString(), email: existingUser.email} ,"bebelak",{expiresIn:60*100});
    }    
     catch (error) {
      const err = new HttpError('Creating user failed. - JWT', 500);    
      return next(err);
    }

    res.status(200).json({token:token});
}

const myAcc = (req, res, next) => {
  
}


module.exports = {
    signup,
    login,
    myAcc
}