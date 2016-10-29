import moment from 'moment'
moment().format();

const DEFAULT_STATE = {
	punches: [],
	tasks : [],
	dayOffset : 0
};

const getTasksFromPunches = punches => {
	let taskHash = punches.reduce((prev, punch) => {
		prev[String(punch.taskID)] = punch.taskName;
		return prev
	}, {})
	let taskArray = [];
	for (var taskID in taskHash) {
		taskArray.push({
			taskID,
			taskName : taskHash[taskID]
		});
	}
	return taskArray.sort((a,b) => a.taskID > b.taskID)
}

const addTimeToPunches = punches => {
	// punches are in reverse order.  The oldest punch is the last one in the array.
	// So first time interval is (2nd to last ) - (last) etc
	for (var i=punches.length-1; i>=1; i--) {
		var start = punches[i].punchDate;
		var end = punches[i-1].punchDate;
		punches[i].intervalSeconds = moment(end).diff(moment(start), 'seconds');
	}
}

export default function(state = DEFAULT_STATE, action) {
	switch (action.type) {
	case "GET_PUNCHES":
		var result = {
			punches: action.punches,
			tasks : getTasksFromPunches(action.punches),
			dayOffset : action.dayOffset
		};
		break;
	case "PUNCH_NEW_TASK_OPTIMISTIC":
		var newPunchList = [{
			taskName : action.taskName,
			punchDate : action.punchDate,
			punchID : action.tempPunchID,
			taskID : action.tempTaskID
		}, ...state.punches];
		var result = {
			punches : newPunchList,
			tasks : getTasksFromPunches(newPunchList),
			dayOffset : state.dayOffset
		};
		break;
	case "PUNCH_NEW_TASK_DB_RETURN":
		var result = {
			punches : state.punches.map(p => { return {
				taskName : p.taskName,
				punchDate : p.punchDate,
				punchID : (p.punchID == action.tempPunchID) ? action.punchID : p.punchID,
				taskID : (p.taskID == action.tempTaskID) ? action.taskID : p.taskID
			}}),
			tasks: state.tasks,
			dayOffset : state.dayOffset
		};
		break;
	case "UPDATE_PUNCH_OPTIMISTIC":
		var result = {
			punches : state.punches.map(p => {
				var newObj = Object.assign({}, p);
				if (p.punchID == action.punchID) {
					p.punchDate = action.punchDate;
				}
				return p;
			}),
			tasks : state.tasks,
			dayOffset : state.dayOffset
		};
		break;
	case "PUNCH_EXISTING_TASK_OPTIMISTIC":
		var newPunchList = [{
			taskName : action.taskName,
			punchDate : action.punchDate,
			punchID : action.tempPunchID,
			taskID : action.taskID
		}, ...state.punches];
		var result = {
			punches : newPunchList,
			tasks : getTasksFromPunches(newPunchList),
			dayOffset : state.dayOffset
		};
		break;
	default:
		var result = state;
	}
	addTimeToPunches(result.punches)
	return result;
};
