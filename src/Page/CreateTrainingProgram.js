import React from 'react';
import { useState } from 'react';
import Sidebar from '../layout/sidebar/Sidebar';
import Navbar from '../layout/navbar/Navbar';
import Footer from '../layout/footer/Footer';
import TrainingProgramStepOne from '../components/training/TrainingProgramStepOne';
import TrainingProgramStepTwo from '../components/training/TrainingProgramStepTwo';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const CreateTrainingProgram = () => {

    const [stepP, setStepP] = useState(1);
    const [classDtoP, setClassDtoP] = useState(null);

    const handleNextStepP = (dto) => {
        setClassDtoP(dto);
        setStepP(stepP + 1);
    };

    return (
        <>
            <Navbar></Navbar>
            <div className='main'>
                <Sidebar></Sidebar>
                <React.Fragment>
                    <CssBaseline />
                    <Container fixed className='p-0 overflow-y-scroll'>
                        <Box sx={{ bgcolor: '#cfe8fc', height: '100%', width: '100%' }}>
                            {stepP === 1 && <TrainingProgramStepOne onNextStepP={handleNextStepP} />}
                            {stepP === 2 && <TrainingProgramStepTwo classDto={classDtoP} />}
                        </ Box>
                    </Container>
                </React.Fragment>
            </div>
            <Footer></Footer>
        </>
    )
}

export default CreateTrainingProgram