import {combineReducers} from 'redux'
import {
    // CHANGE_ACTIVE_ROOM,
    GET_POSTED_PHOTOS_SUCCESS,
    GET_ROOM_POSTS_SUCCESS,
    IMAGE_DIALOG_OPEN,
    MAKE_POST_SUCCESS,
    NEW_POST,
    REMOVE_IMAGE_SUCCESS,
    REPORT_SUCCESS,
    REMOVE_POST_SUCCESS
} from "../actions/chat";
import {GET_MESSAGES_SUCCESS, NEW_MESSAGE, SEND_MESSAGE_SUCCESS,MESSANGER_IMAGE_DIALOG_OPEN,MESSANGER_DOWNLOAD_IMAGE_SUCCESS,MESSANGER_DOWNLOAD_IMAGE,MESSANGER_DOWNLOAD_IMAGE_FAIL} from "../actions/messenger";
// import {CHANGE_ACTIVE_MENU} from "../actions/menu";

import menu from './menu'
import auth from './auth'
import messenger from './messenger'
import chat from './chat'
import home from './home'
import route from './route'
import error from './error'


const initialState = {
    imageDialogOpen: false,
    imgId: null,
    imageDialogPage: null,
    chatPhotos: {},
    photosCount: null,
    messangerImageDialogOpen: false,
};

function index(state = initialState, action) {
    switch (action.type) {

        case MAKE_POST_SUCCESS: {
            const {data} = action.payload.data;
            const roomId = data.chat_room_id;
            const chatAttachment = data['chat_attachment'];
            const {chatPhotos} = state;
            if (chatAttachment && chatAttachment.length > 0) {
                if (!chatPhotos[roomId]) {
                    chatPhotos[roomId] = {
                        photos: {}
                    };
                }
                chatAttachment.forEach((value) => {
                    chatPhotos[roomId].photos[value.id] = value
                })
            }

            return {
                ...state,
                chatPhotos: {...chatPhotos}
            }
        }

        case REMOVE_POST_SUCCESS: {
            const {success, data} = action.payload;
            const {chatPhotos} = state;
            if (success) {
                const photos = chatPhotos[data.chat_room_id] ? chatPhotos[data.chat_room_id].photos : null;
                if (photos) {
                    for (let key in photos) {
                        if(photos[key].chat_post_id === data.id){
                            delete photos[key]
                        }
                    }
                }
            }
            return {
                ...state,
                chatPhotos: {...chatPhotos}
            }
        }

        case NEW_POST: {
            const {data, activeRoomId} = action.payload;
            const roomId = data.chat_room_id;
            const chatAttachment = data['chat_attachment'];
            const {chatPhotos} = state;
            if (chatAttachment && chatAttachment.length > 0 && activeRoomId === roomId) {
                if (!chatPhotos[roomId]) {
                    chatPhotos[roomId] = {
                        photos: {}
                    };
                }
                chatAttachment.forEach((value) => {
                    chatPhotos[roomId].photos[value.id] = value

                })
            }

            return {
                ...state,
                chatPhotos: {...chatPhotos}
            }
        }

        case GET_POSTED_PHOTOS_SUCCESS: {
            const {attachments, count} = action.payload.data;
            const roomId = attachments[0] ? attachments[0].chat_room_id : null;
            const {chatPhotos} = state;
            if (roomId) {
                const loadedPhotos = {};
                attachments.reverse().forEach((attachment) => {
                    loadedPhotos[attachment.id] = attachment
                });
                if (chatPhotos[roomId]) {
                    chatPhotos[roomId].photos = {...loadedPhotos, ...chatPhotos[roomId].photos};
                    chatPhotos[roomId].photosCount = count
                } else {
                    chatPhotos[roomId] = {};
                    chatPhotos[roomId].photos = loadedPhotos;
                    chatPhotos[roomId].photosCount = count
                }
            }


            return {
                ...state,
                chatPhotos: {...chatPhotos},
                photosCount: count,
            }
        }

        case REPORT_SUCCESS: {
            const {attachmentId, data, roomId} = action.payload;

            const {chatPhotos} = state;
            if (attachmentId) {
                if (chatPhotos[roomId]) {
                    chatPhotos[roomId].photos[attachmentId].report = data;
                }
            }
            return {
                ...state,
                chatPhotos: {...chatPhotos}
            }
        }

        case REMOVE_IMAGE_SUCCESS: {
            const {data, attachmentId, roomId} = action.payload;
            const {chatPhotos} = state;
            if (data.success) {
                delete chatPhotos[roomId].photos[attachmentId];
                return {
                    ...state,
                    chatPhotos: {...chatPhotos}
                }
            } else {
                return {
                    ...state
                }
            }
        }

        case GET_ROOM_POSTS_SUCCESS: {
            const {data} = action.payload;
            const {chatPhotos} = state;
            const loadedPhotos = {};

            if (data[0]) {
                data.forEach((post) => {
                    const {chat_attachment} = post;
                    if (chat_attachment[0]) {
                        chat_attachment.forEach((attachment) => {
                            loadedPhotos[attachment.id] = attachment
                        })

                        const roomId = chat_attachment[0].chat_room_id;
                        if (chatPhotos[roomId]) {
                            chatPhotos[roomId].photos = {...loadedPhotos, ...chatPhotos[roomId].photos};
                        } else {
                            chatPhotos[roomId] = {};
                            chatPhotos[roomId].photos = {...loadedPhotos}
                        }
                    }
                })
            }
            return {
                ...state,
                chatPhotos: {...chatPhotos}
            }
        }

        case GET_MESSAGES_SUCCESS : {
            const {chatPhotos} = state;
            const userMessages = action.payload.data.reverse();
            const loadedPhotos = {};
            userMessages.forEach((value) => {
                if (value.message_attachment[0]) {
                    value.message_attachment.forEach((attachment) => {
                        loadedPhotos[attachment.id] = attachment
                    })
                }
            })
            return {
                ...state,
                chatPhotos: {...chatPhotos, ...loadedPhotos},
            }
        }

        case NEW_MESSAGE:
        case SEND_MESSAGE_SUCCESS: {
            const {data} = action.payload;
            const {chatPhotos} = state;
            const photos = {};
            if (data.message_attachment[0]) {
                data.message_attachment.forEach((attachment) => {
                    photos[attachment.id] = attachment
                })
            }

            return {
                ...state,
                chatPhotos: {...chatPhotos, ...photos},
            }
        }

        case IMAGE_DIALOG_OPEN: {
            const {bool, imgId, page} = action.payload;
            return {
                ...state,
                imageDialogOpen: bool,
                imgId: imgId,
                imageDialogPage: page

            }
        }

        case MESSANGER_IMAGE_DIALOG_OPEN: {
            const {bool, imgId, page} = action.payload;
            return {
                ...state,
                messangerImageDialogOpen: bool,
                imgId: imgId,
                imageDialogPage: page
            }
        }

        default: {
            return state;
        }
    }
}

const reducers = combineReducers({
    index,
    auth,
    menu,
    messenger,
    chat,
    home,
    route,
    error
});

export default reducers;
