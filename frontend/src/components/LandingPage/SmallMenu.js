import React from 'react'
import "./SmallMenu.css";
import HomeSharpIcon from '@material-ui/icons/HomeSharp';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import VideoLibrarySharpIcon from '@material-ui/icons/VideoLibrarySharp';
import RestoreSharpIcon from '@material-ui/icons/RestoreSharp';
import Hidden from '@material-ui/core/Hidden';

function SmallMenu() {
  return (
    <Hidden xsDown>
      <div className="smallMenu">
        <div className="smallMenu__menu">
          <HomeSharpIcon  selected className="smallMenu__icon"/>
          <p className="smallMenu__title">Home</p>
        </div>
        <div className="smallMenu__menu">
          <WhatshotIcon className="smallMenu__icon"/>  
          <p className="smallMenu__title">Trending</p>
        </div>
        <div className="smallMenu__menu">
          <SubscriptionsIcon className="smallMenu__icon"/>
          <p className="smallMenu__title">Subscriptions</p>
        </div>
        <div className="smallMenu__menu">
          <VideoLibrarySharpIcon className="smallMenu__icon"/>
          <p className="smallMenu__title">Library</p>
        </div>
        <div className="smallMenu__menu">
          <RestoreSharpIcon className="smallMenu__icon"/>
          <p className="smallMenu__title">History</p>
        </div>
      </div>
    </Hidden>
  )
}

export default SmallMenu
