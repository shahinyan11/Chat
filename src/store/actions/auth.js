export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST';
export const SIGN_IN_REQUEST_SUCCESS = 'SIGN_IN_REQUEST_SUCCESS';
export const SIGN_IN_REQUEST_FAIL = 'SIGN_IN_REQUEST_FAIL';


export const SIGN_OUT_REQUEST = 'SIGN_OUT_REQUEST';
export const SIGN_OUT_REQUEST_SUCCESS = 'SIGN_OUT_REQUEST_SUCCESS';
export const SIGN_OUT_REQUEST_FAIL = 'SIGN_OUT_REQUEST_FAIL';


export const USER_INFO_REQUEST = 'USER_INFO_REQUEST';
export const USER_INFO_REQUEST_SUCCESS = 'USER_INFO_REQUEST_SUCCESS';
export const USER_INFO_REQUEST_FAIL = 'USER_INFO_REQUEST_FAIL';

export const USER_LIST_REQUEST = 'USER_LIST_REQUEST';
export const USER_LIST_REQUEST_SUCCESS = 'USER_LIST_REQUEST_SUCCESS';
export const USER_LIST_REQUEST_FAIL = 'USER_LIST_REQUEST_FAIL';

export const GET_ONLINE_USERS = 'GET_ONLINE_USERS';
export const JOIN_ONLINE_USERS = 'JOIN_ONLINE_USERS';
export const LEAVE_ONLINE_USERS = 'LEAVE_ONLINE_USERS;';

export const SINGLE_SIGN_IN_REQUEST = 'SINGLE_SIGN_IN_REQUEST';
export const SINGLE_SIGN_IN_REQUEST_SUCCESS = 'SINGLE_SIGN_IN_REQUEST_SUCCESS';
export const SINGLE_SIGN_IN_REQUEST_FAIL = 'SINGLE_SIGN_IN_REQUEST_FAIL';

export const GET_ROLE_USERS = 'GET_ROLE_USERS';
export const GET_ROLE_USERS_SUCCESS = 'GET_ROLE_USERS_SUCCESS';
export const GET_ROLE_USERS_FAIL = 'GET_ROLE_USERS_FAIL';


export function signIn(data) {
    return {
        type: SIGN_IN_REQUEST, payload: {data}
    }
}

export function singleSignIn(data) {
    return {
        type: SINGLE_SIGN_IN_REQUEST, payload: {data}
    }
}

export function signOut(data) {
    return {
        type: SIGN_OUT_REQUEST, payload: {data}
    }
}

export function getUserInfo() {
    return {
        type: USER_INFO_REQUEST
    }
}

export function getUserList() {
    return {
        type: USER_LIST_REQUEST
    }
}

export function getRoleUsers() {
    return {
        type: GET_ROLE_USERS
    }
}

export function getOnlineUsers(data) {
    return {
        type: GET_ONLINE_USERS,  payload: {data}
    }
}

export function addOnlineUsers(data) {
    return {
        type: JOIN_ONLINE_USERS, payload: {data}
    }
}

export function removeOnlineUsers(data) {
    return {
        type: LEAVE_ONLINE_USERS, payload: {data}
    }
}
