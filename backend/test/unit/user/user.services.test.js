import { expect } from "chai";
import sinon from "sinon";

import UserService from "../../../src/service/User.services.js";
import User from "../../../src/models/user.model.js";

describe("User Services Tests", () => {
    let userServices, saveStub, findOneStub;

    beforeEach(() => {
        saveStub = sinon.stub(User.prototype, 'save');
        findOneStub = sinon.stub(User, 'findOne');
        userServices = new UserService();
    })

    afterEach(() => {
        findOneStub.restore();
        saveStub.restore();
        sinon.restore();
    })

    describe("Add a new User tests", () => {
        it("Should add a user successfully", async () => {
            // Arrange
            const newUser = { email: "john@example.com", password: "fakepass" };
            const expectedUser = {
                ...newUser,
                _id: 'mockID',
                workouts: []
            };
            saveStub.resolves(expectedUser)
            // Act
            const savedUser = await userServices.addUser(newUser);
            // Assert
            expect(savedUser).to.deep.equal(expectedUser);
            expect(saveStub.calledOnce).to.be.true;

        });

        it('should throw an error with invalid details', async () => {
            const invalidUser = {}; 
            try {
                await userServices.addUser(invalidUser);
            } catch (error) {
                expect(error.message).to.equal("Invalid Details");
            }
        });

        it("should handle save method failures", async () => {
            // Arrange
            const invalidUser = { email: "jane@example.com", password: "securepass" };
            saveStub.rejects(new Error("Database error"));
            // Act & Assert

            try {
                await userServices.addUser(invalidUser);
            } catch (error) {
                expect(error.message).to.equal("Database error");
            }

        });
    })

    describe("Login services tests", () => {

        it('should successfully log in with correct credentials', async  () => {
        
        findOneStub.resolves({ email: 'test@example.com', password: 'password123' });

        const userService = new UserService();
        const result = await userService.login({ email: 'test@example.com', password: 'password123' });

        expect(result).to.have.property('email', 'test@example.com');
        expect(result).to.have.property('password', 'password123');
        });

        it('should throw an error when the email does not exist', async () => {            
            findOneStub.resolves(null);
            const userService = new UserService();
            try {
                await userService.login({ email: 'nonexistent@example.com', password: 'password123' });
                throw new Error('Expected method to reject.');
            } catch (err) {
                expect(err).to.be.an('error');
            }
        });

        it('should throw an error when the password is incorrect', async () => {
            findOneStub.resolves({ email: 'test@example.com', password: 'correctPassword' });

            const userService = new UserService();

            try {
                await userService.login({ email: 'test@example.com', password: 'wrongPassword' });
                throw new Error('Expected method to reject.');
            } catch (err) {
                expect(err).to.be.an('error');
            }
        });

    })

    describe("Add a workout Tests", () => {
        it('should add a workout to an existing user', async function () {
            findOneStub.resolves({
                email: 'existing@example.com',
                workouts: [],
                save: saveStub
            });
            saveStub.resolves();

            const userService = new UserService();
            const workoutDetails = { name: 'Bench', reps: 15, sets: 3, weight: 25 }; 
            const user = await userService.addWorkout({ email: 'existing@example.com' }, workoutDetails);

            expect(user.workouts).to.include(workoutDetails);
            sinon.assert.calledOnce(saveStub);
        });
        
        it('should throw an error when trying to add a workout to a non-existent user', async () => {
            // Simulate not finding a user
            findOneStub.resolves(null);

            const userService = new UserService();
            const workoutDetails = { name: 'Cardio', duration: 30 }; 

            try {
                await userService.addWorkout({ email: 'nonexistent@example.com' }, workoutDetails);
                throw new Error('Expected method to reject.');
            } catch (err) {
                expect(err).to.be.an('error').with.property('message', 'User not found');
            }
        });
    });

    describe("get workout service test", () => {
        it('should retrieve workouts for an existing user', async () => {
            const mockWorkouts = [{
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

            findOneStub.resolves(updateUser);

            const userService = new UserService();
            const workouts = await userService.getWorkouts(updateUser);

            expect(workouts).to.deep.equal(mockWorkouts);
        });

        it('should handle the case when the user does not exist', async () => {
            findOneStub.resolves(null);

            const userService = new UserService();
            try {
                await userService.getWorkouts('nonexistent@example.com');
            } catch (e) {
                expect(e).to.be.an('error').with.property('message', 'User not found');
            }
        });
    });

    describe("delete exercise service", () => {

        it('should delete an exercise successfully', async () => {
            // Arrange
            const mockUser = {
                workouts: [{
                    exercises: [{ _id: 'exerciseId' }]
                }],
                save: saveStub.resolves(true)
            };
            findOneStub.resolves(mockUser);

            // Act
            const result = await userServices.deleteExercise('existent@example.com', 'exerciseId');

            // Assert
            expect(findOneStub.calledOnce).to.be.true;
            expect(saveStub.calledOnce).to.be.true;
            expect(result).to.equal(true);
        });

        it('should throw an error if the exercise is not found', async () => {
            // Arrange
            const mockUser = {
                workouts: [{
                    exercises: []
                }],
                save: saveStub
            };
            findOneStub.resolves(mockUser);

            // Act & Assert
            try {
                await userServices.deleteExercise('nonexistent@example.com', 'exerciseId');
            } catch (e) {
                expect(e.message).to.equal('Exercise not found');
            }

        });


        it('should throw an error if the user is not found', async () => {
            // Arrange
            findOneStub.resolves(null);

            // Act & Assert
            try {
                await userServices.deleteExercise("nonexistent@example.com", "exerciseId");
            } catch (e) {
                expect(e.message).to.equal('User not found');
            }
        });

        it('should handle errors from User.findOne', async () => {
            // Arrange
            findOneStub.rejects(new Error("Database error"));

            // Act & Assert
            try {
                await userServices.deleteExercise("Database error", 'exerciseId');
            } catch (e) {
                expect(e.message).to.equal('User not found');
            }
        });


    });

});