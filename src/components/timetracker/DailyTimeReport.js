import React from 'react';
import { connect } from 'react-redux'

import { roundToDecimalPlaces } from '../../util'

const DailyTimeReport_Unwrapped = (props) => {
	const getTimePerTask = () => {
		var taskHash = props.punches.reduce((prev, punch) => {
			if (punch.taskID == -1) return prev;
			if (undefined === prev[String(punch.taskID)]) {
				prev[String(punch.taskID)] = {
					taskName: punch.taskName,
					seconds: 0
				};
			}
			if (!!punch.intervalSeconds) prev[String(punch.taskID)].seconds += punch.intervalSeconds
			return prev;
		}, {});
		var result = []
		for (var taskID in taskHash) {
			result.push(Object.assign(taskHash[taskID], {taskID}))
		}
		return result
	};

	let totalSeconds = getTimePerTask().reduce((prev, e) => {
		return prev += e.seconds
	}, 0);

	return <table cellSpacing="5">
		<tbody>
			<tr>
				<th>Task</th>
				<th>Minutes</th>
				<th>Hours</th>
			</tr>
			{getTimePerTask().map(e =>
				<tr key={e.taskID}><td>
					{e.taskName}
				</td><td>
					{roundToDecimalPlaces((e.seconds / 60),2)}
				</td><td>
					{roundToDecimalPlaces((e.seconds / (60 * 60)),2)}
				</td></tr>
			)}
			<tr><td>
				<b>Total:</b>
			</td><td>
				{roundToDecimalPlaces((totalSeconds / 60),2)}
			</td><td>
				{roundToDecimalPlaces((totalSeconds / (60 * 60)),2)}
			</td></tr>
		</tbody>
	</table>
};

const DailyTimeReport = connect(
	// mapStateToProps
	state => {
		return {punches: state.punchData.punches}
	}
)(DailyTimeReport_Unwrapped)

export default DailyTimeReport
