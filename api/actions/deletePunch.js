import db from '../mysql.js'
//import moment from 'moment'
import moment from 'moment-timezone'

export default function(punchID) {
	return new Promise((resolve, reject) => {
		db.query(
			"delete from punches where punch_id = ?",[
				punchID
			],
		function(err, result) {
			if (err) reject(err);
			else resolve();
		});
	})
}
