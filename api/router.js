import getPunches from './actions/getPunches';
import newTask from './actions/newTask';
import existingTask from './actions/existingTask'
import updatePunch from './actions/updatePunch'

export default function(url, body) {
	var urlComponents = url.split('/')
	if (urlComponents[0] == "") urlComponents.splice(0,1); // may or may not start with a /

	switch (urlComponents[0]) {
	case "getPunches":
		return getPunches(urlComponents[1]);
	case "newTask":
		return newTask(body.taskName, body.punchDate);
	case "existingTask":
		return existingTask(body.taskID, body.punchDate);
	case "updatePunch":
		return updatePunch(body.punchID, body.newDate)
	}
	console.log("couldnt match url " + urlComponents[0])
	return Promise.resolve({data: "API Success!"});
}
