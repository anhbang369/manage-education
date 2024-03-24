import React from 'react';
import { useState } from 'react';
import "./syllabusCreate.css";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Sidebar from '../components/sidebar/Sidebar';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import GeneralCreate from '../components/general/GeneralCreate';
import OthersCreate from '../components/other/OthersCreate';
import OutlineCreate from '../components/outline/OutlineCreate';

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
                <div className="container">
                    <div className='syllabus__header'>
                        <h4 className='header__title'>S y l l a b u s</h4>
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
                    <div className='syllabus__option'>
                        <div className='option_div'>
                            <h4 className='option__title'>Syllabus Name*</h4>
                            <input type='text' className='option__input' />
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
            </div>
            <Footer></Footer>

        </>
    )
}

export default SyllabusCreate