import { expect } from "chai";
import sinon from "sinon";
import supertest from "supertest";

import Config from "../../src/config/Config.js";
import Database from "../../src/db/Database.js";
import Server from "../../src/server/Server.js";
import User from "../../src/models/user.model.js";
import UserController from "../../src/controllers/User.controller.js";
import UserRoutes from "../../src/routes/User.routes.js";
import UserService from "../../src/service/User.services.js";

import testData from "../data/sampleUsers.js"
import GymGroupController from "../../src/controllers/GymGroups.controller.js";
const { testUsers, newUser, testWorkouts }  = testData;

describe("Integration Tests", () => {
    let userServer;
    let database;
    let request;

    before(async () => {
        Config.load();
        const { PORT, HOST, DB_URI } = process.env;
        const userController = new UserController();
        const gymGroupController = new GymGroupController();
        const userRoutes = new UserRoutes(userController, gymGroupController);
        database = new Database(DB_URI);
        await database.connect();
        userServer = new Server(PORT, HOST, userRoutes);
        userServer.start();
        request = supertest(userServer.getApp());
    });

    after(async () => {
        await userServer.close();
        await database.close();
    })

    beforeEach(async () => {
        try {
            await User.deleteMany();
            console.log("Database cleared");
        } catch (e) {
            console.log(e.message);
            console.log("Error clearing");
            throw new Error();
        }
        
        try {
            await User.insertMany(testUsers);
            console.log("Database populated");
        } catch (e) {
            console.log(e.message);

        }
    });

    describe("POST requests to /addUser on UserRoutes", () => {

        it("should respond with a 200 status code for a POST request", async () => {
            const response = await request.post("/addUser").send(newUser);
            expect(response.status).to.equal(201);
        });
    });

    describe("POST requests to /login on UserRoutes", () => {

        it("should respond with a 200 status code for a POST request", async () => {

            const existingUser = testUsers[0];

            const response = await request.post("/login").send(existingUser);


            expect(response.status).to.equal(200);
        });
    });

    describe("POST requests to /addWorkout on UserRoutes", () => {
        it("should respond with a 201 status code for a POST request", async () => {
            const existingUser = testUsers[0];
            const req = {
                "existingUser": existingUser,
                "workoutDetails": testWorkouts
            }

            const response = await request.post("/logWorkout").send(req);

            expect(response.status).to.equal(201);
        });

        it("should respond with a 400 status code for a POST request with a invalid body", async () => {
            let req = null;
            const response = await request.post("/logWorkout").send(req);
            const responseMessage = JSON.parse(response.text).message;
            
            expect(response.status).to.equal(400);
            expect(responseMessage).to.equal("Invalid Details");
        });
    });

    

    describe("GET request to /viewWorkouts on UserRoutes", () => {
        it.skip("Should retrieve all of a users workouts", async () => {
            const response = await request.get("/viewWorkouts", { params: testUsers[1] });   ;
            expect(response.status).to.equal(200);
            expect(response.body.length).greaterThan(0);
        })
    })

    describe("POST req to create group", () => {
        it.only("Should create a new group with valid details", async () => {
            const tempGroup = {
                name: "test Group",
                admin: "test-email3@domain.com"
            };
            const user = { email: "test-email3@domain.com" };
            
            const response = await request.post("/createGroup").send({params: { user: user, newGroup: tempGroup } });

            expect(response.status).to.equal(201);
        })
    })
})