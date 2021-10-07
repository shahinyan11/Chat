export const CALLING = 'CALLING';
export const CALL_IN_YOU = 'CALL_IN_YOU';
export const SET_LIVE_CALL_ID = 'SET_LIVE_CALL_ID';
export const VIDEO_CALL_ON_OFF = 'VIDEO_CALL_ON_OFF';
export const VOLUME_ON_OFF = 'VOLUME_ON_OFF';

export const GET_MESSAGES_REQUEST = 'GET_MESSAGES_REQUEST';
export const GET_MESSAGES_SUCCESS = 'GET_MESSAGES_SUCCESS';
export const GET_MESSAGES_FAIL = 'GET_MESSAGES_FAIL';

export const SEND_MESSAGE_REQUEST = 'SEND_MESSAGE_REQUEST';
export const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';
export const SEND_MESSAGE_FAIL = 'SEND_MESSAGE_FAIL';

export const CALL_REQUEST = 'CALL_REQUEST';
export const CALL_REQUEST_SUCCESS = 'CALL_REQUEST_SUCCESS';
export const CALL_REQUEST_FAIL = 'CALL_REQUEST_FAIL';

export const SET_USER_VIDEO = 'SET_USER_VIDEO';
// export const SET_USER_VIDEO_ACCESS = 'SET_USER_VIDEO_ACCESS';

export const SET_MY_VIDEO = 'SET_MY_VIDEO';

export const GIVE_CALL = 'GIVE_CALL';
export const DOWN_CALL = 'DOWN_CALL';

export const SET_PEER = 'SET_PEER';
export const SET_DEFAULT_MESSENGER_STATE = 'SET_DEFAULT_MESSENGER_STATE';
export const ADD_MESSAGE = 'ADD_MESSAGE';

export const SET_CALL_USER_ID = 'SET_CALL_USER_ID';

export const CHANGE_USER_VIDEO_ACCESS = 'CHANGE_USER_VIDEO_ACCESS';

export const NEW_MESSAGE = 'NEW_MESSAGE';

export const SELECT_USER = 'SELECT_USER';

export const MESSANGER_IMAGE_DIALOG_OPEN = 'MESSANGER_IMAGE_DIALOG_OPEN';
export const MESSANGER_DOWNLOAD_IMAGE = 'MESSANGER_DOWNLOAD_IMAGE';
export const MESSANGER_DOWNLOAD_IMAGE_SUCCESS = 'MESSANGER_DOWNLOAD_IMAGE_SUCCESS';
export const MESSANGER_DOWNLOAD_IMAGE_FAIL = 'MESSANGER_DOWNLOAD_IMAGE_FAIL';


export function selectUser(id) {

    return {
        type: SELECT_USER, payload: {id}
    }
}

export function addMessage(data) {
    return {
        type: NEW_MESSAGE, payload: {data}
    }
}

export function getMessages(id) {
    return {
        type: GET_MESSAGES_REQUEST, payload: {id}
    }
}

export function setLiveCallId(id) {
    return {
        type: SET_LIVE_CALL_ID, payload: {id}
    }
}

export function setCallUserId(id) {
    return {
        type: SET_CALL_USER_ID, payload: {id}
    }
}

export function sendMessage(data, uId) {
    return {
        type: SEND_MESSAGE_REQUEST, payload: {data, uId}
    }
}

export function setMyVideo(data) {
    return {
        type: SET_MY_VIDEO, payload: {data}
    }
}

export function setUserVideo(data) {
    return {
        type: SET_USER_VIDEO, payload: {data}
    }
}

// export function setUserVideoAccess(data) {
//     return {
//         type: SET_USER_VIDEO_ACCESS, payload: {data}
//     }
// }

export function setPeer(peer, peerData) {
    return {
        type: SET_PEER, payload: {peer, peerData}
    }
}

export function setDefaultMessengerState() {
    return {
        type: SET_DEFAULT_MESSENGER_STATE
    }
}


export function call(bool) {
    return {
        type: CALLING, payload: {bool}
    }
}

export function callInYou(bool) {
    return {
        type: CALL_IN_YOU, payload: {bool}
    }
}

export function calling(data) {
    return {
        type: CALL_REQUEST, payload: {data}
    }
}

export function giveCall(bool) {
    return {
        type: GIVE_CALL, payload: {bool}
    }
}

export function downCall(bool) {
    return {
        type: DOWN_CALL, payload: {bool}
    }
}

export function videoCallOnOff(bool) {
    return {
        type: VIDEO_CALL_ON_OFF, payload: {bool}
    }
}

export function volumeOnOff(bool) {
    return {
        type: VOLUME_ON_OFF, payload: {bool}
    }
}

export function changeUserVideoAccess(bool) {
    return {
        type: CHANGE_USER_VIDEO_ACCESS, payload: {bool}
    }
}


export function MessangerImageDialogOpen(bool, imgId = null){
    return {
        type: MESSANGER_IMAGE_DIALOG_OPEN,
        payload: {bool, imgId}
    }
}

export function downloadMessangerImage(image){
    return {
        type: MESSANGER_DOWNLOAD_IMAGE,
        payload: {image}
    }
}

