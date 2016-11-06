import moment from 'moment';

import { sortPunches } from '../../../node-util';

moment().format();

const DEFAULT_STATE = {
	punches: [],
	tasks : [],
	dayOffset : 0
};

export default function(state = DEFAULT_STATE, action) {
	var newState = {};
	Object.assign(newState, (function(action) {
		switch (action.type) {
		case 'GET_PUNCHES':
			return  {
				punches: action.punches,
				dayOffset : action.dayOffset
			};
		case 'PUNCH_NEW_TASK_OPTIMISTIC':
			return {
				punches : [{
					taskName : action.taskName,
					punchDate : action.punchDate,
					punchID : action.tempPunchID,
					taskID : action.tempTaskID
				}, ...state.punches]
			};
		case 'PUNCH_NEW_TASK_DB_RETURN':
			return {
				punches : state.punches.map(p => { return {
					taskName : p.taskName,
					punchDate : p.punchDate,
					punchID : (p.punchID == action.tempPunchID) ? action.punchID : p.punchID,
					taskID : (p.taskID == action.tempTaskID) ? action.taskID : p.taskID
				};})
			};
		case 'UPDATE_PUNCH_OPTIMISTIC':
			return {
				punches : state.punches.map(p => {
					var newObj = Object.assign({}, p);
					if (p.punchID == action.punchID) {
						newObj.punchDate = action.punchDate;
					}
					return newObj;
				})
			};
		case 'DELETE_PUNCH_OPTIMISTIC':
			return {
				punches : state.punches.filter(p => {
					return p.punchID != action.punchID;
				})
			};
		case 'PUNCH_EXISTING_TASK_OPTIMISTIC':
			return {
				punches : [{
					taskName : action.taskName,
					punchDate : action.punchDate,
					punchID : action.tempPunchID,
					taskID : action.taskID
				}, ...state.punches]
			};
		default:
			return {};
		}
	}(action)));

	// Sort and add durationMillis
	if (newState.punches) newState.punches = newState.punches.sort(sortPunches).map((punch, i, punches) => {
		let end = (function() {
			if (i == 0) return moment().add((newState.dayOffset || state.dayOffset || 0), 'days');
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
