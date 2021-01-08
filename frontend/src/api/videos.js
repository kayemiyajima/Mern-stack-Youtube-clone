import axios from 'axios';

const URL = 'http://localhost:5000/api/video';

export const getVideo = (videoId) => axios.post(`${URL}/getVideo`, videoId);
export const likeVideo = (_id) => axios.patch(`${URL}/${_id}/likeVideo`)
export const dislikeVideo = (_id) => axios.patch(`${URL}/${_id}/dislikeVideo`)
