import React from 'react';
import { useState, useEffect } from 'react';
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
import { getByIdSyllabus } from '../services/SyllabusService';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';

const SyllabusView = () => {

    const params = useParams();
    console.log("GET PARAMETER" + params.id)

    const [activeTab, setActiveTab] = useState('General');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };


    const [syllabusData, setSyllabusData] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getByIdSyllabus(params.id);
                setSyllabusData([data]);
                console.log(data);
            } catch (error) {
                console.log(error)
            }
        };

        fetchData();
    }, []);
    console.log("Data from set" + syllabusData)

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
                                {syllabusData && Array.isArray(syllabusData) && syllabusData.map((item) => (
                                    <div key={item.id}>
                                        <h4 className='fw-normal text-white fs-5 ms-10 bg-core p-1 border border-white'>Syllabus view</h4>
                                        <div className='header__title'>
                                            <div className='header__div'>
                                                <h1 className='syllabus__title'>{item.name}</h1>
                                                <p className='active'>{item.status}</p>
                                            </div>
                                            <i class="bi bi-three-dots header__icon"></i>
                                        </div>
                                        <div className='info__solid'>
                                            <h4 className='title__info'>{item.code}</h4>
                                        </div>
                                        <div className='syllabus__time'><p className='syllabus__date'>{item.days}</p> <span className='date__span'>days ({item.hours} hours)</span></div>
                                        <p className='info__detail'>Modified on {item.createdDate} by <b>{item.createdBy}</b></p>

                                        <div className='tabs mt-2'>
                                            <button className={`tabs__outline ${activeTab === 'General' ? 'active' : ''}`} onClick={() => handleTabClick('General')}>General</button>
                                            <button className={`tabs__outline ${activeTab === 'Outline' ? 'active' : ''}`} onClick={() => handleTabClick('Outline')}>Outline</button>
                                            <button className={`tabs__outline ${activeTab === 'Others' ? 'active' : ''}`} onClick={() => handleTabClick('Others')}>Others</button>
                                        </div>
                                        {activeTab === 'General' && <General syllabusData={syllabusData} />}
                                        {activeTab === 'Outline' && <Outline syllabusData={syllabusData} />}
                                        {activeTab === 'Others' && <Others syllabusData={syllabusData} />}
                                    </div>
                                ))}

                            </ Box>
                        </Container>
                    </React.Fragment>
                </div>
                <Footer></Footer>
            </>
        </>
    )
}

export default SyllabusView