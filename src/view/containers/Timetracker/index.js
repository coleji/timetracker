import React from 'react';
import { connect } from 'react-redux'; //eslint-disable-line no-unused-vars

import { Table } from 'react-bootstrap';
import DateReport from './DateReport';
import { asyncActions } from './redux/action-creators';//eslint-disable-line no-unused-vars
import AddPunch from './AddPunch';
import DailyTimeReport from './DailyTimeReport';

var config = {};

@connect(
	state => ({ config: state.config}),
	dispatch => ({
		getPunches: (dayOffset) => {
			asyncActions.getPunches(config, dispatch, {dayOffset});
		}
	})
)
class Timetracker extends React.Component {
	constructor() {
		super();
	}
	componentDidMount() {
		config = this.props.config;
		this.props.getPunches(0);
	}
	render() {
		return (
			<Table ><tbody><tr style={{verticalAlign: 'top'}}><td>
				<AddPunch />
				<DateReport />
			</td><td>
				<DailyTimeReport />
			</td><td></td></tr></tbody></Table>
		);
	}
}

module.exports = Timetracker;
