import axios from "axios";
const baseUrl = process.env.REACT_APP_API_URL;

function TokenHeaders() {
    return {
        headers : {
            Authorization : `Bearer ${localStorage.getItem('token')}`
        }
    }
}
function fileUploadHeaders() {
    return {
        headers : {
            Authorization  : `Bearer ${localStorage.getItem('token')}`,
            'content-type' : 'multipart/form-data'
        }
    }
}

export function downloadImage(data) {
    return axios.post( `${baseUrl}chat/downloadImage`, data, TokenHeaders())
}

export function like(data) {
    return axios.get( `${baseUrl}vote-image/${data.attachmentId}`, {
        ...TokenHeaders()
    })
}

export function kick(data) {
    return axios.post( `${baseUrl}chat/kickUser`,  data, TokenHeaders())
}

export function banUser(data) {
    return axios.post( `${baseUrl}chat/banUser`,  data, TokenHeaders())
}
// ##### For Forum #####
// export function like(data) {
//     return axios.get( `${baseUrl}vote-post/${data.id}`, {
//         ...TokenHeaders()
//     })
// }

export function getRooms(data) {
    return axios.get( `${baseUrl}chat/room`, {
        params : data,
        ...TokenHeaders()
    })
}

export function getRoomOnlineUsers(data) {
    return axios.get( `${baseUrl}chat/getRoomOnlineUsers/${data.roomId}`, {
        ...TokenHeaders()
    })
}

export function getPostReplys(data) {
    return axios.get( `${baseUrl}chat/getPostReplys`, {
        params: data,
        ...TokenHeaders()
    })
}

export function createRoom(data) {
    return axios.post( `${baseUrl}chat/room`, data, TokenHeaders())
}

// updateRoom function send put request. data['_method']  = put ;
export function updateRoom(data) {
    return axios.post( `${baseUrl}chat/room`, data, TokenHeaders())
}

export function deleteRoom(data) {
    return axios.delete( `${baseUrl}chat/room/${data.id}`, {
        ...TokenHeaders()
    })
}

export function report(data) {
    return axios.post( `${baseUrl}chat/report`, data, TokenHeaders())
}

export function roomJoin(data) {
    return axios.post( `${baseUrl}chat/roomJoin`, data, TokenHeaders())
}

export function roomLeave(data) {
    return axios.post( `${baseUrl}chat/roomLeave`, data, TokenHeaders())
}

export function getRoopmPosts(data) {
    return axios.get( `${baseUrl}chat/getPosts`, {
        params: data,
        ...TokenHeaders()
    })
}

export function getPostedPhotos(data) {
    return axios.get( `${baseUrl}chat/getPostedPhotos`,{
        params: data,
        ...TokenHeaders()
    })
}

export function makePost(data) {
    const headers = data.get('file[]') ?  fileUploadHeaders : TokenHeaders;
    return axios.post( `${baseUrl}chat/post`, data, headers())
}

export function makeComment(data) {
    return axios.post( `${baseUrl}chat/comment`, data, TokenHeaders())
}

export function removeComment(data) {
    return axios.post( `${baseUrl}chat/removeComment`, data, TokenHeaders())
}
export function removePost(data) {
    return axios.delete( `${baseUrl}chat/removePost/${data.id}`, {
        ...TokenHeaders()
    })
}

export function editPost(data) {
    return axios.post( `${baseUrl}chat-post/${data.id}`, data, TokenHeaders())
}

export function removeAttachment(data) {
    return axios.post( `${baseUrl}chat/removeAttachment`, data, TokenHeaders())
}

