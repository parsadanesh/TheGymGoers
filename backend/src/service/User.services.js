import User from "../models/user.model.js";


export default class UserService {

    async addUser(newUser) {
        let user;
        try {
            user = new User(newUser);
        } catch (e) {
            throw new Error("Invalid Details");
        }
        return await user.save();
    }

    async login({ email, password }) {
        const user = await User.findOne({ email });
        if (user && password === user.password) {
            return user;
        }
        throw new Error();
    }

    async addWorkout(existingUser, workoutDetails) {
        try {
            const user = await User.findOne({ email: existingUser.email });
            if (!user) {
                throw new Error("User not found");
            }
            user.workouts.push(workoutDetails);
            await user.save();
            return user;
        } catch (e) {
            console.log(e.message);
            throw new Error(e.message);
        }
    };

    async getWorkouts(userToFind) {
        try {
            const user = await User.findOne({ email: userToFind });
            return user.workouts;
        } catch (e) {
            console.log(e.message);
        }
    };

    deleteExercise = async (userEmail, exerciseID) => {
        try {
            const user = await User.findOne({ email: userEmail });
            if (!user) {
                throw new Error("User not found");
            }
            let exerciseDeleted = false;

            user.workouts.forEach(workout => {
                const index = workout.exercises.findIndex(exercise => exercise._id.toString() === exerciseID);
                if (index > -1) {
                    workout.exercises.splice(index, 1);
                    exerciseDeleted = true;
                }
            });
            if (!exerciseDeleted) {
                throw new Error("Exercise not found");
            };
            return await user.save();
        } catch (e) {
            console.log(e.message);
        }
    };
}