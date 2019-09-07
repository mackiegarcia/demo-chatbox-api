import { createConnection } from "typeorm";
import { Message } from "../entities/Message";
import { dbConfig } from "../utilities/config";
import { StatusCode } from "../utilities/status-code";

export default class MessageController {
    public dbConfig: any;
    public result = {
        status: StatusCode.OK,
        // tslint:disable-next-line: object-literal-sort-keys
        data: "",
        error: "",
    };
    constructor() {
        this.dbConfig = { ...dbConfig };
        this.dbConfig.entities = [ Message ];
    }

    public async connect() {
        return await createConnection(this.dbConfig);
    }

    public async getMessages() {
        try {
            const connection = await this.connect();
            const messageRepository = connection.getRepository(Message);
            const messages = await messageRepository.find();
            connection.close();
            // @ts-ignore: Unreachable code error
            this.result.data = messages;
            return this.result;
        } catch (error) {
            this.result.status = StatusCode.BAD_REQUEST;
            this.result.error = error;
            return this.result;
        }
    }

    public async addMessage(userId: number, message: string) {
        try {
            this.result.data = null;
            const connection = await this.connect();
            const messageRepository = connection.getRepository(Message);
            const msg = new Message();
            msg.userId = userId;
            msg.msg = message;
            // @ts-ignore: Unreachable code error
            this.result.data = await messageRepository.save(msg);
            connection.close();
            return this.result;
        } catch (error) {
            this.result.status = StatusCode.BAD_REQUEST;
            this.result.error = error;
            return this.result;
        }
    }
}
