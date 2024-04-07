import React from 'react';
import "./classStepOne.css";

const ClassStepOne = () => {
    return (
        <>
            <div className='container'>
                <h5 className='class__step-one-header'>Class</h5>
                <p className='class__step-one-text'>Class name</p>
                <div>
                    <input type='text' placeholder='Type class name' className='class__step-one-input' />
                    <button className='class__step-one-btn'>Create</button>
                </div>
            </div>

        </>
    )
}

export default ClassStepOne