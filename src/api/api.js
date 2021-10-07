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

export function singleSignIn(data) {
    return axios.get( `${baseUrl}webservices/user/${data.auth_type}/${data.auth_key}`)
}

export function signIn(data) {
    return axios.post( `${baseUrl}auth/login`, data)
}

export function signOut(data) {
    return axios.get( `${baseUrl}auth/signOut`, TokenHeaders())
}

export function closeWindow() {
    return axios.get( `${baseUrl}auth/closeWindow/close`, {
        ...TokenHeaders()
    })
}

export function getUserInfo() {
    return axios.get( `${baseUrl}user/info`, TokenHeaders())
}

export function getRoleUsers() {
    return axios.get( `${baseUrl}admin/roleUsers`, {
        ...TokenHeaders()
    })
}


export function getUserList() {

    return axios.get( `${baseUrl}user/list`, TokenHeaders())
}

export function getMessages(id) {
    return axios.post( `${baseUrl}getMessages`, {userId: id}, TokenHeaders())
}

export function sendMessage(data) {

    const headers = data.get('file') ?  fileUploadHeaders : TokenHeaders;
    return axios.post( `${baseUrl}sendMessage`, data, headers())
}

export function call(data) {
    return axios.post( `${baseUrl}videoChat`, data, TokenHeaders())
}

export function downloadImage(data) {
    return axios.post( `${baseUrl}messanger/downloadImage`, data, TokenHeaders())
}

