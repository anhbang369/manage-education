import { React, useState } from 'react';
import "./classStepOne.css";

const ClassStepOne = ({ onNextStep }) => {

    const [formData, setFormData] = useState({
        name: ''
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
            name: formData.name,
            courseCode: formData.courseCode,
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
                    <input type='text' placeholder='Type class name' className='class__step-one-input' name='name' value={formData.name} onChange={handleChange} />
                    <button className='class__step-one-btn' onClick={handleCreate}>Create</button>
                </div>
            </div>

        </>
    )
}

export default ClassStepOne