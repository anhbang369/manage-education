import React from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import TrainingClasses from '../components/class/TrainingClassListView';

const TrainingClassList = () => {
    return (
        <>
            <Navbar></Navbar>
            <div className='main'>
                <Sidebar></Sidebar>
                <div className="container">
                    <TrainingClasses />
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}

export default TrainingClassList