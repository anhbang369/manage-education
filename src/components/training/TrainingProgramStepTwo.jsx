import React from 'react';
import "./trainingProgramStepTwo.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const TrainingProgramStepTwo = () => {
    return (
        <>
            <div className="container">
                <div className="header__step-two">
                    <h6 className="header__litle-small">Training program</h6>
                    <div className='header__litle-component'>
                        <h5 className="header__litle-small">DevOps Foundation</h5>
                        <p className="header__title-large">Inactive</p>
                    </div>
                </div>
                <p className='modified__content'>...days (...hours)</p>
                <p className='modified__content'>Modified on 21/07/2023 by <b>Anh Bang</b></p>
                <div className='modified__content-under'></div>
                <h6>Content</h6>
                <div>
                    <label htmlFor="">Select syllabus</label>
                    <input />
                </div>
            </div>
        </>
    )
}

export default TrainingProgramStepTwo