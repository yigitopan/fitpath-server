const HttpError = require('../models/http-error')
const User = require('../models/user-model');
const { ObjectId } = require('mongodb');
const ObjectID = require('mongodb').ObjectID

const getWorkouts = async(req, res, next) => {
    const userID = req.params.uid;
  
    if(userID !== res.locals.decodedId) {
      const error = new HttpError("You are not that guy pal.",400);
      return next(error);
    }
    
    let existingUser;
    let workouts;
  
    try {
        existingUser = await User.findOne({_id: userID});
        workouts = await existingUser.workouts
    } 
    catch (err) {
     const error = new HttpError("Something went wrong - Fetch by userId", 500);
     return next(error);
    }
  
    res.status(200).json(workouts);
  }
  
  const getWorkout = async(req, res, next) => {
    const userID = req.params.uid;
  
    if(userID !== res.locals.decodedId) {
      const error = new HttpError("You are not that guy pal.",400);
      return next(error);
    }
  
    let existingUser;
    let workout;
  
    try {
        existingUser = await User.findOne({_id: userID});
        workout = await existingUser.workouts.id(req.params.wid)
    } 
    catch (err) {
     const error = new HttpError("Something went wrong - Fetch by userId", 500);
     return next(error);
    }
  
    res.status(200).json(workout);
  }
  
  const addWorkout = async(req, res, next) => {
    const {userID, workout} = req.body;
  
    if(userID !== res.locals.decodedId) {
      const error = new HttpError("You are not that guy pal.",400);
      return next(error);
    }
  
    let existingUser;
  
    try {
      existingUser = await User.findOne({_id: userID});
      existingUser.workouts.push({ _id: new ObjectId(), date: workout.date, duration: workout.duration, sets: workout.sets });
      await existingUser.save();
      console.log(existingUser)
  } 
    catch (err) {
     const error = new HttpError("Something went wrong - Fetch by userId",500);
     return next(error);
    }
    res.status(200).json(existingUser.workouts);
  }
  
  const deleteWorkout = async(req, res, next) => {
    const {userID, workoutId} = req.body;
    let existingUser;
  
    if(userID !== res.locals.decodedId) {
      const error = new HttpError("You are not that guy pal.",400);
      return next(error);
    }
    
    try {
        existingUser = await User.findOne({_id: userID});
        existingUser.workouts.id(workoutId).remove();
        await existingUser.save();
        console.log(existingUser)
    } 
    catch (err) {
     const error = new HttpError("Something went wrong - Fetch by userId",500);
     return next(error);
    }
  
    res.status(200).json({message:"silindi"});
  }
  
  const updateWorkout = async(req, res, next) => {
    const {userID, workoutId, workout} = req.body;
    let existingUser;
  
    try {
        existingUser = await User.findOne({_id: userID});
        existingUser.workouts.id(workoutId).overwrite({date: workout.date, duration: workout.duration, sets: workout.sets })
        await existingUser.save();
        console.log(existingUser)
    } 
    catch (err) {
     const error = new HttpError("Something went wrong - Fetch by userId", 500);
     return next(error);
    }
    res.status(200).json({message:"duzenlendi"});
  }
  
  module.exports = {
    addWorkout,
    deleteWorkout,
    updateWorkout,
    getWorkout,
    getWorkouts
}