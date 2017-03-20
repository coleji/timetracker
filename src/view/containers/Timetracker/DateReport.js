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
					<th>Punch ({moment().add(this.props.dayOffset, 'days').format('MM/DD/YYYY')})</th>
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
