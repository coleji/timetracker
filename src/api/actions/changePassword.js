import { hash } from '../auth';

export default function(dbPool, session, params) {
	var { /*oldPw, */newPw, userName } = params;
	return new Promise((resolve, reject) => {
		let pwHash = hash(userName, newPw);
		console.log("used new password " + newPw);
		dbPool.query(
			'update users set pw_hash = ? where user_name = ?',[
				pwHash,
				userName
			],
		function(err) {
			if (err) reject(err);
			else resolve();
		});
	});
}
