import {takeLatest, put, call, takeEvery} from 'redux-saga/dist/redux-saga-effects-npm-proxy.esm';
import {
    SEND_MESSAGE_REQUEST,
    SEND_MESSAGE_SUCCESS,
    SEND_MESSAGE_FAIL,
    CALL_REQUEST,
    CALL_REQUEST_SUCCESS,
    CALL_REQUEST_FAIL,
    GET_MESSAGES_REQUEST,
    GET_MESSAGES_SUCCESS,
    GET_MESSAGES_FAIL,
    MESSANGER_DOWNLOAD_IMAGE,
    MESSANGER_DOWNLOAD_IMAGE_SUCCESS,
    MESSANGER_DOWNLOAD_IMAGE_FAIL
} from "../actions/messenger";

import * as api from '../../api/api';


function* downloadImage(action) {
    try {
        const {data} = yield call(api.downloadImage, action.payload);
        yield put({
            type: MESSANGER_DOWNLOAD_IMAGE_SUCCESS,
            payload: {data}
        })
    } catch (e) {
        yield put({
            type: MESSANGER_DOWNLOAD_IMAGE_FAIL,
            payload: e
        })
    }
}

function* getMessages(action) {
    try {
        const data = yield call(api.getMessages, action.payload.id);
        yield put({
            type: GET_MESSAGES_SUCCESS,
            payload: data
        });
    } catch (e) {

        if(e.request.status === 401){
            localStorage.removeItem('token')
            window.location.href = '/'
        }else{
            yield put({
                type: GET_MESSAGES_FAIL,
                payload: {error: e}
            })
        }
    }
}

function* sendMessage(action) {
    try {
        const data = yield call(api.sendMessage, action.payload.data);
        data.data.uId = action.payload.uId;
        yield put({
            type: SEND_MESSAGE_SUCCESS,
            payload: data
        });
    } catch (e) {
        if(e.request.status === 401){
            localStorage.removeItem('token')
            window.location.href = '/'
        }else {
            yield put({
                type: SEND_MESSAGE_FAIL,
                payload: {error: e}
            })
        }
    }
}

function* calling(action) {

    try {
        const {data} = yield call(api.call, action.payload.data);
        yield put({
            type: CALL_REQUEST_SUCCESS,
            payload: data
        })
    } catch (e) {
        if(e.request.status === 401){
            localStorage.removeItem('token')
            window.location.href = '/'
        }else {
            yield put({
                type: CALL_REQUEST_FAIL,
                payload: {error: e}
            })
            console.warn(e);
        }
    }
}

export default function* watcher() {
    yield takeLatest(GET_MESSAGES_REQUEST, getMessages);
    yield takeEvery(SEND_MESSAGE_REQUEST, sendMessage);
    yield takeLatest(CALL_REQUEST, calling)
    yield takeLatest(MESSANGER_DOWNLOAD_IMAGE, downloadImage);

}
