import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { getTrainingProgramById } from "../../services/TrainingProgramService";
import { getUserByRoleTrainer } from "../../services/UserService";
import { createClass } from "../../services/TrainingClassService";
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled, css } from '@mui/system';
import { Modal as BaseModal } from '@mui/base/Modal';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useHistory } from 'react-router-dom';

const ClassStepFourth = ({ formData, selectedItems }) => {
    // console.log('requesy body :' + JSON.stringify(formData));
    // console.log('select item :' + JSON.stringify(selectedItems));
    const [program, setProgram] = useState(null)
    const [trainer, setTrainer] = useState(null)
    const [selectedTrainers, setSelectedTrainers] = useState([]);
    const [selectedSyllabus, setSelectedSyllabus] = useState(null)
    const [newForm, setNewForm] = useState({
        name: formData.name || '',
        courseCode: formData.courseCode || '',
        startTime: formData.startTime || '',
        endTime: formData.endTime || '',
        startDate: formData.startDate || '',
        endDate: formData.endDate || '',
        duration: formData.duration || 0,
        reviewedBy: formData.reviewedBy || '',
        reviewedDate: formData.reviewedDate || '',
        approvedBy: formData.approvedBy || '',
        approvedDate: formData.approvedDate || '',
        universityCode: formData.universityCode || '',
        plannedAttendee: formData.plannedAttendee || '',
        acceptedAttendee: formData.acceptedAttendee || '',
        actualAttendee: formData.actualAttendee || '',
        classLocation: formData.classLocation || null,
        attendeeLevel: formData.attendeeLevel || null,
        formatType: formData.formatType || null,
        classStatus: formData.classStatus || null,
        technicalGroup: formData.technicalGroup || null,
        programContent: formData.programContent || null,
        account_admins: formData.account_admins || [],
        account_trainers: formData.account_trainers || [],
        account_trainee: formData.account_trainee || [],
        classCalendars: formData.classCalendars || [],
        fsu: formData.fsu || null,
    });
    console.log('new form: ' + JSON.stringify(newForm))
    const history = useHistory();
    const [openNo, setOpenNo] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [openTrainer, setOpenTrainer] = React.useState(false);
    const handleOpenTrainer = () => setOpenTrainer(true);
    const handleCloseTrainer = () => setOpenTrainer(false);

    //trainer 
    const handleTrainerSelect = (e) => {
        const selectedTrainerId = e.target.value;
        const selectedTrainer = trainer.find(ad => ad.id === selectedTrainerId);
        if (selectedTrainer) {
            setSelectedTrainers(prevTrainers => [...prevTrainers, selectedTrainer]);
            updateFormDataA(selectedTrainer.id);
        }
    };

    const updateFormDataA = (trainerId) => {
        setNewForm(prevFormData => ({
            ...prevFormData,
            account_trainers: [...prevFormData.account_trainers, { id: trainerId }]
        }));
    };

    const handleRemoveTrainer = (trainerId) => {
        const updatedTrainers = selectedTrainers.filter(trainer => trainer.id !== trainerId);
        setSelectedTrainers(updatedTrainers);
        setNewForm(prevFormData => ({
            ...prevFormData,
            account_trainers: prevFormData.account_trainers.filter(trainer => trainer.id !== trainerId)
        }));
    };
    console.log('data hah: ' + selectedItems[0].id)

    //save class
    const handleSaveClick = async () => {
        try {
            const response = await createClass(selectedItems[0].id, [newForm]);

            if (response.ok) {
                console.log('Create successful');
                setNotificationMessage('Create successful.');
                setOpenNo(true);
                history.push('/class');
            } else {
                console.error('Create failed');
            }
        } catch (error) {
            console.error('Error creating class:', error);
        }
    };



    const toggleSyllabus = (indexSyllabus) => {
        if (selectedSyllabus === indexSyllabus) {
            return setSelectedSyllabus(null)
        }

        setSelectedSyllabus(indexSyllabus)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getTrainingProgramById(selectedItems[0].id);
                setProgram(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getUserByRoleTrainer();
                setTrainer(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

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

    const handleCloseNo = () => {
        setOpenNo(false);
    };


    return (
        <>
            <div className="">
                <h5 className='ms-2'>Training program of <a href="#" className='text-black fw-bold'>{formData.name}</a></h5>
                <h4 className='fw-bold ms-2'>{selectedItems[0].name}</h4>
                <div className="border-bottom border-black"></div>
                {program && Array.isArray([program]) && [program].map((item, idxOver) => (
                    <div key={idxOver}>
                        <div className='d-flex'><p className='fw-bold ms-2 fs-20'>{item.day}</p> <span className='fs-14 mt-2'>days ({item.hours} hours)</span></div>
                        <p className='fs-14 ms-2 fw-normal'>Modified on {item.createdDate.slice(0, 10)} by <b>{item.createdBy}</b></p>
                        <div className="border-bottom border-black"></div>
                        <h6 className="p-1 ms-3"><b>Content</b></h6>

                        {item.syllabuses && Array.isArray(item.syllabuses) && item.syllabuses.map((itemSyllabus, indexSyllabus) => (
                            <div key={indexSyllabus} >
                                <div className='row w-98 ms-3 mt-3'>
                                    <div className='col-md-12 row box-shadow-1 rounded'>
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
                                    {itemSyllabus.syllabusDays && Array.isArray(itemSyllabus.syllabusDays) && itemSyllabus.syllabusDays.slice().sort((a, b) => a.dayNo - b.dayNo).map((day1, i) => (
                                        <div className="wrapper" key={i}>
                                            <div className='accordion accordion__wa'>
                                                <div className='item'>
                                                    <h6 className='ms-3 pointer w-98 bg-core text-white p-1 mb-0' onClick={() => togglesDay(i)}>{day1.dayNo} day</h6>
                                                    <div className={selectedDay === i ? 'content show' : 'content'}>
                                                        {day1.syllabusUnits.map((unit, index) => (
                                                            <div className="unit" key={index} >
                                                                <div className="unit__component" onClick={() => toggleUnit(index)}>
                                                                    <div className='d-flex mb-2'>
                                                                        <p className="unit__number fw-bold fs-14">Unit {unit.unitNo}</p>
                                                                        <div className='ms-4'>
                                                                            <p className="unit__title pointer fs-14 fw-bold">{unit.name}</p>
                                                                            <span className="unit__time fs-14 fw-bold">{unit.duration} hours</span>
                                                                        </div>

                                                                    </div>
                                                                    <i className='bi bi-caret-left-fill'></i>
                                                                </div>

                                                                <div className='row'>
                                                                    <div className="col-md-2">
                                                                        <div className='col-md-12'>
                                                                            {selectedTrainers && selectedTrainers.map((ads, idxAds) => (
                                                                                <div>
                                                                                    <Stack direction="row" spacing={2}>
                                                                                        <Avatar alt="Remy Sharp" src={ads.avatar} />
                                                                                    </Stack>
                                                                                    <a href='#' key={idxAds}>{ads.fullName} <i class="bi bi-x" onClick={() => handleRemoveTrainer(ads.id)}></i></a>
                                                                                </div>
                                                                            ))}
                                                                            {selectedTrainers && selectedTrainers.length === 0 && (
                                                                                <Form.Select className='select__class-three-general fixed-width' aria-placeholder='exam' name='account_trainers' onChange={handleTrainerSelect}>
                                                                                    {trainer && trainer.map((apr, idxApr) => (
                                                                                        <option key={idxApr} value={apr.id}>{apr.fullName}</option>
                                                                                    ))}
                                                                                </Form.Select>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-10">
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


                                                                                <Snackbar open={openNo} autoHideDuration={6000} onClose={handleCloseNo}>
                                                                                    <Alert
                                                                                        onClose={handleCloseNo}
                                                                                        severity="success"
                                                                                        variant="filled"
                                                                                        sx={{ width: '100%' }}
                                                                                    >
                                                                                        {notificationMessage}
                                                                                    </Alert>
                                                                                </Snackbar>
                                                                            </div>
                                                                        ))}
                                                                    </div>

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
                            <button className="bg-secondary border-0 text-white rounded p-2 my-4" onClick={handleSaveClick}>Save</button>
                        </Grid>
                    </Grid>
                </Box>
            </div>


        </>
    )

}

export default ClassStepFourth

const Backdrop = React.forwardRef((props, ref) => {
    const { open, className, ...other } = props;
    return (
        <div
            className={clsx({ 'base-Backdrop-open': open }, className)}
            ref={ref}
            {...other}
        />
    );
});

Backdrop.propTypes = {
    className: PropTypes.string.isRequired,
    open: PropTypes.bool,
};

const blue = {
    200: '#99CCFF',
    300: '#66B2FF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    700: '#0066CC',
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

const Modal1 = styled(BaseModal)`
    position: fixed;
    z-index: 1300;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

const StyledBackdrop = styled(Backdrop)`
    z-index: -1;
    position: fixed;
    inset: 0;
    background-color: rgb(0 0 0 / 0.5);
    -webkit-tap-highlight-color: transparent;
  `;

const ModalContent = styled('div')(
    ({ theme }) => css`
      font-family: 'IBM Plex Sans', sans-serif;
      font-weight: 500;
      text-align: start;
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 8px;
      overflow: hidden;
      background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
      border-radius: 8px;
      border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
      box-shadow: 0 4px 12px
        ${theme.palette.mode === 'dark' ? 'rgb(0 0 0 / 0.5)' : 'rgb(0 0 0 / 0.2)'};
      padding: 24px;
      color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};
  
      & .modal-title {
        margin: 0;
        line-height: 1.5rem;
        margin-bottom: 8px;
      }
  
      & .modal-description {
        margin: 0;
        line-height: 1.5rem;
        font-weight: 400;
        color: ${theme.palette.mode === 'dark' ? grey[400] : grey[800]};
        margin-bottom: 4px;
      }
    `,
);

const TriggerButton = styled('button')(
    ({ theme }) => css`
      font-family: 'IBM Plex Sans', sans-serif;
      font-weight: 600;
      font-size: 0.875rem;
      line-height: 1.5;
      padding: 8px 16px;
      border-radius: 8px;
      transition: all 150ms ease;
      cursor: pointer;
      background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
      border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
      color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
      box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  
      &:hover {
        background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
        border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
      }
  
      &:active {
        background: ${theme.palette.mode === 'dark' ? grey[700] : grey[100]};
      }
  
      &:focus-visible {
        box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
        outline: none;
      }
    `,
);