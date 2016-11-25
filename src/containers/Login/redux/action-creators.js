import { createActionFromAPIResponse } from '../../../../core/api-client';

const loginActionCreator = (dispatch, params) => {
	let {userName, password} = params;
	createActionFromAPIResponse({
		httpMethod: 'POST',
		apiEndpoint : '/login',
		postData :  { userName, password }
	}).then(result => {
		console.log(result);
		dispatch({
			type: "LOGIN_SUCCESS",
			userName
		});
	}).catch(e => console.log(e));
};

export default loginActionCreator;
