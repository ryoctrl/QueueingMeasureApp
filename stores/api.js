const axios = require('axios');
const API_HOST = 'https://queue-api.mosin.jp/';
const FETCH_UNCOMPLETED_QUEUE_EP = API_HOST + 'queue';
const NEW_QUEUE_EP = API_HOST + 'queue/new';
const UPDATE_ORDER_EP = API_HOST + 'queue/order';
const UPDATE_PAYMENT_EP = API_HOST + 'queue/payment';
const UPDATE_SERVICE_EP = API_HOST + 'queue/service';

export function fetchQueue() {
    return axios.get(FETCH_UNCOMPLETED_QUEUE_EP)
        .then(res => res.data)
        .then(data => ({data}))
        .catch(error => ({error}));
}

export function newQueue(isMan) {
    return axios.post(NEW_QUEUE_EP, {isMan})
        .then(res => res.data)
        .then(data => ({data}))
        .catch(error => ({error}));
}

export function updateOrder(queue) {
    return axios.post(UPDATE_ORDER_EP, queue)
        .then(res => res.data)
        .then(data => ({data}))
        .catch(error => ({error}));
}

export function updatePayment(queue) {
return axios.post(UPDATE_PAYMENT_EP, queue)
        .then(res => res.data)
        .then(data => ({data}))
        .catch(error => ({error}));
}

export function updateService(queue) {
    return axios.post(UPDATE_SERVICE_EP, queue)
        .then(res => res.data)
        .then(data => ({data}))
        .catch(error => ({error}));
}









