import db from '../api/mysql';
import { ArrayIterator } from '../src/app-util';

var patchesToApply = [
	require('./patch_0'),
	require('./patch_1')
];

var patchIterator = new ArrayIterator(patchesToApply);

const setDBVersion = patchNumber => {
	return new Promise((resolve, reject) => {
		if (patchNumber <= 0) resolve();
		else {
			db.query(
				'update GlobalProperties set dbVersion = ?',[
					patchNumber
				],
			function(err) {
				if (err) reject(err);
				else resolve();
			});
		}
	});
};

(function doNextPatch() {
	if (patchIterator.hasNext()) {
		patchIterator.next()(db).then(() => {
			// TODO: get actual patch number
			console.log('Patch success: ' + patchIterator.currentIndex());
			setDBVersion(patchIterator.currentIndex()).then(doNextPatch, err => {
				console.log('Failure trying to set the dbVersion to ' + patchIterator.currentIndex()+  ': ' + err);
			});
		}, err => {
			// TODO: get actual patch number
			console.log('Failure doing patch ' + patchIterator.currentIndex() + ': ' + err);
		});
	}
}());

// TODO: need to close db connection once last patch is finished
