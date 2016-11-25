import React from 'react';
import { connect } from 'react-redux';
import login from './redux/action-creators';

@connect(
	// mapStateToProps
	() => ({}),
	// mapDispathToProps
	dispatch => ({
		login: (userName) => {
			login(dispatch, {userName});
		}
	})
)
class Login extends React.Component {
	constructor() {
		super();
	}
	handleSubmit = (event) => {
		event.preventDefault();
		const input = this.refs.username;
		this.props.login(input.value);
		input.value = '';
	}
	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<input type="text" ref="username" />
				<input type="submit" />
			</form>
		);
	}
}

module.exports = Login;
