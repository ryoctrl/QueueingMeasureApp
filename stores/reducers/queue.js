import { createReducer } from 'redux-act';
import { 
    updateQueueList, 
    fetchUncompletedQueue, 
    successFetchUncompletedQueue,  
    failureFetchUncompletedQueue,
} from '../actions';

const initialState = {
    isFetching: false,
    queue: [],
    selecting: { id: -1},
    error: null,
};

export default createReducer({
    [fetchUncompletedQueue]: (state, action) => {
        const newState = Object.assign({}, state);
        newState.isFetching = true;
        return newState;
    },
    [successFetchUncompletedQueue]: (state, action) => {
        const newState = Object.assign({}, state);
        newState.isFetching = false;
        newState.queue = action.data;
        return newState;
    },
    [failureFetchUncompletedQueue]: (state, action) => {
        const newState = Object.assign({}, state);
        newState.isFetching = false;
        newState.error = action.error;
        return newState;
    },
    [updateQueueList]: (state, action) => {
        const newState = Object.assign({}, state);
        const data = action;
        const targetAsAry = newState.queue.filter(q => q.id === data.id);
        if(targetAsAry.length === 0) {
            newState.queue.push(data);
        } else {
            const queueObj = targetAsAry[0];
            Object.entries(data).map(([k, v]) => {
                queueObj[k] = v;
            });
        }
        return newState;
    },
}, initialState);