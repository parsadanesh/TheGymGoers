import { Schema, model } from "mongoose";

// Define the Exercise schema
const exerciseSchema = new Schema({
  name: { type: String, required: false },
  reps: { type: Number, required: false },
  sets: { type: Number, required: false },
  weight: { type: Number, required: false },
  duration: { type: String, required: false },
});

// Define the Workout schema that includes an array of Exercise
const workoutSchema = new Schema({
    exercises: { type: [exerciseSchema], required: false },
    dateCreated: { type: Date, default: Date.now},
});

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    workouts: { type: [workoutSchema], default: [], required: false},

});

const User = model("User", userSchema);

export default User;