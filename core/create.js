import { createStore as _createStore, applyMiddleware, compose } from 'redux';
import { syncHistory } from 'react-router-redux';

import createMiddleware from './clientMiddleware';

export default function createStore(history, client, data) {
	// Sync dispatched route actions to the history
	const reduxRouterMiddleware = syncHistory(history);

	const middleware = [createMiddleware(client), reduxRouterMiddleware];

	let finalCreateStore;
	if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
		const { persistState } = require('redux-devtools');
		const DevTools = require('./DevTools/DevTools');
		finalCreateStore = compose(
			applyMiddleware(...middleware),
			window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
			persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
		)(_createStore);
	} else {
		finalCreateStore = applyMiddleware(...middleware)(_createStore);
	}

	const reducer = require('../src/reducer');
	const store = finalCreateStore(reducer, data);

	reduxRouterMiddleware.listenForReplays(store);

	if (__DEVELOPMENT__ && module.hot) {
		module.hot.accept('../src/reducer', () => {
			store.replaceReducer(require('../src/reducer'));
		});
	}

	return store;
}
