import React from 'react';
import Demo from '../components/calendar/demo';
import Sidebar from '../components/sidebar/Sidebar';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';

const TrainingCalander = () => {
    return (
        <>
            <>
                <Navbar></Navbar>
                <div className='main'>
                    <Sidebar></Sidebar>
                    <div className="container">
                        <h5 className='training__calendar-title'>Training Calendar</h5>
                        <Demo />
                    </div>
                </div>
                <Footer></Footer>
            </>
        </>
    )
}

export default TrainingCalander