import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import reducer from '../../redux/timetracker/'
import DateReport from './DateReport'
import { getPunches } from '../../redux/timetracker/tasks/action-creators'
import AddPunch from './AddPunch'
import DailyTimeReport from './DailyTimeReport'

let store = createStore(reducer);
class App extends React.Component {
	constructor() {
		super()
	}
	componentDidMount() {
		getPunches(store.dispatch, 0)
	}
	render() {
		return (
			<Provider store={store}>
				<table ><tbody><tr style={{verticalAlign: 'top'}}><td>
					<AddPunch />
					<DateReport />
				</td><td width="20%"></td><td>
					<DailyTimeReport />
				</td></tr></tbody></table>
			</Provider>
		);
	}
}

module.exports = App;
