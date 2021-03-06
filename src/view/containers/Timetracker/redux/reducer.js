import moment from 'moment';

import { sortPunches } from '../../../../app-util';
import { reducerModules as asyncReducers} from './async';

moment().format();

const DEFAULT_STATE = {
	punches: [],
	unenteredDays : [],
	tasks : [],
	dayOffset : 0,
	asyncIDCounter : -1
};

const coalesce = () => {
	for (var i=0; i<arguments.length; i++) {
		if (undefined != arguments[i]) return arguments[i];
	}
	return undefined;
};

export default function(state = DEFAULT_STATE, action) {
	var newState = {};
	Object.assign(newState, (function(action) {
		switch (action.type) {
		default:
			if (undefined !== asyncReducers[action.type]) {
				return asyncReducers[action.type](state, action);
			}
			else return {};
		}
	}(action)));

	// Sort and add durationMillis
	if (newState.punches) newState.punches = newState.punches.sort(sortPunches).map((punch, i, punches) => {
		let end = (function() {
			if (i == 0) return moment().add(coalesce(newState.dayOffset, state.dayOffset, 0), 'days');
			else return moment(punches[i-1].punchDate);
		}());

		let diff = Math.max(0, end.diff(punch.punchDate)); // stomp on negative durations with 0

		return Object.assign(punch, {durationMillis : diff});
	});

	// Get tasks from punches including total time per task
	if (newState.punches) newState.tasks = (function() {
		var taskHash = newState.punches.reduce((prev, punch) => {
			// skip the OUT punch
			if (punch.taskID == -1) return prev;

			prev[punch.taskID] = prev[punch.taskID] || {
				taskID : punch.taskID,
				taskName : punch.taskName,
				totalTimeMillis : 0
			};

			prev[punch.taskID].totalTimeMillis += punch.durationMillis;
			return prev;
		}, {});

		var tasks = [];
		for (var taskID in taskHash) {
			tasks.push(taskHash[taskID]);
		}
		return tasks;
	}());
	return Object.assign({}, state, newState);
}
