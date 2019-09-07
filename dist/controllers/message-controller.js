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
const Message_1 = require("../entities/Message");
const config_1 = require("../utilities/config");
const status_code_1 = require("../utilities/status-code");
class MessageController {
    constructor() {
        this.result = {
            status: status_code_1.StatusCode.OK,
            // tslint:disable-next-line: object-literal-sort-keys
            data: "",
            error: "",
        };
        this.dbConfig = Object.assign({}, config_1.dbConfig);
        this.dbConfig.entities = [Message_1.Message];
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield typeorm_1.createConnection(this.dbConfig);
        });
    }
    getMessages() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield this.connect();
                const messageRepository = connection.getRepository(Message_1.Message);
                const messages = yield messageRepository.find();
                connection.close();
                // @ts-ignore: Unreachable code error
                this.result.data = messages;
                return this.result;
            }
            catch (error) {
                this.result.status = status_code_1.StatusCode.BAD_REQUEST;
                this.result.error = error;
                return this.result;
            }
        });
    }
    addMessage(userId, message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.result.data = null;
                const connection = yield this.connect();
                const messageRepository = connection.getRepository(Message_1.Message);
                const msg = new Message_1.Message();
                msg.userId = userId;
                msg.msg = message;
                // @ts-ignore: Unreachable code error
                this.result.data = yield messageRepository.save(msg);
                connection.close();
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
exports.default = MessageController;
//# sourceMappingURL=message-controller.js.map