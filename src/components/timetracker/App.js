import React from 'react';
import { connect } from 'react-redux'; //eslint-disable-line no-unused-vars

import DateReport from './DateReport';
import { getPunches as getPunchesAction } from '../../redux/timetracker/tasks/action-creators';//eslint-disable-line no-unused-vars
import AddPunch from './AddPunch';
import DailyTimeReport from './DailyTimeReport';

@connect(
	state => {
		return {}
	},
	dispatch => { return {
		getPunches: (dayOffset) => {
			getPunchesAction(dispatch, dayOffset)
		}
	}}
)
class App extends React.Component {
	constructor() {
		super();
	}
	componentDidMount() {
		this.props.getPunches(0);
	}
	render() {
		return (
			<table ><tbody><tr style={{verticalAlign: 'top'}}><td>
				<AddPunch />
				<DateReport />
			</td><td width="20%"></td><td>
				<DailyTimeReport />
			</td></tr></tbody></table>
		);
	}
}

module.exports = App;
