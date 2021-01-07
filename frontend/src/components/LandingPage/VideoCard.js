import React from 'react';
import "./VideoCard.css";
import Avatar from "@material-ui/core/Avatar";
import { Link } from 'react-router-dom';

function VideoCard({ videoId, image, title, channel, views, timestamp, channelImage, minutes, seconds } ) {
  return (
    <div className="videoCard__container">
      <Link to={`/video/${videoId}`}>
        <div className="videoCard__view">
          <img className="videoCard__thumbnail" src={image} alt={title}/>
          <div className="videoCard__duration">
            <span>{minutes} : {seconds}</span>
          </div>
        </div>
      </Link>
      <div className="videoCard__info">
        <div className="videoCard__info__1">
          <Avatar 
            className="videoCard__avatar" 
            alt={channel} 
            src={channelImage} 
          >
            {channel.substr(0, 1)}
          </Avatar>
        </div>
        <div className="videoCard__info__2">
          <div className="videoCard__title">
            <h4>{title}</h4>
          </div>
          <div className="videoCard__text">
            <p>{channel}</p>
            <p>
              {views}views • {timestamp}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoCard