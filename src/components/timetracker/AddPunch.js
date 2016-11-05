import React from 'react'
import { connect } from 'react-redux'

import { newTask, existingTask as existingTaskActionCreator, getPunches } from '../../redux/timetracker/tasks/action-creators'
import { mapToEnterPress } from '../../util'

class AddPunch_Unwrapped extends React.Component {
	constructor() {
		super()
	}
	componentDidMount() {
		this.refs.dayOffset.value = this.props.dayOffset
	}
	render() {
		const determineSubmitTypeAndSubmit = () => {
			let doNewTask = (this.refs.newTaskName.value.length > 0);
			let doExistingTask = (this.refs.existingTask.value != "");
			if (doNewTask && !doExistingTask) this.props.punchNewTask(this.refs.newTaskName, this.props.dayOffset)
			else if (!doNewTask && doExistingTask) this.props.punchExistingTask(this.refs.existingTask, this.props.dayOffset)
		};

		const punchOut = () => {
			this.props.punchExistingTask({ value : "-1_OUT" }, this.props.dayOffset)
		};

		return <div>
			<input size={7} onKeyPress={mapToEnterPress(
				this,
				() => this.props.updateDayOffset(this.refs.dayOffset)
			)} type="text" ref="dayOffset">
			</input>
			<input onKeyPress={mapToEnterPress(
					this,
					() => this.props.punchNewTask(this.refs.newTaskName, this.props.dayOffset),
					() => { this.refs.existingTask.value = ""; }
				)}
				type="text" ref="newTaskName">
			</input>
			<select ref="existingTask" onChange={() => { this.refs.newTaskName.value = null }}>
				<option value={""}>- Select -</option>
				{this.props.tasks.map(t =>
					<option value={t.taskID + "_" + t.taskName} key={t.taskID}>
						{t.taskName}
					</option>
				)}
			</select>
			<a href="#" onClick={determineSubmitTypeAndSubmit} >Punch </a>
			&nbsp;&nbsp;
			<a href="#" onClick={punchOut} >Out </a>
		</div>
	}
}

const AddPunch = connect(
	// mapStateToProps
	state => {
		return {
			punches: state.punchData.punches,
			tasks: state.punchData.tasks,
			dayOffset : state.punchData.dayOffset
		}
	},
	// mapDispathToProps
	dispatch => {
		return {
			punchNewTask: (newTaskName, dayOffset) => {
				if (newTaskName.value.length == 0) return;
				newTask(dispatch, newTaskName.value, dayOffset);
				newTaskName.value = null;
			},
			punchExistingTask:  (existingTask, dayOffset) => {
				existingTaskActionCreator(dispatch, existingTask.value, dayOffset);
				existingTask.value = "";
			},
			updateDayOffset: (dayOffset) => {
				getPunches(dispatch, dayOffset.value)
			}
		}
	}
)(AddPunch_Unwrapped)

export default AddPunch
