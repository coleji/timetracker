import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

@connect(
	() => ({}),
	() => ({
		changePassword: () => {}
	})
)
class Timetracker extends React.Component {
	constructor() {
		super();
	}
	render() {
		return (
			<div>
				<Link to="/">Main</Link>
			</div>
		);
	}
}

module.exports = Timetracker;
