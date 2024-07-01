// import express from "express";

// import { newUserValidation } from "../middleware/user.validator.js";
// import UserController from "../controllers/user.controller.js";

// const userController = new UserController();

// const router = express.Router();
// router.route("/").post(newUserValidation, userController.addUser());

// export { router as addUserRouter };


import { Router } from "express";
import UserController from "../controllers/User.controller.js";
import UserValidator from "../middleware/user.validator.js";

export default class UserRoutes {
    #controller;
    #router;
    #startPoint;

    constructor(controller = new UserController(), startPoint = "/") {
        this.#controller = controller;
        this.#router = Router();
        this.#startPoint = startPoint;
        this.#initialiseRoutes();
    }

    #initialiseRoutes() {
        this.#router.post(
            "/addUser",
            UserValidator.validate(),
            this.#controller.addUser
        );

        this.#router.post(
            "/login",
            UserValidator.validate(),
            this.#controller.login
        );

        this.#router.post("/logWorkout", this.#controller.addWorkout);

        this.#router.get("/viewWorkouts", this.#controller.getWorkouts)
        

    }

    getRouter() {
        return this.#router;
    }

    getStartPoint() {
        return this.#startPoint;
    }
}