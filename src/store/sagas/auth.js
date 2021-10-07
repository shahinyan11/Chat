import {takeLatest, put, call} from 'redux-saga/dist/redux-saga-effects-npm-proxy.esm';
import {
    SIGN_IN_REQUEST,
    SIGN_IN_REQUEST_SUCCESS,
    SIGN_IN_REQUEST_FAIL,

    SIGN_OUT_REQUEST,
    SIGN_OUT_REQUEST_SUCCESS,
    SIGN_OUT_REQUEST_FAIL,


    USER_INFO_REQUEST,
    USER_INFO_REQUEST_SUCCESS,
    USER_INFO_REQUEST_FAIL,

    USER_LIST_REQUEST,
    USER_LIST_REQUEST_SUCCESS,
    USER_LIST_REQUEST_FAIL,

    SINGLE_SIGN_IN_REQUEST,
    SINGLE_SIGN_IN_REQUEST_SUCCESS,
    SINGLE_SIGN_IN_REQUEST_FAIL,

    GET_ROLE_USERS,
    GET_ROLE_USERS_SUCCESS,
    GET_ROLE_USERS_FAIL,
} from "../actions/auth";

import {CLOSE_WINDOW} from "../actions/index";

import * as api from '../../api/api';

function* singleSignIn(action) {
    try {
        const data = yield call(api.singleSignIn, action.payload.data);
        yield put({
            type: SINGLE_SIGN_IN_REQUEST_SUCCESS,
            payload: data
        });
    } catch (e) {
        yield put({
            type: SINGLE_SIGN_IN_REQUEST_FAIL,
            payload: e.response
        })

    }
}

function* signIn(action) {
    try {
        const data = yield call(api.signIn, action.payload.data);
        yield put({
            type: SIGN_IN_REQUEST_SUCCESS,
            payload: data
        });
    } catch (e) {

        yield put({
            type: SIGN_IN_REQUEST_FAIL,
            payload: e.response
        })

    }
}

function* signOut(action) {
    try {
        const data = yield call(api.signOut);
        yield put({
            type: SIGN_OUT_REQUEST_SUCCESS,
            payload: data
        });
    } catch (e) {

        yield put({
            type: SIGN_OUT_REQUEST_FAIL,
            payload: e.response
        })

    }
}

function* getUserInfo() {
    try {
        const data = yield call(api.getUserInfo);
        yield put({
            type: USER_INFO_REQUEST_SUCCESS,
            payload: data
        });
    } catch (e) {
        if (e.request.status === 401) {
            localStorage.removeItem('token')
            window.location.href = '/'
        } else {
            yield put({
                type: USER_INFO_REQUEST_FAIL,
                payload: {error: e}
            })
        }
    }
}

function* getUserList() {
    try {
        const data = yield call(api.getUserList);
        yield put({
            type: USER_LIST_REQUEST_SUCCESS,
            payload: data.data
        });
    } catch (e) {
        if (e.request.status === 401) {
            localStorage.removeItem('token')
            window.location.href = '/'
        } else {
            yield put({
                type: USER_LIST_REQUEST_FAIL,
                payload: {error: e}
            })
        }
    }
}

function* getRoleUsers() {
    try {
        const data = yield call(api.getRoleUsers);
        yield put({
            type: GET_ROLE_USERS_SUCCESS,
            payload: data.data
        });
    } catch (e) {
        if (e.request.status === 401) {
            localStorage.removeItem('token')
            window.location.href = '/'
        } else {
            yield put({
                type: GET_ROLE_USERS_FAIL,
                payload: {error: e}
            })
        }
    }
}

function* closeWindow() {
    yield call(api.closeWindow);
}


export default function* watcher() {
    yield takeLatest(SIGN_IN_REQUEST, signIn);
    yield takeLatest(SIGN_OUT_REQUEST, signOut);
    yield takeLatest(CLOSE_WINDOW, closeWindow);
    yield takeLatest(USER_INFO_REQUEST, getUserInfo);
    yield takeLatest(USER_LIST_REQUEST, getUserList);
    yield takeLatest(SINGLE_SIGN_IN_REQUEST, singleSignIn);
    yield takeLatest(GET_ROLE_USERS, getRoleUsers);
}
