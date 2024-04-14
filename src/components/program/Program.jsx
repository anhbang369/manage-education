import React from 'react';
import { useState } from 'react';
import "./program.css";
import ActionMenuProgram from '../action/ActionMenuProgram';
import TrainMaterial from '../trainMaterial/TrainMaterial';

const Program = ({ programData }) => {

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

    console.log("program is UI" + programData)


    return (
        <>
            {programData && Array.isArray(programData) && programData.map((item) => (
                <div>
                    <div className="bg-core border border-white text-white p-1">
                        <h6 className="ms-2">Training program</h6>
                        <div className="row">
                            <div className='col-md-4 row'>
                                <div className='col-md-9'>
                                    <h4>{item.name}</h4>
                                </div>
                                <div className='col-md-3'>
                                    <p className='border border-white rounded text-center'>{item.status}</p>
                                </div>
                            </div>
                            <div className='col-md-7'></div>
                            <div className='col-md-1'>
                                <ActionMenuProgram></ActionMenuProgram>
                            </div>
                        </div>
                    </div>

                    <div className='d-flex'><p className='fw-bold ms-2 fs-20'>{item.day}</p> <span className='fs-14 mt-2'>days ({item.hours} hours)</span></div>
                    <p className='fs-14 ms-2 fw-normal'>Modified on {item.createdDate.slice(0, 10)} by <b>{item.createdBy}</b></p>
                    <h6 className="p-1 ms-3"><b>Content</b></h6>

                    {item.syllabuses && Array.isArray(item.syllabuses) && item.syllabuses.map((itemSyllabus, indexSyllabus) => (
                        <div className='rounded mt-3 ms-3 w-75 box-shadow-1' key={indexSyllabus}>
                            <div className='d-flex p-2'>
                                <div><b>{itemSyllabus.name}</b></div>
                                <div><p className='bg-core p-1 text-center border-0 text-white rounded ms-2'>{itemSyllabus.status}</p></div>
                            </div>
                            <div className='content__prgram'>
                                <p className='ps-1 fw-normal'>{itemSyllabus.code} {itemSyllabus.version}</p>
                                <p className='ps-1 fw-normal'>|</p>
                                <p className='ps-1 fw-normal'>{itemSyllabus.days} days ({itemSyllabus.hours} hours)</p>
                                <p className='ps-1 fw-normal'>|</p>
                                <p className='ps-1 fw-normal'>Modified on {itemSyllabus.createdDate} by <b>{itemSyllabus.createdBy}</b></p>
                            </div>

                            {itemSyllabus.syllabusDays && Array.isArray(itemSyllabus.syllabusDays) && itemSyllabus.syllabusDays.map((itemDay, indexDay) => (
                                <div className="wrapper" key={indexDay}>
                                    <div className='accordion accordion__wa'>
                                        {itemDay.dayNo}
                                        {itemDay.syllabusUnits && Array.isArray(itemDay.syllabusUnits) && itemSyllabus.syllabusUnits.map((day1, i) => (

                                            <div className='item'>
                                                <div className='title' onClick={() => toggle(i)}>
                                                    <h6 className='outline__days'>{day1.dayNo}</h6>
                                                </div>
                                                <div className={selected === i ? 'content show' : 'content'}>
                                                    {day1.syllabusUnits.map((unit, index) => (
                                                        <div className="unit" key={index} onClick={() => toggles(i)}>
                                                            <div className="unit__component">
                                                                <div className='unit__com'>
                                                                    <p className="unit__number">Unit{unit.unitNo}</p>
                                                                    <div className='title__div'>
                                                                        <p className="unit__title">{unit.name}</p>
                                                                        <span className="unit__time">{unit.duration}</span>
                                                                    </div>

                                                                </div>
                                                                <i className={selectedMore === i ? 'bi bi-caret-down-fill' : 'bi bi-caret-left-fill'}></i>
                                                            </div>

                                                            {unit.syllabusUnitChapters.map((detail, idx) => (
                                                                <div className={selectedMore === i ? 'unit__details show' : 'unit__details'} key={idx}>
                                                                    <h6 className='details__title'>{detail.name}</h6>
                                                                    <p className='details__stanrd'>{detail.outputStandard}</p>
                                                                    <p className='details__mins'>{detail.duration} mins</p>
                                                                    {detail.deliveryType.name === 'Concept/Lecture' && <i class="bi bi-person-plus"></i>}
                                                                    {detail.deliveryType.name === 'Assignment/Lab' && <i class="bi bi-bookmark-check"></i>}
                                                                    {detail.deliveryType.name === 'Test/Quiz' && <i class="bi bi-card-checklist"></i>}
                                                                    {detail.deliveryType.name === 'Exam' && <i class="bi bi-journal-bookmark-fill"></i>}
                                                                    {detail.deliveryType.name === 'Guide/Review' && <i class="bi bi-hand-thumbs-up"></i>}
                                                                    {detail.deliveryType.name === 'Seminar/Workshop' && <i class="bi bi-person-workspace"></i>}
                                                                    {detail.deliveryType.name === 'Class Meeting' && <i class="bi bi-people"></i>}
                                                                    {detail.deliveryType.name === 'Tour/Outdoor' && <i class="bi bi-globe-central-south-asia"></i>}
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
                            ))}

                        </div>
                    ))}
                    <TrainMaterial property={importOpen}></TrainMaterial>
                </div>

            ))}


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
