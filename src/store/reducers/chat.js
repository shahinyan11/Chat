import {
    GET_ROOMS_SUCCESS,
    SELECT_CREATE_ROOM,
    SELECT_USER_ROOM_SETTINGS,
    ROOM_JOIN_SUCCESS,
    ROOM_LEAVE_SUCCESS,
    NEW_POST,
    NEW_COMMENT,
    MAKE_POST,
    MAKE_POST_SUCCESS,
    ADD_TEMPORARY_POST,
    MAKE_COMMENT_SUCCESS,
    GET_ROOM_POSTS_SUCCESS,
    GET_POSTED_PHOTOS_SUCCESS,
    CREATE_ROOM_SUCCESS,
    DELETE_ROOM_SUCCESS,
    UPDATE_ROOM_SUCCESS,
    REMOVE_REPLAY,
    REMOVE_REPLAY_SUCCESS,
    REMOVE_IMAGE_SUCCESS,
    REMOVE_POST,
    REMOVE_POST_SUCCESS,
    EDIT_POST_SUCCESS,
    // IMAGE_DIALOG_OPEN,
    CLOSE_ALL_MODALS,
    REPORT_SUCCESS,
    TOGGLE_POST_TOOL,
    TOGGLE_USER_MODAL,
    TOGGLE_IMAGE_TOOL,
    TOGGLE_POST_USER_MODAL,
    TOGGLE_POST_REPLY_TOOL,
    TOGGLE_COMMENT_USER_MODAL,
    REPLY_TO,
    CHANGE_ACTIVE_ROOM,
    SET_REQUEST_ACCESS,
    GET_ROOM_ONLINE_USERS_SUCCESS,
    ADD_ROOM,
    CHAT_COMPONENT_MOUNT,
    REFRESH_GALLERY,
    GET_POST_REPLYS_SUCCESS,
    LIKE_REQUEST_SUCCESS,
    LIKE_EVENT,
    KICK_FROM_ROOM
} from '../actions/chat'

import {USER_INFO_REQUEST_SUCCESS} from "../actions/auth";
import {removeDuplicateObjects} from "../../helpers/helper";

const initialState = {
    user: null,
    rooms: null,
    scrollControl: false,
    roomUsers: [],
    roomOnlineUsers: [],
    activeRoomId: null,
    roomOwner: false,
    roomJoined: false,
    roomLocked: false,
    userRoom: {},
    selectedCreateRoom: false,
    selectedUserRoomSettings: false,
    postsCurrentPage: null,
    postsLastPage: null,
    replyCurrentPage: null,
    replyLastPage: null,
    replyToUser: {userId: null, userName: null, roomId: null},
    replys: {},
    requestAccess: true,
    mounted: false,
    galleryUpdate: null,
    modals: {
        postReplyTool: {id: null, open: false},
        postTool: {id: null, open: false},
        postImageTool: {id: null, open: false},
        postUserModal: {id: null, open: false},
        userModal: {id: null, open: false},
        commentUserModal: {id: null, open: false},
    },
    errorNotification: {
        open: false,
        message: ''
    }

}


export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LIKE_EVENT:
        case LIKE_REQUEST_SUCCESS: {
            const {data, postId, attachmentId, roomId,} = action.payload;
            const {rooms} = state;
            rooms.forEach((room) => {
                if (Number(room.id) === Number(roomId)) {
                    room.posts.forEach((post) => {
                        if (Number(post.id) === Number(postId)) {
                            if (attachmentId) {
                                post.chat_attachment.forEach((attachment) => {
                                    if (Number(attachment.id) === Number(attachmentId)) {
                                        if (data.like) {
                                            attachment.chat_attachment_votes = data.like;
                                        } else {
                                            attachment.chat_attachment_votes = null
                                        }
                                        attachment.score = data.score
                                    }
                                })
                            } else {
                                if (data.like) {
                                    post.chat_post_votes = data.like;
                                } else {
                                    post.chat_post_votes = null
                                }
                                post.score = data.score
                            }

                        }
                    })
                }
            })
            return {
                ...state,
                rooms: [...rooms]
            }
        }

        case GET_POST_REPLYS_SUCCESS: {
            const {data, current_page, last_page} = action.payload.data;
            const {postId} = action.payload;
            const {replys} = state;
            replys[postId] = replys[postId] ? [...replys[postId], ...data] : [...data];
            return {
                ...state,
                replyCurrentPage: current_page,
                replyLastPage: last_page,
                replys: {...replys}
            }
        }

        case REFRESH_GALLERY: {
            const {galleryUpdate} = state;
            return {
                ...state,
                galleryUpdate: !galleryUpdate
            }
        }

        case CHAT_COMPONENT_MOUNT: {
            const {bool} = action.payload;
            return {
                ...state,
                mounted: bool
            }
        }

        case GET_ROOM_ONLINE_USERS_SUCCESS: {
            const {roomUsers, roomOnlineUsers} = action.payload.data;
            return {
                ...state,
                roomUsers,
                roomOnlineUsers
            }
        }

        case USER_INFO_REQUEST_SUCCESS: {
            return {
                ...state,
                user: action.payload.data.user,
            }
        }

        case SET_REQUEST_ACCESS: {
            const {bool} = action.payload;
            return {
                ...state,
                requestAccess: bool
            }
        }

        case CHANGE_ACTIVE_ROOM: {
            const {roomId, roomJoined, roomLocked, rememberPosition} = action.payload;
            const {rooms, activeRoomId, user} = state;
            let roomOwner;
            rooms.forEach((room) => {
                if (room.id === activeRoomId) {
                    room.rememberPosition = rememberPosition
                }
                if (room.id === roomId) {
                    room.unread = 0
                    roomOwner = room.owner_id === user.id;

                }
            })
            return {
                ...state,
                rooms: [...rooms],
                // postsCurrentPage: null,
                activeRoomId: roomId,
                roomJoined: roomJoined,
                roomLocked: roomLocked,
                roomOwner
            }
        }

        case REMOVE_POST: {
            const {rooms} = state

            return {
                ...state,
                rooms: [...rooms],
                showSpinner: true,
            }
        }

        case REMOVE_POST_SUCCESS: {
            const {success, data} = action.payload;
            const {rooms} = state
            if (success) {
                rooms.forEach((room) => {
                    if (Number(room.id) === Number(data.chat_room_id)) {
                        room.posts = room.posts.filter((post) => {
                            return Number(post.id) !== Number(data.id)
                        })
                    }
                })
            }
            return {
                ...state,
                rooms: [...rooms],
                showSpinner: false,
            }
        }

        case EDIT_POST_SUCCESS: {
            const {success, data} = action.payload;
            const {rooms} = state;
            if (success) {
                rooms.forEach((room) => {
                    if (Number(room.id) === Number(data.chat_room_id)) {
                        room.posts = room.posts.map((post) => {
                            return Number(post.id) !== Number(data.id) ? post : {...post, ...data}
                        })
                    }
                })
            }
            return {
                ...state,
                rooms: [...rooms],
                showSpinner: false,
            }
        }

        case REMOVE_REPLAY: {
            const {rooms} = state;

            return {
                ...state,
                rooms: [...rooms],
                showSpinner: true,
            }
        }

        case REMOVE_REPLAY_SUCCESS: {
            const {roomId, postId, replyId, data} = action.payload;
            const {rooms} = state;
            if (data.success) {
                rooms.forEach((room) => {
                    if (Number(room.id) === Number(roomId)) {
                        room.posts.forEach((post) => {
                            if (Number(post.id) === Number(postId)) {
                                post.chat_post_reply = post.chat_post_reply.filter((reply) => {
                                    return Number(reply.id) !== Number(replyId)
                                })
                            }
                        })
                    }
                })
            }
            return {
                ...state,
                rooms: [...rooms],
                showSpinner: false,
            }
        }

        case REMOVE_IMAGE_SUCCESS: {
            const {data, roomId, postId, attachmentId} = action.payload;
            const {rooms} = state;
            if (data.success) {
                // const filterPostedPhotos = postedPhotos.filter((attachment) => {
                //     return Number(attachment.id) !== Number(attachmentId)
                // })
                rooms.forEach((room) => {
                    if (Number(room.id) === Number(roomId)) {
                        room.posts.forEach((post) => {
                            if (Number(post.id) === Number(postId)) {
                                post.chat_attachment = post.chat_attachment.filter((attachment) => {
                                    return Number(attachment.id) !== Number(attachmentId)
                                })
                            }
                        })
                    }
                })
                return {
                    ...state,
                    rooms: [...rooms],
                }
            } else {
                return {
                    ...state
                }
            }
        }

        case REPLY_TO: {
            let {userId, userName, roomId} = action.payload;
            return {
                ...state,
                replyToUser: {userId, userName, roomId}
            }
        }

        case TOGGLE_USER_MODAL: {
            const {modals} = state;
            for (let tool in modals) {
                if (tool === 'userModal') {
                    if ((!modals[tool].id && !modals[tool].open) || modals[tool].id !== action.payload.userId) {
                        modals[tool] = {id: action.payload.userId, open: true}
                    } else {
                        modals[tool] = {id: null, open: false}
                    }
                } else {
                    modals[tool] = {id: null, open: false}
                }
            }

            return {
                ...state,
                modals: {...modals}
            }
        }

        case TOGGLE_POST_USER_MODAL: {
            const {modals} = state

            for (let tool in modals) {
                if (tool === 'postUserModal') {
                    if ((!modals[tool].id && !modals[tool].open) || modals[tool].id !== action.payload.postId) {
                        modals[tool] = {id: action.payload.postId, open: true}
                    } else {
                        modals[tool] = {id: null, open: false}
                    }
                } else {
                    modals[tool] = {id: null, open: false}
                }
            }

            return {
                ...state,
                modals: {...modals}
            }
        }

        case TOGGLE_COMMENT_USER_MODAL: {
            const {modals} = state

            for (let tool in modals) {
                if (tool === 'commentUserModal') {
                    if ((!modals[tool].id && !modals[tool].open) || modals[tool].id !== action.payload.commentId) {
                        modals[tool] = {id: action.payload.commentId, open: true}
                    } else {
                        modals[tool] = {id: null, open: false}
                    }
                } else {
                    modals[tool] = {id: null, open: false}
                }
            }

            return {
                ...state,
                modals: {...modals}
            }
        }

        case TOGGLE_IMAGE_TOOL: {
            const {modals} = state;
            for (let tool in modals) {
                if (tool === 'postImageTool') {
                    if ((!modals[tool].id && !modals[tool].open) || modals[tool].id !== action.payload.id) {
                        modals[tool] = {id: action.payload.id, open: true}
                    } else {
                        modals[tool] = {id: null, open: false}
                    }
                } else {
                    modals[tool] = {id: null, open: false}
                }
            }

            return {
                ...state,
                modals: {...modals}
            }
        }

        case TOGGLE_POST_REPLY_TOOL: {
            const {modals} = state
            for (let tool in modals) {
                if (tool === 'postReplyTool') {
                    if ((!modals[tool].id && !modals[tool].open) || modals[tool].id !== action.payload.id) {
                        modals[tool] = {id: action.payload.id, open: true}
                    } else {
                        modals[tool] = {id: null, open: false}
                    }
                } else {
                    modals[tool] = {id: null, open: false}
                }
            }

            return {
                ...state,
                modals: {...modals}
            }
        }

        case TOGGLE_POST_TOOL: {
            const {modals} = state
            for (let tool in modals) {
                if (tool === 'postTool') {
                    if ((!modals[tool].id && !modals[tool].open) || modals[tool].id !== action.payload.id) {
                        modals[tool] = {id: action.payload.id, open: true}
                    } else {
                        modals[tool] = {id: null, open: false}
                    }
                } else {
                    modals[tool] = {id: null, open: false}
                }
            }
            return {
                ...state,
                modals: {...modals}
            }
        }

        case REPORT_SUCCESS: {
            const {roomId, postId, replyId, attachmentId, data} = action.payload;
            const {rooms} = state;
            // if (!attachmentId) {
            rooms.forEach((room) => {
                if (Number(room.id) === Number(roomId)) {
                    room.posts.forEach((post) => {
                        if (Number(post.id) === Number(postId)) {
                            if (attachmentId) {
                                post.chat_attachment.forEach((attachment) => {
                                    if (Number(attachment.id) === Number(attachmentId)) {
                                        attachment.report = data;
                                    }
                                })
                            } else if (replyId) {
                                post.chat_post_reply.forEach((reply) => {
                                    if (Number(reply.id) === Number(replyId)) {
                                        reply.report = data
                                    }
                                })
                            } else {
                                post.report = data
                            }
                        }
                    })
                }
            })
            // }

            return {
                ...state,
                rooms: [...rooms],
            }
        }

        case GET_ROOMS_SUCCESS: {
            const {data} = action.payload;
            // if(data.rooms[0]){
            let {user, activeRoomId} = state;
            let userRoom = {};
            const rooms = data.rooms.filter((room) => {
                if (Number(room.owner_id) === Number(user.id) && room.privacy === 'user') {
                    userRoom = room;
                    return false
                } else if (!room.baned) {
                    return true
                }else{
                    return false
                }
            })
            if (!activeRoomId) {
                activeRoomId = rooms[0] ? rooms[0].id : null;
            }

            const roomOwner = rooms[0] ? rooms[0].owner_id === user.id : false;
            return {
                ...state,
                rooms: userRoom.id ? [userRoom, ...rooms] : [...rooms],
                activeRoomId: activeRoomId,
                roomLocked: rooms[0] ? rooms[0].password : null,
                roomOwner,
                userRoom,
            }
        }

        case CLOSE_ALL_MODALS: {
            const {modals} = state;
            for (let tool in modals) {
                modals[tool] = {id: null, open: false}
            }
            return {
                ...state,
                modals: {...modals}
            }
        }

        case CREATE_ROOM_SUCCESS: {
            const {rooms, user} = state
            const room = action.payload.data;
            const roomOwner = room ? room.owner_id === user.id : false;
            return {
                ...state,
                rooms: [room, ...rooms],
                userRoom: room,
                activeRoomId: room.id,
                selectedCreateRoom: false,
                roomOwner
            }
        }

        case ADD_ROOM: {
            const {rooms} = state
            const {data} = action.payload;
            rooms.push(data);
            return {
                ...state,
                rooms: [...rooms],
            }
        }

        case DELETE_ROOM_SUCCESS: {
            let {rooms, userRoom, user} = state;
            const {data} = action.payload;
            if (data.success) {
                rooms = rooms.filter((room) => {
                    return Number(room.id) !== Number(data.id)
                })
            }
            const activeRoomId = rooms[0] ? rooms[0].id : '1';
            const roomOwner = rooms[0] ? rooms[0].owner_id === user.id : false;
            userRoom = data.id === userRoom.id ? {} : userRoom
            return {
                ...state,
                rooms: [...rooms],
                userRoom: {...userRoom},
                activeRoomId: activeRoomId,
                selectedUserRoomSettings: false,
                roomOwner
            }
        }

        case UPDATE_ROOM_SUCCESS: {
            let {rooms, userRoom} = state;
            const {data} = action.payload;
            if (data.success) {
                rooms = rooms.map((room) => {
                    if (+room.id === +data.room.id) {
                        return {...room, ...data.room}
                    } else {
                        return room
                    }
                })
                if (+userRoom.id === +data.room.id) {
                    userRoom = {...userRoom, ...data.room}
                }

            }
            return {
                ...state,
                rooms: [...rooms],
                userRoom: {...userRoom},
                selectedUserRoomSettings: false,
            }
        }

        case SELECT_CREATE_ROOM: {
            const {data} = action.payload;
            if (data === 'close') {
                return {
                    ...state,
                    selectedCreateRoom: false
                }
            } else {
                return {
                    ...state,
                    selectedCreateRoom: true,
                    selectedUserRoomSettings: false
                }
            }
        }

        case SELECT_USER_ROOM_SETTINGS: {
            const {data} = action.payload;
            if (data === 'close') {
                return {
                    ...state,
                    selectedUserRoomSettings: false
                }
            } else {
                return {
                    ...state,
                    selectedUserRoomSettings: true,
                    selectedCreateRoom: false
                }
            }
        }

        case ROOM_LEAVE_SUCCESS: {
            const {data} = action.payload;
            if (data.success) {
                const {rooms} = state;
                const newRooms = rooms.map((value) => {
                    if (Number(value.id) === Number(data.roomId)) {
                        value.joinStatus = 0;
                        value.roomUserCount > 0 ?  value.roomUserCount -= 1 : value.roomUserCount = 0;
                    }
                    return value
                })
                return {
                    ...state,
                    rooms: newRooms
                }
            } else {
                return {
                    ...state
                }
            }
        }

        case KICK_FROM_ROOM: {
            const {roomId} = action.payload;
            const {rooms} = state;
            const newRooms = rooms.map((value) => {
                if (Number(value.id) === Number(roomId)) {
                    value.joinStatus = 0
                }
                return value
            })
            return {
                ...state,
                rooms: newRooms
            }
        }

        case ROOM_JOIN_SUCCESS: {
            const {data} = action.payload;
            if (data.success) {
                const {rooms} = state;
                const newRooms = rooms.map((value) => {
                    if (Number(value.id) === Number(data.roomUsers.chat_room_id)) {
                        value.joinStatus = 1
                        value.roomUserCount += 1;
                    }
                    return value
                })
                return {
                    ...state,
                    rooms: newRooms
                }
            } else {
                return {
                    ...state
                }
            }

        }

        case GET_ROOM_POSTS_SUCCESS: {
            const {data, current_page, last_page} = action.payload;
            const {rooms} = state;

            if (data[0]) {
                rooms.forEach((room) => {
                    if (room.id === data[0].chat_room_id) {
                        room.posts ? room.posts = [...room.posts, ...data] : room.posts = [...data];
                        // delete duplicated values from room.posts
                        room.posts = removeDuplicateObjects(room.posts, 'id')

                        // room.unread >= 10 ? room.unread -= 10 : room.unread = 0
                        room.unread = 0;
                    }
                })
            }

            return {
                ...state,
                rooms: [...rooms],
                postsCurrentPage: current_page,
                postsLastPage: last_page,
                requestAccess: true
            }
        }

        case GET_POSTED_PHOTOS_SUCCESS: {
            return {
                ...state,
                requestAccess: true
            }
        }

        case NEW_POST: {
            const {data} = action.payload;
            const {rooms, activeRoomId} = state;
            rooms.forEach((value) => {
                if (Number(value.id) === Number(data.chat_room_id)) {
                    if (value.posts) {
                        value.posts.unshift(data)
                    }
                    if (data.type === 'room_join') {
                        value.roomUserCount += 1;
                    } else if (data.type === 'room_left') {
                        value.roomUserCount > 0 ?  value.roomUserCount -= 1 : value.roomUserCount = 0;
                    }
                    if (activeRoomId !== value.id && value.joinStatus) {
                        value.unread += 1;
                    }

                }
            });
            return {
                ...state,
                rooms: [...rooms],
            }
        }

        case ADD_TEMPORARY_POST: {
            const {data} = action.payload;
            const {rooms} = state;
            rooms.forEach((value) => {
                if (Number(value.id) === Number(data.chat_room_id)) {
                    if (value.posts) {
                        value.posts.unshift(data)
                    } else {
                        value.posts = [data]
                    }
                }
            })
            return {
                ...state,
                rooms: [...rooms],
            }
        }
        case MAKE_POST_SUCCESS: {
            const {data} = action.payload.data;
            const {temporaryId} = action.payload;
            const {rooms} = state;

            rooms.forEach((value) => {
                if (Number(value.id) === Number(data.chat_room_id)) {
                    if (value.posts) {
                        value.posts = value.posts.map((post) => {
                            if (post.id === temporaryId) {
                                return data;
                            } else {
                                return post
                            }
                        })

                    }
                }
            })

            return {
                ...state,
                rooms: [...rooms],
            }
        }
        case MAKE_POST: {
            const {scrollControl} = state;
            return {
                ...state,
                scrollControl: !scrollControl
            }
        }

        case NEW_COMMENT:
        case MAKE_COMMENT_SUCCESS: {
            const {data} = action.payload;
            const {postReply} = data;
            const {rooms} = state;
            rooms.forEach((room) => {
                if (Number(room.id) === Number(data.roomId)) {
                    if (room.posts) {
                        room.posts.forEach((post) => {
                            if (Number(post.id) === Number(postReply['chat_post_id'])) {
                                if (post['chat_post_reply']) {
                                    post['chat_post_reply'].push(postReply)
                                } else {
                                    post['chat_post_reply'] = [postReply]
                                }
                            }
                        })
                    }
                }
            });

            return {
                ...state,
                rooms: [...rooms]
            };
        }

        default: {
            return state;
        }
    }
}

