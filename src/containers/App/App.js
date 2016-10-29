import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { IndexLink } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Helmet from 'react-helmet';
import { routeActions } from 'react-router-redux';
import config from '../../config';
import { asyncConnect } from 'redux-async-connect';

import Timetracker from '../../components/timetracker/App'

@asyncConnect([{
	promise: () => {
		const promises = [];
		return Promise.all(promises);
	}
}])
@connect(
	() => ({}),
	{pushState: routeActions.push})
export default class App extends Component {
	static contextTypes = {
		store: PropTypes.object.isRequired
	};

	componentWillReceiveProps() {
	}

	handleLogout = (event) => {
		event.preventDefault();
	};

	render() {
		return (
			<div>
				<Helmet {...config.app.head}/>
				<Timetracker />
			</div>
		);
	}
}
