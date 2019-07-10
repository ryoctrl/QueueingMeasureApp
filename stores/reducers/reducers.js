import { combineReducers } from 'redux';
import measure from './measure';
import queue from './queue';

export default combineReducers({
    measure,
    queue
});