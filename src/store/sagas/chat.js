import {takeLatest, put, call} from 'redux-saga/dist/redux-saga-effects-npm-proxy.esm';

import {
    GET_ROOMS,
    GET_ROOMS_SUCCESS,
    GET_ROOMS_FAIL,

    ROOM_JOIN,
    ROOM_JOIN_SUCCESS,
    ROOM_JOIN_FAIL,

    ROOM_LEAVE,
    ROOM_LEAVE_SUCCESS,
    ROOM_LEAVE_FAIL,

    MAKE_POST,
    MAKE_POST_SUCCESS,
    MAKE_POST_FAIL,

    MAKE_COMMENT,
    MAKE_COMMENT_SUCCESS,
    MAKE_COMMENT_FAIL,

    GET_ROOM_POSTS,
    GET_ROOM_POSTS_SUCCESS,
    GET_ROOM_POSTS_FAIL,

    GET_POSTED_PHOTOS,
    GET_POSTED_PHOTOS_SUCCESS,
    GET_POSTED_PHOTOS_FAIL,

    CREATE_ROOM,
    CREATE_ROOM_SUCCESS,
    CREATE_ROOM_FAIL,

    DELETE_ROOM,
    DELETE_ROOM_SUCCESS,
    DELETE_ROOM_FAIL,

    UPDATE_ROOM,
    UPDATE_ROOM_SUCCESS,
    UPDATE_ROOM_FAIL,

    REPORT,
    REPORT_SUCCESS,
    REPORT_FAIL,

    REMOVE_REPLAY,
    REMOVE_REPLAY_SUCCESS,
    REMOVE_REPLAY_FAIL,

    REMOVE_POST,
    REMOVE_POST_SUCCESS,
    REMOVE_POST_FAIL,

    EDIT_POST,
    EDIT_POST_SUCCESS,
    EDIT_POST_FAIL,

    REMOVE_IMAGE,
    REMOVE_IMAGE_SUCCESS,
    REMOVE_IMAGE_FAIL,

    GET_ROOM_ONLINE_USERS,
    GET_ROOM_ONLINE_USERS_SUCCESS,
    GET_ROOM_ONLINE_USERS_FAIL,

    GET_POST_REPLYS,
    GET_POST_REPLYS_SUCCESS,
    GET_POST_REPLYS_FAIL,

    LIKE_REQUEST,
    LIKE_REQUEST_SUCCESS,
    LIKE_REQUEST_FAIL,

    KICK_REQUEST,
    KICK_REQUEST_SUCCESS,
    KICK_REQUEST_FAIL,

    BAN_REQUEST,
    BAN_REQUEST_SUCCESS,
    BAN_REQUEST_FAIL,

    DOWNLOAD_IMAGE,
    DOWNLOAD_IMAGE_SUCCESS,
    DOWNLOAD_IMAGE_FAIL,


} from '../actions/chat'

import * as chatApi from '../../api/chatApi';

function* downloadImage(action) {
    try {
        const {data} = yield call(chatApi.downloadImage, action.payload);
        yield put({
            type: DOWNLOAD_IMAGE_SUCCESS,
            payload: {data}
        })
    } catch (e) {
        yield put({
            type: DOWNLOAD_IMAGE_FAIL,
            payload: e
        })
    }
}

function* like(action) {
    const {attachmentId, roomId, postId} = action.payload;
    try {
        const {data} = yield call(chatApi.like, action.payload);
        yield put({
            type: LIKE_REQUEST_SUCCESS,
            payload: {data, attachmentId, roomId, postId}
        })
    } catch (e) {
        yield put({
            type: LIKE_REQUEST_FAIL,
            payload: e
        })
    }
}

function* kick(action) {
    try {
        const {data} = yield call(chatApi.kick, action.payload);
        yield put({
            type: KICK_REQUEST_SUCCESS,
            payload: data
        })
    } catch (e) {
        yield put({
            type: KICK_REQUEST_FAIL,
            payload: e
        })
    }
}

function* banUser(action) {
    try {
        const {data} = yield call(chatApi.banUser, action.payload);
        yield put({
            type: BAN_REQUEST_SUCCESS,
            payload: data
        })
    } catch (e) {
        yield put({
            type: BAN_REQUEST_FAIL,
            payload: e
        })
    }
}

function* getPostReplys(action) {
    try {
        const {data} = yield call(chatApi.getPostReplys, action.payload);
        yield put({
            type: GET_POST_REPLYS_SUCCESS,
            payload: {data, postId: action.payload.postId}
        })
    } catch (e) {
        yield put({
            type: GET_POST_REPLYS_FAIL,
            payload: e
        })
    }
}

function* getRoomOnlineUsers(action) {
    try {
        const {data} = yield call(chatApi.getRoomOnlineUsers, action.payload);
        yield put({
            type: GET_ROOM_ONLINE_USERS_SUCCESS,
            payload: {data}
        })
    } catch (e) {
        yield put({
            type: GET_ROOM_ONLINE_USERS_FAIL,
            payload: e
        })
    }
}

function* removePost(action) {
    try {
        const {post} = action.payload.data;
        const {apiRequest} = action.payload;

        const {data} = apiRequest ? yield call(chatApi.removePost, post) : action.payload;

        yield put({
            type: REMOVE_POST_SUCCESS,
            payload: data
        })
    } catch (e) {
        yield put({
            type: REMOVE_POST_FAIL,
            payload: e
        })
    }
}

function* editPost(action) {
    try {
        const {apiRequest} = action.payload;
        const {data} = apiRequest ? yield call(chatApi.editPost, action.payload.data) : action.payload;

        yield put({
            type: EDIT_POST_SUCCESS,
            payload: data
        })
    } catch (e) {
        yield put({
            type: EDIT_POST_FAIL,
            payload: e
        })
    }
}

function* removeAttachment(action) {
    const {roomId, postId, attachmentId} = action.payload;
    try {
        const {data} = yield call(chatApi.removeAttachment, {id: attachmentId});
        yield put({
            type: REMOVE_IMAGE_SUCCESS,
            payload: {roomId, postId, attachmentId, data}
        })
    } catch (e) {
        yield put({
            type: REMOVE_IMAGE_FAIL,
            payload: e
        })
    }
}

function* removeComment(action) {
    const {replyId, roomId, postId} = action.payload;
    try {
        const {data} = yield call(chatApi.removeComment, {id: replyId});
        yield put({
            type: REMOVE_REPLAY_SUCCESS,
            payload: {replyId, roomId, postId, data}
        })
    } catch (e) {
        yield put({
            type: REMOVE_REPLAY_FAIL,
            payload: e
        })
    }
}

function* createRoom(action) {
    try {

        const {data} = yield call(chatApi.createRoom, action.payload.data);
        yield put({
            type: CREATE_ROOM_SUCCESS,
            payload: data
        })
    } catch (e) {
        yield put({
            type: CREATE_ROOM_FAIL,
            payload: e
        })
    }
}

function* deleteRoom(action) {
    try {
        const {room} = action.payload.data;
        const {apiRequest} = action.payload;
        const {data} = apiRequest ? yield call(chatApi.deleteRoom, room) : action.payload;
        yield put({
            type: DELETE_ROOM_SUCCESS,
            payload: data

        })
    } catch (e) {
        yield put({
            type: DELETE_ROOM_FAIL,
            payload: e
        })
    }
}

function* updateRoom(action) {
    try {
        const {data} = yield call(chatApi.updateRoom, action.payload.data);
        yield put({
            type: UPDATE_ROOM_SUCCESS,
            payload: {data}
        })
    } catch (e) {
        yield put({
            type: UPDATE_ROOM_FAIL,
            payload: e
        })
    }
}

function* report(action) {
    const {roomId, postId, replyId, attachmentId} = action.payload;
    try {
        const {data} = yield call(chatApi.report, action.payload.data);
        yield put({
            type: REPORT_SUCCESS,
            payload: {roomId, postId, replyId, attachmentId, ...data}
        })
    } catch (e) {
        yield put({
            type: REPORT_FAIL,
            payload: e
        })
    }
}

function* getRooms(action) {
    try {
        const data = yield call(chatApi.getRooms, action.payload);
        yield put({
            type: GET_ROOMS_SUCCESS,
            payload: data
        })
    } catch (e) {
        yield put({
            type: GET_ROOMS_FAIL,
            payload: e
        })
    }
}

function* roomJoin(action) {

    try {
        const data = yield call(chatApi.roomJoin, action.payload);
        yield put({
            type: ROOM_JOIN_SUCCESS,
            payload: data
        })
    } catch (e) {
        yield put({
            type: ROOM_JOIN_FAIL,
            payload: e.response
        })
    }
}

function* roomLeave(action) {

    try {
        const data = yield call(chatApi.roomLeave, action.payload);
        yield put({
            type: ROOM_LEAVE_SUCCESS,
            payload: data
        })
    } catch (e) {
        yield put({
            type: ROOM_LEAVE_FAIL,
            payload: e.response
        })
    }
}

function* makePost(action) {
    try {
        const data = yield call(chatApi.makePost, action.payload.data);
        yield put({
            type: MAKE_POST_SUCCESS,
            payload: {
                data,
                temporaryId: action.payload.temporaryId
            }
        })
    } catch (e) {
        yield put({
            type: MAKE_POST_FAIL,
            payload: {
                error: e,
                temporaryId: action.payload.temporaryId
            }
        })
    }
}

function* makeComment(action) {

    try {
        const data = yield call(chatApi.makeComment, action.payload.data);
        yield put({
            type: MAKE_COMMENT_SUCCESS,
            payload: data
        })
    } catch (e) {
        yield put({
            type: MAKE_COMMENT_FAIL,
            payload: e
        })
    }
}

function* getRoomPosts(action) {
    try {
        const data = yield call(chatApi.getRoopmPosts, action.payload);
        yield put({
            type: GET_ROOM_POSTS_SUCCESS,
            payload: data.data
        })
    } catch (e) {
        yield put({
            type: GET_ROOM_POSTS_FAIL,
            payload: e
        })
    }
}

function* getPostedPhotos(action) {

    try {
        const data = yield call(chatApi.getPostedPhotos, action.payload);
        yield put({
            type: GET_POSTED_PHOTOS_SUCCESS,
            payload: data
        })
    } catch (e) {
        yield put({
            type: GET_POSTED_PHOTOS_FAIL,
            payload: e
        })
    }
}


export default function* watcher() {
    yield takeLatest(GET_ROOMS, getRooms);
    yield takeLatest(ROOM_JOIN, roomJoin);
    yield takeLatest(MAKE_POST, makePost);
    yield takeLatest(MAKE_COMMENT, makeComment);
    yield takeLatest(GET_ROOM_POSTS, getRoomPosts);
    yield takeLatest(GET_POSTED_PHOTOS, getPostedPhotos);
    yield takeLatest(CREATE_ROOM, createRoom);
    yield takeLatest(REPORT, report);
    yield takeLatest(REMOVE_REPLAY, removeComment);
    yield takeLatest(REMOVE_IMAGE, removeAttachment);
    yield takeLatest(REMOVE_POST, removePost);
    yield takeLatest(EDIT_POST, editPost);
    yield takeLatest(DELETE_ROOM, deleteRoom);
    yield takeLatest(UPDATE_ROOM, updateRoom);
    yield takeLatest(GET_ROOM_ONLINE_USERS, getRoomOnlineUsers);
    yield takeLatest(GET_POST_REPLYS, getPostReplys);
    yield takeLatest(LIKE_REQUEST, like);
    yield takeLatest(KICK_REQUEST, kick);
    yield takeLatest(BAN_REQUEST, banUser);
    yield takeLatest(DOWNLOAD_IMAGE, downloadImage);
    yield takeLatest(ROOM_LEAVE, roomLeave);

}