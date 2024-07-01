import { expect } from "chai";
import sinon from "sinon";
import UserController from "../../../src/controllers/User.controller.js";
import UserService from "../../../src/service/User.services.js";

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
        };
        userController = new UserController(userServices)

    })


    describe.skip("add a new user", () => {

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

    describe.skip("login a user", () => {

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

    
});