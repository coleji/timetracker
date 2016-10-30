import mysql from 'mysql';
import ini from 'ini';
import fs from 'fs';

var dbCredentials = ini.parse(fs.readFileSync('./ini/private.ini', 'utf-8'));

var connection = mysql.createConnection(dbCredentials.database);

export default connection
