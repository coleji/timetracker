import { hash } from '../auth';

export default function(dbPool, session, params) {
	var { userName, password } = params;
	return new Promise((resolve, reject) => {
		let pwHash = hash(userName, password);
		console.log("checking for username " + userName + ", hash " + pwHash);
		dbPool.query(
			'select user_id, user_name from users where user_name = ? and pw_hash = ?',
			[userName.toLowerCase(), pwHash],
			function(err, results) {
				if (err) reject(err);
				else if (results.length != 1) resolve(false);
				else resolve({
					userID : results[0]["user_id"],
					userName : results[0]["user_name"]
				});
			}
		);
	});
}
