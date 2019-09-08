import * as express from "express";
import { envConfig } from "./utilities/config";
import { routes } from "./utilities/routes";
const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Credentials", "false");
    if ("OPTIONS" === req.method) {
        res.sendStatus(200);
    } else {
        // tslint:disable-next-line: no-console
        console.log(`${req.ip} ${req.method} ${req.url}`);
        next();
    }
});

app.use(express.json());
app.use("/", routes);
app.listen(process.env.API_SERVER_PORT || envConfig.apiServerPort, () => {
    // tslint:disable-next-line: no-console
    console.log(`api port on[${process.env.API_SERVER_PORT || envConfig.apiServerPort}]`);
});
