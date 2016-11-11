import React from 'react'; //eslint-disable-line no-unused-vars
import { connect } from 'react-redux';

import { roundToDecimalPlaces } from '../../node-util';

const DailyTimeReport_Unwrapped = (props) => {
	let totalTimeMillis = props.tasks.reduce(((total, task) => total + task.totalTimeMillis), 0);

	return <table cellSpacing="5">
		<tbody>
			<tr>
				<th>Task</th>
				<th>Minutes</th>
				<th>Hours</th>
			</tr>
			{props.tasks.map(task =>
				<tr key={task.taskID}><td>
					{task.taskName}
				</td><td>
					{roundToDecimalPlaces(task.totalTimeMillis / (1000 * 60),2)}
				</td><td>
					{roundToDecimalPlaces(task.totalTimeMillis / (1000 * 60 * 60),2)}
				</td></tr>
			)}
			<tr><td>
				<b>Total:</b>
			</td><td>
				{roundToDecimalPlaces(totalTimeMillis / (1000 * 60),2)}
			</td><td>
				{roundToDecimalPlaces(totalTimeMillis / (1000 * 60 * 60),2)}
			</td></tr>
		</tbody>
	</table>;
};

const DailyTimeReport = connect(
	// mapStateToProps
	state => {
		return {tasks: state.punchData.tasks};
	}
)(DailyTimeReport_Unwrapped);

export default DailyTimeReport;
