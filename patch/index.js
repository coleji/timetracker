import fs from 'fs';

import { createConnection } from '../src/api/mysql';
import { ArrayIterator } from '../src/app-util';

var db = createConnection();

new Promise((resolve, reject) => {
	// determine current patch level
	db.query(
		'select dbVersion from GlobalProperties',
		function(err, results) {
			if (err) reject(err);
			else resolve(results[0].dbVersion);
		}
	);
}).catch((err) => {
	// If the GlobalProperties table doesn't exist then we are patch level 0.
	if (err == 'Error: ER_NO_SUCH_TABLE: Table \'timetracker.GlobalProperties\' doesn\'t exist') return Promise.resolve(0);
	else return Promise.reject(err);
}).then(dbVersion => {
	// get all the patch files, return a filtered list of patches that are above our current patch level
	console.log("Starting DB version is " + dbVersion);
	return new Promise((resolve, reject) => {
		let patches = fs.readdirSync('patch').filter(
			file => {
				return fs.statSync('patch/' + file).isDirectory();
			}
		).map(file => {
			var regexResult = /^patch_([0-9]*)$/.exec(file);
			if (!regexResult) reject("File " + file + " is not a valid patch file.");
			return {
				file,
				patchNumber : Number(regexResult[1])
			};
		}).filter(
			fileObj => {
				return fileObj.patchNumber > dbVersion;
			}
		).sort((a,b) => {
			return a.patchNumber - b.patchNumber;
		});
		resolve(patches);
	});
}).then(patchesToApply => {
	return new Promise((resolve, reject) => {
		if (patchesToApply.length == 0) {
			console.log("Database is up to date.");
			resolve();
			return;
		} else console.log("Patches to execute: " + patchesToApply.map(fileObj => fileObj.patchNumber).join(','));

		if (process.argv[2] != 'execute') {
			console.log('Dry run complete; to execute patches, run "npm run patch -- execute"');
			resolve();
			return;
		}

		var patchIterator = new ArrayIterator(
			patchesToApply.map(
				fileObj => Object.assign(fileObj, {mod : require('./' + fileObj.file) } )
			)
		);

		const setDBVersion = patchNumber => {
			console.log("setting dbVersion to " + patchNumber);
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
				var fileObj = patchIterator.next();
				fileObj.mod(db).then(() => {
					console.log('Patch success: ' + fileObj.patchNumber);
					setDBVersion(fileObj.patchNumber).then(doNextPatch, err => {
						reject('Failure trying to set the dbVersion to ' + fileObj.patchNumber +  ': ' + err);
					});
				}, err => {
					reject('Failure doing patch ' + fileObj.patchNumber + ': ' + err);
				});
			} else {
				db.end();
			}
		}());
	});
}).catch(err => {
	console.log("something broke: " + err);
}).then(() => {
	db.end();
});
