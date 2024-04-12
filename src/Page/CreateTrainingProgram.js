import React from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import TrainingProgramStepOne from '../components/training/TrainingProgramStepOne';
import TrainingProgramStepTwo from '../components/training/TrainingProgramStepTwo';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const CreateTrainingProgram = () => {
    return (
        <>
            <Navbar></Navbar>
            <div className='main'>
                <Sidebar></Sidebar>
                <React.Fragment>
                    <CssBaseline />
                    <Container fixed className='p-0 overflow-y-scroll'>
                        <Box sx={{ bgcolor: '#cfe8fc', height: '100%', width: '100%' }}>
                            <TrainingProgramStepTwo />
                        </ Box>
                    </Container>
                </React.Fragment>
            </div>
            <Footer></Footer>
        </>
    )
}

export default CreateTrainingProgram