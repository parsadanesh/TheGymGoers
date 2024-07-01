import WorkoutService from "../service/User.services.js";

export default class WorkoutController {
    #service;

    constructor(service = new WorkoutService()) {
        this.#service = service;
    }

    addWorkout = async (req, res) => {
        const InvalidError = new Error("Invalid Details");
        try {
            if (!req.body) throw InvalidError;
            const newWorkout = await this.#service.addWorkout(req.body);
            if (!newWorkout._id) {
                throw new Error("Unable to create new workout log");
            }
            res.status(200).json(newWorkout);
        } catch (e) {
            if (e.message === InvalidError.message) {
                return res.status(400).json({ message: e.message });
            }
            return res.status(500).json({ message: e.message });
            
        }
    }



}