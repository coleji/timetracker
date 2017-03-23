export default function(dbPool) {
	return Promise.all([
		'select distinct date(punch_datetime) as day from punches order by 1',
		'select distinct day from days where datetime_entered is not null order by 1'
	].map(q => new Promise((resolve, reject) => {
		dbPool.query(
			q,
			function(err, result) {
				if (err) reject(err);
				else resolve(result);
			}
		);
	}))).then(results => {
		var enteredDays = results[1].reduce((hash, row) => {
			hash[row.day] = true;
			return hash;
		}, {});

		return results[0].map(row => row.day).filter(day => !enteredDays[day]);
	});
}
