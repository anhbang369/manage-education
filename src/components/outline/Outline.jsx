import React from 'react';
import "./outline.css";
import { useState } from 'react';
import { Chart } from "react-google-charts";
import TrainMaterial from '../trainMaterial/TrainMaterial';
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
                                                                    <Grid item xs={1}>
                                                                        <p className='details__stanrd'>{itemChapter.outputStandard}</p>
                                                                    </Grid>
                                                                    <Grid item xs={2}>
                                                                        <p className='details__mins'>{itemChapter.duration} mins</p>
                                                                    </Grid>
                                                                    <Grid item xs={2}>
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
                                                                        <i class="bi bi-folder2-open" onClick={() => setImportOpen(true)}></i>
                                                                    </Grid>
                                                                </Grid>
                                                            </Box>
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
