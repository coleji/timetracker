import { actionCreatorModules as asyncActions} from './async';
import { createActionFromAPIResponse } from '../../../../../reduxxor/ApiConnector';

const logout = (config, dispatch) => {
	createActionFromAPIResponse({
		httpMethod: 'POST',
		apiEndpoint : '/logout',
		postData :  { },
		config
	}).catch(e => console.log(e));

	dispatch({
		type: "LOGOUT"
	});
};

export {
	asyncActions,
	logout
};
