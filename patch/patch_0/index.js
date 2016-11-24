export default function(db) {
	return new Promise((resolve, reject) => {
		db.query(
			'CREATE TABLE `tasks` (' +
			'`task_id` int(11) NOT NULL AUTO_INCREMENT,' +
			'`task_name` varchar(100) DEFAULT NULL,' +
			'`task_datetime` datetime DEFAULT NULL,' +
			'PRIMARY KEY (`task_id`)' +
			') ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=latin1;',
		function(err) {
			if (err) reject(err);
			else resolve();
		});
	}).then(() => {
		return new Promise((resolve, reject) => {
			db.query(
				'CREATE TABLE `punches` (' +
				'`punch_id` int(11) NOT NULL AUTO_INCREMENT,' +
				'`punch_datetime` datetime DEFAULT NULL,' +
				'`task_id` int(11) NOT NULL,' +
				'PRIMARY KEY (`punch_id`),' +
				'KEY `task_id` (`task_id`),' +
				'CONSTRAINT `punches_ibfk_1` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`task_id`)' +
				') ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=latin1;',
			function(err) {
				if (err) reject(err);
				else resolve();
			});
		});
	}).then(() => {
		return new Promise((resolve, reject) => {
			db.query(
				'insert into tasks set ?', {
					task_id : -1,
					task_name: 'OUT'
				},
			function(err) {
				if (err) reject(err);
				else resolve();
			});
		});
	});
}
