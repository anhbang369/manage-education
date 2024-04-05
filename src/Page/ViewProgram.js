import React from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import Program from '../components/program/Program';

const ViewProgram = () => {
    return (
        <>
            <Navbar></Navbar>
            <div className='main'>
                <Sidebar></Sidebar>
                <div className="container">
                    <Program></Program>
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}

export default ViewProgram