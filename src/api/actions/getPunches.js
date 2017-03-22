import moment from 'moment';

export default function(dbPool, session, params) {
	var { addDays } = params;
	return Promise.all([new Promise((resolve, reject) => {
		dbPool.query(
			'select punch_id as punchID, punch_datetime as punchDate, ' +
			'p.task_id as taskID, task_name as taskName from punches p, tasks t ' +
			' where p.task_id = t.task_id and date(p.punch_datetime) = date(adddate(now(), ?));',
			[addDays],
			function(err, results) {
				if (err) reject(err);
				else resolve(results);
			}
		);
	}), new Promise((resolve, reject) => {
		var midnight = new Date();
		midnight.setUTCHours(0,0,0,0);
		dbPool.query(
			'select day, datetime_entered from days ' +
			' where day = ? and datetime_entered is not null',
			[moment().add(addDays, 'days').tz('America/New_York').format('YYYY-MM-DD')],
			function(err, results) {
				if (err) reject(err);
				else if (results.length != 1) resolve(null);
				else resolve(results[0]["datetime_entered"]);
			}
		);
	})]).then(allResults => {
		return Promise.resolve({
			punches: allResults[0],
			entered: allResults[1]
		});
	}).catch(err => Promise.reject(err));
}
