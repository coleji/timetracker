import { createActionFromAPIResponse } from '../../../../core/api-client';

const changePasswordActionCreator = (dispatch, params) => {
	let {oldPw, newPw} = params;
	console.log("about to post with " + newPw);	
	createActionFromAPIResponse({
		httpMethod: 'POST',
		apiEndpoint : '/changePassword',
		postData :  { oldPw, newPw }
	}).catch(e => console.log(e));
};

export default changePasswordActionCreator;
