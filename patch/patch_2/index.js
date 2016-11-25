export default function(db) {
	return new Promise((resolve, reject) => {
		db.query(
			'CREATE TABLE `users` (' +
			'`user_id` int(11) NOT NULL AUTO_INCREMENT,' +
			'`user_name` varchar(50) NOT NULL,' +
			'`pw_hash` varchar(255) binary,' +
			'PRIMARY KEY (`user_id`)' +
			') ENGINE=InnoDB DEFAULT CHARSET=latin1;',
		function(err) {
			if (err) reject(err);
			else resolve();
		});
	});
}
