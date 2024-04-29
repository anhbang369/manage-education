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
import { getUserByRole, getUserByRoleStudent } from '../../services/UserService';
import { getFsu } from '../../services/FsuService';
import { getAttendLevel } from '../../services/AttendLevel';
import { getTrainingProgramById } from "../../services/TrainingProgramService";
import { getTechnicalGroups } from "../../services/TechnicalGroupService";
import { getFormatTypes } from "../../services/FormatTypeService";
import { getProgramContents } from "../../services/ProgramContentService";
import { getClassStatus } from "../../services/ClassStatusService";
import { getClassLocation } from "../../services/ClassLocationService";
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const ClassStepThree = ({ programTwo, selectedItems, onNextStep }) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [admin, setAdmin] = useState(null);
    const [trainee, setTrainee] = useState(null);
    const [fsu, setFsu] = useState(null);
    const [attend, setAttend] = useState(null);
    const [technical, setTechnical] = useState(null);
    const [format, setFormat] = useState(null);
    const [content, setContent] = useState(null);
    const [status, setStatus] = useState(null);
    const [location, setLocation] = useState(null);
    const [syllabus, setSyllabus] = useState(null);
    const [selectedAdmins, setSelectedAdmins] = useState([]);
    const [selectedTrainees, setSelectedTrainees] = useState([]);
    const [selectedApprove, setSelectedApprove] = useState([]);
    const [selectedReview, setSelectedReview] = useState([]);
    const [selectedTeachnical, setSelectedTeachnical] = useState([]);
    const [selectedFormat, setSelectedFormat] = useState([]);
    const [selectedContent, setSelectedContent] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState([]);
    const [selectedFsu, setSelectedFsu] = useState([]);
    const [selectedDates, setSelectedDates] = useState([]);
    const [time, setTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [classCalendars, setClassCalendars] = useState([]);
    const [formData, setFormData] = useState({
        name: programTwo.name || '',
        courseCode: programTwo.courseCode || '',
        startTime: '',
        endTime: '',
        startDate: '',
        endDate: '',
        duration: 0,
        reviewedBy: '',
        reviewedDate: new Date().toISOString(),
        approvedBy: '',
        approvedDate: new Date().toISOString(),
        universityCode: '',
        plannedAttendee: '',
        acceptedAttendee: '',
        actualAttendee: '',
        classLocation: null,
        attendeeLevel: null,
        formatType: null,
        classStatus: null,
        technicalGroup: null,
        programContent: null,
        account_admins: [],
        account_trainers: [],
        account_trainee: [],
        classCalendars: null,
        fsu: null,
    });

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
            const selectedDateTime = new Date(selectedDates[selectedDates.length - 1]);
            const [hours, minutes] = time.split(':').map(Number);
            selectedDateTime.setHours(hours, minutes);

            const updatedDates = [...selectedDates];
            updatedDates[selectedDates.length - 1] = selectedDateTime;

            setSelectedDates(updatedDates);
            handleClose();

            const newEvent = {
                day_no: classCalendars.length + 1,
                dateTime: selectedDateTime.toISOString(),
                beginTime: time,
                endTime: endTime
            };
            setClassCalendars(prev => [...prev, newEvent]);
            setFormData(prevFormData => ({
                ...prevFormData,
                classCalendars: prevFormData.classCalendars ? [...prevFormData.classCalendars, newEvent] : [newEvent]
            }));
        }

    };

    const handleTimeChange = (event) => {
        setTime(event.target.value);
    };

    const handleEndTimeChange = (event) => {
        setEndTime(event.target.value);
    };


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
                const data = await getUserByRoleStudent();
                setTrainee(data);
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getTechnicalGroups();
                setTechnical(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getFormatTypes();
                setFormat(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getProgramContents();
                setContent(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getClassStatus();
                setStatus(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getClassLocation();
                setLocation(data);
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
            updateFormDataA(selectedAdmin.id);
        }
    };

    const updateFormDataA = (adminId) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            account_admins: [...prevFormData.account_admins, { id: adminId }]
        }));
    };

    const handleRemoveAdmin = (adminId) => {
        const updatedAdmins = selectedAdmins.filter(admin => admin.id !== adminId);
        setSelectedAdmins(updatedAdmins);
        setFormData(prevFormData => ({
            ...prevFormData,
            account_admins: prevFormData.account_admins.filter(admin => admin.id !== adminId)
        }));
    };


    const handleTraineeSelect = (e) => {
        const selectedTraineeId = e.target.value;
        const selectedTrainee = trainee.find(ad => ad.id === selectedTraineeId);
        if (selectedTrainee) {
            setSelectedTrainees(prevTrainees => [...prevTrainees, selectedTrainee]);
            updateFormData([...selectedTrainees, selectedTrainee]);
        }
    };

    const updateFormData = (trainees) => {
        if (Array.isArray(trainees)) {
            const traineeIds = trainees.map(trainee => ({ id: trainee.id }));
            setFormData({ ...formData, account_trainee: traineeIds });
        } else {
            setFormData({ ...formData });
        }
    };

    const handleApproveSelect = (e) => {
        const selectedApproveId = e.target.value;
        const selectedApprove = admin.find(ad => ad.id === selectedApproveId);
        if (selectedApprove) {
            updateFormDataApprove(selectedApprove);
            setSelectedApprove([selectedApprove]);
        }
    };

    const updateFormDataApprove = (selectedApprove) => {
        setFormData({ ...formData, approvedBy: selectedApprove.id });
    };

    const handleRemoveApprove = (approveId) => {
        const updatedApproves = selectedApprove.filter(approve => approve.id !== approveId);
        setSelectedApprove(updatedApproves);

        if (updatedApproves.length === 0) {
            setFormData({ ...formData, approvedBy: null });
        }
    };


    const handleReviewSelect = (e) => {
        const selectedReviewId = e.target.value;
        const selectedReview = admin.find(ad => ad.id === selectedReviewId);
        if (selectedReview) {
            updateFormDataReview(selectedReview);
            setSelectedReview([selectedReview]);
        }
    };

    const updateFormDataReview = (selectedReview) => {
        setFormData({ ...formData, reviewedBy: selectedReview.id });
    };

    const handleReviewReview = (reviewId) => {
        const updatedReviews = selectedReview.filter(review => review.id !== reviewId);
        setSelectedReview(updatedReviews);

        if (updatedReviews.length === 0) {
            setFormData({ ...formData, reviewedBy: null });
        }
    };

    //technical
    const handleTechnicalSelect = (e) => {
        const selectedTechnicalId = e.target.value;
        const selectedTechnical = technical.find(ad => ad.id === selectedTechnicalId);
        if (selectedTechnical) {
            handleInputChange(e)
            setSelectedTeachnical([selectedTechnical]);
        }
    };


    const handleDeleteTechnical = (technicalId) => {
        const updatedTechnicals = selectedTeachnical.filter(tech => tech.id !== technicalId);
        setSelectedTeachnical(updatedTechnicals);

        if (updatedTechnicals.length === 0) {
            setFormData({ ...formData, technicalGroup: null });
        }
    };

    //format
    const handleFormatSelect = (e) => {
        const selectedFormatId = e.target.value;
        const selectedFormat = format.find(ad => ad.id === selectedFormatId);
        if (selectedFormat) {
            handleInputChange(e)
            setSelectedFormat([selectedFormat]);
        }
    };


    const handleDeleteFormat = (formatId) => {
        const updatedFormats = selectedFormat.filter(format => format.id !== formatId);
        setSelectedFormat(updatedFormats);

        if (updatedFormats.length === 0) {
            setFormData({ ...formData, formatType: null });
        }
    };

    //content
    const handleContentSelect = (e) => {
        const selectedContentId = e.target.value;
        const selectedContent = content.find(ad => ad.id === selectedContentId);
        if (selectedContent) {
            handleInputChange(e)
            setSelectedContent([selectedContent]);
        }
    };


    const handleDeleteContent = (contentId) => {
        const updatedContents = selectedContent.filter(content => content.id !== contentId);
        setSelectedContent(updatedContents);

        if (updatedContents.length === 0) {
            setFormData({ ...formData, programContent: null });
        }
    };

    //status
    const handleStatusSelect = (e) => {
        const selectedStatusId = e.target.value;
        const selectedStatus = status.find(ad => ad.id === selectedStatusId);
        if (selectedStatus) {
            handleInputChange(e)
            setSelectedStatus([selectedStatus]);
        }
    };

    const handleDeleteStatus = (statusId) => {
        const updatedStatuss = selectedStatus.filter(status => status.id !== statusId);
        setSelectedStatus(updatedStatuss);

        if (updatedStatuss.length === 0) {
            setFormData({ ...formData, classStatus: null });
        }
    };

    //technical
    const handleLocationSelect = (e) => {
        const selectedLocationId = e.target.value;
        const selectedLocation = location.find(ad => ad.id === selectedLocationId);
        if (selectedLocation) {
            handleInputChange(e)
            setSelectedLocation([selectedLocation]);
        }
    };


    const handleDeleteLocation = (locationId) => {
        const updatedLocations = selectedLocation.filter(location => location.id !== locationId);
        setSelectedLocation(updatedLocations);

        if (updatedLocations.length === 0) {
            setFormData({ ...formData, classLocation: null });
        }
    };

    const handleFsuSelect = (e) => {
        const selectedFsuId = e.target.value;
        const selectedFsu = fsu.find(ad => ad.id === selectedFsuId);
        if (selectedFsu) {
            handleInputChange(e)
            setSelectedFsu([selectedFsu]);
        }
    };

    const handleDeleteFsu = (fsuId) => {
        const updatedFsus = selectedFsu.filter(fsu => fsu.id !== fsuId);
        setSelectedFsu(updatedFsus);

        if (updatedFsus.length === 0) {
            setFormData({ ...formData, fsu: null });
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

    const [selectedS, setSelectedS] = useState(null)
    const toggleS = (i) => {
        if (selectedS === i) {
            return setSelectedS(null)
        }

        setSelectedS(i)
    }

    const [selected1, setSelected1] = useState(null)
    const toggle1 = (i) => {
        if (selected1 === i) {
            return setSelected1(null)
        }

        setSelected1(i)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === "attendeeLevel" || name === "fsu" || name === "technicalGroup" || name === "formatType" || name === "programContent" || name === "classStatus" || name === "classLocation") {
            setFormData({
                ...formData,
                [name]: { id: value }
            });
        } else if (name === "account_trainee") {
            const updatedAccountTrainee = value.map(id => ({ id }));
            setFormData({
                ...formData,
                [name]: updatedAccountTrainee
            });
        } else if (name === "account_admins") {
            handleAdminSelect()
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    console.log("lay dada: " + JSON.stringify(formData))
    console.log("lay item step 3: " + JSON.stringify(selectedItems))



    // const handleUpdateProgramTwo = () => {
    //     const updatedInfo = {
    //         name: programTwo.name,
    //         courseCode: programTwo.courseCode,
    //         startTime: '',
    //         endTime: '',
    //         startDate: '',
    //         endDate: '',
    //         duration: 0,
    //         reviewedBy: '',
    //         reviewedDate: '',
    //         approvedBy: '',
    //         approvedDate: '',
    //         universityCode: '',
    //         plannedAttendee: '',
    //         acceptedAttendee: '',
    //         actualAttendee: '',
    //         classLocation: null,
    //         attendeeLevel: null,
    //         formatType: null,
    //         classStatus: null,
    //         technicalGroup: null,
    //         programContent: null,
    //         account_admins: null,
    //         account_trainers: null,
    //         account_trainee: null,
    //         classCalendars: null,
    //         fsu: null,
    //     };
    //     handleUpdateProgramTwo(updatedInfo);
    // };
    const handleRemoveTrainee = (idx) => {
        const updatedTrainees = selectedTrainees.filter((_, index) => index !== idx);
        setSelectedTrainees(updatedTrainees);
        updateFormData(updatedTrainees);
    };

    const handleNextButtonClick = () => {
        onNextStep(formData, selectedItems);
    };





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
                                        <div className='col-md-4'><h4>{programTwo.name}</h4></div>
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
                                            <div className='col-md-7 class-general-input-time'>from <input type='time' name='startTime' value={formData.startTime} onChange={handleInputChange} step="1" /> to <input type='time' name='endTime' value={formData.endTime} onChange={handleInputChange} step="1" /></div>
                                        </div>
                                        <div className='row first__class-general mt-2'>
                                            <div className='col-md-5'><b><i class="bi bi-house-door"></i> Location</b></div>
                                            <div className='col-md-7 row'>
                                                <div className='col-md-12'>
                                                    {selectedLocation && selectedLocation.map((ads, idxAds) => (
                                                        <div><a href='#' key={idxAds}>{ads.name} <i class="bi bi-x" onClick={() => handleDeleteLocation(ads.id)}></i></a></div>
                                                    ))}
                                                    {selectedLocation && selectedLocation.length === 0 && (
                                                        <Form.Select className='select__class-three-general fixed-width' aria-placeholder='exam' name='classLocation' onChange={handleLocationSelect}>
                                                            {location && location.map((apr, idxApr) => (
                                                                <option key={idxApr} value={apr.id}>{apr.name}</option>
                                                            ))}
                                                        </Form.Select>
                                                    )}
                                                </div>

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
                                                        <div><a href='#' key={idxAds}>{ads.fullName} <i class="bi bi-x" onClick={() => handleRemoveAdmin(ads.id)}></i></a></div>
                                                    ))}
                                                    <Form.Select className='select__class-three-general fixed-width' aria-placeholder='exam' name='account_admins' onChange={handleAdminSelect}>
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
                                                    {selectedFsu && selectedFsu.map((fsu, idxFsus) => (
                                                        <div key={idxFsus}>
                                                            <div className="">
                                                                <a href='#'>{fsu.name}</a>
                                                                <i className="bi bi-x" onClick={() => handleDeleteFsu(fsu.id)}></i>
                                                            </div>
                                                            <div className="">
                                                                {fsu.contactPoints && fsu.contactPoints.length > 0 ? (
                                                                    fsu.contactPoints.map((contactPoint, index) => (
                                                                        <a href="#" key={index}>{contactPoint.content}</a>
                                                                    ))
                                                                ) : (
                                                                    <span>No contact points available</span>
                                                                )}
                                                            </div>

                                                        </div>
                                                    ))}
                                                    {selectedFsu && selectedFsu.length === 0 && (
                                                        <Form.Select className='select__class-three-general fixed-width' aria-placeholder='exam' name='fsu' onChange={handleFsuSelect}>
                                                            {fsu && fsu.map((apr, idxApr) => (
                                                                <option key={idxApr} value={apr.id}>{apr.name}</option>
                                                            ))}
                                                        </Form.Select>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className='border-bottom border-black'></div>
                                        <div className='row first__class-general gray'>
                                            <div className='col-md-5'><b>Created</b></div>
                                            <div className='col-md-7'></div>
                                        </div>
                                        <div className='row first__class-general gray'>
                                            <div className='col-md-5'><b>Review</b></div>
                                            <div className='col-md-7 row'>
                                                <div className='col-md-12'>
                                                    {selectedReview && selectedReview.map((review, idxReviews) => (
                                                        <div key={idxReviews}>
                                                            <a href='#'>{review.fullName}</a>
                                                            <i className="bi bi-x" onClick={() => handleReviewReview(review.id)}></i>
                                                        </div>
                                                    ))}
                                                    {selectedReview && selectedReview.length === 0 && (
                                                        <Form.Select className='select__class-three-general fixed-width' aria-placeholder='exam' onChange={handleReviewSelect}>
                                                            {admin && admin.map((apr, idxApr) => (
                                                                <option key={idxApr} value={apr.id}>{apr.fullName}</option>
                                                            ))}
                                                        </Form.Select>
                                                    )}

                                                </div>
                                            </div>
                                        </div>
                                        <div className='row first__class-general gray'>
                                            <div className='col-md-5'><b>Approve</b></div>
                                            <div className='col-md-7 row'>
                                                <div className='col-md-12'>
                                                    {selectedApprove && selectedApprove.map((approve, idxApproves) => (
                                                        <div key={idxApproves}>
                                                            <a href='#'>{approve.fullName}</a>
                                                            <i className="bi bi-x" onClick={() => handleRemoveApprove(approve.id)}></i>
                                                        </div>
                                                    ))}
                                                    {selectedApprove && selectedApprove.length === 0 && (
                                                        <Form.Select className='select__class-three-general fixed-width' aria-placeholder='exam' onChange={handleApproveSelect}>
                                                            {admin && admin.map((apr, idxApr) => (
                                                                <option key={idxApr} value={apr.id}>{apr.fullName}</option>
                                                            ))}
                                                        </Form.Select>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className='border-bottom border-black'></div>
                                        <div className='row first__class-general'>
                                            <div className='col-md-5'><b><i class="bi bi-star"></i> Tech group</b></div>
                                            <div className='col-md-7 row'>
                                                <div className='col-md-12'>
                                                    {selectedTeachnical && selectedTeachnical.map((ads, idxAds) => (
                                                        <div><a href='#' key={idxAds}>{ads.name} <i class="bi bi-x" onClick={() => handleDeleteTechnical(ads.id)}></i></a></div>
                                                    ))}
                                                    {selectedTeachnical && selectedTeachnical.length === 0 && (
                                                        <Form.Select className='select__class-three-general fixed-width' aria-placeholder='exam' name='technicalGroup' onChange={handleTechnicalSelect}>
                                                            {technical && technical.map((apr, idxApr) => (
                                                                <option key={idxApr} value={apr.id}>{apr.name}</option>
                                                            ))}
                                                        </Form.Select>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className='row first__class-general'>
                                            <div className='col-md-5'><b><i class="bi bi-star"></i> Program</b></div>
                                            <div className='col-md-7 row'>
                                                <div className='col-md-12'>
                                                    {selectedContent && selectedContent.map((ads, idxAds) => (
                                                        <div><a href='#' key={idxAds}>{ads.name} <i class="bi bi-x" onClick={() => handleDeleteContent(ads.id)}></i></a></div>
                                                    ))}
                                                    {selectedContent && selectedContent.length === 0 && (
                                                        <Form.Select className='select__class-three-general fixed-width' aria-placeholder='exam' name='programContent' onChange={handleContentSelect}>
                                                            {content && content.map((apr, idxApr) => (
                                                                <option key={idxApr} value={apr.id}>{apr.name}</option>
                                                            ))}
                                                        </Form.Select>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className='row first__class-general'>
                                            <div className='col-md-5'><b><i class="bi bi-star"></i> Format</b></div>
                                            <div className='col-md-7 row'>
                                                <div className='col-md-12'>
                                                    {selectedFormat && selectedFormat.map((ads, idxAds) => (
                                                        <div><a href='#' key={idxAds}>{ads.name} <i class="bi bi-x" onClick={() => handleDeleteFormat(ads.id)}></i></a></div>
                                                    ))}
                                                    {selectedFormat && selectedFormat.length === 0 && (
                                                        <Form.Select className='select__class-three-general fixed-width' aria-placeholder='exam' name='formatType' onChange={handleFormatSelect}>
                                                            {format && format.map((apr, idxApr) => (
                                                                <option key={idxApr} value={apr.id}>{apr.name}</option>
                                                            ))}
                                                        </Form.Select>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className='row first__class-general'>
                                            <div className='col-md-5'><b><i class="bi bi-star"></i> Status</b></div>
                                            <div className='col-md-7 row'>
                                                <div className='col-md-12'>
                                                    {selectedStatus && selectedStatus.map((ads, idxAds) => (
                                                        <div><a href='#' key={idxAds}>{ads.name} <i class="bi bi-x" onClick={() => handleDeleteStatus(ads.id)}></i></a></div>
                                                    ))}
                                                    {selectedStatus && selectedStatus.length === 0 && (
                                                        <Form.Select className='select__class-three-general fixed-width' aria-placeholder='exam' name='classStatus' onChange={handleStatusSelect}>
                                                            {status && status.map((apr, idxApr) => (
                                                                <option key={idxApr} value={apr.id}>{apr.name}</option>
                                                            ))}
                                                        </Form.Select>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <h6 className='pointer text-white bg-general p-1 rounded d-flex fs-14 mt-3 mb-0' onClick={() => toggle1(1)}><i class="bi bi-star"></i> Attendee
                                        <Form.Select className='select__class-three h-20p' aria-placeholder='exam' name="attendeeLevel" value={formData.attendeeLevel} onChange={handleInputChange}>
                                            {attend && attend.map((ad, index) => (
                                                <option key={index} value={ad.id}>{ad.name}</option>
                                            ))}
                                        </Form.Select>
                                    </h6>
                                    <div className={selected1 === 1 ? 'row attendee__component show' : 'row attendee__component'}>
                                        <div className='col-md-4 bg-core text-white'>
                                            <div className='col-md-12'>Planned</div>
                                            <div className='col-md-12'><input className='attendee__input' name='plannedAttendee' value={formData.plannedAttendee} onChange={handleInputChange} /></div>
                                        </div>
                                        <div className='col-md-4 bg-atten'>
                                            <div className='col-md-12 text-white'>Accepted</div>
                                            <div className='col-md-12'><input className='attendee__input' name='acceptedAttendee' value={formData.acceptedAttendee} onChange={handleInputChange} /></div>
                                        </div>
                                        <div className='col-md-4 bg-chapter'>
                                            <div className='col-md-12'>Actual</div>
                                            <div className='col-md-12'><input className='attendee__input' name='actualAttendee' value={formData.actualAttendee} onChange={handleInputChange} /></div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-1'>
                                </div>
                                <div className='col-md-7 '>
                                    <div className="">
                                        <div className='text-white bg-general p-1 rounded d-flex'>
                                            <p className='container__first-text fs-14'><i class="bi bi-calendar"></i> Time frame</p>
                                            <div className="row">
                                                <p className='col-md-2'>Start date</p>
                                                <p className='container__first-text time col-md-4'><input type='datetime-local' name='startDate' value={formData.startDate} onChange={handleInputChange} /></p>
                                                <p className='col-md-2'>End date</p>
                                                <p className='container__first-text time col-md-4'><input type='datetime-local' name='endDate' value={formData.endDate} onChange={handleInputChange} /></p>
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
                                                    {/* <ul>
                                                        {selectedDates && selectedDates.map((selectedDate, index) => (
                                                            <li key={index}>{selectedDate.toLocaleString()}</li>
                                                        ))}
                                                    </ul> */}
                                                    <ul>
                                                        {classCalendars.map(event => (
                                                            <li key={event.day_no}>
                                                                <div>Date: {event.dateTime}</div>
                                                                <div>Begin Time: {event.beginTime}</div>
                                                                <div>End Time: {event.endTime}</div>
                                                            </li>
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
                                                        <input type='time' value={time} onChange={handleTimeChange} step="1" />
                                                        <input type='time' value={endTime} onChange={handleEndTimeChange} step="1" />
                                                        <button onClick={handleSave}>Save</button>
                                                    </Typography>
                                                </Box>
                                            </Modal>
                                        </div>
                                        <div className="w-100">
                                            <h6 className='text-white bg-general p-1 rounded fs-14 pointer' onClick={() => toggleS(1)}><i class="bi bi-calendar"></i> General</h6>
                                            <div className={selectedS === 1 ? 'general__contain-first show' : 'general__contain-first'}>
                                                <div className='fs-14 d-flex w-100'>
                                                    <div className='ms-2'> <i class="bi bi-person"></i><b>   Student: </b></div>
                                                    <div className='ms-2'>
                                                        <Form.Select className='select__class-three-general fixed-width h-30 mb-2' aria-placeholder='exam' onChange={handleTraineeSelect}>
                                                            {trainee && trainee.map((train, idxTrainees) => (
                                                                <option key={idxTrainees} value={train.id}>{train.fullName}</option>
                                                            ))}
                                                        </Form.Select>
                                                        {selectedTrainees && (
                                                            <Box sx={{ flexGrow: 1 }}>
                                                                <Grid container spacing={2}>
                                                                    {selectedTrainees.map((trainees, idxTrainees) => (
                                                                        <Grid item xs={4}>
                                                                            <a href='#' key={idxTrainees}>{trainees.fullName} <i class="bi bi-x text-primary" onClick={() => handleRemoveTrainee(idxTrainees)}></i></a>
                                                                        </Grid>
                                                                    ))}


                                                                </Grid>
                                                            </Box>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>
                            <h6 className='bg-core rounded-top w-15 text-white p-1 ms-2 text-center mb-0'>Training program</h6>
                            {selectedItems && selectedItems.map((program, idxProgram) => (
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
                                        <button className="bg-secondary border-0 text-white rounded p-2 my-4" onClick={() => handleNextButtonClick()}>Next</button>
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