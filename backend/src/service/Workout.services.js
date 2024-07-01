import Workout from "../models/Workout.model.js";

export default class WorkoutService{

    addWorkout = async (newWorkout) => {
        let workout;
        try {
            workout = new Workout(newWorkout);
        } catch (e) {
            throw new Error("Invalid Details");
        }
        return await workout.save();

    }
}