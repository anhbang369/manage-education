import React from 'react';
import "./outlineCreate.css";
import { useState, useEffect } from 'react';
import { Chart } from "react-google-charts";
import TrainMaterial from '../trainMaterial/TrainMaterial';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import 'bootstrap/dist/css/bootstrap.min.css';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { getDeliveryType } from "../../services/DeliveryTypeService";
import { getOutputStandard } from "../../services/OutputStandardService";

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

//toggle
const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 8,
    '& .MuiSwitch-track': {
        borderRadius: 22 / 2,
        '&::before, &::after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 16,
            height: 16,
        },
        '&::before': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                theme.palette.getContrastText(theme.palette.primary.main),
            )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
            left: 12,
        },
        '&::after': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                theme.palette.getContrastText(theme.palette.primary.main),
            )}" d="M19,13H5V11H19V13Z" /></svg>')`,
            right: 12,
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: 'none',
        width: 16,
        height: 16,
        margin: 2,
    },
}));

const OutlineCreate = () => {

    const [selected, setSelected] = useState(null)
    //get list
    const [output, setOutput] = useState(null);
    const [delivery, setDelivery] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getOutputStandard();
                console.log("this is dada: " + data);
                setOutput(data);
            } catch (error) {
                console.log(error)
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getDeliveryType();
                console.log("this is dada: " + data);
                setDelivery(data);
            } catch (error) {
                console.log(error)
            }
        };

        fetchData();
    }, []);

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
                                                    <div className='d-flex'>
                                                        <p className='fs-14'>Unit{index + 1}</p>
                                                        <div className='ms-4'>
                                                            <p className='fs-14'>{unit.title}</p>
                                                            <span className="fs-14">{unit.duration}</span>
                                                        </div>
                                                        <div>
                                                            <i class="bi bi-pencil p-2 bg-core rounded ms-3 text-white"></i>
                                                        </div>

                                                    </div>
                                                    <i className={selectedMore === i ? 'bi bi-caret-down-fill' : 'bi bi-caret-left-fill'}></i>
                                                </div>

                                                {unit.details.map((detail, idx) => (
                                                    // <Box sx={{ flexGrow: 1 }} className={selectedMore === i ? 'unit__details show' : 'unit__details'} key={idx}>
                                                    <Box sx={{ flexGrow: 1 }} className='unit__details show' key={idx}>
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={5}>
                                                                {detail.title}
                                                            </Grid>
                                                            <Grid item xs={2}>
                                                                {detail.standard}
                                                            </Grid>
                                                            <Grid item xs={1}>
                                                                {detail.duration}
                                                            </Grid>
                                                            <Grid item xs={1} className='ms-3 me-3'>
                                                                {detail.type}
                                                            </Grid>
                                                            <Grid item xs={1}>
                                                                <i className={detail.icons[0]}></i>
                                                            </Grid>
                                                            <Grid item xs={1}>
                                                                <i className={detail.icons[1]} onClick={() => setImportOpen(true)}></i>
                                                            </Grid>
                                                        </Grid>
                                                    </Box>

                                                ))}
                                                {/* <Box sx={{ flexGrow: 1 }} className={selectedMore === i ? 'unit__details show' : 'unit__details'}></Box> */}
                                                <Box sx={{ flexGrow: 1 }} className='unit__details show'>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={5}>
                                                            <input className='w-80 rounded' type="text" />
                                                        </Grid>
                                                        <Grid item xs={2}>
                                                            <select className='w-75' name="cars" id="cars">
                                                                {output ? (
                                                                    output.map((item, index) => (
                                                                        <option key={index} value={item.id}>{item.name}</option>
                                                                    ))
                                                                ) : (
                                                                    <option>Loading...</option>
                                                                )}
                                                            </select>
                                                        </Grid>
                                                        <Grid item xs={1}>
                                                            <input className='rounded w-80' type="text" />
                                                        </Grid>
                                                        <Grid item xs={1} className='ms-3 me-3'>
                                                            <FormGroup>
                                                                <FormControlLabel
                                                                    control={<Android12Switch defaultChecked />}
                                                                    label=""
                                                                />
                                                            </FormGroup>

                                                        </Grid>
                                                        <Grid item xs={1}>
                                                            <select className='w-130' name="cars" id="cars">
                                                                {delivery ? (
                                                                    delivery.map((item, index) => (
                                                                        <option key={index} value={item.id}>{item.name}</option>
                                                                    ))
                                                                ) : (
                                                                    <option>Loading...</option>
                                                                )}
                                                            </select>
                                                        </Grid>
                                                        <Grid item xs={1}>
                                                            <i className="bi bi-folder2-open" onClick={() => setImportOpen(true)}></i>
                                                        </Grid>
                                                    </Grid>
                                                </Box>

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