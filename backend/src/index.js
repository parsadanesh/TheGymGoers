import Config from "./config/Config.js"
import Database from "./db/Database.js";
import Server from "./server/Server.js";
import UserController from "./controllers/User.controller.js";
import UserRoutes from "./routes/User.routes.js";


Config.load();
const { PORT, HOST, DB_URI } = process.env;

const userController = new UserController();

const userRoutes = new UserRoutes(userController);

const server = new Server(PORT, HOST, userRoutes);
const database = new Database(DB_URI);

server.start();
database.connect();

console.log(process.env);
