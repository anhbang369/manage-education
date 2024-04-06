import React from 'react';
import "./trainingProgramStepOne.css";

const TrainingProgramStepOne = () => {
    return (
        <>
            <h5 className='training__program-header'>New Training program</h5>
            <p className='training__program-title'>Program name*</p>
            <div className='training__program-under'>
                <input className='btn__sub-input' type='text' placeholder='Type program name' />
                <input className='btn__sub-type' type='submit' value="Create" />
            </div>
        </>
    )
}

export default TrainingProgramStepOne