import React from 'react';
import "./VideoCard.css";
import Avatar from "@material-ui/core/Avatar";
import { Link } from 'react-router-dom';

function VideoCard({ videoId, image, title, channel, views, timestamp, channelImage, minutes, seconds } ) {
  return (
    <div className="videoCard__container">
      <Link to={`/video/${videoId}`} color="inherit" style={{textDecoration: 'none'}}>
        <div className="videoCard__view">
          <img className="videoCard__thumbnail" src={image} alt={title}/>
          <div className="videoCard__duration">
            <span>{minutes} : {seconds}</span>
          </div>
        </div>
      </Link>
      <div className="videoCard__info">
        <div className="videoCard__info__avatar">
          <Avatar 
            className="videoCard__avatar" 
            alt={channel} 
            src={channelImage} 
          />
        </div>
        <Link to={`/video/${videoId}`} color="inherit" style={{textDecoration: 'none'}}>
          <div className="videoCard__info__title">
            <h4>{title}</h4>
          </div>
        </Link>
      </div>
      <div className="videoCard__text">
        <p>{channel}</p>
        <p>
          {views}views • {timestamp}
        </p>
      </div>
    </div>
  )
}

export default VideoCard