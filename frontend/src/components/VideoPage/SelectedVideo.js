import React, { useEffect, useState } from 'react';
import './SelectedVideo.css';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ShareIcon from '@material-ui/icons/Share';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Avatar from "@material-ui/core/Avatar";
import { Button } from "@material-ui/core";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import moment from 'moment';

function SelectedVideo(props) {

    const videoId = useParams();
    const [video, setVideo] = useState([]);
    const [writer, setWriter] = useState([]);

    useEffect(()=> {
        axios.post(`http://localhost:5000/api/video/getVideo`, videoId)
        .then(res => {
            if(res.data.success) {
                setVideo(res.data.video);
                setWriter(res.data.video.writer)
            } else {
                alert('Failed to get video')
            }
        })
    }, [videoId]);

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
                                <ThumbUpAltIcon className="icon" />
                                <p>14K</p>
                            </div>
                            <div className="selectedVideo__info__icon__container">
                                <ThumbDownIcon className="icon"/>
                                <p>1.4K</p>
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
                            <Avatar className="selectedVideo__info__author__avatar">
                                
                            </Avatar>
                            <div className="slectedVideo__info__author__name">
                                <h5>{writer.name}</h5>
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