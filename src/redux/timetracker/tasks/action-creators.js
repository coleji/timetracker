import moment from 'moment'
moment().format();

import { createActionFromAPIResponse } from '../../../api-client'

var asyncIDCounter = -1;

var getPunches = function(dispatch, dayOffset) {
	console.log(dayOffset)
	createActionFromAPIResponse({
		httpMethod: 'GET',
		apiEndpoint : '/getPunches/' + dayOffset,
		stateItemName : 'punches'
	}).then((punches) => {
		punches = punches || []
		punches.forEach(e => { e.punchDate = new Date(e.punchDate) });
		console.log(punches)
		dispatch({
			type: "GET_PUNCHES",
			punches,
			dayOffset
		});
	}).catch(e => {
		console.log(e)
	});
};

var newTask = function(dispatch, taskName, dayOffset) {
	let tempPunchID = asyncIDCounter--;
	let tempTaskID = asyncIDCounter--;
	let punchDate = moment().add(dayOffset, 'days');

	var newTaskPromise = createActionFromAPIResponse({
		httpMethod: 'POST',
		apiEndpoint : '/newTask',
		postData :  { taskName, punchDate }
	}).then(punch => {
		dispatch({
			type: "PUNCH_NEW_TASK_DB_RETURN",
			tempPunchID,
			tempTaskID,
			punchID : punch.punchID,
			taskID : punch.taskID
		})
	});

	dispatch({
		type: "PUNCH_NEW_TASK_OPTIMISTIC",
		taskName,
		punchDate,
		tempTaskID,
		tempPunchID
	});
}

var existingTask = function(dispatch, taskIDAndName) {
	let tempPunchID = asyncIDCounter--;
	let punchDate = new Date();
	let taskID = taskIDAndName.split("_")[0]
	var arr = taskIDAndName.split("_")
	arr.shift()
	let taskName = arr.join("_")

	var newTaskPromise = createActionFromAPIResponse({
		httpMethod: 'POST',
		apiEndpoint : '/existingTask',
		postData :  { taskID, punchDate }
	}).then(punch => {
		dispatch({
			type: "PUNCH_EXISTING_TASK_DB_RETURN",
			tempPunchID,
			punchID : punch.punchID,
		})
	});

	dispatch({
		type: "PUNCH_EXISTING_TASK_OPTIMISTIC",
		tempPunchID,
		punchDate,
		taskID,
		taskName
	});
}

var updatePunch = function(dispatch, punchID, punchDate, deltaMinutes) {
	if (isNaN(deltaMinutes)) return;

	let newDate = moment(punchDate).add(+deltaMinutes,'minutes')

	var newTaskPromise = createActionFromAPIResponse({
		httpMethod: 'POST',
		apiEndpoint : '/updatePunch',
		postData :  { punchID, newDate }
	}).catch(e => console.log(e));

	dispatch({
		type: "UPDATE_PUNCH_OPTIMISTIC",
		punchID : punchID,
		punchDate : newDate
	});
}

export  {
	getPunches,
	newTask,
	existingTask,
	updatePunch
}
