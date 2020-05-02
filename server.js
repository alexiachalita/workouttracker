const express = require('express');
require('dotenv').config();
const Workout = require('./models/workout');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


mongoose.connect(process.env.DB_URI,  { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true 
 })
 .then(()=> console.log("MongoDB connected..."))
 .catch(err => console.error(err));

const PORT = process.env.PORT || 3000; 


const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/test', (req, res)=> {
    res.send("<h1>HEllo from the backend!!</h1>");
});

app.get("/api/workouts", (req, res)=> {
    Workout.find({})
        .then(workoutList => res.status(200).send(workoutList))
        .catch(err => res.status(400).send({err}));
});

app.get("/api/workouts/range", (req, res)=> {
    Workout.find({})
        .then(workoutList => res.status(200).send(workoutList))
        .catch(err => res.status(400).send({err}));
});

app.post("/api/workouts", (req, res)=> {
    const body = req.body;
    const workout = new Workout(body);
    workout.save()
        .then(workout => res.status(200).send(workout))
        .catch(err => res.status(400).send({err}));
});

app.put("/api/workouts/:id", (req, res)=> {
    const id = req.params.id;
    if (id === null) {
        res.status(400).send({msg:"Did not provide a workout id"});
    }
    console.log(req.body);
    const exercise = req.body;
    Workout.findByIdAndUpdate(id,{ $push: { "exercises" : exercise } } , {new:true})
        .then(updatedWorkout => res.status(200).send(updatedWorkout))
        .catch(err => res.status(400).send(err));
});

app.listen(PORT, ()=> {
    console.log(`Server is running on port: ${PORT}`);
});