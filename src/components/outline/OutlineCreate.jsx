import * as React from 'react';
import "./outlineCreate.css";
import { useState, useEffect } from 'react';
import { Chart } from "react-google-charts";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import 'bootstrap/dist/css/bootstrap.min.css';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch, { SwitchProps } from '@mui/material/Switch';
import { getDeliveryType } from "../../services/DeliveryTypeService";
import { getOutputStandard } from "../../services/OutputStandardService";
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/material/Typography';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';

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


const OutlineCreate = ({ requestBody, onNextClick, onPreviousClick, onUpdateSyllabusDays, onUpdatedRequestBody }) => {
    const [openHour, setOpenHour] = React.useState(false);
    const handleOpenHour = () => setOpenHour(true);
    const handleCloseHour = () => setOpenHour(false);

    const [formData, setFormData] = useState({
        name: '',
        outputStandardId: '',
        duration: '',
        deliveryTypeId: '',
        online: false
    });


    const [selected, setSelected] = useState(null)
    const [importOpen, setImportOpen] = useState(false);
    //get list
    const [output, setOutput] = useState(null);
    const [delivery, setDelivery] = useState(null);
    const [syllabusDays, setSyllabusDays] = useState([]);
    const [unitName, setUnitName] = useState({
        name: '',
    });



    const [dayFormData, setDayFormData] = useState({
        dayNo: 1,
        status: 'AVAILABLE'
    });
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

    const handleAddDay = () => {
        const maxDayNo = syllabusDays && syllabusDays.reduce((max, day) => Math.max(max, day.dayNo), 0);
        const newUnit = {
            name: "Default Unit",
            unitNo: 1,
            duration: 0,
            syllabusUnitChapters: []
        };

        const newDay = {
            dayNo: maxDayNo + 1,
            status: dayFormData.status,
            syllabusUnits: [newUnit]
        };

        setSyllabusDays(prevSyllabusDays => [...prevSyllabusDays, newDay]);

        setDayFormData(prevDayFormData => ({
            ...prevDayFormData,
            dayNo: prevDayFormData.dayNo + 1
        }));
    };

    //delete day
    const handleDeleteDay = (dayIndex) => {
        const updatedSyllabusDays = syllabusDays.filter((_, index) => index !== dayIndex);

        updatedSyllabusDays.forEach((day, index) => {
            day.dayNo = index + 1;
        });

        setSyllabusDays(updatedSyllabusDays);
    };




    //calulate mins
    const calculateTotalDurationOfDay = (day) => {
        let totalDuration = 0;
        day.syllabusUnits.forEach((unit) => {
            unit.syllabusUnitChapters.forEach((chapter) => {
                totalDuration += parseInt(chapter.duration);
            });
        });
        return totalDuration;
    };

    console.log("days: " + JSON.stringify(syllabusDays))

    const handleAddUnit = (dayIndex) => {
        if (!handleAddUnit.called) {
            handleAddUnit.called = true;

            setSyllabusDays(prevSyllabusDays => {
                const updatedSyllabusDays = [...prevSyllabusDays];
                const newName = unitName.name;

                const existingUnitIndex = updatedSyllabusDays[dayIndex]?.syllabusUnits.findIndex(unit => unit.name === newName);
                if (existingUnitIndex !== -1) {
                    updatedSyllabusDays[dayIndex].syllabusUnits.splice(existingUnitIndex, 1);
                }

                const newUnit = {
                    name: newName,
                    unitNo: (updatedSyllabusDays[dayIndex]?.syllabusUnits?.length || 0) + 1,
                    duration: 0,
                    syllabusUnitChapters: []
                };
                updatedSyllabusDays[dayIndex].syllabusUnits.push(newUnit);

                return updatedSyllabusDays;
            });
        }
    };

    handleAddUnit.called = false;




    const handleChange = (field, value) => {
        setFormData({
            ...formData,
            [field]: value
        });
    };

    const handleAddChapter = (dayIndex, unitIndex) => {
        const newChapter = {
            name: formData.name,
            outputStandardId: formData.outputStandardId,
            duration: formData.duration,
            deliveryTypeId: formData.deliveryTypeId,
            online: formData.online,
            materials: []
        };

        setSyllabusDays(prevSyllabusDays => {
            const updatedSyllabusDays = [...prevSyllabusDays];
            const unitToUpdate = updatedSyllabusDays[dayIndex]?.syllabusUnits[unitIndex];
            if (unitToUpdate) {
                unitToUpdate.syllabusUnitChapters.push(newChapter);
            }
            return updatedSyllabusDays;
        });
    };

    const [chapterMaterials, setChapterMaterials] = useState([{ name: '', url: '' }]);



    const handleAddMaterial = (dayIndex, unitIndex, chapterIndex) => {
        if (!handleAddMaterial.called) {
            handleAddMaterial.called = true;

            const newName = chapterMaterials[chapterIndex]?.name || '';
            const newUrl = chapterMaterials[chapterIndex]?.url || '';

            if (newName.trim() === '' || newUrl.trim() === '') {
                console.log('Vui lòng điền đầy đủ thông tin vật liệu.');
                handleAddMaterial.called = false;
                return;
            }

            const isMaterialExistIndex = syllabusDays[dayIndex]?.syllabusUnits[unitIndex]?.syllabusUnitChapters[chapterIndex]?.materials.findIndex(material => material.name === newName);
            if (isMaterialExistIndex >= 0) {
                console.log('Vật liệu đã tồn tại.');
                handleAddMaterial.called = false;
                return;
            }

            const newMaterial = { name: newName, url: newUrl };

            setSyllabusDays(prevSyllabusDays => {
                const updatedSyllabusDays = [...prevSyllabusDays];
                const unitToUpdate = updatedSyllabusDays[dayIndex]?.syllabusUnits[unitIndex];
                if (unitToUpdate) {
                    const chapterToUpdate = unitToUpdate.syllabusUnitChapters[chapterIndex];
                    if (chapterToUpdate) {
                        chapterToUpdate.materials.push(newMaterial);
                    }
                }
                return updatedSyllabusDays;
            });

            const updatedMaterials = [...chapterMaterials];
            updatedMaterials[chapterIndex] = { name: '', url: '' };
            setChapterMaterials(updatedMaterials);
        }
    };

    handleAddMaterial.called = false;



    const handleMaterialChange = (index, field, value) => {
        const updatedMaterials = [...chapterMaterials];
        if (updatedMaterials[index]) {
            updatedMaterials[index][field] = value;
            setChapterMaterials(updatedMaterials);
        }
    };


    const handleDeleteMaterial = (dayIndex, unitIndex, chapterIndex, materialIndex) => {
        setSyllabusDays(prevSyllabusDays => {
            const updatedSyllabusDays = [...prevSyllabusDays];
            const unitToUpdate = updatedSyllabusDays[dayIndex]?.syllabusUnits[unitIndex];
            if (unitToUpdate) {
                const chapterToUpdate = unitToUpdate.syllabusUnitChapters[chapterIndex];
                if (chapterToUpdate) {
                    chapterToUpdate.materials.splice(materialIndex, 1);
                }
            }
            return updatedSyllabusDays;
        });
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getOutputStandard();
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
                setDelivery(data);
            } catch (error) {
                console.log(error)
            }
        };

        fetchData();
    }, []);

    const handleNextClick = () => {
        const updatedRequestBody = {
            ...requestBody,
            syllabusDays: syllabusDays,
            assessmentScheme: {
                assignment: 0,
                quiz: 0,
                exam: 0,
                gpa: 0,
                finalPoint: 0,
                finalTheory: 0,
                finalPractice: 0
            },
            deliveryPrinciple: {
                trainees: "",
                trainer: "",
                training: "",
                re_test: "",
                marking: "",
                waiverCriteria: "",
                others: ""
            }
        };
        onUpdateSyllabusDays(updatedRequestBody);
        onUpdatedRequestBody(updatedRequestBody);
        console.log('first' + JSON.stringify(updatedRequestBody))
        console.log('after' + JSON.stringify(syllabusDays))
        onNextClick();
    };


    const handlePreviousClick = () => {
        onUpdateSyllabusDays(syllabusDays);
        onPreviousClick();
    };

    // const toggle = (i) => {
    //     if (selected === i) {
    //         return setSelected(null)
    //     }

    //     setSelected(i)
    // }

    // const [selectedMore, setSelectedMore] = useState(null)
    // const toggles = (i) => {
    //     if (selectedMore === i) {
    //         return setSelectedMore(null)
    //     }

    //     setSelectedMore(i)
    // }

    const standardMap = output && output.reduce((acc, curr) => {
        acc[curr.id] = curr.code;
        return acc;
    }, {});

    const deliveryTypeMap = delivery && delivery.reduce((acc, curr) => {
        acc[curr.id] = curr.name;
        return acc;
    }, {})


    return (
        <>
            <div className="outline__container">
                <div className="outline__content">
                    <div className="wrapper">
                        <div className='accordion'>
                            {syllabusDays?.map((day, idxDay) => (
                                <div className='item'>
                                    <div>
                                        <div className='title'>
                                            <h6 className='outline__days'>{day.dayNo} <i className="bi bi-dash-circle red pointer" onClick={() => handleDeleteDay(idxDay)}></i>  {calculateTotalDurationOfDay(day) > 8 * 60 && <i className="bi bi-exclamation-triangle red" onClick={handleOpenHour}></i>}</h6>
                                        </div>

                                        {day.syllabusUnits?.map((unit, idxUnit) => (
                                            <div className='content show'>
                                                <div className="unit" >
                                                    <div className="unit__component">
                                                        <div className='d-flex'>
                                                            <p className='fs-14'>Unit {unit.unitNo}</p>
                                                            <div className='ms-4'>
                                                                <p className='fs-14'>{unit.name}</p>
                                                                <span className="fs-14">{unit.duration} hours</span>
                                                            </div>
                                                            <div>
                                                                <i class="bi bi-pencil p-2 bg-core rounded ms-3 text-white"></i>
                                                            </div>

                                                        </div>
                                                        <i className='bi bi-caret-down-fill'></i>
                                                    </div>

                                                    {/* // <Box sx={{ flexGrow: 1 }} className={selectedMore === i ? 'unit__details show' : 'unit__details'} key={idx}> */}
                                                    {unit.syllabusUnitChapters?.map((chapter, idxChapter) => (
                                                        <Box sx={{ flexGrow: 1 }} className='unit__details show' >
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={4} className='fs-14'>
                                                                    {chapter.name}
                                                                </Grid>
                                                                <Grid item xs={2} className='fs-14'>
                                                                    <div className="bg-core rounded text-white w-50 text-center">{standardMap[chapter.outputStandardId]}</div>
                                                                </Grid>
                                                                <Grid item xs={2} className='fs-14'>
                                                                    {chapter.duration} mins
                                                                </Grid>
                                                                <Grid item xs={1} className='ms-3 me-3 fs-14'>
                                                                    <p>
                                                                        {chapter.online ? <p className='details__onl'>Online</p> : <p className='text-white bg-core rounded p-1 fw-normal'>Offline</p>}
                                                                    </p>
                                                                </Grid>
                                                                <Grid item xs={1}>
                                                                    {deliveryTypeMap[chapter.deliveryTypeId] === 'Concept/Lecture' && <i class="bi bi-person-plus"></i>}
                                                                    {deliveryTypeMap[chapter.deliveryTypeId] === 'Assignment/Lab' && <i class="bi bi-bookmark-check"></i>}
                                                                    {deliveryTypeMap[chapter.deliveryTypeId] === 'Test/Quiz' && <i class="bi bi-card-checklist"></i>}
                                                                    {deliveryTypeMap[chapter.deliveryTypeId] === 'Exam' && <i class="bi bi-journal-bookmark-fill"></i>}
                                                                    {deliveryTypeMap[chapter.deliveryTypeId] === 'Guide/Review' && <i class="bi bi-hand-thumbs-up"></i>}
                                                                    {deliveryTypeMap[chapter.deliveryTypeId] === 'Seminar/Workshop' && <i class="bi bi-person-workspace"></i>}
                                                                    {deliveryTypeMap[chapter.deliveryTypeId] === 'Class Meeting' && <i class="bi bi-people"></i>}
                                                                    {deliveryTypeMap[chapter.deliveryTypeId] === 'Tour/Outdoor' && <i class="bi bi-globe-central-south-asia"></i>}
                                                                </Grid>
                                                                <Grid item xs={1}>
                                                                    <React.Fragment>
                                                                        <Button
                                                                            backgroundColor="bg-core"
                                                                            className="border border-0 text-white rounded me-3 px-1 bg-core"
                                                                            onClick={() => handleOpenModal(idxChapter)}
                                                                        >
                                                                            <i class="bi bi-folder2-open"></i>
                                                                        </Button>
                                                                        <Modal open={open[idxChapter] || false} onClose={() => handleCloseModal(idxChapter)}>
                                                                            <ModalDialog className='w-50'>
                                                                                <div className="border border-black rounded-top">
                                                                                    <h5 className="bg-core rounded-top text-white p-2">Matreial</h5>
                                                                                    <div>
                                                                                        <div className="w-100">

                                                                                            <div>
                                                                                                {
                                                                                                    chapter.materials?.map((material, idxMaterial) => (
                                                                                                        <div className='d-flex justify-content-center' key={idxMaterial}>
                                                                                                            <div className='bg-chapter d-flex w-98 row rounded'>
                                                                                                                <a href="" className="material__link col-md-4 fs-14">{material.name}</a>
                                                                                                                <span className='col-md-6 fs-14'>{material.url}</span>
                                                                                                                <div className='col-md-2 row'>
                                                                                                                    <i class="bi bi-pencil col-md-6 text-primary"></i>
                                                                                                                    <i className="bi bi-trash3 col-md-6 text-primary pointer" onClick={() => handleDeleteMaterial(idxDay, idxUnit, idxChapter, idxMaterial)}></i>
                                                                                                                </div>
                                                                                                            </div>

                                                                                                        </div>
                                                                                                    ))}
                                                                                                <div className='ms-2 bg-chapter d-flex w-98 row rounded'>
                                                                                                    <input
                                                                                                        type='text'
                                                                                                        className='rounded col-md-4'
                                                                                                        value={chapterMaterials.name}
                                                                                                        onChange={(e) => handleMaterialChange(idxChapter, 'name', e.target.value)}
                                                                                                        placeholder="Enter name"
                                                                                                    />
                                                                                                    <p className='col-md-1'></p>
                                                                                                    <input
                                                                                                        type='text'
                                                                                                        className='rounded col-md-5'
                                                                                                        value={chapterMaterials.url}
                                                                                                        onChange={(e) => handleMaterialChange(idxChapter, 'url', e.target.value)}
                                                                                                        placeholder="Enter URL"
                                                                                                    />
                                                                                                    <div className='col-md-2 row'>
                                                                                                        <button onClick={() => handleAddMaterial(idxDay, idxUnit, idxChapter)}>
                                                                                                            <i className="bi bi-cloud-plus col-md-4 text-primary"></i> Add
                                                                                                        </button>
                                                                                                    </div>
                                                                                                </div>
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
                                                    ))}
                                                    {/* <Box sx={{ flexGrow: 1 }} className={selectedMore === i ? 'unit__details show' : 'unit__details'}></Box> */}
                                                    <Box sx={{ flexGrow: 1 }} className='unit__details show'>
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={3}>
                                                                <input className='w-100 rounded' type="text" value={formData.name} onChange={(e) => handleChange('name', e.target.value)} />
                                                            </Grid>
                                                            <Grid item xs={2}>
                                                                <select
                                                                    className='w-75'
                                                                    name="cars"
                                                                    id="cars"
                                                                    value={formData.outputStandardId} onChange={(e) => handleChange('outputStandardId', e.target.value)}

                                                                >
                                                                    {output ? (
                                                                        output.map((item, index) => (
                                                                            <option key={index} value={item.id}>{item.name}</option>
                                                                        ))
                                                                    ) : (
                                                                        <option>Loading...</option>
                                                                    )}
                                                                </select>

                                                            </Grid>
                                                            <Grid item xs={2}>
                                                                <input className='rounded w-80' type="number" value={formData.duration} onChange={(e) => handleChange('duration', e.target.value)} />
                                                            </Grid>
                                                            <Grid item xs={1} className='ms-3 me-3'>
                                                                <FormGroup>
                                                                    <FormControlLabel
                                                                        control={<Android12Switch checked={!!formData.online}
                                                                            onChange={(e) => setFormData({ ...formData, online: e.target.checked })} />}
                                                                        label=""
                                                                    />


                                                                </FormGroup>


                                                            </Grid>
                                                            <Grid item xs={2}>
                                                                <select
                                                                    className='w-130'
                                                                    name="cars"
                                                                    id="cars"
                                                                    value={formData.deliveryTypeId} onChange={(e) => handleChange('deliveryTypeId', e.target.value)}
                                                                >
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
                                                                {/* <i className="bi bi-folder2-open" onClick={() => setImportOpen(true)}></i> */}

                                                            </Grid>

                                                        </Grid>
                                                    </Box>
                                                    <button className='border-0 rounded text-white bg-core py-1 px-2 mb-2 ms-5' onClick={() => handleAddChapter(idxDay, idxUnit)} ><i class="bi bi-plus-circle"></i></button>

                                                </div>

                                                {/* <div>
                                                    <button className="border-0 p-1 rounded ms-3 mt-1 bg-day text-white mb-3"><i class="bi bi-plus-circle"></i> Add unit</button>
                                                </div> */}
                                            </div>
                                        ))}
                                        <div className="unit" >
                                            <div className="unit__component">
                                                <div className='d-flex'>
                                                    <p className="fs-14">Unit</p>
                                                    <div className='ms-3'>
                                                        <p className="fs-14">Unit name</p>
                                                        <span className="unit__time">
                                                            <input type="text" class="form-control h-50 w-100 p-0 me-3 my-1" placeholder='Type unit name' aria-describedby="basic-addon1" value={unitName.name}
                                                                onChange={(e) => setUnitName({ ...unitName, name: e.target.value })} />
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <button className="bg-day border-0 rounded p-1 text-white mt-4 mb-1 ms-5" onClick={() => handleAddUnit(idxDay)}>Create</button>
                                                    </div>

                                                </div>
                                                {/* <i className={selectedMore === idxDay ? 'bi bi-caret-down-fill' : 'bi bi-caret-left-fill'}></i> */}
                                            </div>
                                        </div>

                                    </div>


                                </div>
                            ))}

                            <div>
                                <input
                                    type="hidden"
                                    value={dayFormData.dayNo}
                                    onChange={(e) => setDayFormData({ ...dayFormData, dayNo: e.target.value })}
                                />
                                <button className="text-white bg-core p-1 border-0 rounded mt-4 ms-3" onClick={handleAddDay}><i class="bi bi-plus-circle"></i> Add day</button>
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
                        <button className="bg-secondary border-0 text-white rounded p-2 my-4 ms-3" onClick={handlePreviousClick}>Previous</button>
                    </Grid>
                    <Grid item xs={1}>
                        <button className="bg-transparent border-0 text-white rounded p-2 my-4"><a href="#" className="text-danger fw-bold p-2">Cancal</a></button>
                    </Grid>
                    <Grid item xs={2}>
                        <button className="bg-dark-subtle border-0 text-white rounded p-2 my-4">Save as draft</button>
                    </Grid>
                    <Grid item xs={1}>
                        <button className="bg-secondary border-0 text-white rounded p-2 my-4" onClick={handleNextClick}>Next</button>
                    </Grid>
                </Grid>
            </Box>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openHour}
                onClose={handleCloseHour}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={openHour}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            <div className="d-flex">
                                <i className="bi bi-exclamation-triangle red"></i><h5 className='text-primary fw-bold mt-1 ms-2'>Learning hours</h5>
                            </div>
                        </Typography>
                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                            <p>Learning hours of a day cannot exceed 8 hours.</p>
                            <p>Save and modify later?</p>
                        </Typography>
                    </Box>
                </Fade>
            </Modal>
        </>
    )
}

export default OutlineCreate