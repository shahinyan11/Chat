import {
    SET_PEER,
    SET_MY_VIDEO,
    SET_USER_VIDEO,
    SET_CALL_USER_ID,
    SET_LIVE_CALL_ID,
    // SET_USER_VIDEO_ACCESS,
    SET_DEFAULT_MESSENGER_STATE,
    GET_MESSAGES_FAIL,
    GET_MESSAGES_SUCCESS,
    CALLING,
    GIVE_CALL,
    DOWN_CALL,
    CALL_IN_YOU,
    CALL_REQUEST_FAIL,
    CALL_REQUEST_SUCCESS,
    VOLUME_ON_OFF,
    VIDEO_CALL_ON_OFF,
    SEND_MESSAGE_FAIL,
    SEND_MESSAGE_SUCCESS,
    CHANGE_USER_VIDEO_ACCESS,
    NEW_MESSAGE,
    SELECT_USER,
} from "../actions/messenger";

import {GET_ONLINE_USERS, USER_INFO_REQUEST_SUCCESS} from "../actions/auth";

const initialState = {

    inCalling: false,
    callUserId: null,
    callingInYou: false,
    userVideo: null,
    myVideo: null,
    callStart: null,
    callEnd: null,
    callGive: false,
    callDown: false,
    peer: null,
    peerData: null,
    userMessages: [],
    videoCall : true,
    volume: false,
    userVideoAccess : false,
    liveCallId : null,
    error: null,
    messageNotification: null,
    unreadCount: 0,
    selectedUserId: null,
    user: null,
    scrollControl: false,
    lastSendedMessage: {}


}

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case SELECT_USER: {
            return {
                ...state,
                selectedUserId: action.payload.id,
            }
        }

        case USER_INFO_REQUEST_SUCCESS: {
            return {
                ...state,
                user: action.payload.data.user,
            }
        }

        case GET_ONLINE_USERS: {
            const {data} = action.payload;
            const filterData = data.filter((value)=>{
                return Number(value.id) !== Number(state.user.id) ? true : false
            })
            const selectedUserId = filterData[0] ? filterData[0].id : null;
            return {
                ...state,
                selectedUserId
            }
        }

        case NEW_MESSAGE: {
            let{userMessages , unreadCount, selectedUserId, scrollControl} = state;
            const {data} = action.payload;
            userMessages.push(data);
            if(selectedUserId !== data.author_id){
                unreadCount += 1
            }
            return {
                ...state,
                userMessages: [...userMessages],
                messageNotification: data,
                scrollControl: ! scrollControl,
                unreadCount
            }
        }

        case SEND_MESSAGE_SUCCESS: {
            const{userMessages,scrollControl} = state;
            const {data} = action.payload;
            userMessages.push(data);

            return {
                ...state,
                userMessages: [...userMessages],
                lastSendedMessage: data,
                scrollControl: !scrollControl
            }
        }

        case CALLING: {
            const {bool} = action.payload;
            return {
                ...state,
                inCalling : state.callingInYou ?  false : bool,
            }
        }

        case CALL_REQUEST_SUCCESS: {

            const{userMessages} = state;
            const {call} = action.payload;
            const liveCallId = action.payload.call_id;
            if(call){
                userMessages.push(action.payload)
            }
            return {
                ...state,
                liveCallId: liveCallId !== null ? liveCallId : state.liveCallId,
                userMessages: [...userMessages]
            }
        }

        case CALL_REQUEST_FAIL: {
            const {request} = action.payload.error;

            return {
                ...state,
                error: request,
            }
        }

        case GET_MESSAGES_SUCCESS: {
            const userMessages = action.payload.data.reverse();
            return {
                ...state,
                userMessages
            }
        }

        case GET_MESSAGES_FAIL: {
            const {request} = action.payload.error;

            return {
                ...state,
                error: request,
            }
        }

        case SEND_MESSAGE_FAIL: {
            const {request} = action.payload.error;

            return {
                ...state,
                error: request,
            }
        }

        case SET_LIVE_CALL_ID: {
            return {
                ...state,
                liveCallId : action.payload.id
            }
        }

        case SET_USER_VIDEO: {
            return {
                ...state,
                userVideo : action.payload.data
            }
        }

        case SET_MY_VIDEO: {
            return {
                ...state,
                myVideo : action.payload.data
            }
        }

        case CALL_IN_YOU: {
            const {bool} =  action.payload
            return {
                ...state,
                callingInYou : state.inCalling ?  false : bool,
            }
        }

        case GIVE_CALL: {
            return {
                ...state,
                callStart   : new Date().getTime(),
                callGive    : action.payload.bool
            }
        }
        case DOWN_CALL: {
            return {
                ...state,
                callEnd     : new Date().getTime(),
                callDown    : action.payload.bool
            }
        }

        case SET_PEER: {
            return {
                ...state,
                peer        : action.payload.peer,
                peerData    : action.payload.peerData
            }
        }

        case SET_DEFAULT_MESSENGER_STATE: {
            return {
                ...state,
                inCalling       : false,
                callingInYou    : false,
                userVideo       : null,
                callGive        : false,
                callDown        : false,
                userVideoAccess : false,
            }
        }

        case SET_CALL_USER_ID: {
            return {
                ...state,
                callUserId : action.payload.id,
                selectedUserId: action.payload.id
            }
        }
        case VIDEO_CALL_ON_OFF: {
            return {
                ...state,
                videoCall : action.payload.bool
            }
        }
        case VOLUME_ON_OFF: {
            return {
                ...state,
                volume : action.payload.bool
            }
        }

        case CHANGE_USER_VIDEO_ACCESS: {
            return {
                ...state,
                userVideoAccess : action.payload.bool
            }
        }

        default: {
            return state;
        }
    }
}
