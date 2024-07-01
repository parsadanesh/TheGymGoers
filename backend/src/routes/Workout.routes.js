
import { Router } from "express";
import WorkoutController from "../controllers/Workout.controller.js";
import WorkoutValidator from "../middleware/user.validator.js";

export default class UserRoutes {
    #controller;
    #router;
    #startPoint;

    constructor(controller = new WorkoutController(), startPoint = "/") {
        this.#controller = controller;
        this.#router = Router();
        this.#startPoint = startPoint;
        this.#initialiseRoutes();
    }

    #initialiseRoutes() {


        this.#router.post("/logWorkout", WorkoutValidator.validate(), this.#controller.addWorkout);
        

    }

    getRouter() {
        return this.#router;
    }

    getStartPoint() {
        return this.#startPoint;
    }
}