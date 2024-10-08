import UserService from "../service/User.services.js";

export default class UserController {
    #service;

    constructor(service = new UserService()) {
        this.#service = service;
    }

    addUser = async (req, res) => {
        const InvalidError = new Error("Invalid Details");
        try {
            if (!req.body) throw InvalidError;
            const newUser = await this.#service.addUser(req.body);
            if (!newUser._id) {
                throw new Error("Unable to create account");
            };
            res.status(201).json(newUser);
        } catch (e) {
            if (e.message === InvalidError.message) {
                return res.status(400).json({ message: e.message });
            }
            return res.status(500).json({ message: e.message });
        }
    }

    login = async (req, res) => {
        try {
            const user = await this.#service.login(req.body);
            res.status(200).send({ message: `Login Success`, user });
        } catch (e) {
            res.status(400).send({
                message: `Unable to login with these details`,
                user: req.body,
            });
        }
    }

    // Takes the the array of exercises and creates, saves and returns a workout model. 
    addWorkout = async (req, res) => {
        const InvalidError = new Error("Invalid Details");
        try {
            if (req.body === null || !(Object.keys(req.body).length > 0)) throw InvalidError;
            const updatedUser = await this.#service.addWorkout(req.body.existingUser, req.body.workoutDetails);
            if (!updatedUser || !(updatedUser.workouts.length > 0)) {
                throw Error("Could not add workout")
            };
            res.status(201).json(updatedUser);
        } catch (e) {
            if (e.message === InvalidError.message) {
                return res.status(400).json({ message: e.message });
            }
            res.status(500).json({
                message: `Unable to add the workout`
            });
        }
    }

    getWorkouts = async (req, res) => {
        try {
            const email = req.query.email;
            const workouts = await this.#service.getWorkouts(email);
            res.status(200).json(workouts);
        } catch (e) {
            res.status(500).json({message: e.message })
        }
    }

    deleteExercise = async (req, res) => {
        const InvalidError = new Error("Invalid Details");
        console.log(req.query.exercise_id);
        try {
            if (req.query === null || !(Object.keys(req.query).length > 0)) throw InvalidError;
            const updatedUser = await this.#service.deleteExercise(req.query.email, req.query.exercise_id);
            if (!updatedUser || !(updatedUser.workouts.length > 0)) {
                throw Error("Could not add workout")
            };
            res.status(201).json(updatedUser);
        } catch (e) {
            if (e.message === InvalidError.message) {
                return res.status(400).json({ message: e.message });
            };
            res.status(500).json({
                message: `Unable to add the workout`
            });
        }
    }
}