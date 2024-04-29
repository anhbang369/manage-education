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
    const [programTwo, setProgramTwo] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        courseCode: '',
        startTime: '',
        endTime: '',
        startDate: '',
        endDate: '',
        duration: 0,
        reviewedBy: '',
        reviewedDate: new Date().toISOString(),
        approvedBy: '',
        approvedDate: new Date().toISOString(),
        universityCode: '',
        plannedAttendee: '',
        acceptedAttendee: '',
        actualAttendee: '',
        classLocation: null,
        attendeeLevel: null,
        formatType: null,
        classStatus: null,
        technicalGroup: null,
        programContent: null,
        account_admins: [],
        account_trainers: null,
        account_trainee: [],
        classCalendars: null,
        fsu: null,
    });


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
                            {step === 2 && (
                                <ClassStepTwo
                                    classDto={classDto}
                                    onNextStep={(programTwo, selectedItems) => {
                                        setSelectedItems(selectedItems);
                                        setProgramTwo(programTwo);
                                        handleNextStep(programTwo, selectedItems);
                                    }}
                                />
                            )}

                            {step === 3 && (
                                <ClassStepThree
                                    programTwo={programTwo}
                                    selectedItems={selectedItems}
                                    onNextStep={(formData, selectedItems) => {
                                        setFormData(formData);
                                        setSelectedItems(selectedItems);
                                        handleNextStep();
                                    }}
                                />
                            )}
                            {step === 4 && <ClassStepFourth formData={formData} selectedItems={selectedItems} />}

                        </div>
                    </ Box>
                </Container>
            </div>
            <Footer></Footer>
        </>
    )
}

export default CreateClass