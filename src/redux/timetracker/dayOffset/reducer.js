const DEFAULT_STATE = 0

export default function(state = DEFAULT_STATE, action) {
	switch (action.type) {
	case "DAY_OFFSET":
		return action.dayOffset;
	default:
		return DEFAULT_STATE
	}
}
