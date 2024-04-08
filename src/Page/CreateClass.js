import { React, useState } from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import ClassStepOne from '../components/class/ClassStepOne';
import ClassStepTwo from '../components/class/ClassStepTwo';
import ClassStepThree from '../components/class/ClassStepThree';

const CreateClass = () => {

    const [step, setStep] = useState(1);
    const [classDto, setClassDto] = useState(null);

    const handleNextStep = (dto) => {
        setClassDto(dto);
        setStep(step + 1);
    };

    return (
        <>
            <Navbar></Navbar>
            <div className='main'>
                <Sidebar></Sidebar>
                <div className="container">
                    {step === 1 && <ClassStepOne onNextStep={handleNextStep} />}
                    {step === 2 && <ClassStepTwo classDto={classDto} />}
                    {step === 3 && <ClassStepThree />}
                </div>
            </div>
        </>
    )
}

export default CreateClass