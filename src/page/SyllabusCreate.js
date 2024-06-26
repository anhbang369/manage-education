import React from 'react';
import { useState } from 'react';
import "./syllabusCreate.css";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Sidebar from '../layout/sidebar/Sidebar';
import Navbar from '../layout/navbar/Navbar';
import Footer from '../layout/footer/Footer';
import GeneralCreate from '../components/general/GeneralCreate';
import OthersCreate from '../components/other/OthersCreate';
import OutlineCreate from '../components/outline/OutlineCreate';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import 'bootstrap/dist/css/bootstrap.min.css';


const marks = [
    {
        value: 0,
        label: "",
    },
    {
        value: 20,
        label: "General",
    },
    {
        value: 40,
        label: 'Outline',
    },
    {
        value: 60,
        label: 'Others',
    },
    {
        value: 80,
        label: 'Done',
    },
    {
        value: 100,
        label: '',
    },
];

function valuetext(value) {
    return `${value}°C`;
}

const SyllabusCreate = () => {

    const [activeTab, setActiveTab] = useState('General');
    const [syllabusHead, setsyllabusHead] = useState({
        name: '',
        code: 'NLP',
        version: '1.0'
    });

    const handleNameChange = (e) => {
        const newName = e.target.value;
        setsyllabusHead(prevSyllabusHead => ({
            ...prevSyllabusHead,
            name: newName
        }));
    };
    console.log(syllabusHead)

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handleNextTab = () => {
        setActiveTab('Outline');
    };

    const handleNextOtherTab = () => {
        setActiveTab('Others');
    };

    const handlePreviousTab = () => {
        setActiveTab('Outline');
    };

    const handlePreviousGeneralTab = () => {
        setActiveTab('General');
    };

    const [syllabusDays, setSyllabusDays] = useState(null);

    const handleUpdateSyllabusDays = (updatedSyllabusDays) => {
        setSyllabusDays(updatedSyllabusDays);
    };

    const [requestBody, setRequestBody] = useState({
        name: '',
        code: '',
        version: '',
        attendeeNumber: 0,
        technicalRequirement: '',
        courseObjective: '',
        status: '',
        assessmentScheme: {
            assignment: 0,
            quiz: 0,
            exam: 0,
            gpa: 0,
            finalPoint: 0,
            finalTheory: 0,
            finalPractice: 0
        },
        deliveryPrinciple: {
            trainees: '',
            trainer: '',
            training: '',
            re_test: '',
            marking: '',
            waiverCriteria: '',
            others: ''
        },
        syllabusLevel: '',
        syllabusDays: syllabusDays,
        template: true
    });
    const [updatedRequestBody, setUpdatedRequestBody] = useState(null);

    const handleUpdateRequestBody = (updatedRequestBody) => {
        setRequestBody(updatedRequestBody);
    };

    const handleUpdatedRequestBody = (updatedRequestBody) => {
        setUpdatedRequestBody(updatedRequestBody);
    };

    return (
        <>
            <Navbar></Navbar>
            <div className='main'>
                <Sidebar></Sidebar>
                <React.Fragment>
                    <CssBaseline />
                    <Container fixed className='p-0 overflow-y-scroll'>
                        <Box sx={{ bgcolor: '#FFF', height: '100%', width: '100%' }}>
                            <div>
                                <div className='d-flex text-black m-0 border-bottom border-black'>
                                    <h5 className='text-black mt-3 me-5 ms-2 text-center'>S y l l a b u s</h5>
                                    <Box sx={{ width: 300 }}>
                                        <Slider
                                            aria-label="Custom marks"
                                            defaultValue={20}
                                            getAriaValueText={valuetext}
                                            step={10}
                                            valueLabelDisplay="auto"
                                            marks={marks}
                                        />
                                    </Box>
                                </div>
                                <div className='mt-2 d-flex justify-content-md-between text-black w-64'>
                                    <div className='d-flex'>
                                        <p className='mx-4'>Syllabus Name*</p>
                                        <input type="text" class="form-control h-50 w-100 p-0 mx-3 my-1" placeholder='Type unit name' aria-describedby="basic-addon1" value={syllabusHead.name} onChange={handleNameChange} />
                                    </div>
                                    <p className='option__code'><b>Code:</b>  NLP</p>
                                    <p className='option__version'><b>Version:</b>  1.0</p>
                                </div>
                                <div className='tabs'>
                                    <button className={`tabs__outline ${activeTab === 'General' ? 'active' : ''}`} onClick={() => handleTabClick('General')}>General</button>
                                    <button className={`tabs__outline ${activeTab === 'Outline' ? 'active' : ''}`} onClick={() => handleTabClick('Outline')}>Outline</button>
                                    <button className={`tabs__outline ${activeTab === 'Others' ? 'active' : ''}`} onClick={() => handleTabClick('Others')}>Others</button>
                                </div>
                                {activeTab === 'General' && <GeneralCreate syllabusHead={syllabusHead} onNextClick={handleNextTab} onUpdateRequestBody={handleUpdateRequestBody} />}
                                {activeTab === 'Outline' && <OutlineCreate requestBody={requestBody} onNextClick={handleNextOtherTab} onPreviousClick={handlePreviousGeneralTab} onUpdateSyllabusDays={handleUpdateSyllabusDays} updatedRequestBody={updatedRequestBody} onUpdatedRequestBody={handleUpdatedRequestBody} />}
                                {activeTab === 'Others' && <OthersCreate updatedRequestBody={updatedRequestBody} onPreviousClick={handlePreviousTab} />}
                            </div>
                        </ Box>
                    </Container>
                </React.Fragment>

            </div>
            <Footer></Footer>

        </>
    )
}

export default SyllabusCreate