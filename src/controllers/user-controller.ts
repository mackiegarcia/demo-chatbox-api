import { createConnection } from "typeorm";
import { User } from "../entities/User";
import { dbConfig } from "../utilities/config";
import { StatusCode } from "../utilities/status-code";

export default class UserService {
    public dbConfig: any;
    public result = {
        status: StatusCode.OK,
        // tslint:disable-next-line: object-literal-sort-keys
        data: "",
        error: "",
    };
    constructor() {
        this.dbConfig = { ...dbConfig };
        this.dbConfig.entities = [ User ];
    }

    public async connect() {
        return await createConnection(this.dbConfig);
    }

    public async getUsers() {
        try {
            const connection = await this.connect();
            const userRepository = connection.getRepository(User);
            const users = await userRepository.find({ select : ["id", "username"]});
            await connection.close();
            // @ts-ignore: Unreachable code error
            this.result.data = users;
            return this.result.data;
        } catch (error) {
            this.result.status = StatusCode.BAD_REQUEST;
            this.result.error = error;
            return this.result;
        }
    }

    public async getUserByUsername(name: any) {
        const connection = await this.connect();
        const userRepository = connection.getRepository(User);
        const user = await userRepository.findOne({username: name});
        await connection.close();
        return user;
    }

    public async addUser(name: string, password: string) {
        try {
            const userExist = await this.getUserByUsername(name);
            this.result.data = null;
            if (!userExist) {
                const connection = await this.connect();
                const userRepository = connection.getRepository(User);
                const user = new User();
                user.username = name;
                user.password = password;
                // @ts-ignore: Unreachable code error
                this.result.data = await userRepository.save(user);
                await connection.close();
                return this.result;
            }
            this.result.status = StatusCode.FORBIDDEN;
            return this.result;
        } catch (error) {
            this.result.status = StatusCode.BAD_REQUEST;
            this.result.error = error;
            return this.result;
        }
    }

    public async loginUser(name: any, password: string) {
        try {
            const userExist = await this.getUserByUsername(name);
            this.result.data = null;
            if (userExist) {
                if (userExist.password === password) {
                    this.result.status = StatusCode.OK;
                    // @ts-ignore: Unreachable code error
                    this.result.data = userExist;
                } else {
                    this.result.status = StatusCode.FORBIDDEN;
                    this.result.error = "password is incorrect";
                }
                return this.result;
            }
            this.result.status = StatusCode.UNAUTHORIZED;
            this.result.error = "user doesnt exists";
            return this.result;
        } catch (error) {
            this.result.status = StatusCode.BAD_REQUEST;
            this.result.error = error;
            return this.result;
        }
    }
}
