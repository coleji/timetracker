import moment from 'moment';

import ReduxModule from '../../../../../reduxxor/ReduxModule';
import { createActionFromAPIResponse } from '../../../../../reduxxor/ApiConnector';

const actionCreatorAbstract = (optimisticDispatch, successDispatch, params) => {
	let {taskName, dayOffset, asyncIDCounter} = params;
	let tempPunchID = asyncIDCounter--;
	let tempTaskID = asyncIDCounter--;
	let punchDate = moment().add(dayOffset, 'days');
	createActionFromAPIResponse({
		httpMethod: 'POST',
		apiEndpoint : '/newTask',
		postData :  { taskName, punchDate }
	}).then(punch => {
		successDispatch({
			tempPunchID,
			tempTaskID,
			punchID : punch.punchID,
			taskID : punch.taskID
		});
	}).catch(e => console.log(e));

	optimisticDispatch({
		taskName,
		punchDate,
		tempTaskID,
		tempPunchID
	});
};

const optimisticReducer = (state, action) => {
	return {
		punches : [{
			taskName : action.taskName,
			punchDate : action.punchDate,
			punchID : action.tempPunchID,
			taskID : action.tempTaskID
		}, ...state.punches],
		asyncIDCounter : state.asyncIDCounter - 2
	};
};

const successReducer = (state, action) => {
	return {
		punches : state.punches.map(p => { return {
			taskName : p.taskName,
			punchDate : p.punchDate,
			punchID : (p.punchID == action.tempPunchID) ? action.punchID : p.punchID,
			taskID : (p.taskID == action.tempTaskID) ? action.taskID : p.taskID
		};})
	};
};

export default new ReduxModule({
	name : 'newTask',
	actionCreatorAbstract,
	reducers : { successReducer, optimisticReducer}
});
