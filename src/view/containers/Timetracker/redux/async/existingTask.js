import moment from 'moment';

import ReduxModule from '../../../../../../reduxxor/ReduxModule';
import { createActionFromAPIResponse } from '../../../../../../reduxxor/ApiConnector';

const actionCreatorAbstract = (optimisticDispatch, successDispatch, params) => {
	let {taskIDAndName, dayOffset, asyncIDCounter, config, dispatch} = params;
	let tempPunchID = asyncIDCounter--;
	let punchDate = moment().add(dayOffset, 'days');
	let taskID = taskIDAndName.split('_')[0];
	var arr = taskIDAndName.split('_');
	arr.shift();
	let taskName = arr.join('_');

	createActionFromAPIResponse({
		httpMethod: 'POST',
		apiEndpoint : '/existingTask',
		postData :  { taskID, punchDate },
		config,
		dispatch
	}).then(punch => {
		successDispatch({
			tempPunchID,
			punchID : punch.punchID,
		});
	}).catch(e => console.log(e));

	optimisticDispatch({
		tempPunchID,
		punchDate,
		taskID,
		taskName
	});
};

const optimisticReducer = (state, action) => {
	return {
		punches : [{
			taskName : action.taskName,
			punchDate : action.punchDate,
			punchID : action.tempPunchID,
			taskID : action.taskID
		}, ...state.punches],
		asyncIDCounter : state.asyncIDCounter - 1
	};
};

const successReducer = (state, action) => {
	return {
		punches : state.punches.map(p => { return {
			taskName : p.taskName,
			punchDate : p.punchDate,
			punchID : (p.punchID == action.tempPunchID) ? action.punchID : p.punchID,
			taskID : p.taskID
		};})
	};
};

export default new ReduxModule({
	name : 'existingTask',
	actionCreatorAbstract,
	reducers : { successReducer, optimisticReducer }
});
