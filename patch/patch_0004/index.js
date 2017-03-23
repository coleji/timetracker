export default function(db) {
	return new Promise((resolve, reject) => {
		// create table reconciled_time
		db.query(
			'CREATE TABLE `reconciled_time` (' +
			'`time_id` integer NOT NULL AUTO_INCREMENT, ' +
			'`day` date NOT NULL, ' +
			'`task_id` integer NOT NULL, ' +
			'`hours` decimal NOT NULL, ' +
			'PRIMARY KEY (`time_id`),' +
			'KEY `task_id` (`task_id`), ' +
			'CONSTRAINT `reconciled_time_ibfk_1` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`task_id`)' +
			') ENGINE=InnoDB DEFAULT CHARSET=latin1;',
		function(err) {
			if (err) reject(err);
			else resolve();
		});
	}).then(() => {
		return new Promise((resolve, reject) => {
			// add reconcile_id to punches
			db.query(
				'alter table punches add column reconcile_id integer',
			function(err) {
				if (err) reject(err);
				else resolve();
			});
		});
	}).then(() => {
		return new Promise((resolve, reject) => {
			// add FK from punches to reconciled_time
			db.query(
				'alter table punches add foreign key (reconcile_id) references reconciled_time (time_id);',
			function(err) {
				if (err) reject(err);
				else resolve();
			});
		});
	});
}
