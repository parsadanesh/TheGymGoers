// import { expect } from "chai";
// import sinon from "sinon";
// import supertest from "supertest";

// import Config from "../../src/config/Config.js";
// import Database from "../../src/db/Database.js";
// import Server from "../../src/server/Server.js";
// import User from "../../src/models/User.model.js";
// import UserController from "../../src/controllers/User.controller.js";
// import UserRoutes from "../../src/routes/User.routes.js";
// import UserService from "../../src/service/User.services.js";



// describe("Integration Tests", () => {
//     let userServer;
//     let database;
//     let request;

//     before(async () => {
//         Config.load();
//         const { PORT, HOST, DB_URI } = process.env;
//         const userController = new UserController();
//         const userRoutes = new UserRoutes(userController);
//         database = new Database(DB_URI);
//         await database.connect();
//         userServer = new Server(PORT, HOST, userRoutes);
//         userServer.start();
//         request = supertest(userServer.getApp());
//     });

//     workouts: [{ type: Schema.Types.ObjectId, ref: 'Workout', required: false }]
    
//     after(async () => {
//         await userServer.close();
//         await database.close();
//     })

//     beforeEach(async () => {

//         try {
//             await User.deleteMany();
//             console.log("Database cleared");
//         } catch (e) {
//             console.log(e.message);
//             console.log("Error clearing");
//             throw new Error();
//         }
        
//         try {
//             await User.insertMany(testUsers);
//             console.log("Database populated");
//         } catch (e) {
//             console.log(e.message);

//         }
//     });
// });


