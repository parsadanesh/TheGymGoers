import { Schema, model } from "mongoose";

const exerciseSchema = new Schema({
    name: { type: String, required: true },
    reps: { type: String, required: false },
    sets: { type: String, required: false },
    weight: { type: String, required: false },
    duration: { type: String, required: false },
})

const workoutSchema = new Schema({
    exercises: [exerciseSchema]

});

const Workout = model("Workout", workoutSchema);

export default Workout;