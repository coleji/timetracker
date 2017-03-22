export default function(db) {
	return new Promise((resolve, reject) => {
		// add jcole as a user
		db.query(
			'INSERT INTO users (user_name, pw_hash) values ("jcole", "12c81d22ac5b5e0400c51d960bdeba8c")',
		function(err) {
			if (err) reject(err);
			else resolve();
		});
	}).then(() => {
		return new Promise((resolve, reject) => {
			// create table days
			db.query(
				'CREATE TABLE `days` (' +
				'`day` date NOT NULL, ' +
				'`datetime_entered` datetime NOT NULL, ' +
				'PRIMARY KEY (`day`)' +
				') ENGINE=InnoDB DEFAULT CHARSET=latin1;',
			function(err) {
				if (err) reject(err);
				else resolve();
			});
		});
	});
}
