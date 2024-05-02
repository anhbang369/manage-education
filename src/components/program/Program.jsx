import React from 'react';
import { useState } from 'react';
import "./program.css";
import ActionMenuProgram from '../action/ActionMenuProgram';
import TrainMaterial from '../trainMaterial/TrainMaterial';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';

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

    const [selectedDay, setSelectedDay] = useState(null)
    const togglesDay = (detail) => {
        if (selectedDay === detail) {
            return setSelectedDay(null)
        }

        setSelectedDay(detail)
    }

    //show chapter
    const [selectedUnit, setSelectedUnit] = useState(null);

    // Function to toggle the visibility of a unit
    const toggleUnit = (index) => {
        setSelectedUnit(prevIndex => (prevIndex === index ? null : index));
    };


    //popup material
    const [open, setOpen] = useState({});
    const handleOpenModal = (index) => {
        setOpen(prevOpen => ({
            ...prevOpen,
            [index]: true,
        }));
    };

    const handleCloseModal = (index) => {
        setOpen(prevOpen => ({
            ...prevOpen,
            [index]: false,
        }));
    };


    return (
        <>
            {programData && Array.isArray(programData) && programData.map((item) => (
                <div>
                    <div className="bg-core border border-white text-white p-1">
                        <h6 className="ms-2">Training program</h6>
                        <div className="d-flex justify-content-between w-98">
                            <div className='d-flex ms-2'>
                                <div className=''>
                                    <h4>{item.name}</h4>
                                </div>
                                <div className='ms-2'>
                                    <p className='border border-white rounded text-center'>{item.status}</p>
                                </div>
                            </div>
                            <div className=''>
                                <ActionMenuProgram></ActionMenuProgram>
                            </div>
                        </div>
                    </div>

                    <div className='d-flex'><p className='fw-bold ms-2 fs-20'>{item.day}</p> <span className='fs-14 mt-2'>days ({item.hours} hours)</span></div>
                    <p className='fs-14 ms-2 fw-normal'>Modified on {item.createdDate.slice(0, 10)} by <b>{item.createdBy}</b></p>
                    <h6 className="p-1 ms-3"><b>Content</b></h6>

                    {item.syllabuses && Array.isArray(item.syllabuses) && item.syllabuses.map((itemSyllabus, indexSyllabus) => (
                        <div key={indexSyllabus} >
                            <div className='row w-98 ms-3 mt-3'>
                                <div className='col-md-12 row box-shadow-1 rounded p-2'>
                                    <div className='col-md-12 d-flex'>
                                        <h5 className='pointer' onClick={() => toggleSyllabus(indexSyllabus)}><b>{itemSyllabus.name}</b></h5><p className='bg-core text-white text-center h-20p ms-3 rounded'>{itemSyllabus.status}</p>
                                    </div>
                                    <div className='col-md-12'>
                                        <div className='d-flex fw-normal'>
                                            <p className='fw-normal'>{itemSyllabus.code} {itemSyllabus.version}</p>
                                            <p className='fw-normal ms-2'>|</p>
                                            <p className='fw-normal ms-2'>{itemSyllabus.days} days ({itemSyllabus.hours} hour)</p>
                                            <p className='fw-normal ms-2'>|</p>
                                            <p className='fw-normal ms-2'>{itemSyllabus.createdDate.slice(0, 10)} by <b>{itemSyllabus.createdBy}</b></p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={selectedSyllabus === indexSyllabus ? 'show__syllabus show_s' : 'show__syllabus'}>
                                {itemSyllabus.syllabusDays && Array.isArray(itemSyllabus.syllabusDays) && itemSyllabus.syllabusDays.sort((a, b) => a.dayNo - b.dayNo).map((day1, i) => (
                                    <div className="wrapper" key={i}>
                                        <div className='accordion accordion__wa'>
                                            <div className='item row w-98'>
                                                <h6 className='outline__days ms-3 pointer' onClick={() => togglesDay(i)}>{day1.dayNo} day</h6>
                                                <div className={selectedDay === i ? 'content show col-md-12 w-100 p-0 m-0 ms-3' : 'content col-md-12 w-100 p-0 m-0 ms-3'}>
                                                    {day1.syllabusUnits.map((unit, index) => (
                                                        <div className="unit" key={index} >
                                                            <div className="unit__component" onClick={() => toggleUnit(index)}>
                                                                <div className='d-flex mb-2'>
                                                                    <p className="unit__number pointer">Unit {unit.unitNo}</p>
                                                                    <div className='ms-4'>
                                                                        <p className="unit__title pointer">{unit.name}</p>
                                                                        <span className="unit__time fs-14 pointer">{unit.duration} hours</span>
                                                                    </div>

                                                                </div>
                                                                <i className='bi bi-caret-left-fill'></i>
                                                            </div>

                                                            <div>
                                                                {unit.syllabusUnitChapters.map((detail, idx) => (
                                                                    <div className={selectedUnit === index ? 'unit__details show' : 'unit__details'} key={idx}>
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
                                                                                            <p className='details__stanrd text-center'>{detail.outputStandard.code}</p>
                                                                                        )}
                                                                                    </p>
                                                                                </Grid>
                                                                                <Grid item xs={2}>
                                                                                    <p className='details__mins'>{detail.duration} mins</p>
                                                                                </Grid>
                                                                                <Grid item xs={2}>
                                                                                    <p>
                                                                                        {detail.online ? <p className='text-danger border border-danger rounded p-1 fw-normal w-40 text-center'>Online</p> : <p className='text-white bg-core rounded p-1 fw-normal w-40 text-center'>Offline</p>}
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

                                                                                    <React.Fragment>
                                                                                        <Button
                                                                                            backgroundColor="bg-core"
                                                                                            className="border border-0 text-white rounded me-3 px-1 bg-core"
                                                                                            onClick={() => handleOpenModal(idx)}
                                                                                        >
                                                                                            <i class="bi bi-folder2-open"></i>
                                                                                        </Button>
                                                                                        <Modal open={open[idx] || false} onClose={() => handleCloseModal(idx)}>
                                                                                            <ModalDialog className='w-50'>
                                                                                                <div className="border border-black rounded-top">
                                                                                                    <h5 className="bg-core rounded-top text-white p-2">Matreial</h5>
                                                                                                    <div>
                                                                                                        {/* <div className="w-100 d-flex my-2">
                                                                                                                        <h5 className="ms-2 fs-18">Unit {unit.unitNo}</h5>
                                                                                                                        <h5 className="ms-2 fs-18">{unit.name}</h5>
                                                                                                                    </div> */}
                                                                                                        <div className="w-100">

                                                                                                            <div>
                                                                                                                {
                                                                                                                    detail.materials.map((material) => (
                                                                                                                        <div className='d-flex justify-content-center'>
                                                                                                                            <div className='bg-chapter d-flex w-98 row rounded'>
                                                                                                                                <a href="" className="material__link col-md-4 fs-14">{material.name.slice(0, 25)}...</a>
                                                                                                                                <span className='col-md-6 fs-14'>by {material.createdBy} on {material.createdDate.slice(0, 10)}</span>
                                                                                                                                <div className='col-md-2 row'>
                                                                                                                                    <i class="bi bi-pencil col-md-6 text-primary"></i>
                                                                                                                                    <i class="bi bi-trash3 col-md-6 text-primary"></i>
                                                                                                                                </div>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                    ))
                                                                                                                }
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>

                                                                                                    <div className='w-100 d-flex justify-content-center'>
                                                                                                        <button className="bg-core text-white rounded border-0 my-2 p-1">Upload new</button>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </ModalDialog>
                                                                                        </Modal>
                                                                                    </React.Fragment>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Box>


                                                                        {/* <TrainMaterial property={importOpen} syllabusData={detail.materials} /> */}
                                                                    </div>
                                                                ))}
                                                            </div>



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
                </div>

            ))}


        </>
    )
}

export default Program
