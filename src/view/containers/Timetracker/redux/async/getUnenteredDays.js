import ReduxModule from '../../../../../../reduxxor/ReduxModule';
import { createActionFromAPIResponse } from '../../../../../../reduxxor/ApiConnector';

const actionCreatorAbstract = (optimisticDispatch, successDispatch, params) => {
	var {config, dispatch} = params;
	createActionFromAPIResponse({
		httpMethod: 'GET',
		apiEndpoint : '/getUnenteredDays',
		stateItemName : 'punches',
		config,
		dispatch
	}).then(result => {
		console.log("got unentered days: ", result);
		successDispatch({
			unenteredDays : result
		});
	}).catch(e => console.log(e));
};

const successReducer = (state, action) => {
	return {
		unenteredDays: action.unenteredDays
	};
};

export default new ReduxModule({
	name : 'getUnenteredDays',
	actionCreatorAbstract,
	reducers : { successReducer }
});
