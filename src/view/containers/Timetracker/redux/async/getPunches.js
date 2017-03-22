import moment from 'moment';

//import {ReduxModule, createActionFromAPIResponse} from 'reduxxor';
import ReduxModule from '../../../../../../reduxxor/ReduxModule';
import { createActionFromAPIResponse } from '../../../../../../reduxxor/ApiConnector';
import { sortPunches } from '../../../../../app-util';

const actionCreatorAbstract = (optimisticDispatch, successDispatch, params) => {
	var {dayOffset, config, dispatch} = params;
	if (isNaN(dayOffset)) dayOffset = 0;
	else dayOffset = Number(dayOffset);
	createActionFromAPIResponse({
		httpMethod: 'GET',
		apiEndpoint : '/getPunches/' + dayOffset,
		stateItemName : 'punches',
		config,
		dispatch
	}).then(result => {
		var punches = result.punches || [];
		punches.forEach(e => { e.punchDate = moment(e.punchDate); });
		successDispatch({
			punches : punches.sort(sortPunches),
			enteredTime: result.entered,
			dayOffset
		});
	}).catch(e => console.log(e));
};

const successReducer = (state, action) => {
	return {
		punches: action.punches,
		enteredTime : action.enteredTime,
		dayOffset : action.dayOffset
	};
};

export default new ReduxModule({
	name : 'getPunches',
	actionCreatorAbstract,
	reducers : { successReducer }
});
