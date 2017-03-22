//import {ReduxModule, createActionFromAPIResponse} from 'reduxxor';
import ReduxModule from '../../../../../../reduxxor/ReduxModule';
import { createActionFromAPIResponse } from '../../../../../../reduxxor/ApiConnector';

const actionCreatorAbstract = (optimisticDispatch, successDispatch, params) => {
	var {dayOffset, config, dispatch} = params;
	createActionFromAPIResponse({
		httpMethod: 'GET',
		apiEndpoint : '/enterTime/' + dayOffset,
		config,
		dispatch
	}).then(result => {
		successDispatch({
			enteredTime: result,
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
	name : 'enterTime',
	actionCreatorAbstract,
	reducers : { successReducer }
});
