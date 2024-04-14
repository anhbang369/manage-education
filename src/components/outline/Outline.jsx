import React from 'react';
import "./outline.css";
import { useState } from 'react';
import { Chart } from "react-google-charts";
import TrainMaterial from '../trainMaterial/TrainMaterial';

export const options = {
    legend: {
        position: "bottom",
    },
    pieSliceText: "label",
    pieStartAngle: 100,
};

const Outline = ({ syllabusData }) => {

    const data = [
        ["Task", "Hours per Day"]
    ];

    if (syllabusData && Array.isArray(syllabusData)) {
        syllabusData.forEach(item => {
            data.push(
                ["Assignment/Lab", item.timeAllocationResponse.assignment],
                ["Concept/Lecture", item.timeAllocationResponse.concept],
                ["Guide/Review", item.timeAllocationResponse.guides],
                ["Test/Quiz", item.timeAllocationResponse.test],
                ["Exam", item.timeAllocationResponse.exam]
            );
        });
    }

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
            {syllabusData && Array.isArray(syllabusData) && syllabusData.map((item) => (
                <div className="outline__container">
                    <div className="outline__content">
                        <div className="wrapper">
                            <div className='accordion'>
                                {item.syllabusDays && Array.isArray(item.syllabusDays) && item.syllabusDays.map((itemDay, i) => (
                                    <div className='item'>
                                        <div className='title' onClick={() => toggle(i)}>
                                            <h6 className='outline__days'>Day {itemDay.dayNo}</h6>
                                        </div>
                                        <div className={selected === i ? 'content show' : 'content'}>
                                            {itemDay.syllabusUnits && Array.isArray(itemDay.syllabusUnits) && itemDay.syllabusUnits.map((itemUnit, index) => (
                                                <div className="unit" key={index} onClick={() => toggles(i)}>
                                                    <div className="unit__component">
                                                        <div className='unit__com'>
                                                            <p className="unit__number">Unit{itemUnit.unitNo}</p>
                                                            <div className='title__div'>
                                                                <p className="unit__title">{itemUnit.name}</p>
                                                                <span className="unit__time fs-14">{itemUnit.duration} hours</span>
                                                            </div>

                                                        </div>
                                                        <i className={selectedMore === i ? 'bi bi-caret-down-fill' : 'bi bi-caret-left-fill'}></i>
                                                    </div>

                                                    {itemUnit.syllabusUnitChapters && Array.isArray(itemUnit.syllabusUnitChapters) && itemUnit.syllabusUnitChapters.map((itemChapter, idx) => (
                                                        <div className={selectedMore === i ? 'unit__details show' : 'unit__details'} key={idx}>
                                                            <h6 className='details__title'>{itemChapter.name}</h6>
                                                            <p className='details__stanrd'>{itemChapter.outputStandard}</p>
                                                            <p className='details__mins'>{itemChapter.duration} mins</p>
                                                            <p>
                                                                {itemChapter.online ? <p className='details__onl'>Online</p> : <p className='text-white bg-core rounded p-1 fw-normal'>Offline</p>}
                                                            </p>
                                                            <i class="bi bi-image-alt">{itemChapter.deliveryType.name}</i>
                                                            <i class="bi bi-folder2-open" onClick={() => setImportOpen(true)}></i>
                                                            <TrainMaterial property={importOpen} syllabusData={syllabusData}></TrainMaterial>
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
            ))}

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
