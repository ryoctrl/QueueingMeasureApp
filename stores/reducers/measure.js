import { createReducer } from 'redux-act';
import MEASURE_TYPES from '../../constants/measureType';
import {
    setMeasure,
    selectQueue,
    updateMeasureQueue
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
    [updateMeasureQueue]: (state, queueState) => {
        const newState = Object.assign({}, state);

        const isInitialState = state.queue.id === -1;
        const needMeasureCount = queueState.needMeasureQueue.length;

        if(isInitialState && needMeasureCount === 0) return state;

        if(needMeasureCount === 0)  {
            newState.queue = { id: -1 }
            return newState;
        }

        const measureingQueue = queueState.needMeasureQueue.filter(q => q.id === state.queue.id);

        if(isInitialState || measureingQueue.length === 0) {
            newState.queue = queueState.needMeasureQueue[0];
            return newState;
        }

        return state;
    }
}, initialState);