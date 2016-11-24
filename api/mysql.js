import mysql from 'mysql';
import ini from 'ini';
import fs from 'fs';

var dbCredentials = ini.parse(fs.readFileSync('./ini/private.ini', 'utf-8'));

var dbOptions = Object.assign({}, dbCredentials.database, {
	supportBigNumbers : true
});

var connection = mysql.createConnection(dbOptions);

export default connection;
