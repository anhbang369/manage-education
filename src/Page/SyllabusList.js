import React from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import Navbar from '../components/navbar/Navbar';
import View from '../components/syllabus/View';
import Footer from '../components/footer/Footer';

const SyllabusList = () => {
    return (
        <>
            <Navbar></Navbar>
            <div className='main'>
                <Sidebar></Sidebar>
                <View></View>
            </div>
            <Footer></Footer>
        </>
    )
}

export default SyllabusList