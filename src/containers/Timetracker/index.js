import React from 'react';
import { connect } from 'react-redux'; //eslint-disable-line no-unused-vars
import { Table } from 'react-bootstrap';

import DateReport from './DateReport';
import { asyncActions } from './redux/action-creators';//eslint-disable-line no-unused-vars
import AddPunch from './AddPunch';
import DailyTimeReport from './DailyTimeReport';
import OptionsBar from './OptionsBar';

@connect(
	() => ({}),
	dispatch => ({
		getPunches: (dayOffset) => {
			asyncActions.getPunches(dispatch, {dayOffset});
		}
	})
)
class Timetracker extends React.Component {
	constructor() {
		super();
	}
	componentDidMount() {
		this.props.getPunches(0);
	}
	render() {
		return (
			<Table ><tbody><tr style={{verticalAlign: 'top'}}><td>
				<AddPunch />
				<DateReport />
			</td><td>
				<OptionsBar />
				<DailyTimeReport />
			</td><td></td></tr></tbody></Table>
		);
	}
}

module.exports = Timetracker;
