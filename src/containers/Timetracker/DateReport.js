import React from 'react'; //eslint-disable-line no-unused-vars
import { connect } from 'react-redux';
import moment from 'moment';

import DateComponent from './DateComponent';
import { updatePunch as updatePunchAction, deletePunch as deletePunchAction } from './redux/action-creators';
import { sortPunches } from '../../app-util';

@connect(
	// mapStateToProps
	state => {
		return {punches: state.punchData.punches, dayOffset : state.punchData.dayOffset};
	},
	// mapDispathToProps
	dispatch => {
		return {
			updatePunch: (punchID, punchDate, deltaMinutes) => {
				updatePunchAction(dispatch, punchID, punchDate, deltaMinutes);
			},
			deletePunch: (punchID) => {
				deletePunchAction(dispatch, punchID);
			}
		};
	}
)
class DateReport extends React.Component {
	render() {
		return <table cellSpacing="5">
			<tbody>
				<tr>
					<th>Del</th>
					<th>Punch ({moment().add(this.props.dayOffset, 'days').format('MM/DD/YYYY')})</th>
					<th>Task ({this.props.punches.length})</th>
					<th>Duration</th>
					<th>Actions</th>
				</tr>
				{this.props.punches.sort(sortPunches).map(e =>
					<DateComponent key={e.punchID} punch={e} updatePunch={this.props.updatePunch} deletePunch={this.props.deletePunch}/>
				)}
			</tbody>
		</table>;
	}
}

export default DateReport;
