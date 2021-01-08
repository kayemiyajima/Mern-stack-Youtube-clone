import { combineReducers } from 'redux';

import user_reducer from './user_reducer';
import video_reducer from './video_reducer';

export default combineReducers({
    user: user_reducer,
    video: video_reducer
});