import { createActionFromAPIResponse } from '../../../../../reduxxor/ApiConnector';

const changePasswordActionCreator = (config, dispatch, params) => {
	let {oldPw, newPw} = params;
	console.log("about to post with " + newPw);
	createActionFromAPIResponse({
		httpMethod: 'POST',
		apiEndpoint : '/changePassword',
		postData :  { oldPw, newPw },
		config
	}).catch(e => console.log(e));
};

export default changePasswordActionCreator;
