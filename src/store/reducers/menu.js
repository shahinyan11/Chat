import {
    CHANGE_ACTIVE_MENU,
    SELECT_USER
} from "../actions/menu";

const initialState = {
    activeMenuId: localStorage.getItem('activeMenu') ? localStorage.getItem('activeMenu') : '7',
    selectedUserId : null,

}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_ACTIVE_MENU: {
            const {id} = action.payload;
            localStorage.setItem('activeMenu', id);
            return {
                ...state,
                activeMenuId: id
            }
        }

        case SELECT_USER: {
            return {
                ...state,
                selectedUserId: action.payload.id,
            }
        }

        default: {
            return state;
        }
    }
}
