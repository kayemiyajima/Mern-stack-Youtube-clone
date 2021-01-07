import React from 'react';
import './DrawerMenu.css';
import DrawerMenuItem from "./DrawerMenuItem";
import MenuSharpIcon from '@material-ui/icons/MenuSharp';
import HomeSharpIcon from '@material-ui/icons/HomeSharp';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import VideoLibrarySharpIcon from '@material-ui/icons/VideoLibrarySharp';
import RestoreSharpIcon from '@material-ui/icons/RestoreSharp';
import OndemandVideoIcon from '@material-ui/icons/OndemandVideo';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SettingsIcon from '@material-ui/icons/Settings';
import FlagIcon from '@material-ui/icons/Flag';
import HelpIcon from '@material-ui/icons/Help';
import FeedbackIcon from '@material-ui/icons/Feedback';
import { Link } from 'react-router-dom';

function DrawerMenu({ toggleDrawer }) {

    return ( 
        <div className='drawerMenu'>
            <div className="drawerMenu__top">
            <MenuSharpIcon className="drawerMenu__menuIcon" />
            <img className="drawerMenu__logoImage"
                  src="https://i.insider.com/59a59a8d79bbfd1d008b601a?width=1200&format=jpeg" alt="youtube-clone"/>
          </div>
        
          <hr />
          <div className="drawerMenu__rows">
            <DrawerMenuItem selected Icon={HomeSharpIcon} title="Home"/>
            <DrawerMenuItem Icon={WhatshotIcon} title="Trending"/>
            <DrawerMenuItem Icon={SubscriptionsIcon} title="Subscriptions"/>
          </div>
          <hr />
          <div className="drawerMenu__rows">
            <DrawerMenuItem Icon={VideoLibrarySharpIcon} title="Library" />
            <DrawerMenuItem Icon={RestoreSharpIcon} title="History"/>
            <DrawerMenuItem Icon={OndemandVideoIcon} title="Your videos"/>
            <DrawerMenuItem Icon={WatchLaterIcon} title="Watch Later"/>
            <DrawerMenuItem Icon={ThumbUpIcon} title="Liked videos"/>
            <DrawerMenuItem Icon={ExpandMoreIcon} title="Show more"/>
          </div>
          <hr />
          <div className="drawerMenu__rows">
            <DrawerMenuItem Icon={SettingsIcon} title="Settings"/>
            <DrawerMenuItem Icon={FlagIcon} title="Report history"/>
            <DrawerMenuItem Icon={HelpIcon} title="Help"/>
            <DrawerMenuItem Icon={FeedbackIcon} title="Send feedback"/>
          </div>
        </div>
    )
}

export default DrawerMenu
