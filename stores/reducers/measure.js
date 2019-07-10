import { createReducer } from 'redux-act';
import MEASURE_TYPES from '../../constants/measureType';
import {
    setMeasure,
    selectQueue
} from '../actions';

const initialState = {
    type: MEASURE_TYPES.NONE,
    queue: { id: -1 }
}

export default createReducer({
    [setMeasure]: (state, action) => {
        const newState = Object.assign({}, state);
        newState.type = action;
        return newState;
    },
    [selectQueue]: (state, action) => {
        const newState = Object.assign({}, state);
        if(state.type !== MEASURE_TYPES.ORDER) return state;
        newState.queue = action;
        return newState;
    },
}, initialState);