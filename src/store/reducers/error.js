import {
    SIGN_IN_REQUEST_FAIL,
    USER_INFO_REQUEST_FAIL,
    USER_LIST_REQUEST_FAIL,
    SIGN_OUT_REQUEST_FAIL,
    SINGLE_SIGN_IN_REQUEST_FAIL,
} from "../actions/auth";

import {
    GET_ROOMS_FAIL,
    ROOM_JOIN_FAIL,
    MAKE_POST_FAIL,
    DELETE_ROOM_FAIL,
    UPDATE_ROOM_FAIL,
    REMOVE_POST_FAIL,
    CREATE_ROOM_FAIL,
    MAKE_COMMENT_FAIL,
    REMOVE_IMAGE_FAIL,
    REMOVE_REPLAY_FAIL,
    GET_ROOM_POSTS_FAIL,
    GET_POST_REPLYS_FAIL,
    GET_POSTED_PHOTOS_FAIL,
    GET_ROOM_ONLINE_USERS_FAIL, REPORT_FAIL,
    OPEN_ERROR_NOTIFICATION,
    CLOSE_ERROR_NOTIFICATION,

    CHANGE_ACTIVE_ROOM
    // LIKE_REQUEST_FAIL,

} from '../actions/chat'


const initialState = {
    roomJoinError: null,
    errorNotification: {
        open: false,
        message: ""
    }
};

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case ROOM_JOIN_FAIL:{
            return {
                ...state,
                roomJoinError: action.payload
            }
        }
        case CHANGE_ACTIVE_ROOM:{
            return {
                ...state,
                roomJoinError: null,
                errorNotification: {
                    open: false,
                    message: ""
                }
            }
        }

        case OPEN_ERROR_NOTIFICATION: {
            const {message} = action.payload;
            const errorNotification = {
                open: true,
                message
            }
            return {
                ...state,
                errorNotification
            }
        }

        case CLOSE_ERROR_NOTIFICATION: {
            const {errorNotification} = state;
            errorNotification.open = false;

            return {
                ...state,
                errorNotification: {...errorNotification}
            }
        }

        case REPORT_FAIL:
        case GET_ROOMS_FAIL:

        case MAKE_POST_FAIL:
        case DELETE_ROOM_FAIL:
        case UPDATE_ROOM_FAIL:
        case REMOVE_POST_FAIL:
        case CREATE_ROOM_FAIL:
        case MAKE_COMMENT_FAIL:
        case REMOVE_IMAGE_FAIL:
        case REMOVE_REPLAY_FAIL:
        case GET_ROOM_POSTS_FAIL:
        case GET_POST_REPLYS_FAIL:
        case GET_POSTED_PHOTOS_FAIL:
        case GET_ROOM_ONLINE_USERS_FAIL:
        case SIGN_IN_REQUEST_FAIL:
        case SIGN_OUT_REQUEST_FAIL:
        case USER_INFO_REQUEST_FAIL:
        case USER_LIST_REQUEST_FAIL:
        case SINGLE_SIGN_IN_REQUEST_FAIL: {
            console.warn(action.payload);
            const errorNotification = {
                open: true,
                message: action.payload
            }
            return {
                ...state,
                errorNotification
            }
        }

        default: {
            return state;
        }
    }
}
