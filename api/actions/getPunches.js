import db from '../mysql.js'

export default function() {
	return new Promise((resolve, reject) => {
		db.query("select punch_id, punch_datetime, task_id from punches;", function(err, results, fields) {
			if (err) reject(err);
			else resolve(results.map(row => {
				return {
					punchID : row.punch_id,
					punchDate : row.punch_datetime,
					taskID : row.task_id
				}
			}));
		});
	})
}
