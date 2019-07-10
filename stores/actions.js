import { createAction } from 'redux-act';
import { create } from 'uuid-js';

export const SET_MEASURE = 'SET_MEASURE';
export const setMeasure = createAction(SET_MEASURE);

export const FETCH_UNCOMPLETED_QUEUE = 'FETCH_UNCOMPLETED_QUEUE';
export const SUCCESS_FETCH_UNCOMPLETED_QUEUE = 'SUCCESS_FETCH_UNCOMPLETED_QUEUE';
export const FAILURE_FETCH_UNCOMPLETED_QUEUE = 'FAILURE_FETCH_UNCOMPLETED_QUEUE';
export const NEW_QUEUE = 'NEW_QUEUE';
export const UPDATE_ORDER = 'UPDATE_ORDER';
export const UPDATE_PAYMENT = 'UPDATE_PAYMENT';
export const UPDATE_SERVICE = 'UPDATE_SERVICE';
export const UPDATE_QUEUE_LIST = 'UPDATE_QUEUE_LIST';

export const fetchUncompletedQueue = createAction(FETCH_UNCOMPLETED_QUEUE);
export const successFetchUncompletedQueue = createAction(SUCCESS_FETCH_UNCOMPLETED_QUEUE);
export const failureFetchUncompletedQueue = createAction(FAILURE_FETCH_UNCOMPLETED_QUEUE);
export const createNewQueue = createAction(NEW_QUEUE);
export const updateQueueOrder = createAction(UPDATE_ORDER);
export const updateQueuePayment = createAction(UPDATE_PAYMENT);
export const updateQueueService = createAction(UPDATE_SERVICE);
export const updateQueueList = createAction(UPDATE_QUEUE_LIST);

export const SELECT_QUEUE = 'SELECT_QUEUE';
export const selectQueue = createAction(SELECT_QUEUE);