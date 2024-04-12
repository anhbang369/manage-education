import React from 'react';
import "./classStepThree.css";
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

const ClassStepThree = () => {

    const [dateState, setDateState] = useState(new Date())
    const changeDate = (e) => {
        setDateState(e)
    }

    //show
    const [selected, setSelected] = useState(null)
    const toggle = (i) => {
        if (selected === i) {
            return setSelected(null)
        }

        setSelected(i)
    }

    const [selected1, setSelected1] = useState(null)
    const toggle1 = (i) => {
        if (selected1 === i) {
            return setSelected1(null)
        }

        setSelected1(i)
    }

    return (
        <>
            <React.Fragment>
                <CssBaseline />
                <Container fixed className='p-0 overflow-y-scroll'>
                    <Box sx={{ bgcolor: '#cfe8fc', height: '100%', width: '100%' }}>
                        <div>
                            <div className='row bg-core text-white border border-white'>
                                <h6>Class</h6>
                                <div className='row'>
                                    <div className='col-md-11 row'>
                                        <div className='col-md-4'><h4>Fresher Develop Operation</h4></div>
                                        <div className='col-md-8'><p className='bg-chapter border border-white w-10 rounded text-center'>Plaining</p></div>
                                    </div>
                                    <div className='col-md-1'>
                                        <i class="bi bi-three-dots"></i>
                                    </div>
                                </div>
                                <p className='class__name'>HCM22FR_FR_DevOps_01</p>

                                <div className='d-flex'>
                                    <div>
                                        <p><b>31</b> days (97 hours)</p>
                                    </div>
                                    <div className='ms-2'>
                                        <p>|</p>
                                    </div>
                                    <div className='ms-2'>
                                        <i class="bi bi-journal-bookmark-fill"></i>
                                    </div>
                                    <div className='ms-2'>
                                        <i class="bi bi-person-hearts"></i>
                                    </div>
                                    <div className='ms-2'>
                                        <i class="bi bi-alphabet"></i>
                                    </div>
                                    <div className='ms-2'>
                                        <i class="bi bi-wifi"></i>
                                    </div>
                                    <div className='ms-2'>
                                        <i class="bi bi-hand-thumbs-up-fill"></i>
                                    </div>
                                </div>
                            </div>

                            <div className='row mt-2'>
                                <div className='col-md-4 mb-2'>
                                    <h6 className='text-white bg-general p-1 rounded fs-14' onClick={() => toggle(1)}><i class="bi bi-calendar"></i> General</h6>
                                    <div className={selected === 1 ? 'general__contain-first show' : 'general__contain-first'}>
                                        <div className='row first__class-general'>
                                            <div className='col-md-5'><b><i class="bi bi-alarm"></i> Class time</b></div>
                                            <div className='col-md-7 class-general-input-time'>from <input type='time' /> to <input type='time' /></div>
                                        </div>
                                        <div className='row first__class-general gray'>
                                            <div className='col-md-5'><b><i class="bi bi-house-door"></i> Location</b></div>
                                            <div className='col-md-7 row'>
                                            </div>
                                        </div>
                                        <div className='row first__class-general gray'>
                                            <div className='col-md-5'><b><i class="bi bi-person"></i> Trainer</b></div>
                                            <div className='col-md-7 row'>
                                            </div>
                                        </div>
                                        <div className='row first__class-general'>
                                            <div className='col-md-5'><b><i class="bi bi-star"></i> Admin</b></div>
                                            <div className='col-md-7 row'>
                                                <div className='col-md-12'>
                                                    <Form.Select className='select__class-three-general' aria-placeholder='exam'>
                                                        <option>Permission</option>
                                                        <option value="1">One</option>
                                                        <option value="2">Two</option>
                                                        <option value="3">Three</option>
                                                    </Form.Select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row first__class-general'>
                                            <div className='col-md-5'><b><i class="bi bi-recycle"></i> FSU</b></div>
                                            <div className='col-md-7 row'>
                                                <div className='col-md-12'>
                                                    <Form.Select className='select__class-three-general margin' aria-placeholder='exam'>
                                                        <option>Permission</option>
                                                        <option value="1">One</option>
                                                        <option value="2">Two</option>
                                                        <option value="3">Three</option>
                                                    </Form.Select>
                                                </div>
                                                <div className='col-md-12'>
                                                    <Form.Select className='select__class-three-general' aria-placeholder='exam'>
                                                        <option>Permission</option>
                                                        <option value="1">One</option>
                                                        <option value="2">Two</option>
                                                        <option value="3">Three</option>
                                                    </Form.Select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='general__under'></div>
                                        <div className='row first__class-general gray'>
                                            <div className='col-md-5'><b>Created</b></div>
                                            <div className='col-md-7'></div>
                                        </div>
                                        <div className='row first__class-general gray'>
                                            <div className='col-md-5'><b>Review</b></div>
                                            <div className='col-md-7'></div>
                                        </div>
                                        <div className='row first__class-general gray'>
                                            <div className='col-md-5'><b>Approve</b></div>
                                            <div className='col-md-7'></div>
                                        </div>
                                    </div>

                                    <h6 className='text-white bg-general p-1 rounded d-flex fs-14 mt-3 mb-0' onClick={() => toggle1(1)}><i class="bi bi-star"></i> Attendee
                                        <Form.Select className='select__class-three h-20p' aria-placeholder='exam'>
                                            <option>Permission</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </Form.Select>
                                    </h6>
                                    <div className={selected1 === 1 ? 'row attendee__component show' : 'row attendee__component'}>
                                        <div className='col-md-4 bg-core text-white'>
                                            <div className='col-md-12'>Planned</div>
                                            <div className='col-md-12'><input className='attendee__input' /></div>
                                        </div>
                                        <div className='col-md-4 bg-atten'>
                                            <div className='col-md-12 text-white'>Accepted</div>
                                            <div className='col-md-12'><input className='attendee__input' /></div>
                                        </div>
                                        <div className='col-md-4 bg-chapter'>
                                            <div className='col-md-12'>Actual</div>
                                            <div className='col-md-12'><input className='attendee__input' /></div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-1'>
                                </div>
                                <div className='col-md-7 '>
                                    <div className='text-white bg-general p-1 rounded d-flex'>
                                        <p className='container__first-text'><i class="bi bi-calendar"></i> Time frame</p>
                                        <p className='container__first-text time'><input type='datetime-local' /></p>
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <Calendar
                                                value={dateState}
                                                onChange={changeDate}
                                            />
                                        </div>
                                        <div className='col-md-6'>
                                            <Calendar
                                                value={dateState}
                                                onChange={changeDate}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <h6 className='bg-core rounded-top w-15 text-white p-1 ms-2 text-center mb-0'>Training program</h6>
                            <div className='bg-core text-white border border-white p-2 rounded-top-end ms-2'>
                                <h5>DevOps Foundation <button><i class="bi bi-pencil p-1 text-white border-0 rounded bg-chapter"></i></button></h5>
                                <div className='d-flex'>
                                    <p className='fw-normal'>31 days (97 hours)</p>
                                    <p className='fw-normal mx-1'>|</p>
                                    <p className='fw-normal'>Modified on 23/05/2023 by <b>Anh Bang</b></p>
                                </div>
                            </div>

                            {Data.map((item, index) => (
                                <div className='class__view-syllabus row'>
                                    <div className='col-md-3 p-2 row bg-core rounded-start'>

                                    </div>
                                    <div className='col-md-9 row box-shadow-1 rounded-end p-2'>
                                        <div className='col-md-12 d-flex'>
                                            <h5><b>{item.title}</b></h5><p className='bg-chapter rounded h-20p p-1 text-center text-white'>{item.status}</p>
                                        </div>
                                        <div className='col-md-12'>
                                            <div className='d-flex'>
                                                <p className='fw-normal'>{item.lin}</p>
                                                <p className='fw-normal px-2'>|</p>
                                                <p className='fw-normal'>{item.days}</p>
                                                <p className='fw-normal px-2'>|</p>
                                                <p className='fw-normal'>{item.modify}<b>{item.name}</b></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

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

                        </div>
                    </ Box>
                </Container>
            </React.Fragment>
        </>
    )
}

export default ClassStepThree

const Data = [
    {
        id: 1,
        images: {
            image: "Image",
            image1: "Image",
            image2: "Image",
        },
        title: "Linux",
        status: "Active",
        lin: "LIN v2.0",
        days: "31 days (97 hours)",
        modify: "Modified on 23/05/2023 by ",
        name: "Anh Bang"
    },
    {
        id: 2,
        images: {
            image: "Image",
            image1: "Image",
            image2: "Image",
        },
        title: "Linux",
        status: "Active",
        lin: "LIN v2.0",
        days: "31 days (97 hours)",
        modify: "Modified on 23/05/2023 by ",
        name: "Anh Bang"
    },
    {
        id: 3,
        images: {
            image: "Image",
            image1: "Image",
            image2: "Image",
            image3: "Image",
        },
        title: "Linux",
        status: "Active",
        lin: "LIN v2.0",
        days: "31 days (97 hours)",
        modify: "Modified on 23/05/2023 by ",
        name: "Anh Bang"
    },
    {
        id: 4,
        images: {
            image: "Image",
            image1: "Image",
        },
        title: "Linux",
        status: "Active",
        lin: "LIN v2.0",
        days: "31 days (97 hours)",
        modify: "Modified on 23/05/2023 by ",
        name: "Anh Bang"
    },
    {
        id: 5,
        images: {
            image: "Image",
        },
        title: "Linux",
        status: "Active",
        lin: "LIN v2.0",
        days: "31 days (97 hours)",
        modify: "Modified on 23/05/2023 by ",
        name: "Anh Bang"
    },

]