import {
    SELECT_PROFILE_EDIT
} from "../actions/home";

const initialState = {
    profileEditSelected: false

};

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case SELECT_PROFILE_EDIT: {
            return {
                ...state,
                profileEditSelected: true

            }
        }

        default: {
            return state;
        }
    }
}
