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
            getWorkouts: sinon.stub()
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
    
    
});
    

    
