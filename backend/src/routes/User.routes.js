import { Router } from "express";
import UserController from "../controllers/User.controller.js";
import UserValidator from "../middleware/user.validator.js";
import gymGroupController from "../controllers/GymGroups.controller.js";

export default class UserRoutes {
    #userController;
    #gymGroupController;
    #router;
    #startPoint;

    constructor(userController = new UserController(), gymGroupController = new gymGroupController(), startPoint = "/") {
        this.#userController = userController;
        this.#gymGroupController = gymGroupController;
        this.#router = Router();
        this.#startPoint = startPoint; 
        this.#initialiseRoutes();
    }

    #initialiseRoutes() {
        this.#router.post(
            "/addUser",
            UserValidator.validate(),
            this.#userController.addUser
        );

        this.#router.post(
            "/login",
            UserValidator.validate(),
            this.#userController.login
        );

        this.#router.delete("/deleteExercise",
            this.#userController.deleteExercise
        );

        this.#router.post(
            "/logWorkout",
            this.#userController.addWorkout
        );

        this.#router.get(
            "/viewWorkouts",
            this.#userController.getWorkouts
        );

        this.#router.post(
            "/createGroup",
            this.#gymGroupController.createGroup
        );

        this.#router.get(
            "/getMembers",
            this.#gymGroupController.getMembers
        );

        this.#router.get(
            "/getGroups",
            this.#gymGroupController.getGroups
        );
        
        this.#router.post(
            "/joinGroup",
            this.#gymGroupController.addMember
        );
    };

    getRouter() {
        return this.#router;
    };

    getStartPoint() {
        return this.#startPoint;
    };
}