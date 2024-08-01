import { expect } from "chai";
import sinon from "sinon";
import UserController from "../../../src/controllers/User.controller.js";
import UserService from "../../../src/service/User.services.js";
import { body } from "express-validator";

describe("UserController", () => {
    let userController;
    let userServices;
    let req;
    let res;

    beforeEach(() => {
        req = {
            body: { email: 'testUser@email.com', password: 'testPass' },
            query: {}
        };

        res = {
            json: sinon.spy(),
            status: sinon.stub().returnsThis(),
            send: sinon.spy(),
        };

        userServices = {
            addUser: sinon.stub(),
            login: sinon.stub(),
            addWorkout: sinon.stub(),
            getWorkouts: sinon.stub(),
            deleteExercise: sinon.stub()
        };
        userController = new UserController(userServices)

    })


    describe("add a new user", () => {

        it("should add a new user", async () => {
            // Arrange
            const newUser = {
                _id: "1",
                email: "test-email@domain.com",
                password: "testpass1"
            };
            userServices.addUser.resolves(newUser);
            // Act
            await userController.addUser(req, res);
            // Assert
            expect(res.status.calledWith(201)).to.be.true;
            expect(res.json.calledWith(newUser)).to.be.true;
        });


        it("should send a 500 response if addUser returns a user without an id", async () => {
            // Arrange
            const newUser = { email: "test-email@domain.com", password: "testpass1"};
            userServices.addUser.resolves(newUser);
            // Act
            await userController.addUser(req, res);
            // Assert
            expect(res.status.calledWith(500)).to.be.true;
            expect(
                res.json.calledWith({
                    message: "Unable to create account",
                })
            ).to.be.true;
        });
        
        it("should send a 400 response if req.body is null", async () => {
            // Arrange
            req.body = null;

            // Act
            await userController.addUser(req, res);

            // Assert
            expect(res.status.calledWith(400)).to.be.true;
            expect(res.json.calledWith({ message: "Invalid Details" })).to.be.true;
        });


    });

    describe("login a user", () => {

        it("should login a user with valid details", async () => {
            // Arrange
            const mockUser = {
                _id: "1",
                email: "testUser@email.com",
                password: "testPass"
            };
            userServices.login.resolves(mockUser);
            // Act
            await userController.login(req, res);
            // Assert
            expect(res.status.calledWith(200)).to.be.true;
            // expect(res.status.calledWith(200)).to.be.true;
            // expect(res.json.calledWith(existingUser)).to.be.true;
        });

        it("should not login a user with invalid details", async () => {
            // Arrange
            const req = { body: { email: "invalidUser@email.com", password: "wrongPass" } };
            const res = {
                status: sinon.stub().returnsThis(),
                send: sinon.stub()
            };
            userServices.login.rejects(new Error("Invalid login details")); // Simulate service rejecting the login attempt

            // Act
            await userController.login(req, res);

            // Assert
            expect(res.status.calledWith(400)).to.be.true;
            expect(res.send.calledWithMatch({ message: "Unable to login with these details" })).to.be.true;
        });

    });

    describe("Add a workout as a user", () => {
        let existingUser = { 
            email: 'testUser@email.com', password: 'testPass' ,
        };
        
        const testWorkout = {
            exercises: [{
                name: "Squat",
                reps: 10,
                sets: 3,
                weight: 60
            }, {
                name: "Bench",
                reps: 10,
                sets: 4,
                weight: 50
            }]
        };
        


        it("should add a workout to a user", async () => {
            // Arrange
            const updateUser = {
                _id: 1,
                email: 'testUser@email.com',
                password: 'testPass',
                workouts: [{
                    exercises: [{
                        name: "Squat",
                        reps: 10,
                        sets: 3,
                        weight: 60
                    }, {
                        name: "Bench",
                        reps: 10,
                        sets: 4,
                        weight: 50
                    }
                    ]

                }]
            }

            let mockReq = {
                body: { existingUser: existingUser, workoutDetails: testWorkout }  
        };
            userServices.addWorkout.resolves(updateUser);
            // Act
            await userController.addWorkout(mockReq, res);
            // Assert
            expect(res.status.calledWith(201)).to.be.true;
            expect(
                res.json.calledWith(updateUser)
        ).to.be.true;
        });
    });

    it("should not an incomplete workout to a user", async () => {
        let existingUser = { 
                email: 'testUser@email.com', password: 'testPass' ,
        };
        // Arrange
        const updateUser = {
            _id: 1,
            email: 'testUser@email.com',
            password: 'testPass',
            workouts: []
        }

        const incompleteWorkout = {
            exercises: [{
                name: "Squat",
                sets: 3,
                weight: 60
            }]
        };

        let mockReq = {
            body: { existingUser: existingUser, workoutDetails: incompleteWorkout }  
    };

        userServices.addWorkout.resolves(updateUser);
        // Act
        await userController.addWorkout(mockReq, res);
        // Assert
        expect(
            res.json.calledWith({
                message: "Unable to add the workout",
            })
        ).to.be.true;


    });


    it("should return 400 if body is null", async () => {
        // Arrange
        let mockReq = { body: null };
        // Act
        await userController.addWorkout(mockReq, res);
        // Assert
        expect(res.status.calledWith(400)).to.be.true;
        expect(
            res.json.calledWith({
                message: "Invalid Details",
            })
        ).to.be.true;
    });

    it("should return 400 if body is empty", async () => {
        // Arrange
        let mockReq = { body: {} };
        // Act
        await userController.addWorkout(mockReq, res);
        // Assert
        expect(res.status.calledWith(400)).to.be.true;
        expect(
            res.json.calledWith({
                message: "Invalid Details",
            })
        ).to.be.true;
            
    });

    describe("get workout controller tests", () => {
        it("should successfully retrieve workouts", async () => {
            // Arrange
            req.query.email = "user@example.com";
            const mockWorkouts = [{ id: 1, name: "Workout 1" }];
            userServices.getWorkouts.resolves(mockWorkouts);

            // Act
            await userController.getWorkouts(req, res);

            // Assert
            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith(mockWorkouts)).to.be.true;
        });

        it("should return 200 with an empty array when no workouts are found", async () => {
            // Arrange
            req.query.email = "user@example.com";
            userServices.getWorkouts.resolves([]);

            // Act
            await userController.getWorkouts(req, res);

            // Assert
            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith([])).to.be.true;
        });

        it("should handle errors thrown by the service", async () => {
            // Arrange
            req.query.email = "user@example.com";
            userServices.getWorkouts.rejects(new Error("Service error"));

            // Act
            await userController.getWorkouts(req, res);

            // Assert
            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWithMatch({ message: "Service error" })).to.be.true;
        });
    });

    describe("delete exercise controller", () => {
        const mockUpdatedUser = {
            email: "user@example.com",
            workouts: [
                {
                    exercises: [
                        {
                            name: "Incline DB Chest Press",
                            reps: 2,
                            sets: 2,
                            weight: 25,
                            duration: "30s",
                            _id: "6685d142697809a09a6e4437"
                        },
                        {
                            name: "Incline Barbell Chest Press",
                            reps: 2,
                            sets: 2,
                            weight: 25,
                            duration: "45s",
                            _id: "6685d142697809a09a6e4438"
                        }
                    ],
                    _id: "6685d142697809a09a6e4436",
                    dateCreated: new Date("2024-07-03T22:31:30.225Z")
                }
            ]
        };
        it("should successfully delete an exercise", async () => {
            // Arrange
            req.query.email = "user@example.com";
            req.query.exercise_id = "exercise123";
            userServices.deleteExercise.resolves(mockUpdatedUser);

            // Act
            await userController.deleteExercise(req, res);

            // Assert
            expect(res.status.calledWith(201)).to.be.true;
            expect(res.json.calledWith(mockUpdatedUser)).to.be.true;
        });

        it("should return 400 for invalid query parameters", async () => {
            // Arrange
            req.query = {}; // No query parameters

            // Act
            await userController.deleteExercise(req, res);

            // Assert
            expect(res.status.calledWith(400)).to.be.true;
            expect(res.json.calledWithMatch({ message: "Invalid Details" })).to.be.true;
        });

        it("should return 500 when deletion fails", async () => {
            // Arrange
            req.query.email = "user@example.com";
            req.query.exercise_id = "nonexistentExercise";
            userServices.deleteExercise.rejects(new Error("Could not add workout"));

            // Act
            await userController.deleteExercise(req, res);

            // Assert
            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWithMatch({ message: "Unable to add the workout" })).to.be.true;
        });

        it("should handle errors thrown by the service", async () => {
            // Arrange
            req.query.email = "user@example.com";
            req.query.exercise_id = "exercise123";
            userServices.deleteExercise.rejects(new Error("Service error"));

            // Act
            await userController.deleteExercise(req, res);

            // Assert
            expect(res.status.calledWith(500)).to.be.true;

        });
        
    });
    
    
});