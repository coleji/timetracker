import React from 'react'
import moment from 'moment'
moment().format();

import { mapToEnterPress } from '../../util'

class DateComponent extends React.Component {
	constructor() {
		super()
	}
	render() {
		const updatePunch = () => this.props.updatePunch(
			this.props.punch.punchID,
			this.props.punch.punchDate,
			this.refs.minutesInput.value
		);

		return <tr>
			<td> {moment(this.props.punch.punchDate).format("MM/DD/YYYY hh:mmA")} </td>
			<td> {this.props.punch.taskName } </td>
			<td>
				<input ref="minutesInput" type="text" size="5"
					onKeyPress={mapToEnterPress(this,updatePunch)}>
				</input>
				&nbsp;
				<a href="#" onClick={updatePunch}>Update</a>
			</td>
		</tr>
	}
}

export default DateComponent
