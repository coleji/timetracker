import getPunches from './actions/getPunches';
import newTask from './actions/newTask';
import existingTask from './actions/existingTask';
import updatePunch from './actions/updatePunch';
import deletePunch from './actions/deletePunch';
import login from './actions/login';
import { enterTime, unenterTime } from './actions/enterTime';
import changePassword from './actions/changePassword';

export default function(req) {
	var urlComponents = req.url.split('/');
	if (urlComponents[0] == '') urlComponents.splice(0,1); // may or may not start with a /

	switch (urlComponents[0]) {
	case 'getPunches':
		return getPunches(req.dbPool, req.session, {addDays: urlComponents[1]});
	case 'enterTime':
		return enterTime(req.dbPool, req.session, {addDays: urlComponents[1]});
	case 'unenterTime':
		return unenterTime(req.dbPool, req.session, {addDays: urlComponents[1]});
	case 'newTask':
		return newTask(req.dbPool, req.session, {
			taskName: req.body.taskName,
			punchDate: req.body.punchDate
		});
	case 'existingTask':
		return existingTask(req.dbPool, req.session, {
			taskID: req.body.taskID,
			punchDate: req.body.punchDate
		});
	case 'updatePunch':
		return updatePunch(req.dbPool, req.session, {
			punchID: req.body.punchID,
			newDate: req.body.newDate
		});
	case 'deletePunch':
		return deletePunch(req.dbPool, req.session, {punchID: req.body.punchID});
	case 'changePassword':
		return changePassword(req.dbPool, req.session, {
			oldPw: req.body.oldPw,
			newPw: req.body.newPw,
			userName: req.session.userName
		});
	case 'login':
		return new Promise((resolve) => {
			resolve();
		}).then(() => {
			return login(req.dbPool, req.session, {
				userName: req.body.userName,
				password: req.body.password
			});
		}).then(data => {
			return Promise.resolve(data);
		});
	case 'logout':
		return new Promise((resolve) => {
			req.session.destroy(err => {
				if (err) console.log("Error destroying session: " + err);
				else {
					console.log("Destroyed session!");
					resolve();
				}
			});
		});
	case 'isLoggedIn':
		return new Promise((resolve) => {
			resolve(req.session.userName);
		});
	}
	return Promise.reject('couldnt match url ' + urlComponents[0]);
}
