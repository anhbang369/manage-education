import { React, useState } from 'react';
import Sidebar from '../layout/sidebar/Sidebar';
import Navbar from '../layout/navbar/Navbar';
import Footer from '../layout/footer/Footer';
import ClassStepOne from '../components/class/ClassStepOne';
import ClassStepTwo from '../components/class/ClassStepTwo';
import ClassStepThree from '../components/class/ClassStepThree';
import ClassStepFourth from '../components/class/ClassStepFourth';
import 'bootstrap/dist/css/bootstrap.min.css';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const CreateClass = () => {

    const [step, setStep] = useState(1);
    const [classDto, setClassDto] = useState(null);
    const [selectedItems, setSelectedItems] = useState([]);

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
                            {step === 2 && <ClassStepTwo classDto={classDto} onNextStep={(programTwo, selectedItems) => { setSelectedItems(selectedItems); handleNextStep(programTwo); }} />}
                            {step === 3 && <ClassStepThree />}
                            {step === 4 && <ClassStepFourth />}
                        </div>
                    </ Box>
                </Container>
            </div>
            <Footer></Footer>
        </>
    )
}

export default CreateClass