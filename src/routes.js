import React from 'react';//eslint-disable-line no-unused-vars
import {Route} from 'react-router';
import { App, NotFound } from 'containers';

export default () => {
	return (
		<Route path="/" component={App}>
			{ /* Catch all route */ }
			<Route path="*" component={NotFound} status={404} />
		</Route>
	);
};
