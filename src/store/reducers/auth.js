import {
    SIGN_IN_REQUEST_SUCCESS,
    USER_INFO_REQUEST_SUCCESS,
    USER_LIST_REQUEST_SUCCESS,
    GET_ONLINE_USERS,
    JOIN_ONLINE_USERS,
    LEAVE_ONLINE_USERS,
    SIGN_OUT_REQUEST_SUCCESS,
    SIGN_IN_REQUEST_FAIL,
    SINGLE_SIGN_IN_REQUEST_SUCCESS,
    GET_ROLE_USERS_SUCCESS,
    // SELECT_USER,
} from "../actions/auth";

import {
    ASSIGN_USER_SUCCESS
} from "../actions/admin";


const initialState = {
    user: null,
    userRole: null,
    usersList: [],
    roleUsers: [],
    token: null,
    newMessage: '',
    onlineUsers: [],
    data : null,

};

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case SINGLE_SIGN_IN_REQUEST_SUCCESS: {
            const {token} = action.payload.data;
            localStorage.setItem('token', token);
            return {
                ...state,
            }
        }

        case SIGN_IN_REQUEST_SUCCESS: {
            const {token} = action.payload.data;
            if(token){
                localStorage.setItem('token', token);
            }
            return {
                ...state,
                userData: action.payload.data,
                token: action.payload.data.token,
            }
        }

        case SIGN_OUT_REQUEST_SUCCESS: {
            const {success} = action.payload.data;
            if(success){
                localStorage.removeItem('token');
                window.location.reload()
            }
            return {
                ...state,
            }
        }
        case SIGN_IN_REQUEST_FAIL: {
            return {
                ...state,
                data: action.payload.data
            }
        }

        case USER_INFO_REQUEST_SUCCESS: {
            const {user} = action.payload.data;
            return {
                ...state,
                user,
                userRole: user.role
            }
        }

        case USER_LIST_REQUEST_SUCCESS: {
            const {data} = action.payload;
            return {
                ...state,
                usersList: data,
                // selectedUserId: data[0].id
            }
        }

        case GET_ROLE_USERS_SUCCESS: {
            const {data} = action.payload;
            return {
                ...state,
                roleUsers: [...data],
            }
        }

        case ASSIGN_USER_SUCCESS: {
            const {data} = action.payload;
            const {roleUsers} = state;
            roleUsers.push(data.roleUser);
            return {
                ...state,
                roleUsers: [...roleUsers],
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
                onlineUsers : filterData,
                selectedUserId
            }
        }

        case JOIN_ONLINE_USERS: {
            return {
                ...state,
                onlineUsers : [...action.payload.data]
            }
        }

        case LEAVE_ONLINE_USERS: {
            return {
                ...state,
                onlineUsers : [...action.payload.data]
            }
        }

        default: {
            return state;
        }
    }
}
