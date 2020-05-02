const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const WorkoutSchema = new Schema({
    day : {
        type: Date,
        default: Date.now
    },
    totalDuration : {
        type: Number
    },
    exercises : {
        type: Array
    }

});

const Workout = mongoose.model("workout", WorkoutSchema);

module.exports = Workout;