import React from 'react';
import "./sidebar.css";
import SidebarItems from './SidebarItems';

const Sidebar = () => {
    return (
        <div className='sidebar'>
            {/* {items.map((item, index) => <SidebarItems key={index} item={item}></SidebarItems>)} */}
            <SidebarItems></SidebarItems>
        </div>
    )
}

export default Sidebar