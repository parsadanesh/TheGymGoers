import User from "../models/User.model.js";


export default class UserService {

    async getSaved() {
        // return "getting from controller";   
        return await User.find({});
    }


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

    // workoutDetails is an array of exercises
    async addWorkout(existingUser, workoutDetails) {

        try {

          

            const user = await User.findOne({ email: existingUser.email });

            

            if (!user) {
                throw new Error("User not found");
            }

            user.workouts.push(workoutDetails);

            // console.log(user);

            await user.save();

            return user;
        
        } catch (e) {
            console.log(e.message);
            throw new Error(e.message);

        
        }
        
    }

    async getWorkouts(userToFind) {
        try {
            const user = await User.findOne({ email: userToFind });
            // console.log(user.workouts);
        
            return user.workouts;
        } catch (e) {
            console.log(e.message);
        }
    }
}