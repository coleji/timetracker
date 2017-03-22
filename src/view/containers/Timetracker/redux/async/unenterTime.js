//import {ReduxModule, createActionFromAPIResponse} from 'reduxxor';
import ReduxModule from '../../../../../../reduxxor/ReduxModule';
import { createActionFromAPIResponse } from '../../../../../../reduxxor/ApiConnector';

const actionCreatorAbstract = (optimisticDispatch, successDispatch, params) => {
	var {dayOffset, config, dispatch} = params;
	createActionFromAPIResponse({
		httpMethod: 'GET',
		apiEndpoint : '/unenterTime/' + dayOffset,
		config,
		dispatch
	}).then(() => {
		successDispatch({
			enteredTime: null,
			dayOffset
		});
	}).catch(e => console.log(e));
};

const successReducer = (state, action) => {
	return {
		enteredTime : action.enteredTime
	};
};

export default new ReduxModule({
	name : 'unenterTime',
	actionCreatorAbstract,
	reducers : { successReducer }
});
