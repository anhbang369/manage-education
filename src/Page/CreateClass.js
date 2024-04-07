import React from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import ClassStepOne from '../components/class/ClassStepOne';
import ClassStepTwo from '../components/class/ClassStepTwo';
import ClassStepThree from '../components/class/ClassStepThree';

const CreateClass = () => {
    return (
        <>
            <Navbar></Navbar>
            <div className='main'>
                <Sidebar></Sidebar>
                <div className="container">
                    <ClassStepThree />
                </div>
            </div>
            {/* <Footer></Footer> */}
        </>
    )
}

export default CreateClass