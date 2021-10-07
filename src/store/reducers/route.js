import {
    SET_MATCH,
} from "../actions/route";

const initialState = {
    globalMatch: {},
    roomExist: true

};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_MATCH: {
            const {data} = action.payload;
            return {
                ...state,
                globalMatch: data

            }
        }
        default: {
            return state;
        }
    }
}
