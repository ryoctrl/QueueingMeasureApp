import { createReducer } from 'redux-act';
import { 
    fetchQueue,
    updateQueueList, 
    fetchUncompletedQueue, 
    successFetchUncompletedQueue,  
    failureFetchUncompletedQueue,
    successFetchQueue,
    failureFetchQueue,
} from '../actions';

const initialState = {
    isFetching: false,
    queue: [],
    needMeasureQueue: [],
    error: null,
};

const isCompleted = queue => queue.queueing_at && queue.ordered_at && queue.paymented_at && queue.serviced_at && queue.handed_at;

export default createReducer({
    [fetchQueue]: (state, action) => {
        const newState = Object.assign({}, state);
        newState.isFetching = true;
        return newState;
    },
    [successFetchQueue]: (state, action) => {
        const newState = Object.assign({}, state);
        newState.isFetching = false;
        newState.queue = action.data;
        return newState;
    },
    [failureFetchQueue]: (state, action) => {
        const newState = Object.assign({}, state);
        newState.isFetching = false;
        newState.error = action.error;
        return newState;
    },

    [fetchUncompletedQueue]: (state, action) => {
        const newState = Object.assign({}, state);
        newState.isFetching = true;
        return newState;
    },
    [successFetchUncompletedQueue]: (state, action) => {
        const newState = Object.assign({}, state);
        newState.isFetching = false;
        newState.needMeasureQueue = action.data;
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


        let targetAsAry = newState.needMeasureQueue.filter(q => q.id === data.id);
        // 要計測Queueか否か
        if(isCompleted(data)) {
            if(targetAsAry.length === 0) return state;
            const idx = newState.needMeasureQueue.indexOf(targetAsAry[0]);
            newState.needMeasureQueue.splice(idx, 1);
        } else {
            if(targetAsAry.length === 0) {
                newState.needMeasureQueue.push(data);
            } else {
                const queue = targetAsAry[0];
                Object.entries(data).map(([k, v]) => queue[k] = v)
            }
        }

        targetAsAry = newState.queue.filter(q => q.id === data.id);

        if(targetAsAry.length === 0) {
            newState.queue.push(data);
            return newState;
        }
        const queue = targetAsAry[0];
        Object.entries(data).map(([k, v]) => queue[k] = v)
        return newState;
    },
}, initialState);