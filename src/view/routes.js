import React from 'react';//eslint-disable-line no-unused-vars
import {Route} from 'react-router';

import App from './containers/App';
import NotFound from './containers/NotFound';

export default () => {
	return (
		<Route path="/" component={App}>
			{ /* Catch all route */ }
			<Route path="*" component={NotFound} status={404} />
		</Route>
	);
};
