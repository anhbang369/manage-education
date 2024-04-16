import React from 'react';
import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Sidebar from '../layout/sidebar/Sidebar';
import Navbar from '../layout/navbar/Navbar';
import Footer from '../layout/footer/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./classView.css"
import Image from "../../src/assets/cat.jpg";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { getByIdTrainingClass } from '../services/TrainingClassService';
import { useParams } from 'react-router-dom';


const ClassView = () => {

    const params = useParams();
    console.log("GET PARAMETER nhoa" + params.id)

    const [classData, setClassData] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getByIdTrainingClass(params.id);
                setClassData([data]);
                console.log(data);
            } catch (error) {
                console.log(error)
            }
        };

        fetchData();
    }, []);

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
            <Navbar></Navbar>
            <div className='main'>
                <Sidebar></Sidebar>
                <React.Fragment>
                    <CssBaseline />
                    <Container fixed className='p-0 overflow-y-scroll'>
                        <Box sx={{ bgcolor: '#cfe8fc', height: '100%', width: '100%' }}>
                            {classData && Array.isArray(classData) && classData.map((item) => (
                                <div>
                                    <div className='row bg-core text-white border border-white m-0'>
                                        <h6>Class</h6>
                                        <div className='row p-0 m-0'>
                                            <div className='col-md-11 row'>
                                                <div className='col-md-4'><h4>{item.name}</h4></div>
                                                <div className='col-md-8'><p className='bg-tab text-white border border-white rounded w-10 text-center'>Plaining</p></div>
                                            </div>
                                            <div className='col-md-1'>
                                                <i class="bi bi-three-dots"></i>
                                            </div>
                                        </div>
                                        <p className='border-bottom border-white mx-1 my-0'>{item.courseCode}</p>

                                        <div className='d-flex'>
                                            <div>
                                                <p><b>{item.duration}</b> days (97 hours)</p>
                                            </div>
                                            <div className='ms-3'>
                                                <p>|</p>
                                            </div>
                                            <div className='ms-3'>
                                                <i class="bi bi-journal-bookmark-fill"></i>
                                            </div>
                                            <div className='ms-3'>
                                                <i class="bi bi-person-hearts"></i>
                                            </div>
                                            <div className='ms-3'>
                                                <i class="bi bi-alphabet"></i>
                                            </div>
                                            <div className='ms-3'>
                                                <i class="bi bi-wifi"></i>
                                            </div>
                                            <div className='ms-3'>
                                                <i class="bi bi-hand-thumbs-up-fill"></i>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='row m-0 mt-2'>
                                        <div className='col-md-4 text-white rounded'>
                                            <h6 className='bg-core p-1 rounded' onClick={() => toggle(1)}><i class="bi bi-calendar"></i> General</h6>
                                            <div className={selected === 1 ? 'general__contain-first show' : 'general__contain-first'}>
                                                <div className='row text-black fs-14'>
                                                    <div className='col-md-5'><b><i class="bi bi-alarm text-primary"></i> Class time</b></div>
                                                    <div className='col-md-7'>{item.startTime} - {item.endTime}</div>
                                                </div>
                                                <div className='row text-black fs-14'>
                                                    <div className='col-md-5'><b><i class="bi bi-house-door text-primary"></i> Location</b></div>
                                                    <div className='col-md-7 row'>
                                                        <div className='col-md-12'>{item.classLocation.name}</div>
                                                    </div>
                                                </div>
                                                <div className='row text-black fs-14'>
                                                    <div className='col-md-5'><b><i class="bi bi-person"></i> Trainer</b></div>
                                                    <div className='col-md-7 row'>
                                                        {item.account_trainers.map((itemTrainer) => (
                                                            <div className='col-md-12'><a href='#'>{itemTrainer.fullName}</a></div>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className='row text-black fs-14'>
                                                    <div className='col-md-5'><b><i class="bi bi-star"></i> Admin</b></div>
                                                    <div className='col-md-7 row'>
                                                        {item.account_admins.map((itemAdmin) => (
                                                            <div className='col-md-12'><a href='#'>{itemAdmin.fullName}</a></div>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className='row text-black fs-14'>
                                                    <div className='col-md-5'><b><i class="bi bi-recycle"></i> FSU</b></div>
                                                    <div className='col-md-7 row'>
                                                        <div className='col-md-12'>{item.fsu.name}</div>
                                                        <div className='col-md-12'>{item.createdBy.email}</div>
                                                    </div>
                                                </div>
                                                <div className='border-bottom border-black'></div>
                                                <div className='row text-black fs-14'>
                                                    <div className='col-md-5'><b>Created</b></div>
                                                    <div className='col-md-7'>{item.createdDate.slice(0, 10)} by {item.createdBy.fullName}</div>
                                                </div>
                                                <div className='row text-black fs-14'>
                                                    <div className='col-md-5'><b>Review</b></div>
                                                    <div className='col-md-7'>{item.reviewedDate.slice(0, 10)} by {item.reviewedBy.fullName}</div>
                                                </div>
                                                <div className='row text-black fs-14'>
                                                    <div className='col-md-5'><b>Approve</b></div>
                                                    <div className='col-md-7'>{item.approvedDate.slice(0, 10)} by {item.approvedBy.fullName}</div>
                                                </div>
                                            </div>

                                            <h6 className='bg-core p-1 m-0 rounded d-flex text-white mt-3' onClick={() => toggle1(1)}><i class="bi bi-star"></i> Attendee</h6>
                                            <div className={selected1 === 1 ? 'row attendee__component show' : 'row attendee__component'}>
                                                <div className='col-md-4 rounded-start bg-core row'>
                                                    <div className='col-md-12'>Planned</div>
                                                    <div className='col-md-12'>{item.plannedAttendee}</div>
                                                </div>
                                                <div className='col-md-4 bg-atten'>
                                                    <div className='col-md-12'>Accepted</div>
                                                    <div className='col-md-12'>{item.acceptedAttendee}</div>
                                                </div>
                                                <div className='col-md-4 bg-chapter text-black rounded-end'>
                                                    <div className='col-md-12'>Actual</div>
                                                    <div className='col-md-12'>{item.actualAttendee}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-md-1'>
                                        </div>
                                        <div className='col-md-7 '>
                                            <div className='bg-core p-1 rounded d-flex text-white'>
                                                <p className='fw-normal ms-3 fs-14'><i class="bi bi-calendar"></i> Time frame</p>
                                                <p className='fw-normal ms-3 fs-14'>25-Apr-22 to 21-July-22</p>
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
                                    <h6 className='text-white bg-core rounded-top w-15 text-center m-0 ms-3 mt-3'>Training program</h6>
                                    <div className='bg-core text-white border border-white ms-3 rounded-top-end p-1'>
                                        <h5 className='ms-3'>{item.trainingProgram.name}</h5>
                                        <div className='d-flex ms-3'>
                                            <p>{item.trainingProgram.day} days ({item.trainingProgram.hours} hours)</p>
                                            <p>|</p>
                                            <p>Modified on {item.trainingProgram.createdDate.slice(0, 10)} by <b>{item.trainingProgram.createdBy}</b></p>
                                        </div>
                                    </div>

                                    {Data.map((item, index) => (
                                        <div className='row w-98 ms-3 mt-3'>
                                            <div className='col-md-3 bg-core rounded-start py-2 px-2 row'>
                                                {Object.values(item.images).map((output, ind) => (
                                                    <div className='col-md-3'>
                                                        <img key={ind} className='w-100 rounded-circle' src={Image} alt={output}></img>
                                                    </div>
                                                ))}

                                            </div>
                                            <div className='col-md-9 row class__view-syllabus-content'>
                                                <div className='col-md-12 d-flex'>
                                                    <h5><b>{item.title}</b></h5><p className='bg-core text-white text-center h-20p ms-3 rounded'>{item.status}</p>
                                                </div>
                                                <div className='col-md-12'>
                                                    <div className='d-flex fw-normal'>
                                                        <p className='fw-normal'>{item.lin}</p>
                                                        <p className='fw-normal'>|</p>
                                                        <p className='fw-normal'>{item.days}</p>
                                                        <p className='fw-normal'>|</p>
                                                        <p className='fw-normal'>{item.modify}<b>{item.name}</b></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </ Box>
                    </Container>
                </React.Fragment>

            </div>
            <Footer></Footer>
        </>
    )
}

export default ClassView

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