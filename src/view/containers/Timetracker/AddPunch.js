import React from 'react';
import { connect } from 'react-redux';

import { asyncActions } from './redux/action-creators';
import { mapToEnterPress } from '../../../app-util';

@connect(
	// mapStateToProps
	state => ({
		punches: state.punchData.punches,
		tasks: state.punchData.tasks,
		dayOffset : state.punchData.dayOffset,
		asyncIDCounter : state.punchData.asyncIDCounter
	}),
	// mapDispathToProps
	dispatch => ({
		punchNewTask: (newTaskName, dayOffset, asyncIDCounter) => {
			if (newTaskName.value.length == 0) return;
			asyncActions.newTask(dispatch, {taskName : newTaskName.value, dayOffset, asyncIDCounter});
			newTaskName.value = null;
		},
		punchExistingTask:  (existingTask, dayOffset, asyncIDCounter) => {
			asyncActions.existingTask(dispatch, {taskIDAndName : existingTask.value, dayOffset, asyncIDCounter});
			existingTask.value = '';
		},
		updateDayOffset: (dayOffset) => {
			asyncActions.getPunches(dispatch, {dayOffset : dayOffset.value});
		}
	})
)
class AddPunch extends React.Component {
	constructor() {
		super();
	}
	componentDidMount() {
		this.refs.dayOffset.value = this.props.dayOffset;
	}
	render() {
		const determineSubmitTypeAndSubmit = () => {
			let doNewTask = (this.refs.newTaskName.value.length > 0);
			let doExistingTask = (this.refs.existingTask.value != '');
			if (doNewTask && !doExistingTask) this.props.punchNewTask(this.refs.newTaskName, this.props.dayOffset, this.props.asyncIDCounter);
			else if (!doNewTask && doExistingTask) this.props.punchExistingTask(this.refs.existingTask, this.props.dayOffset, this.props.asyncIDCounter);
		};

		const punchOut = () => {
			this.props.punchExistingTask({ value : '-1_OUT' }, this.props.dayOffset, this.props.asyncIDCounter);
		};

		return <div>
			<input size={7} onKeyPress={mapToEnterPress(
				this,
				() => this.props.updateDayOffset(this.refs.dayOffset)
			)} type='text' ref='dayOffset'>
			</input>
			<input onKeyPress={mapToEnterPress(
					this,
					() => this.props.punchNewTask(this.refs.newTaskName, this.props.dayOffset, this.props.asyncIDCounter),
					() => { this.refs.existingTask.value = ''; }
				)}
				type='text' ref='newTaskName'>
			</input>
			<select ref='existingTask' onChange={() => { this.refs.newTaskName.value = null; }}>
				<option value={''}>- Select -</option>
				{this.props.tasks.map(t =>
					<option value={t.taskID + '_' + t.taskName} key={t.taskID}>
						{t.taskName}
					</option>
				)}
			</select>
			<a href='#' onClick={determineSubmitTypeAndSubmit} >Punch </a>
			&nbsp;&nbsp;
			<a href='#' onClick={punchOut} >Out </a>
		</div>;
	}
}

export default AddPunch;
