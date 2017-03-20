import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import changePasswordActionCreator from './redux/action-creators';

var config;

@connect(
	state=> ({ config: state.config }),
	dispatch => ({
		changePassword: (oldPw, newPw) => {
			changePasswordActionCreator(config, dispatch, {oldPw, newPw});
		}
	})
)
class Timetracker extends React.Component {
	constructor() {
		super();
	}
	componentDidMount() { config = this.props.config; }
	handleSubmit = (event) => {
		event.preventDefault();
		const oldPw = this.refs.oldPw;
		const newPw1 = this.refs.newPw1;
		const newPw2 = this.refs.newPw2;
		if (newPw1.value != newPw2.value) {
			alert("new passwords do not match");
		}
		this.props.changePassword(oldPw.value, newPw1.value);
	}
	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<Link to="/">Main</Link>
				<input type="password" ref="oldPw" /><br />
				<input type="password" ref="newPw1" /><br />
				<input type="password" ref="newPw2" /><br />
				<input type="submit" />
			</form>
		);
	}
}

module.exports = Timetracker;
