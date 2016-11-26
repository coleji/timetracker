import getPunches from './actions/getPunches';
import newTask from './actions/newTask';
import existingTask from './actions/existingTask';
import updatePunch from './actions/updatePunch';
import deletePunch from './actions/deletePunch';
import login from './actions/login';

export default function(dbPool, url, body) {
	var urlComponents = url.split('/');
	if (urlComponents[0] == '') urlComponents.splice(0,1); // may or may not start with a /

	switch (urlComponents[0]) {
	case 'getPunches':
		return getPunches(dbPool, urlComponents[1]);
	case 'newTask':
		return newTask(dbPool, body.taskName, body.punchDate);
	case 'existingTask':
		return existingTask(dbPool, body.taskID, body.punchDate);
	case 'updatePunch':
		return updatePunch(dbPool, body.punchID, body.newDate);
	case 'deletePunch':
		return deletePunch(dbPool, body.punchID);
	case 'login':
		return login(dbPool, body.userName, body.password);
	}
	return Promise.reject('couldnt match url ' + urlComponents[0]);
}
