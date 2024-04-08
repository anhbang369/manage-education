import { React, useState } from 'react';
import "./classStepOne.css";

const ClassStepOne = ({ onNextStep }) => {

    const [formData, setFormData] = useState({
        className: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleCreate = () => {
        const dto = {
            className: formData.className,
            classLevel: formData.classLevel,
            classGender: formData.classGender
        };
        console.log(dto);
        onNextStep(dto);
    };

    return (
        <>
            <div className='container'>
                <h5 className='class__step-one-header'>Class</h5>
                <p className='class__step-one-text'>Class name</p>
                <div>
                    <input type='text' placeholder='Type class name' className='class__step-one-input' name='className' value={formData.className} onChange={handleChange} />
                    <button className='class__step-one-btn' onClick={handleCreate}>Create</button>
                </div>
            </div>

        </>
    )
}

export default ClassStepOne