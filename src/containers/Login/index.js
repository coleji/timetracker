import React from 'react';
import { connect } from 'react-redux';
//import { Link } from 'react-router';

import login from './redux/action-creators';

@connect(
	// mapStateToProps
	() => ({}),
	// mapDispathToProps
	dispatch => ({
		login: (userName, password) => {
			login(dispatch, {userName, password});
		}
	})
)
class Login extends React.Component {
	constructor() {
		super();
	}
	handleSubmit = (event) => {
		event.preventDefault();
		const usernameField = this.refs.username;
		const passwordField = this.refs.password;
		this.props.login(usernameField.value, passwordField.value);
		usernameField.value = '';
		passwordField.value = '';
	}
	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				{/* <Link to="/home">Home</Link><br /> */ }
				<input type="text" ref="username" /><br />
				<input type="password" ref="password" /><br />
				<input type="submit" />
			</form>
		);
	}
}

module.exports = Login;
