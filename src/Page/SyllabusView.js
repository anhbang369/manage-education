import React from 'react';
import { useState } from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import "./syllabusGeneral.css";
import General from '../components/general/General';
import Others from '../components/other/Others';
import Outline from '../components/outline/Outline';

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
                    <div className="container">
                        <h4 className='syllabus__header'>S y l l a b u s </h4>
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

                        <div className='tabs'>
                            <button className={`tabs__outline ${activeTab === 'General' ? 'active' : ''}`} onClick={() => handleTabClick('General')}>General</button>
                            <button className={`tabs__outline ${activeTab === 'Outline' ? 'active' : ''}`} onClick={() => handleTabClick('Outline')}>Outline</button>
                            <button className={`tabs__outline ${activeTab === 'Others' ? 'active' : ''}`} onClick={() => handleTabClick('Others')}>Others</button>
                        </div>
                        {activeTab === 'General' && <General />}
                        {activeTab === 'Outline' && <Outline />}
                        {activeTab === 'Others' && <Others />}
                    </div>
                </div>
                <Footer></Footer>
            </>
        </>
    )
}

export default SyllabusGeneral