import * as express from "express";
import MessageController from "../controllers/message-controller";
import UserController from "../controllers/user-controller";
import { StatusCode } from "./status-code";
const userService = new UserController();
const messagService = new MessageController();
export const routes = express.Router();

routes.get("/", async (req, res) => {
    res.send("chatbox api test!!!V2");
});

routes.get("/user/getAll", async (req, res) => {
    const result = await userService.getUsers();
    res.send(result);
});

routes.post("/user/add", async (req, res) => {
    let result = {
        status: StatusCode.BAD_REQUEST,
        // tslint:disable-next-line: object-literal-sort-keys
        data: "",
        error: "username/password not populated",
    };
    if (req.body.username &&  req.body.password) {
        const username = req.body.username.trim();
        const password = req.body.password.trim();
        if (username.length !== 0 &&  password.length !== 0) {
            result = await userService.addUser(username, password);
        }
    }
    res.send(result);
});

routes.post("/user/login", async (req, res) => {
    let result = {
        status: StatusCode.BAD_REQUEST,
        // tslint:disable-next-line: object-literal-sort-keys
        data: "",
        error: "username/password not populated",
    };
    if (req.body.username &&  req.body.password) {
        const username = req.body.username.trim();
        const password = req.body.password.trim();
        if (username.length !== 0 &&  password.length !== 0) {
            result = await userService.loginUser(username, password);
        }
    }
    res.send(result);
});

routes.get("/message/getAll", async (req, res) => {
    const result = await messagService.getMessages();
    res.send(result);
});

routes.post("/message/add", async (req, res) => {
    let result = {
        status: StatusCode.BAD_REQUEST,
        // tslint:disable-next-line: object-literal-sort-keys
        data: "",
        error: "userId not populated / message is empty",
    };
    const userId = req.body.userId.trim();
    const message = req.body.message.trim();

    if (userId && message.length > 0) {
        result = await messagService.addMessage(userId, message);
    }
    res.send(result);
});
