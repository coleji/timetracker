import React from 'react';
import moment from 'moment';
moment().format();

import { mapToEnterPress } from '../../../app-util';

class DateComponent extends React.Component {
	constructor() {
		super();
	}
	render() {
		const updatePunch = () => {
			this.props.updatePunch(
				this.props.punch.punchID,
				this.props.punch.punchDate,
				this.refs.minutesInput.value
			);
			this.refs.minutesInput.value = null;
		};

		const deletePunch = () => {
			if (confirm('Do you really want to delete this punch?')) this.props.deletePunch(this.props.punch.punchID);
		};

		return <tr>
			<td> <a href="#" onClick={deletePunch}>[{this.props.punch.punchID}]</a> </td>
			<td> {moment(this.props.punch.punchDate).format('MM/DD/YYYY hh:mmA')} </td>
			<td> {this.props.punch.taskName } </td>
			<td> {moment.duration(+this.props.punch.durationMillis).humanize()} </td>
			<td>
				<input ref="minutesInput" type="text" size="5"
					onKeyPress={mapToEnterPress(this,updatePunch)}>
				</input>
				&nbsp;
				<a href="#" onClick={updatePunch}>Update</a>
			</td>
		</tr>;
	}
}

export default DateComponent;
