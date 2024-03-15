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
                    <h4 className="other__location">Time Location</h4>
                    <Chart
                        chartType="PieChart"
                        data={data}
                        width={"100%"}
                        height={"120px"}
                    />
                </div>
                <div className="other__scheme">
                    <h4 className="other__location">Assessment scheme</h4>
                    <div className="other__component">
                        <div className="quiz">
                            <p className='quiz__p'>Quiz:   15%</p>
                            <p className='quiz__q'>Assignment:   15%</p>
                        </div>
                        <p className='quiz__p'>Final:   70%</p>
                    </div>
                    <div className="other__component">
                        <h4 className="other__pass">Passing criteria</h4>
                        <p className="other__gpa">GPA*   70%</p>
                    </div>
                </div>
            </div>

            <div className="other__trainning">
                <h4 className="train__title">Trainning delivery priciple</h4>
                <div className="tranning_component">
                    <i class="bi bi-shield-check training__icon"><b><span>Training</span></b></i>
                    <ul className='training__ul'>
                        <li className="training__list">Trainee who actively complete online learning according to MOOC links provided</li>
                        <li className="training__list">Trainee who actively complete online learning according to MOOC links provided</li>
                        <li className="training__list">Trainee who actively complete online learning according to MOOC links provided</li>
                        <li className="training__list">Trainee who actively complete online learning according to MOOC links provided</li>
                        <li className="training__list">Trainee who actively complete online learning according to MOOC links provided</li>
                        <li className="training__list">Trainee who actively complete online learning according to MOOC links provided</li>
                    </ul>
                </div>

                <div className="tranning_component">
                    <i class="bi bi-shield-check training__icon"><b><span>Re-test</span></b></i>
                    <ul className='training__ul'>
                        <li className="training__list">Trainee who actively complete online learning according to MOOC links provided</li>
                        <li className="training__list">Trainee who actively complete online learning according to MOOC links provided</li>
                    </ul>
                </div>

                <div className="tranning_component">
                    <i class="bi bi-shield-check training__icon"><b><span>Marking</span></b></i>
                    <ul className='training__ul'>
                        <li className="training__list">Trainee who actively complete online learning according to MOOC links provided</li>
                        <li className="training__list">Trainee who actively complete online learning according to MOOC links provided</li>
                        <li className="training__list">Trainee who actively complete online learning according to MOOC links provided</li>
                        <li className="training__list">Trainee who actively complete online learning according to MOOC links provided</li>
                    </ul>
                </div>

                <div className="tranning_component">
                    <i class="bi bi-shield-check training__icon"><b><span>Waiver Criterical</span></b></i>
                    <ul className='training__ul'>
                        <li className="training__list">Trainee who actively complete online learning according to MOOC links provided</li>
                        <li className="training__list">Trainee who actively complete online learning according to MOOC links provided</li>
                    </ul>
                </div>

                <div className="tranning_component">
                    <i class="bi bi-shield-check training__icon"><b><span>Other</span></b></i>
                    <ul className='training__ul'>
                        <li className="training__list">Trainee who actively complete online learning according to MOOC links provided</li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Others