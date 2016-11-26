import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { logout } from './redux/action-creators';

@connect(
	// mapStateToProps
	() => ({}),
	// mapDispathToProps
	dispatch => ({
		logout: () => {
			logout(dispatch);
		}
	})
)
class OptionsBar extends React.Component {
	constructor() {
		super();
	}

	render() {
		return <div>
			<Link to="options">Options</Link>&nbsp;&nbsp;
			<a href='#' onClick={this.props.logout} >Logout </a>
		</div>;
	}
}

export default OptionsBar;
