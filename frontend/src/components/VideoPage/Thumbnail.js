import React, { useEffect, useState } from 'react';
import './Thumbnail.css';
import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom';


function Thumbnails() {
    const [videos, setVideos] = useState([]);
    console.log(videos);

    // useEffect(()=> {
    //     axios.get(`http://localhost:5000/api/video/getvideos`)
    //     .then(res => {
    //       if(res.data.success){
    //         setVideos(res.data.videos);
    //       }
    //     })
    //   },[])

    return (
        <div className="thumbnails">
            {videos.map((video) => (
                <Link to={`/video/${video._id}`}>
                    <div className="thumbnails__container">
                        <div className="thumbnails__container__view">
                            <img src={`http://localhost:5000/${video.thumbnail}`} alt={video.title} />
                            <div className="thumbnails__duration">
                                <span>{Math.floor(video.duration / 60)} : {Math.floor(video.duration - (Math.floor(video.duration / 60)) * 60)}</span>
                            </div>
                        </div>
                        <div className="thumbnails__container__info">
                            <h5>{video.title}</h5>
                            <p>{video.writer.name}</p>
                            <p>{video.views} views • {moment(video.createdAt).format('MMM DD YYYY')}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default Thumbnails
