const DEFAULT_STATE = {
	userName: null
};

export default function(state = DEFAULT_STATE, action) {
	switch (action.type) {
	case 'LOGIN':
		return {
			userName: action.userName
		};
	case 'newTask_OPTIMISTIC':
		return {
			userName: null
		};
	}
	return state;
}
