import axios from "axios";
const baseUrl = process.env.REACT_APP_API_URL;

function TokenHeaders() {
    return {
        headers : {
            Authorization : `Bearer ${localStorage.getItem('token')}`
        }
    }
}
// function fileUploadHeaders() {
//     return {
//         headers : {
//             Authorization  : `Bearer ${localStorage.getItem('token')}`,
//             'content-type' : 'multipart/form-data'
//         }
//     }
// }

export function assignUserRole(data) {
    return axios.post( `${baseUrl}admin/assign-role/${data.id}/${data.role}`, {}, TokenHeaders())
}

