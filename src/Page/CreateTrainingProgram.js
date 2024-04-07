import React from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import TrainingProgramStepOne from '../components/training/TrainingProgramStepOne';
import TrainingProgramStepTwo from '../components/training/TrainingProgramStepTwo';

const CreateTrainingProgram = () => {
    return (
        <>
            <Navbar></Navbar>
            <div className='main'>
                <Sidebar></Sidebar>
                <div className="container">
                    <TrainingProgramStepTwo />
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}

export default CreateTrainingProgram