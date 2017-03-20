import { hash } from '../auth';

export default function(dbPool, userName, password) {
	return new Promise((resolve/*, reject*/) => {
		let pwHash = hash(userName, password);
		console.log("checking for username " + userName + ", pw " + password + ", hash " + pwHash);
		resolve(password == "test");
		/*
		dbPool.query(
			'select 1 from users where user_name = ? and pw_hash = ?',
			[userName.toLowerCase(), pwHash],
			function(err, results) {
				console.log(results);
				if (err) reject(err);
				else resolve(results.length == 1);
			}
		);*/
	});
}
