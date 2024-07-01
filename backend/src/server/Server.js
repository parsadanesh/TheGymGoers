import express from "express";
import cors from "cors";

export default class Server {
    #app;
    #host;
    #port;
    #router;
    #server;

    constructor(port, host, router) {
        this.#app = express();
        this.#port = port;
        this.#host = host;
        this.#server = null;
        this.#router = router;
        this.configureMiddleware();
    }

    configureMiddleware() {
        const corsOptions = {
            origin: 'http://localhost:5173',
            optionSuccessStatus: 200
        };
        this.#app.use(cors(corsOptions));
        this.#app.use(express.json());

    }

    getApp = () => {
        return this.#app;
    };

    start() {
        this.#server = this.#app.listen(this.#port, this.#host, () => {
            console.log(`Server is listening on http://${this.#host}:${this.#port}`);
        });

        this.#app.use(this.#router.getStartPoint(), this.#router.getRouter());
    }

    close() {
        this.#server?.close();
    }
    
}