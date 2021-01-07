import React from 'react';
import './DrawerMenuItem.css';

function DrawerMenuItem({ selected, Icon, title }) {
    return (
        <div className={`drawerMenuItem ${selected && "selected"}`}>
            <Icon className="drawerMenuItem__icon" />
            <h2 className="drawerMenuItem__title">{title}</h2>
        </div>
    )
}

export default DrawerMenuItem
