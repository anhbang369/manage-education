import React from 'react';
import { useState } from 'react';
import Sidebar from '../layout/sidebar/Sidebar';
import Navbar from '../layout/navbar/Navbar';
import Footer from '../layout/footer/Footer';
import "./syllabusGeneral.css";
import General from '../components/general/General';
import Others from '../components/other/Others';
import Outline from '../components/outline/Outline';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import 'bootstrap/dist/css/bootstrap.min.css';

const SyllabusGeneral = () => {

    const [activeTab, setActiveTab] = useState('General');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <>
            <>
                <Navbar></Navbar>
                <div className='main'>
                    <Sidebar></Sidebar>
                    <React.Fragment>
                        <CssBaseline />
                        <Container fixed className='p-0 overflow-y-scroll'>
                            <Box sx={{ bgcolor: '#FFF', height: '100%', width: '100%' }}>
                                <div>
                                    <h4 className='fw-normal text-white fs-5 ms-10 bg-core p-1 border border-white'>S y l l a b u s </h4>
                                    <div className='header__title'>
                                        <div className='header__div'>
                                            <h1 className='syllabus__title'>C# Programming Language</h1>
                                            <p className='active'>Active</p>
                                        </div>
                                        <i class="bi bi-three-dots header__icon"></i>
                                    </div>
                                    <div className='info__solid'>
                                        <h4 className='title__info'>NLP v4.0</h4>
                                    </div>
                                    <div className='syllabus__time'><p className='syllabus__date'>8</p> <span className='date__span'>days (68 hours)</span></div>
                                    <p className='info__detail'>Modified on 23/07/2024 by <b>Anh Bang</b></p>

                                    <div className='tabs mt-2'>
                                        <button className={`tabs__outline ${activeTab === 'General' ? 'active' : ''}`} onClick={() => handleTabClick('General')}>General</button>
                                        <button className={`tabs__outline ${activeTab === 'Outline' ? 'active' : ''}`} onClick={() => handleTabClick('Outline')}>Outline</button>
                                        <button className={`tabs__outline ${activeTab === 'Others' ? 'active' : ''}`} onClick={() => handleTabClick('Others')}>Others</button>
                                    </div>
                                    {activeTab === 'General' && <General />}
                                    {activeTab === 'Outline' && <Outline />}
                                    {activeTab === 'Others' && <Others />}
                                </div>
                            </ Box>
                        </Container>
                    </React.Fragment>
                </div>
                <Footer></Footer>
            </>
        </>
    )
}

export default SyllabusGeneral