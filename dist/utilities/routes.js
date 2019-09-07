"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const message_controller_1 = require("../controllers/message-controller");
const user_controller_1 = require("../controllers/user-controller");
const status_code_1 = require("./status-code");
const userService = new user_controller_1.default();
const messagService = new message_controller_1.default();
exports.routes = express.Router();
exports.routes.get("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
    res.send("chatbox api test!!!");
}));
exports.routes.get("/user/getAll", (req, res) => __awaiter(this, void 0, void 0, function* () {
    const result = yield userService.getUsers();
    res.send(result);
}));
exports.routes.post("/user/add", (req, res) => __awaiter(this, void 0, void 0, function* () {
    let result = {
        status: status_code_1.StatusCode.BAD_REQUEST,
        // tslint:disable-next-line: object-literal-sort-keys
        data: "",
        error: "username/password not populated",
    };
    if (req.body.username && req.body.password) {
        const username = req.body.username.trim();
        const password = req.body.password.trim();
        if (username.length !== 0 && password.length !== 0) {
            result = yield userService.addUser(username, password);
        }
    }
    res.send(result);
}));
exports.routes.post("/user/login", (req, res) => __awaiter(this, void 0, void 0, function* () {
    let result = {
        status: status_code_1.StatusCode.BAD_REQUEST,
        // tslint:disable-next-line: object-literal-sort-keys
        data: "",
        error: "username/password not populated",
    };
    if (req.body.username && req.body.password) {
        const username = req.body.username.trim();
        const password = req.body.password.trim();
        if (username.length !== 0 && password.length !== 0) {
            result = yield userService.loginUser(username, password);
        }
    }
    res.send(result);
}));
exports.routes.get("/message/getAll", (req, res) => __awaiter(this, void 0, void 0, function* () {
    const result = yield messagService.getMessages();
    res.send(result);
}));
exports.routes.post("/message/add", (req, res) => __awaiter(this, void 0, void 0, function* () {
    let result = {
        status: status_code_1.StatusCode.BAD_REQUEST,
        // tslint:disable-next-line: object-literal-sort-keys
        data: "",
        error: "userId not populated / message is empty",
    };
    const userId = req.body.userId.trim();
    const message = req.body.message.trim();
    if (userId && message.length > 0) {
        result = yield messagService.addMessage(userId, message);
    }
    res.send(result);
}));
//# sourceMappingURL=routes.js.map