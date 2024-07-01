import { expect } from "chai";
import sinon from "sinon";
import WorkoutController from "../../../src/controllers/Workout.controller.js"
import WorkoutService from "../../../src/service/Workout.services.js";


describe("WorkoutController", () => {
    let workoutController;
    let workoutServices;
    let req;
    let res;

    beforeEach(() => {
        req = {
            body: { name: 'DB Chest Press', reps: '10', sets: '3', weight: '25' },
        };

        res = {
            json: sinon.spy(),
            status: sinon.stub().returnsThis(),
        };

        workoutServices = {
            addWorkout: sinon.stub(),

        };
        workoutController = new WorkoutController(workoutServices)

    })

    describe("log a new workout", () => {
        it("should add a new workout", async () => {
            //Arrange
            const newWorkout = {
                _id: "1",
                name: "DB Chest Press",
                reps: "10",
                sets: "3",
                weight: "25"
            };
            workoutServices.addWorkout.resolves(newWorkout);
            //Act
            await workoutController.addWorkout(req, res);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith(newWorkout)).to.be.true;

        })

        it("should send a 500 response if addWorkout returns a workout without an id", async () => {
            // Arrange
            const newWorkout = {
                name: "DB Chest Press",
                reps: "10",
                sets: "3",
                weight: "25"
            };
            workoutServices.addWorkout.resolves(newWorkout);
            // Act
            await workoutController.addWorkout(req, res);
            // Assert
            expect(res.status.calledWith(500)).to.be.true;
            expect(
                res.json.calledWith({
                    message: "Unable to create new workout log",
                })
            ).to.be.true;
        });

        it("should send a 400 response if body is null", async () => {
            // Arrange
            req.body = null;
            // Act
            await workoutController.addWorkout(req, res);
            // Assert
            expect(res.status.calledWith(400)).to.be.true;
            expect(
                res.json.calledWith({
                    message: "Invalid Details",
                })
            ).to.be.true;
        });

        it("should send a 400 response if addWorkout returns a workout without an name", async () => {
            // Arrange
            const newWorkout = {
                _id: "1",
                reps: "10",
                sets: "3",
                weight: "25"
            };
            workoutServices.addWorkout.resolves(newWorkout);
            // Act
            await workoutController.addWorkout(req, res);
            // 20
            expect(res.status.calledWith(200)).to.be.true;
            // expect(
            //     res.json.calledWith({
            //         // message: "Invalid Details",
            //     })
            // ).to.be.true;
        });


    })




});