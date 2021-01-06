import { CREATE_USER, LOGIN, AUTH_USER, LOGOUT } from '../actions/actionTypes';

export default (state={}, action) => {
    switch (action.type){
        case CREATE_USER:
            return action.payload;
        
        case LOGIN:
            console.log(action.payload);
            return action.payload;

        case AUTH_USER:
            console.log(action.payload);
            return {...state,
                    userAuth: action.payload
                    };

        case LOGOUT:
            console.log(action.payload);
            return action.payload;

        default:
            return state;
    }
}