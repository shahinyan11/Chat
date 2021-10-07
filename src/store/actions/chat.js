export const GET_ROOMS = "GET_ROOMS";
export const GET_ROOMS_SUCCESS = "GET_ROOMS_SUCCESS";
export const GET_ROOMS_FAIL = "GET_ROOMS_FAIL";

export const SELECT_CREATE_ROOM = "SELECT_CREATE_ROOM";

export const SELECT_USER_ROOM_SETTINGS = "SELECT_USER_ROOM_SETTINGS";

export const ROOM_JOIN = "ROOM_JOIN";
export const ROOM_JOIN_SUCCESS = "ROOM_JOIN_SUCCESS";
export const ROOM_JOIN_FAIL = "ROOM_JOIN_FAIL";

export const ROOM_LEAVE = "ROOM_LEAVE";
export const ROOM_LEAVE_SUCCESS = "ROOM_LEAVE_SUCCESS";
export const ROOM_LEAVE_FAIL = "ROOM_LEAVE_FAIL";

export const MAKE_POST = "MAKE_POST";
export const MAKE_POST_SUCCESS = "MAKE_POST_SUCCESS";
export const MAKE_POST_FAIL = "MAKE_POST_FAIL";

export const ADD_TEMPORARY_POST = "ADD_TEMPORARY_POST";

export const MAKE_COMMENT = 'MAKE_COMMENT';
export const MAKE_COMMENT_SUCCESS = 'MAKE_COMMENT_SUCCESS';
export const MAKE_COMMENT_FAIL = 'MAKE_COMMENT_FAIL';

export const NEW_POST = 'NEW_POST';
export const NEW_COMMENT = 'NEW_COMMENT';

export const GET_ROOM_POSTS = 'GET_ROOM_POSTS';
export const GET_ROOM_POSTS_SUCCESS = 'GET_ROOM_POSTS_SUCCESS';
export const GET_ROOM_POSTS_FAIL = 'GET_ROOM_POSTS_FAIL';

export const GET_POSTED_PHOTOS = 'GET_POSTED_PHOTOS';
export const GET_POSTED_PHOTOS_SUCCESS = 'GET_POSTED_PHOTOS_SUCCESS';
export const GET_POSTED_PHOTOS_FAIL = 'GET_POSTED_PHOTOS_FAIL';

export const REPORT = 'REPORT';
export const REPORT_SUCCESS = 'REPORT_SUCCESS';
export const REPORT_FAIL = 'REPORT_FAIL';

export const CREATE_ROOM = 'CREATE_ROOM';
export const CREATE_ROOM_SUCCESS = 'CREATE_ROOM_SUCCESS';
export const CREATE_ROOM_FAIL = 'CREATE_ROOM_FAIL';

export const DELETE_ROOM = 'DELETE_ROOM';
export const DELETE_ROOM_SUCCESS = 'DELETE_ROOM_SUCCESS';
export const DELETE_ROOM_FAIL = 'DELETE_ROOM_FAIL';

export const UPDATE_ROOM = 'UPDATE_ROOM';
export const UPDATE_ROOM_SUCCESS = 'UPDATE_ROOM_SUCCESS';
export const UPDATE_ROOM_FAIL = 'UPDATE_ROOM_FAIL';

export const IMAGE_DIALOG_OPEN = 'IMAGE_DIALOG_OPEN';

export const CLOSE_ALL_MODALS = 'CLOSE_ALL_MODALS';

export const REPLY_TO = 'REPLY_TO';

export const TOGGLE_POST_TOOL = 'TOGGLE_POST_TOOL';
export const TOGGLE_USER_MODAL = 'TOGGLE_USER_MODAL';
export const TOGGLE_IMAGE_TOOL = 'TOGGLE_IMAGE_TOOL';
export const TOGGLE_POST_REPLY_TOOL = 'TOGGLE_POST_REPLY_TOOL';
export const TOGGLE_POST_USER_MODAL = 'TOGGLE_POST_USER_MODAL';
export const TOGGLE_COMMENT_USER_MODAL = 'TOGGLE_COMMENT_USER_MODAL';

export const REMOVE_REPLAY = 'REMOVE_REPLAY';
export const REMOVE_REPLAY_SUCCESS = 'REMOVE_REPLAY_SUCCESS';
export const REMOVE_REPLAY_FAIL = 'REMOVE_REPLAY_FAIL';

export const REMOVE_IMAGE = 'REMOVE_IMAGE';
export const REMOVE_IMAGE_SUCCESS = 'REMOVE_IMAGE_SUCCESS';
export const REMOVE_IMAGE_FAIL = 'REMOVE_IMAGE_FAIL';


export const REMOVE_POST = 'REMOVE_POST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAIL = 'REMOVE_POST_FAIL';

export const EDIT_POST = 'EDIT_POST';
export const EDIT_POST_SUCCESS = 'EDIT_POST_SUCCESS';
export const EDIT_POST_FAIL = 'EDIT_POST_FAIL';


export const CHANGE_ACTIVE_ROOM = 'CHANGE_ACTIVE_ROOM';

export const SET_REQUEST_ACCESS = 'SET_REQUEST_ACCESS';


export const GET_ROOM_ONLINE_USERS = 'GET_ROOM_ONLINE_USERS';
export const GET_ROOM_ONLINE_USERS_SUCCESS = 'GET_ROOM_ONLINE_USERS_SUCCESS';
export const GET_ROOM_ONLINE_USERS_FAIL = 'GET_ROOM_ONLINE_USERS_FAIL';

export const ADD_ROOM = 'ADD_ROOM';

export const CHAT_COMPONENT_MOUNT = 'CHAT_COMPONENT_MOUNT';
export const REFRESH_GALLERY = 'REFRESH_GALLERY';


export const GET_POST_REPLYS = 'GET_POST_REPLYS';
export const GET_POST_REPLYS_SUCCESS = 'GET_POST_REPLYS_SUCCESS';
export const GET_POST_REPLYS_FAIL = 'GET_POST_REPLYS_FAIL';

export const OPEN_ERROR_NOTIFICATION = 'OPEN_ERROR_NOTIFICATION';
export const CLOSE_ERROR_NOTIFICATION = 'CLOSE_ERROR_NOTIFICATION';

export const LIKE_REQUEST = 'LIKE_REQUEST';
export const LIKE_REQUEST_SUCCESS = 'LIKE_REQUEST_SUCCESS';
export const LIKE_REQUEST_FAIL = 'LIKE_REQUEST_FAIL';

export const LIKE_EVENT = 'LIKE_EVENT';

export const KICK_REQUEST = 'KICK_REQUEST';
export const KICK_REQUEST_SUCCESS = 'KICK_REQUEST_SUCCESS';
export const KICK_REQUEST_FAIL = 'KICK_REQUEST_FAIL';

export const KICK_FROM_ROOM = 'KICK_FROM_ROOM';

export const BAN_REQUEST = 'BAN_REQUEST';
export const BAN_REQUEST_SUCCESS = 'BAN_REQUEST_SUCCESS';
export const BAN_REQUEST_FAIL = 'BAN_REQUEST_FAIL';

export const DOWNLOAD_IMAGE = 'DOWNLOAD_IMAGE';
export const DOWNLOAD_IMAGE_SUCCESS = 'DOWNLOAD_IMAGE_SUCCESS';
export const DOWNLOAD_IMAGE_FAIL = 'DOWNLOAD_IMAGE_FAIL';


export function newLike( data) {
    return {
        type: LIKE_EVENT, payload: data
    }
}

export function like(attachmentId, roomId, postId) {
    return {
        type: LIKE_REQUEST, payload: {attachmentId, roomId, postId}
    }
}
// ##### For Forum #####
// export function like(id, roomId) {
//     return {
//         type: LIKE_REQUEST, payload: {id, roomId}
//     }
// }

export function kick(user_id, chat_room_id) {
    return {
        type: KICK_REQUEST, payload: {user_id, chat_room_id}
    }
}

export function banUser(user_id, chat_room_id) {
    return {
        type: BAN_REQUEST, payload: {user_id, chat_room_id}
    }
}


export function getPostReplys(postId, page = 1) {
    return {
        type: GET_POST_REPLYS, payload: {postId, page}
    }
}

export function refreshGallery(bool) {
    return {
        type: REFRESH_GALLERY
    }
}

export function chatComponentMount(bool) {
    return {
        type: CHAT_COMPONENT_MOUNT, payload: {bool}
    }
}

export function getRoomOnlineUsers(roomId) {
    return {
        type: GET_ROOM_ONLINE_USERS, payload: {roomId}
    }
}

export function changeActiveRoom(roomId, roomJoined, roomLocked, rememberPosition) {
    return {
        type: CHANGE_ACTIVE_ROOM, payload: {roomId, roomJoined, roomLocked, rememberPosition}
    }
}

export function removeAttachment(roomId, postId,attachmentId){
    return {
        type: REMOVE_IMAGE,
        payload: {roomId, postId, attachmentId}
    }
}

export function removeComment(replyId, roomId, postId){
    return {
        type: REMOVE_REPLAY,
        payload: {replyId, roomId, postId}
    }
}

export function removePost(data, apiRequest = true){
    return {
        type: REMOVE_POST,
        payload: {data, apiRequest}
    }
}

export function editPost(data, apiRequest = true){
    return {
        type: EDIT_POST,
        payload: {data, apiRequest}
    }
}

export function toggleUserModal(userId){
    return {
        type: TOGGLE_USER_MODAL,
        payload: {userId}
    }
}

export function togglePostUserModal(postId){
    return {
        type: TOGGLE_POST_USER_MODAL,
        payload: {postId}
    }
}

export function toggleCommentUserModal(commentId){
    return {
        type: TOGGLE_COMMENT_USER_MODAL,
        payload: {commentId}
    }
}

export function replyTo(userId = null, userName = null, roomId = null){
    return {
        type: REPLY_TO,
        payload: {userId, userName, roomId}
    }
}

export function togglePostReplyTool(id){
    return {
        type: TOGGLE_POST_REPLY_TOOL,
        payload: {id}
    }
}

export function togglePostTool(id){
    return {
        type: TOGGLE_POST_TOOL,
        payload: {id}
    }
}

export function ToggleImageTool(id){
    return {
        type: TOGGLE_IMAGE_TOOL,
        payload: {id}
    }
}

export function closeAllModals(data){
    return {
        type: CLOSE_ALL_MODALS,
    }
}

export function createRoom(data){
    return {
        type: CREATE_ROOM,
        payload: {data}
    }
}

export function addRoom(data){
    return {
        type: ADD_ROOM,
        payload: data
    }
}

export function deleteRoom(data, apiRequest = true){
    return {
        type: DELETE_ROOM,
        payload: {data, apiRequest}
    }
}

export function updateRoom( data){
    return {
        type: UPDATE_ROOM,
        payload: {data}
    }
}

export function report(data, roomId, postId, replyId, attachmentId){
    return {
        type: REPORT,
        payload: {data, roomId, postId, replyId, attachmentId}
    }
}

export function getRooms(){
    return {
        type: GET_ROOMS
    }
}

export function selectCreateRoom(data){
    return {
        type: SELECT_CREATE_ROOM,
        payload: {data}
    }
}

export function selectedUserRoomSettings(data){
    return {
        type: SELECT_USER_ROOM_SETTINGS,
        payload: {data}
    }
}

export function roomJoin(activeRoomId, password = null){
    return {
        type: ROOM_JOIN,
        payload: {activeRoomId, password}
    }
}

export function roomLeave(roomId){
    return {
        type: ROOM_LEAVE,
        payload: {roomId}
    }
}

export function kickFromRoom(roomId){
    return {
        type: KICK_FROM_ROOM,
        payload: {roomId}
    }
}


export function makePost(data, temporaryId){
    return {
        type: MAKE_POST,
        payload: {data, temporaryId}
    }
}

export function openErrorNotification(message){
    return {
        type: OPEN_ERROR_NOTIFICATION,
        payload: {message}
    }
}

export function closeErrorNotification(){
    return {
        type: CLOSE_ERROR_NOTIFICATION
    }
}

export function addTemporaryPost(data){
    return {
        type: ADD_TEMPORARY_POST,
        payload: {data}
    }
}

export function makeComment(data){
    return {
        type: MAKE_COMMENT,
        payload: {data}
    }
}

export function newPost(data, activeRoomId){
    return {
        type: NEW_POST,
        payload: {data, activeRoomId}
    }
}

export function newComment(data){
    return {
        type: NEW_COMMENT,
        payload: {data}
    }
}

export function getRoomPosts(roomId, page = 1){
    return {
        type: GET_ROOM_POSTS,
        payload: {roomId, page}
    }
}

export function setRequestAccess(bool){
    return {
        type: SET_REQUEST_ACCESS,
        payload: {bool}
    }
}

export function getPostedPhotos(roomId, offset = 0){
    return {
        type: GET_POSTED_PHOTOS,
        payload: {roomId, offset}
    }
}

export function imageDialogOpen(bool, imgId = null){
    return {
        type: IMAGE_DIALOG_OPEN,
        payload: {bool, imgId}
    }
}

export function downloadImage(image){
    return {
        type: DOWNLOAD_IMAGE,
        payload: {image}
    }
}