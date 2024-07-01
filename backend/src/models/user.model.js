import { Schema, model } from "mongoose";

// Define the Exercise schema
const exerciseSchema = new Schema({
  name: { type: String, required: true },
  reps: { type: String, required: false },
  sets: { type: String, required: false },
  weight: { type: String, required: false },
  duration: { type: String, required: false },
});

// Define the Workout schema that includes an array of Exercise
const workoutSchema = new Schema({
    exercises: { type: [exerciseSchema], required: true },
    dateCreated: { type: Date, default: Date.now},
});

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    workouts: { type: [workoutSchema], default: []},

});

const User = model("User", userSchema);

export default User;