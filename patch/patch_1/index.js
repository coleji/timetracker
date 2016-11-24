export default function(db) {
	return new Promise((resolve, reject) => {
		db.query(
			'CREATE TABLE `GlobalProperties` (' +
			'`dbVersion` int(11) NOT NULL' +
			') ENGINE=InnoDB DEFAULT CHARSET=latin1;',
		function(err) {
			if (err) reject(err);
			else resolve();
		});
	}).then(() => {
		return new Promise((resolve, reject) => {
			db.query(
				'insert into GlobalProperties set ?', {
					dbVersion : 0
				},
			function(err) {
				if (err) reject(err);
				else resolve();
			});
		});
	});
}
