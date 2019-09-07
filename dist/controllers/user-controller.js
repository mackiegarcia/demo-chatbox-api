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
const typeorm_1 = require("typeorm");
const User_1 = require("../entities/User");
const config_1 = require("../utilities/config");
const status_code_1 = require("../utilities/status-code");
class UserService {
    constructor() {
        this.result = {
            status: status_code_1.StatusCode.OK,
            // tslint:disable-next-line: object-literal-sort-keys
            data: "",
            error: "",
        };
        this.dbConfig = Object.assign({}, config_1.dbConfig);
        this.dbConfig.entities = [User_1.User];
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield typeorm_1.createConnection(this.dbConfig);
        });
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield this.connect();
                console.log("con:", connection.isConnected);
                const userRepository = connection.getRepository(User_1.User);
                const users = yield userRepository.find({ select: ["id", "username"] });
                yield connection.close();
                // @ts-ignore: Unreachable code error
                this.result.data = users;
                return this.result.data;
            }
            catch (error) {
                console.log("drii:", error);
                this.result.status = status_code_1.StatusCode.BAD_REQUEST;
                this.result.error = error;
                return this.result;
            }
        });
    }
    getUserByUsername(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield this.connect();
            const userRepository = connection.getRepository(User_1.User);
            const user = yield userRepository.findOne({ username: name });
            yield connection.close();
            return user;
        });
    }
    addUser(name, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userExist = yield this.getUserByUsername(name);
                this.result.data = null;
                if (!userExist) {
                    const connection = yield this.connect();
                    const userRepository = connection.getRepository(User_1.User);
                    const user = new User_1.User();
                    user.username = name;
                    user.password = password;
                    // @ts-ignore: Unreachable code error
                    this.result.data = yield userRepository.save(user);
                    yield connection.close();
                    return this.result;
                }
                this.result.status = status_code_1.StatusCode.FORBIDDEN;
                return this.result;
            }
            catch (error) {
                this.result.status = status_code_1.StatusCode.BAD_REQUEST;
                this.result.error = error;
                return this.result;
            }
        });
    }
    loginUser(name, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userExist = yield this.getUserByUsername(name);
                this.result.data = null;
                if (userExist) {
                    if (userExist.password === password) {
                        this.result.status = status_code_1.StatusCode.OK;
                        // @ts-ignore: Unreachable code error
                        this.result.data = userExist;
                    }
                    else {
                        this.result.status = status_code_1.StatusCode.FORBIDDEN;
                        this.result.error = "password is incorrect";
                    }
                    return this.result;
                }
                this.result.status = status_code_1.StatusCode.UNAUTHORIZED;
                this.result.error = "user doesnt exists";
                return this.result;
            }
            catch (error) {
                this.result.status = status_code_1.StatusCode.BAD_REQUEST;
                this.result.error = error;
                return this.result;
            }
        });
    }
}
exports.default = UserService;
//# sourceMappingURL=user-controller.js.map