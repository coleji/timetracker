import { createActionFromAPIResponse } from '../../../../../reduxxor/ApiConnector';

const loginActionCreator = (config, dispatch, params) => {
	let {userName, password} = params;
	createActionFromAPIResponse({
		httpMethod: 'POST',
		apiEndpoint : '/login',
		postData :  { userName, password },
		config
	}).then(() => {
		dispatch({
			type: "LOGIN_SUCCESS",
			userName
		});
	}).catch(e => console.log(e));
};

export default loginActionCreator;
