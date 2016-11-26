const DEFAULT_STATE = {
	userName: null
};

export default function(state = DEFAULT_STATE, action) {
	switch (action.type) {
	case 'LOGIN_SUCCESS':
		return {
			userName: action.userName
		};
	}
	return state;
}
