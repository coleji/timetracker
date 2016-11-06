import db from '../mysql.js';

export default function(punchID) {
	return new Promise((resolve, reject) => {
		db.query(
			'delete from punches where punch_id = ?',[
				punchID
			],
		function(err) {
			if (err) reject(err);
			else resolve();
		});
	});
}
