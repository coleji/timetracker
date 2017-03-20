import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { logout } from './redux/action-creators';

var config = {};

@connect(
	// mapStateToProps
	state => ({
		config: state.config,
		userName: state.auth.userName
	}),
	// mapDispathToProps
	dispatch => ({
		logout: () => {
			logout(config, dispatch);
		}
	})
)
class OptionsBar extends React.Component {
	constructor() {
		super();
	}
	componentDidMount() {
		config = this.props.config;
	}
	render() {
		return <div>
			<Link to="options">Options</Link>&nbsp;&nbsp;
			<a href='#' onClick={this.props.logout} >Logout </a>&nbsp;&nbsp;
			Username: {this.props.userName}
		</div>;
	}
}

export default OptionsBar;
