import db from '../mysql.js';
//import moment from 'moment'
import moment from 'moment-timezone';

export default function(punchID, newDate) {
	var dateForInsert = moment(String(newDate)).tz('America/New_York').format('YYYY-MM-DD HH:mm:ss');
	return new Promise((resolve, reject) => {
		db.query(
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
