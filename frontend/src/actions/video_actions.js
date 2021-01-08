import * as api from '../api/videos';
import { GET_VIDEO, LIKE_VIDEO, DISLIKE_VIDEO } from './actionTypes';

export const getVideo = (videoId) => async (dispatch) => {
    try {
        const { data } = await api.getVideo(videoId);
        dispatch({
            type: GET_VIDEO,
            payload: data
        });
    } catch (error) {
        console.log(error.message);
    }
}

export const likeVideo = (_id) => async (dispatch) => {
    try {
        const { data } = await api.likeVideo(_id);
        dispatch({
            type: LIKE_VIDEO,
            payload: data
        })
    } catch (error) {
        console.log(error.message);
    }
}

export const dislikeVideo = (id) => async (dispatch) => {
    try {
        const { data } = await api.dislikeVideo(id);
        dispatch({
            type: DISLIKE_VIDEO,
            payload: data
        })
    } catch (error) {
        console.log(error.message);
    }
}