import moment from 'moment';
import React from 'react'; //eslint-disable-line no-unused-vars
import { connect } from 'react-redux';

import { Table } from 'react-bootstrap';

const UnenteredDaysReport = (props) => {
	return <Table striped bordered condensed hover cellSpacing="5">
		<tbody>
			<tr>
				<th>Unentered Days</th>
			</tr>
			{props.unenteredDays.map(day =>
				<tr key={day}><td>
					{moment(day).format("MM/DD/YYYY")}
				</td></tr>
			)}
		</tbody>
	</Table>;
};

export default connect(
	// mapStateToProps
	state => {
		return {unenteredDays: state.punchData.unenteredDays};
	}
)(UnenteredDaysReport);
