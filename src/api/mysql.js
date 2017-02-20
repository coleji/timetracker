import mysql from 'mysql';
import ini from 'ini';
import fs from 'fs';

const dbCredentials = ini.parse(fs.readFileSync('./ini/private.ini', 'utf-8'));

const dbOptions = Object.assign({}, dbCredentials.database, {
	supportBigNumbers : true
});

const createPool = () => {
	return mysql.createPool(Object.assign({}, dbOptions, {
		connectionLimit: 5
	}));
};

const createConnection = () => {
	return mysql.createConnection(dbOptions);
};

export {
	createPool,
	createConnection
};
