import React from 'react';
import "./outline.css";
import { useState } from 'react';
import { Chart } from "react-google-charts";
import TrainMaterial from '../trainMaterial/TrainMaterial';

export const data = [
    ["Task", "Hours per Day"],
    ["Assignment/Lab", 54],
    ["Concept/Lecture", 29],
    ["Guide/Review", 9],
    ["Test/Quiz", 1],
    ["Exam", 6],
];

export const options = {
    legend: {
        position: "bottom",
    },
    pieSliceText: "label",
    pieStartAngle: 100,
};

const Outline = () => {

    const [selected, setSelected] = useState(null)
    const toggle = (i) => {
        if (selected === i) {
            return setSelected(null)
        }

        setSelected(i)
    }

    const [selectedMore, setSelectedMore] = useState(null)
    const toggles = (i) => {
        if (selectedMore === i) {
            return setSelectedMore(null)
        }

        setSelectedMore(i)
    }

    //import
    const [importOpen, setImportOpen] = useState(false);

    return (
        <>
            <div className="outline__container">
                <div className="outline__content">
                    <div className="wrapper">
                        <div className='accordion'>
                            {data1.map((item, i) => (
                                <div className='item'>
                                    <div className='title' onClick={() => toggle(i)}>
                                        <h6 className='outline__days'>{item.day}</h6>
                                    </div>
                                    <div className={selected === i ? 'content show' : 'content'}>
                                        {item.units.map((unit, index) => (
                                            <div className="unit" key={index} onClick={() => toggles(i)}>
                                                <div className="unit__component">
                                                    <div className='unit__com'>
                                                        <p className="unit__number">Unit{index + 1}</p>
                                                        <div className='title__div'>
                                                            <p className="unit__title">{unit.title}</p>
                                                            <span className="unit__time">{unit.duration}</span>
                                                        </div>

                                                    </div>
                                                    <i className={selectedMore === i ? 'bi bi-caret-down-fill' : 'bi bi-caret-left-fill'}></i>
                                                </div>

                                                {unit.details.map((detail, idx) => (
                                                    <div className={selectedMore === i ? 'unit__details show' : 'unit__details'} key={idx}>
                                                        <h6 className='details__title'>{detail.title}</h6>
                                                        <p className='details__stanrd'>{detail.standard}</p>
                                                        <p className='details__mins'>{detail.duration}</p>
                                                        <p className='details__onl'>{detail.type}</p>
                                                        <i className={detail.icons[0]}></i>
                                                        <i className={detail.icons[1]} onClick={() => setImportOpen(true)}></i>
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
                <div className="outline__chart">
                    <h5 className="outline__location">Time allocation</h5>
                    <Chart
                        chartType="PieChart"
                        data={data}
                        options={options}
                        width={"99%"}
                        height={"90%"}
                    />
                </div>
            </div>

            <TrainMaterial property={importOpen}></TrainMaterial>
        </>
    )
}

export default Outline

const data1 = [
    {
        day: "Day 1",
        units: [
            {
                title: ".NET Introduction",
                duration: "3hrs",
                details: [
                    {
                        title: ".NET Introduction",
                        standard: "SD4H",
                        duration: "30mins",
                        type: "Online",
                        icons: ["bi bi-person-lines-fill", "bi bi-folder2-open"]
                    },
                    {
                        title: ".NET Introduction",
                        standard: "SD4H",
                        duration: "30mins",
                        type: "Online",
                        icons: ["bi bi-person-lines-fill", "bi bi-folder2-open"]
                    },
                    {
                        title: ".NET Introduction",
                        standard: "SD4H",
                        duration: "30mins",
                        type: "Online",
                        icons: ["bi bi-person-lines-fill", "bi bi-folder2-open"]
                    },
                ]
            },
        ]
    },
];
