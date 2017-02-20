import ReduxModule from '../../../../../reduxxor/ReduxModule';
import { createActionFromAPIResponse } from '../../../../../reduxxor/ApiConnector';

const actionCreatorAbstract = (optimisticDispatch, successDispatch, params) => {
	let {punchID} = params;
	createActionFromAPIResponse({
		httpMethod: 'POST',
		apiEndpoint : '/deletePunch',
		postData :  { punchID }
	}).catch(e => console.log(e));

	optimisticDispatch({
		punchID
	});
};

const optimisticReducer = (state, action) => ({
	punches : state.punches.filter(p => {
		return p.punchID != action.punchID;
	})
});

export default new ReduxModule({
	name : 'deletePunch',
	actionCreatorAbstract,
	reducers : { optimisticReducer}
});
