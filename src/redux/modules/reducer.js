import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';

import punchData from '../timetracker/tasks/reducer'
import dayOffset from '../timetracker/dayOffset/reducer'

import {reducer as form} from 'redux-form';

export default combineReducers({
  routing: routeReducer,
  reduxAsyncConnect,
  form,
  punchData,
  dayOffset
});
