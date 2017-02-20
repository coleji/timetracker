import bodyParser from 'body-parser';
import express from 'express';
import session from 'express-session';
import http from 'http';
import SocketIo from 'socket.io';

import config from '../src/config';
import router from '../src/api/router';
import { createPool } from '../src/api/mysql';
const app = express();

const server = new http.Server(app);

const io = new SocketIo(server);
io.path('/ws');

app.use(session({
	secret: 'react and redux rule!!!!',
	resave: false,
	saveUninitialized: false,
	cookie: { maxAge: 60000 }
}));

app.use(bodyParser.json());

app.use((req, res, next) => {
	req.dbPool = createPool();
	next();
});

app.use((req, res, next) => {
	if (req.method != 'OPTIONS') {
		next();
		return;
	}
	res.setHeader('Access-Control-Allow-Origin', 'http://' + config.host + ':' + config.port);
	res.setHeader('Access-Control-Allow-Credentials', 'true');
	res.setHeader('Access-Control-Allow-Headers', [
		'Content-Type',
		'Content-Length'
	].join(','));
	res.status(200).end();
});

app.use((req, res) => {
	res.setHeader('Access-Control-Allow-Origin', 'http://' + config.host + ':' + config.port);
	res.setHeader('Access-Control-Allow-Credentials', 'true');
	router(req.dbPool, req.url, req.body).then(data => {
		res.send({data : data});
	}).catch(err => {
		console.error(err);
		res.status(404).end('NOT FOUND');
	});
});

/*
const bufferSize = 100;
const messageBuffer = new Array(bufferSize);
let messageIndex = 0;
*/
if (config.apiPort) {
	/*const runnable =*/ app.listen(config.apiPort, (err) => {
		if (err) {
			console.error(err);
		}
		console.info('----\n==> 🌎  API is running on port %s', config.apiPort);
		console.info('==> 💻  Send requests to http://%s:%s', config.apiHost, config.apiPort);
	});
/*
	io.on('connection', (socket) => {
		socket.emit('news', {msg: `'Hello World!' from server`});

		socket.on('history', () => {
			for (let index = 0; index < bufferSize; index++) {
				const msgNo = (messageIndex + index) % bufferSize;
				const msg = messageBuffer[msgNo];
				if (msg) {
					socket.emit('msg', msg);
				}
			}
		});

		socket.on('msg', (data) => {
			data.id = messageIndex;
			messageBuffer[messageIndex % bufferSize] = data;
			messageIndex++;
					io.emit('msg', data);
		});
	});
	io.listen(runnable);*/
} else {
	console.error('==>     ERROR: No PORT environment variable has been specified');
}
