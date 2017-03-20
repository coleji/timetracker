import { actionCreatorModules as asyncActions} from './async';
import { createActionFromAPIResponse } from '../../../../core/api-client';

const logout = dispatch => {
	createActionFromAPIResponse({
		httpMethod: 'POST',
		apiEndpoint : '/logout',
		postData :  { }
	}).catch(e => console.log(e));

	dispatch({
		type: "LOGOUT"
	});
};

export {
	asyncActions,
	logout
};
