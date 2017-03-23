import React from 'react'; //eslint-disable-line no-unused-vars
import { connect } from 'react-redux';
import moment from 'moment';

import { Table } from 'react-bootstrap';
import DateComponent from './DateComponent';
import { asyncActions } from './redux/action-creators';
import { sortPunches } from '../../../app-util';

var config = {};

@connect(
	// mapStateToProps
	state => ({
		punches: state.punchData.punches,
		enteredTime: state.punchData.enteredTime,
		dayOffset : state.punchData.dayOffset,
		config: state.config
	}),
	// mapDispathToProps
	dispatch => {
		return {
			updatePunch: (punchID, punchDate, deltaMinutes) => {
				asyncActions.updatePunch(config, dispatch, {punchID, punchDate, deltaMinutes});
			},
			deletePunch: (punchID) => {
				asyncActions.deletePunch(config, dispatch, {punchID});
			},
			enterTime: (dayOffset, isEntered) => {
				if (!isEntered) {
					if (confirm("Are you sure you want to stamp this day as Entered?")) asyncActions.enterTime(config, dispatch, {dayOffset});
				} else {
					if (confirm("Are you sure you want to stamp this day as Unentered?")) asyncActions.unenterTime(config, dispatch, {dayOffset});
				}

			}
		};
	}
)
class DateReport extends React.Component {
	componentDidMount() { config = this.props.config; }
	render() {
		return <Table striped bordered condensed hover cellSpacing="5">
			<tbody>
				<tr>
					<th>Del</th>
					<th>Punch
						({moment().add(this.props.dayOffset, 'days').format('MM/DD/YYYY')})
						{"   "}
						<span onClick={this.props.enterTime.bind(this, this.props.dayOffset, this.props.enteredTime)}>
							{this.props.enteredTime ? <img src="rsz_green-check.png" /> : <img src="rsz_redx.png" />}
							{" "}
							{this.props.enteredTime ? "Entered" : "Not Entered"}
						</span>
					</th>
					<th>Task ({this.props.punches.length})</th>
					<th>Duration</th>
					<th>Actions</th>
				</tr>
				{this.props.punches.sort(sortPunches).map(e =>
					<DateComponent key={e.punchID} punch={e} updatePunch={this.props.updatePunch} deletePunch={this.props.deletePunch}/>
				)}
			</tbody>
		</Table>;
	}
}

export default DateReport;
