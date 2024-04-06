import React from 'react';
import { useState } from 'react';
import "./program.css";
import ActionMenuProgram from '../action/ActionMenuProgram';
import TrainMaterial from '../trainMaterial/TrainMaterial';

const Program = () => {

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

    const [importOpen, setImportOpen] = useState(false);


    return (
        <>
            <div className="container">
                <div className="container__header">
                    <h6 className="program__title">Training program</h6>
                    <div className="row">
                        <div className='col-md-4 row'>
                            <div className='col-md-9'>
                                <h4>DevOps Foundation</h4>
                            </div>
                            <div className='col-md-3'>
                                <p className='program__title-action'>Active</p>
                            </div>
                        </div>
                        <div className='col-md-7'></div>
                        <div className='col-md-1'>
                            <ActionMenuProgram></ActionMenuProgram>
                        </div>
                    </div>
                </div>

                <div className='syllabus__time'><p className='syllabus__date'>8</p> <span className='date__span'>days (68 hours)</span></div>
                <p className='info__detail'>Modified on 23/07/2024 by <b>Anh Bang</b></p>
                <h6 className="content__program"><b>Content</b></h6>

                <div className='content__program-component'>
                    {Data.map((item, index) => (
                        <div className='content__syllabus' key={index}>
                            <div className='content__component'>
                                <div className='content__com'><b>{item.title}</b></div>
                                <div className='content__component-div'><p>{item.status}</p></div>
                            </div>
                            <div className='content__prgram'>
                                <p className='content__prgram-p'>{item.programName}</p>
                                <p className='content__prgram-p'>|</p>
                                <p className='content__prgram-p'>{item.duration}</p>
                                <p className='content__prgram-p'>|</p>
                                <p className='content__prgram-p'>Modified on {item.modifiedDate} by {item.modifiedBy}</p>
                            </div>


                            <div className="wrapper">
                                <div className='accordion accordion__wa'>

                                    {item.days.map((day1, i) => (

                                        <div className='item'>
                                            <div className='title' onClick={() => toggle(i)}>
                                                <h6 className='outline__days'>{day1.day}</h6>
                                            </div>
                                            <div className={selected === i ? 'content show' : 'content'}>
                                                {day1.units.map((unit, index) => (
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


                    ))}
                </div>
            </div>
            <TrainMaterial property={importOpen}></TrainMaterial>



        </>
    )
}

export default Program

const Data = [
    {
        id: 1,
        title: "Linux",
        status: "Active",
        programName: "LIN v2.0",
        duration: "4 days (12 hours)",
        modifiedDate: "23/07/2024",
        modifiedBy: "jonhy Deep",
        days: [
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
        ]
    },
    {
        id: 2,
        title: "Linux",
        status: "Active",
        programName: "LIN v2.0",
        duration: "4 days (12 hours)",
        modifiedDate: "23/07/2024",
        modifiedBy: "jonhy Deep",
        days: [
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
        ]
    },
    {
        id: 3,
        title: "Linux",
        status: "Active",
        programName: "LIN v2.0",
        duration: "4 days (12 hours)",
        modifiedDate: "23/07/2024",
        modifiedBy: "jonhy Deep",
        days: [
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
        ]
    }
]
