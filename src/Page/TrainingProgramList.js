import React from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import TrainingProgram from '../components/training/TrainingProgram';

const TrainingProgramList = () => {
    return (
        <>
            <Navbar></Navbar>
            <div className='main'>
                <Sidebar></Sidebar>
                <div className="container">
                    <TrainingProgram></TrainingProgram>
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}

export default TrainingProgramList