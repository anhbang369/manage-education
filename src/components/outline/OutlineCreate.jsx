import React from 'react';
import "./outlineCreate.css";
import { useState } from 'react';
import { Chart } from "react-google-charts";
import TrainMaterial from '../trainMaterial/TrainMaterial';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import 'bootstrap/dist/css/bootstrap.min.css';

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

const OutlineCreate = () => {

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
                                        <h6 className='outline__days'>{item.day} <i class="bi bi-dash-circle red"></i> <i class="bi bi-exclamation-triangle red"></i></h6>
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
                                                        <div className='unit__edit'>
                                                            <i class="bi bi-pencil pen__edit"></i>
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
                                                <div className={selectedMore === i ? 'unit__details show' : 'unit__details'}>
                                                    <h4 className='details__title'><input className='input__edit-title' type="text" /></h4>
                                                    <select className='select__stand' name="cars" id="cars">
                                                        <option value="volvo">Volvo</option>
                                                        <option value="saab">Saab</option>
                                                        <option value="mercedes">Mercedes</option>
                                                        <option value="audi">Audi</option>
                                                    </select>
                                                    <input className='input__mi-enter' type="text" />

                                                    <label for="switch"
                                                        class="toggle">
                                                        <p className='togg'>
                                                            Onl
                                                        </p>
                                                        <p className='togg'>
                                                            Off
                                                        </p>

                                                    </label>

                                                    <select className='select__stand' name="cars" id="cars">
                                                        <option value="volvo">Volvo</option>
                                                        <option value="saab">Saab</option>
                                                        <option value="mercedes">Mercedes</option>
                                                        <option value="audi">Audi</option>
                                                    </select>
                                                    <i className="bi bi-folder2-open" onClick={() => setImportOpen(true)}></i>
                                                </div>
                                            </div>
                                        ))}

                                        <div className="unit" onClick={() => toggles(i)}>
                                            <div className="unit__component">
                                                <div className='unit__com'>
                                                    <p className="unit__number">Unit 7</p>
                                                    <div className='title__div'>
                                                        <p className="unit__title-create">Unit name</p>
                                                        <span className="unit__time"><input type="text" class="form-control h-50 w-100 p-0 mx-3 my-1" placeholder='Type unit name' aria-describedby="basic-addon1" /></span>
                                                    </div>
                                                    <div>
                                                        <button className="bg-day border-0 rounded p-1 text-white mt-4 mb-1 ms-5">Create</button>
                                                    </div>

                                                </div>
                                                <i className={selectedMore === i ? 'bi bi-caret-down-fill' : 'bi bi-caret-left-fill'}></i>
                                            </div>
                                        </div>

                                        <div>
                                            <button className="border-0 p-1 rounded ms-3 mt-1 bg-day text-white mb-3"><i class="bi bi-plus-circle"></i> Add unit</button>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div>
                                <button className="text-white bg-core p-1 border-0 rounded mt-4 ms-3"><i class="bi bi-plus-circle"></i> Add day</button>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="w-25 h-75 border me-15 rounded-top">
                    <h6 className="p-1 bg-core text-white text-center rounded-top">Time allocation</h6>
                    <Chart
                        chartType="PieChart"
                        data={data}
                        options={options}
                        width={"99%"}
                        height={"90%"}
                    />
                </div>
            </div>

            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <button className="bg-secondary border-0 text-white rounded p-2 my-4 ms-3">Previous</button>
                    </Grid>
                    <Grid item xs={1}>
                        <button className="bg-transparent border-0 text-white rounded p-2 my-4"><a href="#" className="text-danger fw-bold p-2">Cancal</a></button>
                    </Grid>
                    <Grid item xs={2}>
                        <button className="bg-dark-subtle border-0 text-white rounded p-2 my-4">Save as draft</button>
                    </Grid>
                    <Grid item xs={1}>
                        <button className="bg-secondary border-0 text-white rounded p-2 my-4">Next</button>
                    </Grid>
                </Grid>
            </Box>

            <TrainMaterial property={importOpen}></TrainMaterial>
        </>
    )
}

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
            // Thêm unit thứ hai của ngày 1 ở đây
        ]
    },
    // Thêm các ngày và unit khác ở đây
];

export default OutlineCreate