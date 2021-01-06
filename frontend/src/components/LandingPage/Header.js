import React, { useState } from 'react';
import './Header.css';
import MenuSharpIcon from '@material-ui/icons/MenuSharp';
import SearchIcon from '@material-ui/icons/Search';
import VideoCallSharpIcon from '@material-ui/icons/VideoCallSharp';
import AppsSharpIcon from '@material-ui/icons/AppsSharp';
import NotificationsSharpIcon from '@material-ui/icons/NotificationsSharp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Button, Tooltip, Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../actions/user_actions'


function Header() {

    const user = useSelector((state)=> state.user);
    const userInfo = user.user;
    console.log(user);
    const dispatch = useDispatch();
    console.log(document.cookie);

    const [inputSearch, setInputSearch] = useState('');

    const handleLogout = (e) => {
        dispatch(logoutUser());
    }

    return (
        <div className="header">
            <div className="header__menuIcon__container">
                <MenuSharpIcon className="header__menuIcon"/>
                <div className="header__logo">
                <Link to="/">
                    <img className="header__logoImage"
                        src="https://i.insider.com/59a59a8d79bbfd1d008b601a?width=1200&format=jpeg" 
                        alt="youtubelogo"
                    />
                </Link>
                </div>
            </div>

        <div className="header__searchBox">
            <input onChange={e => setInputSearch(e.target.value)} 
            value={inputSearch} 
            placeholder="Search" 
            type="text" 
            />
            <Link to={`/search/${inputSearch}`}>
            <div className="searchButton__container">
                <SearchIcon   className="header__searchButton"/>
            </div>
            </Link>
        </div>

        <div className="header__icons">
            <Tooltip title="UPLOAD VIDEO">
            <Link to={'/video/upload'}>
                <VideoCallSharpIcon className="header__icon"/>
            </Link>
            </Tooltip>
            <AppsSharpIcon className="header__icon"/>
            <NotificationsSharpIcon className="header__icon"/>
            
            {user.loginSuccess ? 
            <Tooltip title="LOG OUT" >
                <Avatar 
                    className="logoutIcon" 
                    onClick={handleLogout}
                    src={userInfo.avatarImage} />
            </Tooltip>
            :
            <Link to={'/user/login'}>
                <Button 
                variant="outlined" 
                color="primary" 
                size="medium" 
                startIcon={<AccountCircleIcon />}
                >
                    SIGN IN
                </Button>
            </Link>
            }
        </div>
    </div>
    )
}

export default Header
