import md5 from 'md5';
import ini from 'ini';
import fs from 'fs';

var salt = ini.parse(fs.readFileSync('./ini/private.ini', 'utf-8')).auth.hashSalt;

const hash = (userName, password) => {
	return md5(salt.substring(0,10) + userName.toLowerCase() + salt.substring(11, 20) + password + salt.substring(21));
};

export {
	hash
};
