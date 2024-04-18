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

    const handleTabClick = (tab) => {
        setActiveTab(tab);
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
                                        <input type="text" class="form-control h-50 w-100 p-0 mx-3 my-1" placeholder='Type unit name' aria-describedby="basic-addon1" />
                                    </div>
                                    <p className='option__code'><b>Code:</b>  NLP</p>
                                    <p className='option__version'><b>Version:</b>  1.0</p>
                                </div>
                                <div className='tabs'>
                                    <button className={`tabs__outline ${activeTab === 'General' ? 'active' : ''}`} onClick={() => handleTabClick('General')}>General</button>
                                    <button className={`tabs__outline ${activeTab === 'Outline' ? 'active' : ''}`} onClick={() => handleTabClick('Outline')}>Outline</button>
                                    <button className={`tabs__outline ${activeTab === 'Others' ? 'active' : ''}`} onClick={() => handleTabClick('Others')}>Others</button>
                                </div>
                                {activeTab === 'General' && <GeneralCreate />}
                                {activeTab === 'Outline' && <OutlineCreate />}
                                {activeTab === 'Others' && <OthersCreate />}
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