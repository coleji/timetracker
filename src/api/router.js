import getPunches from './actions/getPunches';
import newTask from './actions/newTask';
import existingTask from './actions/existingTask';
import updatePunch from './actions/updatePunch';
import deletePunch from './actions/deletePunch';
import login from './actions/login';
import changePassword from './actions/changePassword';

export default function(req) {
	var urlComponents = req.url.split('/');
	if (urlComponents[0] == '') urlComponents.splice(0,1); // may or may not start with a /

	switch (urlComponents[0]) {
	case 'getPunches':
		return getPunches(req.dbPool, urlComponents[1]);
	case 'newTask':
		return newTask(req.dbPool, req.body.taskName, req.body.punchDate);
	case 'existingTask':
		return existingTask(req.dbPool, req.body.taskID, req.body.punchDate);
	case 'updatePunch':
		return updatePunch(req.dbPool, req.body.punchID, req.body.newDate);
	case 'deletePunch':
		return deletePunch(req.dbPool, req.body.punchID);
	case 'changePassword':
		return changePassword(req.dbPool, req.body.oldPw, req.body.newPw, req.session.userName);
	case 'login':
		return new Promise((resolve) => {
		//	req.session.regenerate(err => {
		//		if (err) console.log("Error regenerating session: " + err);
			resolve();
		//	});
		}).then(() => {
			return login(req.dbPool, req.body.userName, req.body.password);
		}).then(data => {
			req.session.userName = req.body.userName;
		//	req.session.save();
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
			console.log("Before reload: ", req.session);
	//		req.session.reload(err => {
	//			console.log("After reload: ", req.session);
	//			if (err) resolve(null);
	//			else
			resolve(req.session.userName);
	//		});
		});
	}
	return Promise.reject('couldnt match url ' + urlComponents[0]);
}
