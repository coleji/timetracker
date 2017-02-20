export default function(dbPool, addDays) {
	return new Promise((resolve, reject) => {
		dbPool.query(
			'select punch_id as punchID, punch_datetime as punchDate, ' +
			'p.task_id as taskID, task_name as taskName from punches p, tasks t ' +
			' where p.task_id = t.task_id and date(p.punch_datetime) = date(adddate(now(), ' + addDays + '));',
			function(err, results) {
				if (err) reject(err);
				else resolve(results);
			}
		);
	});
}
