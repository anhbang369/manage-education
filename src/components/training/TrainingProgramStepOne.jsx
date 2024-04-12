import { React, useState } from 'react';

const TrainingProgramStepOne = ({ onNextStepP }) => {

    const [formDataP, setFormDataP] = useState({
        classNameP: ''
    });

    const handleChangeP = (e) => {
        const { value } = e.target;
        setFormDataP({
            ...formDataP,
            classNameP: value
        });
    };



    const handleCreateP = () => {
        const dtoP = {
            classNameP: formDataP.classNameP,
            classLevelP: formDataP.classLevelP,
            classGenderP: formDataP.classGenderP
        };
        console.log(dtoP);
        onNextStepP(dtoP);
    };

    return (
        <>
            <h5 className='p-2 text-white border border-white bg-core'>New Training program</h5>
            <p className='ms-3 fs-16'>Program name*</p>
            <div className='border-bottom border-black'>
                <input className='rounded my-1 ms-3' type='text' placeholder='Type program name' value={formDataP.classNameP} onChange={handleChangeP} />
                <input className='bg-core border-0 rounded p-1 text-white text-center ms-3' type='submit' value="Create" onClick={handleCreateP} />
            </div>
        </>
    )
}

export default TrainingProgramStepOne