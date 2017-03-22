import moment from 'moment';

const enterTime = function(dbPool, session, params) {
	var { addDays } = params;
	return new Promise((resolve, reject) => {
		var now = moment().tz('America/New_York').format('YYYY-MM-DD HH:mm:ss');
		var then = moment().add(addDays, 'days').tz('America/New_York').format('YYYY-MM-DD HH:mm:ss');

		dbPool.query(
			'insert into days set ?',{
				"day": then,
				"datetime_entered" : now
			},
		function(err) {
			if (err) reject(err);
			else resolve(then);
		});
	});
};

const unenterTime = function(dbPool, session, params) {
	var { addDays } = params;
	return new Promise((resolve, reject) => {
		var then = moment().add(addDays, 'days').tz('America/New_York').format('YYYY-MM-DD');
		dbPool.query(
			'delete from days where day = ?',
			[then],
		function(err) {
			if (err) reject(err);
			else resolve(true);
		});
	});
};

export {
	enterTime,
	unenterTime
};
