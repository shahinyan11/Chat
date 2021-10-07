import {takeLatest, put, call} from 'redux-saga/dist/redux-saga-effects-npm-proxy.esm';
import {
    ASSIGN_USER_ROLE,
    ASSIGN_USER_SUCCESS,
    ASSIGN_USER_FAIL

} from "../actions/admin";

import * as api from '../../api/adminApi';

function* assignUserRole(action) {
    try {
        const data = yield call(api.assignUserRole, action.payload);
        yield put({
            type: ASSIGN_USER_SUCCESS,
            payload: data
        });
    } catch (e) {
        yield put({
            type: ASSIGN_USER_FAIL,
            payload: e.response
        })

    }
}



export default function* watcher() {
    yield takeLatest(ASSIGN_USER_ROLE, assignUserRole);
}
