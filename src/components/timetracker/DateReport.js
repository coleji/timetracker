import React from 'react';
import { connect } from 'react-redux'
import moment from 'moment'

import DateComponent from './DateComponent'
import { updatePunch as updatePunchAction, deletePunch as deletePunchAction } from '../../redux/timetracker/tasks/action-creators'
import { sortPunches } from '../../node-util'

const DateReport_Unwrapped = (props) => {
	return <table cellSpacing="5">
		<tbody>
			<tr>
				<th>Del</th>
				<th>Punch ({moment().add(props.dayOffset, 'days').format('MM/DD/YYYY')})</th>
				<th>Task ({props.punches.length})</th>
				<th>Duration</th>
				<th>Actions</th>
			</tr>
			{props.punches.sort(sortPunches).map(e =>
				<DateComponent key={e.punchID} punch={e} updatePunch={props.updatePunch} deletePunch={props.deletePunch}/>
			)}
		</tbody>
	</table>
};

const DateReport = connect(
	// mapStateToProps
	state => {
		return {punches: state.punchData.punches, dayOffset : state.punchData.dayOffset}
	},
	// mapDispathToProps
	dispatch => {
		return {
			updatePunch: (punchID, punchDate, deltaMinutes) => {
				updatePunchAction(dispatch, punchID, punchDate, deltaMinutes)
			},
			deletePunch: (punchID) => {
				deletePunchAction(dispatch, punchID)
			}
		}
	}
)(DateReport_Unwrapped)

export default DateReport
