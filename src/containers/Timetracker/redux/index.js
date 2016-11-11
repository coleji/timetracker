import { combineReducers } from 'redux';

import punchData from './tasks/reducer';
import dayOffset from './dayOffset/reducer';

var reducer = combineReducers({
	punchData,
	dayOffset
});

export default reducer;
