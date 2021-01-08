import React, { useEffect } from 'react';
import './SelectedVideo.css';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ShareIcon from '@material-ui/icons/Share';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Avatar from "@material-ui/core/Avatar";
import { Button } from "@material-ui/core";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { getVideo, likeVideo, dislikeVideo } from '../../actions/video_actions';

function SelectedVideo() {

    const dispatch = useDispatch();
    const video = useSelector((state)=> state.video);
    const writer = video.writer;
    console.log(writer);

    const videoId = useParams();

    useEffect(()=> {
        dispatch(getVideo(videoId));
    }, [videoId]);

    const handleLike = () => {
        dispatch(likeVideo(video._id));
    }

    const handleDislike = () => {
        dispatch(dislikeVideo(video._id));
    }
    
    return (
        <div className="selectedVideo">
            <div className="selectedVideo__videoContainer">
                <video src={`http://localhost:5000/${video.filePath}`} type="video/mp4" controls />
            </div>

            <div className="selectedVideo__info">
                <div className="selectedVideo__info__first">
                    <div className="selectedVideo__info__title">
                        <h3>{video.title}</h3>
                    </div>
                    <div className="selectedVideo__info__title__below">
                        <div className="selectedVideo__info__title__below__titleInfo">
                            <p>4,443,202 views • {moment(video.createdAt).format('MMM DD YYYY')}</p>
                        </div>
                        <div className="selectedVideo__info__title__below__icons">
                            <div className="selectedVideo__info__icon__container">
                                <Button onClick={handleLike}>
                                    <ThumbUpAltIcon className="icon" />
                                    <p>{video.likeCount}</p>
                                </Button>
                            </div>
                            <div className="selectedVideo__info__icon__container">
                                <Button onClick={handleDislike}>
                                    <ThumbDownIcon className="icon"/>
                                    <p>{video.dislikeCount}</p>
                                </Button>
                            </div>
                            <div className="selectedVideo__info__icon__container">
                                <ShareIcon className="icon"/>
                                <p>SHARE</p>
                            </div>
                            <div className="selectedVideo__info__icon__container">
                                <PlaylistAddIcon className="icon"/>
                                <p>SAVE</p>
                            </div>
                            <div className="selectedVideo__info__icon__container">
                                <MoreHorizIcon className="icon"/>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="selectedVideo__info__second">
                    <div className="selectedVideo__info__detail__top">
                        <div className="selectedVideo__info__author">
                            <Avatar 
                                className="selectedVideo__info__author__avatar"
                                src={writer.avatarImage}
                                alt={writer.name}
                            />
                            <div className="slectedVideo__info__author__name">
                                <h5>
                                    {writer.name + ' ' + writer.lastname}
                                    </h5>
                                <p>8.92K subscribers</p>
                            </div>
                        </div>
                        <div className="selectedVide__info__subscribeButton">
                            <Button variant="contained" color="secondary" size="medium" >
                                SUBSCRIBE
                            </Button>
                        </div>
                    </div>
                    <br />
                    <div className="selectedVideo__info__detail__bottom">
                        <p>{video.description}</p>
                    </div>
                </div>
                <hr />
            </div>
        </div>
    )
}

export default SelectedVideo