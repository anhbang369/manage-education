import React from 'react';
import { useState } from 'react';
import "./program.css";
import ActionMenuProgram from '../action/ActionMenuProgram';
import TrainMaterial from '../trainMaterial/TrainMaterial';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const Program = ({ programData }) => {

    const [selectedSyllabus, setSelectedSyllabus] = useState(null)
    const toggleSyllabus = (indexSyllabus) => {
        if (selectedSyllabus === indexSyllabus) {
            return setSelectedSyllabus(null)
        }

        setSelectedSyllabus(indexSyllabus)
    }

    const [selected, setSelected] = useState(null)
    const toggle = (i) => {
        if (selected === i) {
            return setSelected(null)
        }

        setSelected(i)
    }

    const [selectedMore, setSelectedMore] = useState(null)
    const togglesMore = (more) => {
        if (selectedMore === more) {
            return setSelectedMore(null)
        }

        setSelectedMore(more)
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
                        <div className='rounded mt-3 ms-3 w-75 box-shadow-1' key={indexSyllabus} onClick={() => toggleSyllabus(indexSyllabus)}>
                            <div className='d-flex p-2' >
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

                            <div className={selectedSyllabus === indexSyllabus ? 'show__syllabus show_s' : 'show__syllabus'}>
                                {itemSyllabus.syllabusDays && Array.isArray(itemSyllabus.syllabusDays) && itemSyllabus.syllabusDays.map((day1, i) => (
                                    <div className="wrapper" key={i}>
                                        <div className='accordion accordion__wa'>
                                            <div className='item'>
                                                <div className='title' onClick={() => toggle(i)}>
                                                    <h6 className='outline__days'>{day1.dayNo}</h6>
                                                </div>
                                                <div className={selected === i ? 'content show' : 'content'}>
                                                    {day1.syllabusUnits.map((unit, index) => (
                                                        <div className="unit" key={index} onClick={() => togglesMore(index)}>
                                                            <div className="unit__component">
                                                                <div className='d-flex mb-2'>
                                                                    <p className="unit__number">Unit {unit.unitNo}</p>
                                                                    <div className='ms-4'>
                                                                        <p className="unit__title">{unit.name}</p>
                                                                        <span className="unit__time fs-14">{unit.duration} hours</span>
                                                                    </div>

                                                                </div>
                                                                <i className={selectedMore === index ? 'bi bi-caret-down-fill' : 'bi bi-caret-left-fill'}></i>
                                                            </div>

                                                            {unit.syllabusUnitChapters.map((detail, idx) => (
                                                                <div className={selectedMore === idx ? 'unit__details show' : 'unit__details'} key={idx}>

                                                                    <Box sx={{ flexGrow: 1 }}>
                                                                        <Grid container spacing={1}>
                                                                            <Grid item xs={5}>
                                                                                <h6 className='fs-14'>{detail.name}</h6>
                                                                            </Grid>
                                                                            <Grid item xs={1}>
                                                                                <p className='details__stanrd'>
                                                                                    {detail.outputStandard == null ? (
                                                                                        <p className='bg-chapter'></p>
                                                                                    ) : (
                                                                                        <p className='details__stanrd'>{detail.outputStandard.code}</p>
                                                                                    )}
                                                                                </p>
                                                                            </Grid>
                                                                            <Grid item xs={2}>
                                                                                <p className='details__mins'>{detail.duration} mins</p>
                                                                            </Grid>
                                                                            <Grid item xs={2}>
                                                                                <p>
                                                                                    {detail.online ? <p className='details__onl'>Online</p> : <p className='text-white bg-core rounded p-1 fw-normal'>Offline</p>}
                                                                                </p>
                                                                            </Grid>
                                                                            <Grid item xs={1}>
                                                                                {detail.deliveryType.name === 'Concept/Lecture' && <i class="bi bi-person-plus"></i>}
                                                                                {detail.deliveryType.name === 'Assignment/Lab' && <i class="bi bi-bookmark-check"></i>}
                                                                                {detail.deliveryType.name === 'Test/Quiz' && <i class="bi bi-card-checklist"></i>}
                                                                                {detail.deliveryType.name === 'Exam' && <i class="bi bi-journal-bookmark-fill"></i>}
                                                                                {detail.deliveryType.name === 'Guide/Review' && <i class="bi bi-hand-thumbs-up"></i>}
                                                                                {detail.deliveryType.name === 'Seminar/Workshop' && <i class="bi bi-person-workspace"></i>}
                                                                                {detail.deliveryType.name === 'Class Meeting' && <i class="bi bi-people"></i>}
                                                                                {detail.deliveryType.name === 'Tour/Outdoor' && <i class="bi bi-globe-central-south-asia"></i>}

                                                                            </Grid>
                                                                            <Grid item xs={1}>
                                                                                <i class="bi bi-folder2-open" onClick={() => setImportOpen(true)}></i>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Box>
                                                                    <TrainMaterial property={importOpen}></TrainMaterial>
                                                                </div>
                                                            ))}

                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                ))}


                            </div>

                        </div>
                    ))}
                    <TrainMaterial property={importOpen}></TrainMaterial>
                </div>

            ))}


        </>
    )
}

export default Program
