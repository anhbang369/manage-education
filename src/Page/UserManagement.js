import React from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import UserManagementView from '../components/user/UserManagementView';

const UserManagement = () => {
    return (
        <>
            <Navbar></Navbar>
            <div className='main'>
                <Sidebar></Sidebar>
                <UserManagementView />
            </div>
            <Footer></Footer>
        </>
    )
}

export default UserManagement