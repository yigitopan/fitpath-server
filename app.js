const express = require('express');
const bodyParser = require('body-parser');
const usersRoutes = require('./routes/users-routes');
const workoutRoutes = require('./routes/workouts-routes');
const HttpError = require('./models/http-error');
const mongoose = require('mongoose');
var cors = require('cors')
const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use('/api/users', usersRoutes);

app.use('/api/workouts', workoutRoutes);   // => /api/users.... 

// app.use((req, res, next) => {
//   const error = new HttpError("Couldn't find this route", 404);
//   throw error;
// })

// app.use((error, req, res, next) => {
//   if (res.headerSent) {
//     return next(error);
//   }
//   res.status(error.code || 500)
//   res.json({message: error.message || 'An unknown error occurred!'});
// });

mongoose
  .connect('mongodb+srv://opan:yian2499@opancluster.q3gwb.mongodb.net/fitpath?retryWrites=true&w=majority')
  .then(() => {
    app.listen( process.env.PORT || 5000 );
    console.log("Connected to DB");
  })
  .catch(err => {
    console.log(err)
    throw new HttpError("Couldn't connect to DB",404);
  });
