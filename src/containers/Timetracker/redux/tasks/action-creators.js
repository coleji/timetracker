import moment from 'moment';
moment().format();

import { createActionFromAPIResponse } from '../../../../../core/api-client';
import { sortPunches } from '../../../../app-util';

var asyncIDCounter = -1;

var getPunches = function(dispatch, dayOffset) {
	createActionFromAPIResponse({
		httpMethod: 'GET',
		apiEndpoint : '/getPunches/' + dayOffset,
		stateItemName : 'punches'
	}).then((punches) => {
		punches = punches || [];
		punches.forEach(e => { e.punchDate = moment(e.punchDate); });
		dispatch({
			type: 'GET_PUNCHES',
			punches : punches.sort(sortPunches),
			dayOffset
		});
	}).catch(e => {
		console.log(e);
	});
};

var newTask = function(dispatch, taskName, dayOffset) {
	let tempPunchID = asyncIDCounter--;
	let tempTaskID = asyncIDCounter--;
	let punchDate = moment().add(dayOffset, 'days');
	createActionFromAPIResponse({
		httpMethod: 'POST',
		apiEndpoint : '/newTask',
		postData :  { taskName, punchDate }
	}).then(punch => {
		dispatch({
			type: 'PUNCH_NEW_TASK_DB_RETURN',
			tempPunchID,
			tempTaskID,
			punchID : punch.punchID,
			taskID : punch.taskID
		});
	});

	dispatch({
		type: 'PUNCH_NEW_TASK_OPTIMISTIC',
		taskName,
		punchDate,
		tempTaskID,
		tempPunchID
	});
};

var existingTask = function(dispatch, taskIDAndName, dayOffset) {
	let tempPunchID = asyncIDCounter--;
	let punchDate = moment().add(dayOffset, 'days');
	let taskID = taskIDAndName.split('_')[0];
	var arr = taskIDAndName.split('_');
	arr.shift();
	let taskName = arr.join('_');

	createActionFromAPIResponse({
		httpMethod: 'POST',
		apiEndpoint : '/existingTask',
		postData :  { taskID, punchDate }
	}).then(punch => {
		dispatch({
			type: 'PUNCH_EXISTING_TASK_DB_RETURN',
			tempPunchID,
			punchID : punch.punchID,
		});
	});

	dispatch({
		type: 'PUNCH_EXISTING_TASK_OPTIMISTIC',
		tempPunchID,
		punchDate,
		taskID,
		taskName
	});
};

var updatePunch = function(dispatch, punchID, punchDate, deltaMinutes) {
	if (isNaN(deltaMinutes)) return;

	let newDate = moment(punchDate).add(+deltaMinutes,'minutes');

	createActionFromAPIResponse({
		httpMethod: 'POST',
		apiEndpoint : '/updatePunch',
		postData :  { punchID, newDate }
	}).catch(e => console.log(e));

	dispatch({
		type: 'UPDATE_PUNCH_OPTIMISTIC',
		punchID : punchID,
		punchDate : newDate
	});
};

var deletePunch = function(dispatch, punchID) {
	createActionFromAPIResponse({
		httpMethod: 'POST',
		apiEndpoint : '/deletePunch',
		postData :  { punchID }
	}).catch(e => console.log(e));

	dispatch({
		type: 'DELETE_PUNCH_OPTIMISTIC',
		punchID : punchID
	});
};

export  {
	getPunches,
	newTask,
	existingTask,
	updatePunch,
	deletePunch
};
