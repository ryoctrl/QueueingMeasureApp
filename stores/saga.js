import io from 'socket.io-client';
import { fork, take, call, put, select, join } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { API_HOST } from '../constants/api';
import { 
    fetchQueue,
    newQueue,
    updateOrder,
    updatePayment,
    updateService
} from './api';

import {
    fetchUncompletedQueue,
    createNewQueue,
    updateQueueOrder,
    updateQueuePayment,
    updateQueueService,
    updateQueueList,
    successFetchUncompletedQueue,
    failureFetchUncompletedQueue
} from './actions';

const webSocketOption = {
    timeout: 10000,
    jsonp: false,
    transports: ['websocket'],
    autoConnect: true
};

const connect = () => {
    const socket = io(API_HOST, webSocketOption);
    return new Promise(resolve => {
        socket.on('connect', () => {
            resolve(socket);
        });
    });
};

const subscribe = socket => {
    return eventChannel(emit => {
        socket.on('queue.update', message => {
            emit(updateQueueList(message));
        });
        return () => {};
    });
};

function* read(socket) {
    const channel = yield call(subscribe, socket);
    while(true) {
        const action = yield take(channel);
        yield put(action);
    }
}

function* handleIO(socket) {
    yield fork(read, socket);
}

function* socketFlow() {
    const socket = yield call(connect);
    yield fork(handleIO, socket);
}

function* queueInitialize() {
    yield take(fetchUncompletedQueue);
    const { data, error } = yield call(fetchQueue);
    if(data && !error) {
        yield put(successFetchUncompletedQueue({data}));
    } else {
        yield put(failureFetchUncompletedQueue({error}));
    }
}

function* newQueueFlow() {
    while(true) {
        yield take(createNewQueue);
        yield call(newQueue);
    }
}

function*  updateOrderFlow() {
    while(true) {
        yield take(updateQueueOrder);
        const queue = yield select(state => state.measure.queue);
        if(queue.id === -1) continue;
        yield call(updateOrder, queue);
    }
}

function* updatePaymentFlow() {
    while(true) {
        yield take(updateQueuePayment);
        const queue = yield select(state => state.measure.queue);
        if(queue.id === -1) continue;
        yield call(updatePayment, queue);
    }
}

function* updateServiceFlow() {
    while(true) {
        yield take(updateQueueService);
        const queue = yield select(state => state.measure.queue);
        if(queue.id === -1) continue;
        yield call(updateService, queue);
    }
}

export default function* rootSaga() {
    yield fork(socketFlow);
    yield fork(queueInitialize);
    yield fork(newQueueFlow);
    yield fork(updateOrderFlow);
    yield fork(updatePaymentFlow);
    yield fork(updateServiceFlow);
    yield put(fetchUncompletedQueue());
}









