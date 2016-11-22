import moment from 'moment';

import ReduxModule from '../../../../../core/redux-module';
import { createActionFromAPIResponse } from '../../../../../core/api-client';
import { sortPunches } from '../../../../app-util';

const actionCreatorAbstract = (optimisticDispatch, successDispatch, params) => {
	var {dayOffset} = params;
	if (isNaN(dayOffset)) dayOffset = 0;
	else dayOffset = Number(dayOffset);
	createActionFromAPIResponse({
		httpMethod: 'GET',
		apiEndpoint : '/getPunches/' + dayOffset,
		stateItemName : 'punches'
	}).then(punches => {
		punches = punches || [];
		punches.forEach(e => { e.punchDate = moment(e.punchDate); });
		successDispatch({
			punches : punches.sort(sortPunches),
			dayOffset
		});
	}).catch(e => console.log(e));
};

const successReducer = (state, action) => {
	return {
		punches: action.punches,
		dayOffset : action.dayOffset
	};
};

export default new ReduxModule({
	name : 'getPunches',
	actionCreatorAbstract,
	reducers : { successReducer }
});
