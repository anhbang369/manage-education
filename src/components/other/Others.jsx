import React from 'react';
import "./others.css";
import { Chart } from "react-google-charts";

export const data = [
    ["Task", "Hours per Day"],
    ["Assignment/Lab", 54],
    ["Concept/Lecture", 29],
    ["Guide/Review", 9],
    ["Test/Quiz", 1],
    ["Exam", 6],
];

const Others = () => {
    return (
        <>
            <div className="general__content">
                <div className="other__scheme">
                    <h6 className="bg-core text-center p-1 rounded-top text-white">Time Location</h6>
                    <Chart
                        chartType="PieChart"
                        data={data}
                        width={"100%"}
                        height={"120px"}
                    />
                </div>
                <div className="other__scheme">
                    <h6 className="bg-core text-center p-1 rounded-top text-white">Assessment scheme</h6>
                    <div className="other__component">
                        <div className="quiz">
                            <p className='quiz__p'>Quiz:   15%</p>
                            <p className='quiz__q'>Assignment:   15%</p>
                        </div>
                        <p className='quiz__p'>Final:   70%</p>
                    </div>
                    <div className="other__component">
                        <h6 className="other__pass">Passing criteria</h6>
                        <p className="other__gpa">GPA*   70%</p>
                    </div>
                </div>
            </div>

            <div className="other__trainning-other">
                <h6 className="bg-core p-1 rounded-top text-white">Trainning delivery priciple</h6>
                <div className="d-flex mt-2">
                    <i class="bi bi-shield-check ms-3"><b><span>Training</span></b></i>
                    <ul className='training__ul'>
                        <li className="fs-6">Trainee who actively complete online learning according to MOOC links provided</li>
                        <li className="fs-6">Trainee who actively complete online learning according to MOOC links provided</li>
                        <li className="fs-6">Trainee who actively complete online learning according to MOOC links provided</li>
                        <li className="fs-6">Trainee who actively complete online learning according to MOOC links provided</li>
                        <li className="fs-6">Trainee who actively complete online learning according to MOOC links provided</li>
                        <li className="fs-6">Trainee who actively complete online learning according to MOOC links provided</li>
                    </ul>
                </div>

                <div className="d-flex mt-2">
                    <i class="bi bi-shield-check ms-3"><b><span>Re-test</span></b></i>
                    <ul className='training__ul'>
                        <li className="fs-6">Trainee who actively complete online learning according to MOOC links provided</li>
                        <li className="fs-6">Trainee who actively complete online learning according to MOOC links provided</li>
                    </ul>
                </div>

                <div className="d-flex mt-2">
                    <i class="bi bi-shield-check ms-3"><b><span>Marking</span></b></i>
                    <ul className='training__ul'>
                        <li className="fs-6">Trainee who actively complete online learning according to MOOC links provided</li>
                        <li className="fs-6">Trainee who actively complete online learning according to MOOC links provided</li>
                        <li className="fs-6">Trainee who actively complete online learning according to MOOC links provided</li>
                        <li className="fs-6">Trainee who actively complete online learning according to MOOC links provided</li>
                    </ul>
                </div>

                <div className="d-flex mt-2">
                    <i class="bi bi-shield-check ms-3"><b><span>Waiver Criterical</span></b></i>
                    <ul className='training__ul'>
                        <li className="fs-6">Trainee who actively complete online learning according to MOOC links provided</li>
                        <li className="fs-6">Trainee who actively complete online learning according to MOOC links provided</li>
                    </ul>
                </div>

                <div className="d-flex mt-2">
                    <i class="bi bi-shield-check ms-3"><b><span>Other</span></b></i>
                    <ul className='training__ul'>
                        <li className="fs-6">Trainee who actively complete online learning according to MOOC links provided</li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Others