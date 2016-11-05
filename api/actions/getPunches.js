import db from '../mysql.js'

export default function(addDays) {
	return new Promise((resolve, reject) => {
		db.query(
			"select punch_id as punchID, punch_datetime as punchDate, " +
			"p.task_id as taskID, task_name as taskName from punches p, tasks t " +
			" where p.task_id = t.task_id and date(p.punch_datetime) = date(adddate(now(), " + addDays + "));",
			function(err, results, fields) {
			if (err) reject(err);
			else resolve(results);
		});
	})
}
