const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    workouts: [{date: String, duration: Number, sets: Array }],
    diets: {type: Schema.Types.Mixed, required: false},
    role: {type: String, required: false},
    gym: {type: String, required: false}
});


module.exports = mongoose.model('User', userSchema);