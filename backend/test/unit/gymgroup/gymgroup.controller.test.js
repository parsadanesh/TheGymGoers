import { expect } from "chai";
import sinon from "sinon";
import GymGroupController from "../../../src/controllers/GymGroups.controller.js";

describe("GymGroup Controller", () => {
    let gymGroupController;
    let gymGroupServices;
    let req;
    let res;

    beforeEach(() => {

        gymGroupServices = {
            createGroup: sinon.stub(),
            addMember: sinon.stub(),
            getGroups: sinon.stub(),
            getMembers: sinon.stub()
        };
        
        req = {
            body: {
                params: {
                    name: 'New Gym Group',
                    members: []
                }
            }
        };

        res = {
            json: sinon.spy(),
            status: sinon.stub().returnsThis(),
        };
        
        gymGroupController = new GymGroupController(gymGroupServices)

    });

    afterEach(() => {
        sinon.restore();
    });

    describe("GymGroup Controller - createGroup", () => {
        
        it("should create a new gym group successfully with at least one member", async () => {
            // Arrange
            const mockGroup = { _id: "123", name: "New Gym Group", admin: "user1", members: ["user1"] };
            gymGroupServices.createGroup.resolves(mockGroup);
            req.body.params = { user: "user1", newGroup: "New Gym Group" };

            // Act
            const result = await gymGroupController.createGroup(req, res);

            // Assert
            expect(gymGroupServices.createGroup.calledOnce).to.be.true;
            expect(res.status.calledWith(201)).to.be.true;
            expect(res.json.calledWith(mockGroup)).to.be.true;
        });

        it("should return a 400 status if the request body is invalid", async () => {
            // Arrange
            req.body = null; 
            // Act
            const result = await gymGroupController.createGroup(req, res);
            // Assert
            expect(res.status.calledWith(400)).to.be.true;
            expect(res.json.calledWith({ message: "Invalid Details" })).to.be.true;
        });

        it("should return a 500 status if unable to create the gym group", async () => {
            // Arrange
            gymGroupServices.createGroup.rejects(new Error("unable to create the GymGroup"));
            req.body.params = { user: "user1", newGroup: "New Gym Group" };

            // Act
            await gymGroupController.createGroup(req, res);

            // Arrange
            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWith({ message: "unable to create the GymGroup" })).to.be.true;
        });

        it("should return a 500 status if newGroup._id is not present", async () => {
            // Arrange
            gymGroupServices.createGroup.resolves({}); 
            req.body = { user: "user1", newGroup: "New Gym Group" };

            // Act
            await gymGroupController.createGroup(req, res);

            // Assert
            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWith({ message: "unable to create the GymGroup" })).to.be.true;
        });
    });

    describe("addMember function", () => {

        it("should return a 400 status if req.body is not present", async () => {
            // Arrange
            req.body = null;
            // Act
            await gymGroupController.addMember(req, res);

            // Assert
            expect(res.status.calledWith(400)).to.be.true;
            expect(res.json.calledWith({ message: "Invalid Details" })).to.be.true;
        });

        it("should return a 500 status if updatedGroup is not present", async () => {
            // Arrange
            req.body = { params: "some params" };
            gymGroupServices.addMember.resolves(null);

            // Act
            await gymGroupController.addMember(req, res);

            // Assert
            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWith({ message: "Unable to add new user to the GymGroup" })).to.be.true;
        });


        it("should return a 201 status with updatedGroup if successful", async () => {
            // Arrange
            const updatedGroup = { id: "123", name: "New Member Added" };
            req.body = { params: "some params" };
            gymGroupServices.addMember.resolves(updatedGroup);

            // Act
            await gymGroupController.addMember(req, res);

            // Assert
            expect(res.status.calledWith(201)).to.be.true;
            expect(res.json.calledWith(updatedGroup)).to.be.true;
        });
    });


    describe("getGroups function", () => { 
        it("should return a 200 status with gymGroups if successful", async () => {
            // Arrange
            req = {
            query: {
                email: "user@example.com"
            }
        };
            const gymGroups = [{ id: "1", name: "Group 1" }, { id: "2", name: "Group 2" }];
            gymGroupServices.getGroups.resolves(gymGroups);

            // Act
            await gymGroupController.getGroups(req, res);

            // Assert
            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith(gymGroups)).to.be.true;
        });

        it("should return a 500 status with an error message if an exception occurs", async () => {
            // Arrange
            const errorMessage = "An error occurred";
            gymGroupServices.getGroups.rejects(new Error(errorMessage));

            // Act
            await gymGroupController.getGroups(req, res);

            // Assert
            expect(res.status.calledWith(500)).to.be.true;
        });
    });
    
    describe("getMembers function", () => { 
        
        
        it("should return a 200 status with groupMembers if successful", async () => {
            // Arrange
            req = {
                query: {
                    groupName: "Fitness Group"
                }
            };
            const groupMembers = [{ id: "1", name: "John Doe" }, { id: "2", name: "Jane Doe" }];
            gymGroupServices.getMembers.resolves(groupMembers);

            // Act
            await gymGroupController.getMembers(req, res);

            // Assert
            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith(groupMembers)).to.be.true;
        });

        it("should return a 200 status with groupMembers if successful", async () => {
            // Arrange
            req = {
                query: {
                    groupName: "Fitness Group"
                }
            };
            const groupMembers = [{ id: "1", name: "John Doe" }, { id: "2", name: "Jane Doe" }];
            gymGroupServices.getMembers.resolves(groupMembers);

            // Act
            await gymGroupController.getMembers(req, res);

            // Assert
            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith(groupMembers)).to.be.true;
        });

        it("should return a 500 status with 'Invalid Details' message if groupName is not provided", async () => {
            // Arrange
            req = {
                query: {
                    groupName: "Fitness Group"
                }
            };
            req.query.groupName = null;

            // Act
            await gymGroupController.getMembers(req, res);

            // Assert
            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWith({ message: "Invalid Details" })).to.be.true;
        });

        it("should return a 500 status with 'Could not find members' message if no members found", async () => {
            // Arrange
            req = {
                query: {
                    groupName: "Fitness Group"
                }
            };
            gymGroupServices.getMembers.resolves(null);

            // Act
            await gymGroupController.getMembers(req, res);

            // Assert
            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWith({ message: "Could not find members" })).to.be.true;
        });

    });



});