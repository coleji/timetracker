import moment from 'moment';

import ReduxModule from '../../../../../../reduxxor/ReduxModule';
import { createActionFromAPIResponse } from '../../../../../../reduxxor/ApiConnector';

const actionCreatorAbstract = (optimisticDispatch, successDispatch, params) => {
	let {punchID, punchDate, deltaMinutes} = params;
	if (isNaN(deltaMinutes)) return;
	let newDate = moment(punchDate).add(+deltaMinutes,'minutes');
	createActionFromAPIResponse({
		httpMethod: 'POST',
		apiEndpoint : '/updatePunch',
		postData :  { punchID, newDate }
	}).catch(e => console.log(e));

	optimisticDispatch({
		punchID,
		punchDate : newDate
	});
};

const optimisticReducer = (state, action) => {
	return {
		punches : state.punches.map(p => {
			var newObj = Object.assign({}, p);
			if (p.punchID == action.punchID) {
				newObj.punchDate = action.punchDate;
			}
			return newObj;
		})
	};
};

export default new ReduxModule({
	name : 'updatePunch',
	actionCreatorAbstract,
	reducers : { optimisticReducer }
});
