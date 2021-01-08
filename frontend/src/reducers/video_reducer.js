import { GET_VIDEO, LIKE_VIDEO, DISLIKE_VIDEO } from '../actions/actionTypes';

export default (state={}, action) => {
    switch (action.type){
        case GET_VIDEO:
            return action.payload;

        case LIKE_VIDEO:
            console.log(action.payload);
            return action.payload;

        case DISLIKE_VIDEO:
            console.log(action.payload)
            return action.payload;

        default:
            return state;
    }
}