import { React, useState } from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import ClassStepOne from '../components/class/ClassStepOne';
import ClassStepTwo from '../components/class/ClassStepTwo';
import ClassStepThree from '../components/class/ClassStepThree';
import 'bootstrap/dist/css/bootstrap.min.css';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

const CreateClass = () => {

    const [step, setStep] = useState(1);
    const [classDto, setClassDto] = useState(null);

    const handleNextStep = (dto) => {
        setClassDto(dto);
        setStep(step + 1);
    };

    return (
        <>
            <Navbar></Navbar>
            <div className='main'>
                <Sidebar></Sidebar>
                <Container fixed className='p-0 overflow-y-scroll'>
                    <Box sx={{ bgcolor: '#cfe8fc', height: '100%', width: '100%' }}>
                        <div className="w-100">
                            {step === 1 && <ClassStepOne onNextStep={handleNextStep} />}
                            {step === 2 && <ClassStepThree classDto={classDto} />}
                            {step === 3 && <ClassStepTwo />}
                        </div>
                    </ Box>
                </Container>
            </div>
            <Footer></Footer>
        </>
    )
}

export default CreateClass