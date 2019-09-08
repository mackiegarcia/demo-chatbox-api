import * as express from 'express';
import { environment } from '../src/environments/environment';
import { routes } from './routes';
import * as http from 'http';
import * as sio from 'socket.io';

const app = express();
const server = new http.Server(app);
const io = sio(server);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Credentials', 'false');
    if ('OPTIONS' === req.method) {
        res.sendStatus(200);
    } else {
        console.log(`${req.ip} ${req.method} ${req.url}`);
        next();
    }
});

app.use(express.json());
app.use('/', routes);

io.on('connection', (socket) => {
    socket.on('chat_message', (msg) => {
        io.emit('chat_message', msg);
    });
});

server.listen(process.env.PORT || envConfig.apiServerPort, () => {
    console.log(`api-service port on[${environment.apiServerPort}]`);
});