"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const config_1 = require("./utilities/config");
const routes_1 = require("./utilities/routes");
const app = express();
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Credentials", "false");
    if ("OPTIONS" === req.method) {
        res.sendStatus(200);
    }
    else {
        // tslint:disable-next-line: no-console
        console.log(`${req.ip} ${req.method} ${req.url}`);
        next();
    }
});
app.use(express.json());
app.use("/", routes_1.routes);
app.listen(process.env.PORT || config_1.envConfig.port, () => {
    // tslint:disable-next-line: no-console
    console.log(`api port on[${process.env.PORT || config_1.envConfig.port}]`);
});
//# sourceMappingURL=server.js.map