export default function(dbPool, session, params) {
	var { punchID } = params;
	return new Promise((resolve, reject) => {
		dbPool.query(
			'delete from punches where punch_id = ?',[
				punchID
			],
		function(err) {
			if (err) reject(err);
			else resolve();
		});
	});
}
