import moment from 'moment-timezone';

export default function(dbPool, punchID, newDate) {
	var dateForInsert = moment(String(newDate)).tz('America/New_York').format('YYYY-MM-DD HH:mm:ss');
	return new Promise((resolve, reject) => {
		dbPool.query(
			'update punches set punch_datetime = ? where punch_id = ?',[
				dateForInsert,
				punchID
			],
		function(err) {
			if (err) reject(err);
			else resolve();
		});
	});
}
