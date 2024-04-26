import React from 'react';
import "./classStepThree.css";
import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { getUserByRole } from '../../services/UserService';
import { getFsu } from '../../services/FsuService';
import { getAttendLevel } from '../../services/AttendLevel';
import { getTrainingProgramById } from "../../services/TrainingProgramService";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ClassStepThree = ({ selectedItems }) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [admin, setAdmin] = useState(null);
    const [fsu, setFsu] = useState(null);
    const [attend, setAttend] = useState(null);
    const [syllabus, setSyllabus] = useState(null);
    const [selectedAdmins, setSelectedAdmins] = useState([]);
    const [selectedDates, setSelectedDates] = useState([]);
    const [time, setTime] = useState('');

    const isDateSelected = (date) => {
        return selectedDates.some(selectedDate => {
            return (
                selectedDate.getFullYear() === date.getFullYear() &&
                selectedDate.getMonth() === date.getMonth() &&
                selectedDate.getDate() === date.getDate()
            );
        });
    };



    const tileClassName = ({ date }) => {
        if (isDateSelected(date)) {
            return 'text-primary bg-core fw-bolder fs-16 rounded text-white selected-date';
        }
    };


    // const handleDateClick = (date) => {
    //     if (!isDateSelected(date)) {
    //         if (selectedDates.length < selectedItems[0].days) {
    //             setSelectedDates([...selectedDates, date]);
    //             handleOpen();
    //         }
    //     } else {
    //         if (selectedDates.length <= selectedItems[0].days) {
    //             setSelectedDates(selectedDates.filter(selectedDate => selectedDate.getTime() !== date.getTime()));
    //             handleOpen();
    //         }
    //     }
    // };

    // const handleTimeChange = (event) => {
    //     setTime(event.target.value);
    // };

    // const isDateSelected = (date) => {
    //     return selectedDates.some(selectedDate => {
    //         return (
    //             selectedDate.getDate() === date.getDate() &&
    //             selectedDate.getMonth() === date.getMonth() &&
    //             selectedDate.getFullYear() === date.getFullYear()
    //         );
    //     });
    // };

    // const tileClassName = ({ date }) => {
    //     if (isDateSelected(date)) {
    //         return 'text-primary bg-core fw-bolder fs-16 rounded text-white selected-date';
    //     }
    // };

    const handleDateClick = (date) => {
        if (!isDateSelected(date)) {
            if (selectedDates.length < selectedItems[0].days) {
                setSelectedDates([...selectedDates, date]);
                handleOpen();
            }
        } else {
            setSelectedDates(selectedDates.filter(selectedDate => selectedDate.getTime() !== date.getTime()));
        }
    };


    const handleSave = () => {
        if (time && selectedDates.length > 0) {
            const selectedDateTime = new Date(selectedDates[selectedDates.length - 1]); // Get the last selected date
            const [hours, minutes] = time.split(':').map(Number);
            selectedDateTime.setHours(hours, minutes);

            const updatedDates = [...selectedDates];
            updatedDates[selectedDates.length - 1] = selectedDateTime; // Update time for the last selected date

            setSelectedDates(updatedDates); // Update state with the modified date
            handleClose();
        }
    };


    const handleTimeChange = (event) => {
        setTime(event.target.value);
    };

    // const [selectedDate, setSelectedDate] = useState(null);

    // const handleDateClick = (date) => {
    //     setSelectedDate(date); // Lưu ngày được chọn vào biến trạng thái
    //     handleOpen(); // Mở Modal
    // };

    // const handleSave = () => {
    //     if (selectedDate) {
    //         setSelectedDates([...selectedDates, selectedDate]); // Thêm ngày vào danh sách
    //         setSelectedDate(null); // Đặt lại selectedDate về null sau khi lưu
    //         handleClose(); // Đóng Modal
    //     }
    // };


    console.log('ngay: ' + selectedItems[0].days)

    const [dateState, setDateState] = useState(new Date())
    const changeDate = (e) => {
        setDateState(e)
    }
    console.log('check: ' + JSON.stringify(selectedItems))

    // console.log('selectedDate: ' + JSON.stringify(selectedDate))
    // console.log('dateState: ' + JSON.stringify(dateState))

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getUserByRole();
                setAdmin(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getFsu();
                setFsu(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAttendLevel();
                setAttend(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (selectedItems && selectedItems.length > 0) {
                    const data = await getTrainingProgramById(selectedItems[0].id);
                    setSyllabus(data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);


    const handleAdminSelect = (e) => {
        const selectedAdminId = e.target.value;
        const selectedAdmin = admin.find(ad => ad.id === selectedAdminId);
        if (selectedAdmin) {
            setSelectedAdmins(prevAdmins => [...prevAdmins, selectedAdmin]);
        }
    };

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
                                    <h6 className='text-white bg-general p-1 rounded fs-14 pointer' onClick={() => toggle(1)}><i class="bi bi-calendar"></i> General</h6>
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
                                                    {selectedAdmins && selectedAdmins.map((ads, idxAds) => (
                                                        <div><a href='#' key={idxAds}>{ads.fullName}</a></div>
                                                    ))}
                                                    <Form.Select className='select__class-three-general fixed-width' aria-placeholder='exam' onChange={handleAdminSelect}>
                                                        {admin && admin.map((ad, idxAd) => (
                                                            <option key={idxAd} value={ad.id}>{ad.fullName}</option>
                                                        ))}
                                                    </Form.Select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row first__class-general'>
                                            <div className='col-md-5'><b><i class="bi bi-recycle"></i> FSU</b></div>
                                            <div className='col-md-7 row'>
                                                <div className='col-md-12'>
                                                    <Form.Select className='select__class-three-general margin' aria-placeholder='exam'>
                                                        {fsu && fsu.map((ad, index) => (
                                                            <option key={index} value={ad.id}>{ad.name}</option>
                                                        ))}
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

                                    <h6 className='pointer text-white bg-general p-1 rounded d-flex fs-14 mt-3 mb-0' onClick={() => toggle1(1)}><i class="bi bi-star"></i> Attendee
                                        <Form.Select className='select__class-three h-20p' aria-placeholder='exam'>
                                            {attend && attend.map((ad, index) => (
                                                <option key={index} value={ad.id}>{ad.name}</option>
                                            ))}
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
                                        <p className='container__first-text fs-14'><i class="bi bi-calendar"></i> Time frame</p>
                                        <div className="row">
                                            <p className='col-md-2'>Start date</p>
                                            <p className='container__first-text time col-md-4'><input type='datetime-local' /></p>
                                            <p className='col-md-2'>End date</p>
                                            <p className='container__first-text time col-md-4'><input type='datetime-local' /></p>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <Calendar
                                                tileClassName={tileClassName}
                                                value={new Date()}
                                                onClickDay={handleDateClick}
                                            />

                                            <div>
                                                <h2>Ngày đã chọn:</h2>
                                                <ul>
                                                    {selectedDates.map((selectedDate, index) => (
                                                        <li key={index}>{selectedDate.toLocaleString()}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                        <div className='col-md-6'>
                                            <Calendar
                                                tileClassName={tileClassName}
                                                value={new Date()}
                                                onClickDay={handleDateClick}
                                            />
                                        </div>
                                        <Modal
                                            open={open}
                                            onClose={handleClose}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                        >
                                            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                                    Chọn thời gian
                                                </Typography>
                                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                                    <input type='time' value={time} onChange={handleTimeChange} />
                                                    <button onClick={handleSave}>Save</button>
                                                </Typography>
                                            </Box>
                                        </Modal>
                                    </div>
                                </div>
                            </div>
                            <h6 className='bg-core rounded-top w-15 text-white p-1 ms-2 text-center mb-0'>Training program</h6>
                            {selectedItems.map((program, idxProgram) => (
                                <div className='bg-core text-white border border-white p-2 rounded-top-end ms-2' key={idxProgram}>
                                    <h5>{program.name} <button><i class="bi bi-pencil p-1 text-white border-0 rounded bg-chapter"></i></button></h5>
                                    <div className='d-flex'>
                                        <p className='fw-normal'>{program.days} days ({program.hours} hours)</p>
                                        <p className='fw-normal mx-1'>|</p>
                                        <p className='fw-normal'>Modified on {program.createdDate.slice(0, 10)} by <b>{program.createdBy}</b></p>
                                    </div>
                                </div>
                            ))}
                            {syllabus && syllabus.syllabuses.map((syllabus, idxSyllabus) => (
                                <div className='class__view-syllabus row' key={idxSyllabus}>
                                    <div className='col-md-3 p-2 row bg-core rounded-start'>

                                    </div>
                                    <div className='col-md-9 row box-shadow-1 rounded-end p-2'>
                                        <div className='col-md-12 d-flex'>
                                            <h5><b>{syllabus.name}</b></h5><p className='bg-core rounded h-20p px-1 text-center text-white ms-2'>{syllabus.status}</p>
                                        </div>
                                        <div className='col-md-12'>
                                            <div className='d-flex'>
                                                <p className='fw-normal'>{syllabus.code} {syllabus.version}</p>
                                                <p className='fw-normal px-2'>|</p>
                                                <p className='fw-normal'>{syllabus.days} days ({syllabus.hours} hours)</p>
                                                <p className='fw-normal px-2'>|</p>
                                                <p className='fw-normal'>{syllabus.createdDate.slice(0, 10)}<b>{syllabus.createdBy}</b></p>
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