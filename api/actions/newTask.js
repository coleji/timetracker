import db from '../mysql.js';
//import moment from 'moment'
import moment from 'moment-timezone';

export default function(taskName, punchDate) {
	var dateForInsert = moment(String(punchDate)).tz('America/New_York').format('YYYY-MM-DD HH:mm:ss');
	return new Promise((resolve, reject) => {
		db.query(
			'insert into tasks set ?', {
				task_name : taskName,
				task_datetime: dateForInsert
			},
		function(err, result) {
			if (err) reject(err);
			else resolve(result.insertId);
		});
	}).then(taskID => new Promise((resolve, reject) => {
		db.query(
			'insert into punches set ?', {
				task_id : taskID,
				punch_datetime: dateForInsert
			},
		function(err, result) {
			if (err) reject(err);
			else resolve({
				punchID : result.insertId,
				taskID : taskID
			});
		});
	}));
}
