import React from 'react';
import "./outline.css";
import { useState } from 'react';
import { Chart } from "react-google-charts";
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

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
            {syllabusData && Array.isArray(syllabusData) && syllabusData.map((item) => (
                <div className="outline__container">
                    <div className="outline__content">
                        <div className="wrapper">
                            <div className='accordion'>
                                {item.syllabusDays && Array.isArray(item.syllabusDays) && item.syllabusDays
                                    .sort((a, b) => a.dayNo - b.dayNo)
                                    .map((itemDay, i) => (
                                        <div className='item'>
                                            <div className='title' onClick={() => toggle(i)}>
                                                <h6 className='outline__days'>Day {itemDay.dayNo}</h6>
                                            </div>
                                            <div className={selected === i ? 'content show' : 'content'}>
                                                {itemDay.syllabusUnits && Array.isArray(itemDay.syllabusUnits) && itemDay.syllabusUnits.map((itemUnit, index) => (
                                                    <div className="unit" key={index}>
                                                        <div className="unit__component" onClick={() => toggles(i)}>
                                                            <div className='d-flex me-2'>
                                                                <p className="fw-bold fs-16">Unit{itemUnit.unitNo}</p>
                                                                <div className='ms-4 mb-2'>
                                                                    <p className='fs-16'>{itemUnit.name}</p>
                                                                    <span className="fs-14">{itemUnit.duration} hours</span>
                                                                </div>

                                                            </div>
                                                            <i className={selectedMore === i ? 'bi bi-caret-down-fill' : 'bi bi-caret-left-fill'}></i>
                                                        </div>

                                                        {itemUnit.syllabusUnitChapters && Array.isArray(itemUnit.syllabusUnitChapters) && itemUnit.syllabusUnitChapters.map((itemChapter, idx) => (
                                                            <div className={selectedMore === i ? 'unit__details show' : 'unit__details'} key={idx}>
                                                                <Box sx={{ flexGrow: 1 }}>
                                                                    <Grid container spacing={1}>
                                                                        <Grid item xs={5}>
                                                                            <h6 className='fs-14'>{itemChapter.name}</h6>
                                                                        </Grid>
                                                                        <Grid item xs={2}>
                                                                            <p className='details__stanrd'>{itemChapter.outputStandard.name}</p>
                                                                        </Grid>
                                                                        <Grid item xs={2}>
                                                                            <p className='details__mins'>{itemChapter.duration} mins</p>
                                                                        </Grid>
                                                                        <Grid item xs={1}>
                                                                            <p>
                                                                                {itemChapter.online ? <p className='details__onl'>Online</p> : <p className='text-white bg-core rounded p-1 fw-normal'>Offline</p>}
                                                                            </p>
                                                                        </Grid>
                                                                        <Grid item xs={1}>
                                                                            {itemChapter.deliveryType.name === 'Concept/Lecture' && <i class="bi bi-person-plus"></i>}
                                                                            {itemChapter.deliveryType.name === 'Assignment/Lab' && <i class="bi bi-bookmark-check"></i>}
                                                                            {itemChapter.deliveryType.name === 'Test/Quiz' && <i class="bi bi-card-checklist"></i>}
                                                                            {itemChapter.deliveryType.name === 'Exam' && <i class="bi bi-journal-bookmark-fill"></i>}
                                                                            {itemChapter.deliveryType.name === 'Guide/Review' && <i class="bi bi-hand-thumbs-up"></i>}
                                                                            {itemChapter.deliveryType.name === 'Seminar/Workshop' && <i class="bi bi-person-workspace"></i>}
                                                                            {itemChapter.deliveryType.name === 'Class Meeting' && <i class="bi bi-people"></i>}
                                                                            {itemChapter.deliveryType.name === 'Tour/Outdoor' && <i class="bi bi-globe-central-south-asia"></i>}

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
                                                                                                            itemChapter.materials && itemChapter.materials.map((material) => (
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
                                                                {/* <TrainMaterial property={importOpen} syllabusData={syllabusData}></TrainMaterial> */}
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
