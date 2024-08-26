import { SET_FILTER } from "./filterActions";

const defaultState = ''

const filterReducer = (state = defaultState, action) => {

    switch (action.type) {

        case SET_FILTER:
            return action.payload

        default:
            return state

    }

}

export default filterReducer;